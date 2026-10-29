# Reading pharmacy map

Open `/reading-pharmacies` after starting the app with `npm run dev`.

The local snapshot contains all `amenity=pharmacy` nodes, ways, and relations returned by OpenStreetMap within 6.5 km of Reading town centre (51.4543, -0.9781). Coordinates are the mapped point or the centre of a mapped feature. Listings are sorted by straight-line distance from that centre, not from the visitor's location.

Source IDs, the query, the source update timestamp, and the retrieval timestamp are saved in `pharmacies.json`. OpenStreetMap is community-maintained and may omit pharmacies or contain outdated names or opening hours. Missing contact/address fields are not invented. Listed opening hours are displayed as supplied, with no inferred “open now” status.

To refresh the snapshot, run:

```sh
node --use-system-ca scripts/update-reading-pharmacies.mjs
```

An unsuccessful or incomplete query leaves the previous snapshot intact. No API key is required. Leaflet loads OpenStreetMap tiles when the user opens the map; the directory remains available if tiles cannot load. Directions open Google Maps with the selected destination coordinates.

Data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Map tiles: OpenStreetMap. Map library: [Leaflet](https://leafletjs.com/).
