import type { GothicCategory, GothicSlide, Product } from "./types/gothic";

export const products: Product[] = [
  {
    id: 0,
    name: "Ravenlace Corset Dress",
    price: 149,
    category: "Clothing",
    description:
      "A little romance. A little darkness. Intricate lace, a sculpted corset silhouette and a sweeping layered skirt.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 1,
    name: "The Vampire Coat",
    price: 189,
    category: "Costumes",
    description:
      "Make an entrance after sundown. Rich burgundy velvet meets antique-inspired embroidery in a dramatic longline silhouette.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Nocturne Witch Hat",
    price: 89,
    category: "Accessories",
    description:
      "For a spellbinding finishing touch. A sculptural pointed hat, dressed in delicate lace, feathers and a dark red rose.",
    sizes: ["One size"],
  },
  {
    id: 3,
    name: "Eclipse Platform Boots",
    price: 129,
    category: "Accessories",
    description:
      "Stand a little taller in the dark. Statement platforms with lace-up fronts, silver-tone buckles and chain details.",
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
  },
];
export const slides: GothicSlide[] = [
  {
    title: (
      <>
        For your
        <br />
        darker side.
      </>
    ),
    description: (
      <>
        Gothic souls. Midnight muses.
        <br />
        Dress like yourself, after dark.
      </>
    ),
    cta: "Explore the collection",
    filter: "All",
    className: "romance",
  },
  {
    title: (
      <>
        A night to
        <br />
        be someone else.
      </>
    ),
    description: (
      <>
        Velvet capes. Wicked intentions.
        <br />
        Find your Halloween alter ego.
      </>
    ),
    cta: "Discover Halloween",
    filter: "Costumes",
    className: "halloween",
  },
  {
    title: (
      <>
        The devil is
        <br />
        in the details.
      </>
    ),
    description: (
      <>
        From midnight lace to statement boots.
        <br />
        Make the darkness your own.
      </>
    ),
    cta: "Shop accessories",
    filter: "Accessories",
    className: "details",
  },
];

export const categories: GothicCategory[] = [
  "All",
  "Clothing",
  "Costumes",
  "Accessories",
];
