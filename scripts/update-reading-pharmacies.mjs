import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const latitude = 51.4543;
const longitude = -0.9781;
const radiusMetres = 6500;
// Query a bounding box first, then keep the 6.5 km radius locally.
const query = '[out:json][timeout:25];nwr["amenity"="pharmacy"](51.396,-1.072,51.513,-0.884);out center tags;';
const endpoint = "https://overpass-api.de/api/interpreter";

export function normalizePharmacies(data) {
  if (!Array.isArray(data.elements) || !data.elements.length || data.remark) {
    throw new Error("The pharmacy query returned no complete results; keeping the existing snapshot.");
  }
  const radians = degrees => degrees * Math.PI / 180;
  return data.elements.map(element => {
    const tags = element.tags ?? {};
    const lat = element.lat ?? element.center?.lat;
    const lon = element.lon ?? element.center?.lon;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error(`Missing coordinates for ${element.id}`);
    const a = Math.sin(radians(lat - latitude) / 2) ** 2 + Math.cos(radians(latitude)) * Math.cos(radians(lat)) * Math.sin(radians(lon - longitude) / 2) ** 2;
    return {
      id: `${element.type}-${element.id}`,
      name: tags.name || tags.brand || tags.operator || "Unnamed pharmacy",
      latitude: lat,
      longitude: lon,
      address: tags["addr:full"] || [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" "),
      postcode: tags["addr:postcode"] || "",
      phone: tags["contact:phone"] || tags.phone || "",
      openingHours: tags.opening_hours || "",
      sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      distance: Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 100) / 100,
    };
  }).filter(pharmacy => pharmacy.distance <= radiusMetres / 1000)
    .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name));
}

export async function saveSnapshot(data) {
  const pharmacies = normalizePharmacies(data);
  const snapshot = {
    source: endpoint,
    query,
    license: "OpenStreetMap contributors, ODbL 1.0",
    fetchedAt: new Date().toISOString(),
    updatedAt: data.osm3s?.timestamp_osm_base ?? new Date().toISOString(),
    centre: { latitude, longitude },
    radiusMetres,
    pharmacies,
  };
  await mkdir(new URL("../app/reading-pharmacies/", import.meta.url), { recursive: true });
  await writeFile(new URL("../app/reading-pharmacies/pharmacies.json", import.meta.url), JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`Saved ${pharmacies.length} mapped pharmacies around Reading.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, {
    headers: { "User-Agent": "ReadingPharmacyMap/1.0 (local community pharmacy directory; OpenStreetMap data)", Accept: "application/json" },
    signal: AbortSignal.timeout(45000),
  });
  if (!response.ok) throw new Error(`OpenStreetMap query failed: ${response.status}`);
  await saveSnapshot(await response.json());
}
