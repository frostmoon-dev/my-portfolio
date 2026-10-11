import type { AtmospherePhoto } from "./types";

// Photographs behind some sections, one per light in the room: the lamp,
// the street, the shelf, the sky, the rain. All from Unsplash (free to use
// under the Unsplash License), toned to the palette and kept faint.
// Remove an entry to remove its photo. Credits appear in the footer.

export const atmosphere: Partial<Record<string, AtmospherePhoto>> = {
  person: {
    src: "/images/atmosphere/lamp.jpg",
    side: "right",
    opacity: 0.6,
    position: "30% 40%",
    photographer: "Beth Stevenson",
    profile: "https://unsplash.com/@bthstvn",
    source: "https://unsplash.com/photos/black-desk-lamp-on-brown-wooden-table-okUB5th8QtQ",
  },
  archives: {
    src: "/images/atmosphere/street.jpg",
    side: "right",
    opacity: 0.55,
    position: "60% 50%",
    photographer: "Miris Navarro",
    profile: "https://unsplash.com/@miiris",
    source: "https://unsplash.com/photos/a-blurry-photo-of-a-city-street-at-night-UvR2I6sq8iU",
  },
  knowledge: {
    src: "/images/atmosphere/library.jpg",
    side: "top",
    opacity: 0.35,
    position: "50% 35%",
    photographer: "Peter Herrmann",
    profile: "https://unsplash.com/@tama66",
    source: "https://unsplash.com/photos/a-room-with-a-lot-of-books-in-it-O_DUcg4cDlc",
  },
  becoming: {
    src: "/images/atmosphere/stars.jpg",
    side: "full",
    opacity: 0.7,
    photographer: "Paul Lichtblau",
    profile: "https://unsplash.com/@laup",
    source: "https://unsplash.com/photos/cluster-of-stars-in-the-sky-qVotvbsuM_c",
  },
  letter: {
    src: "/images/atmosphere/rain.jpg",
    side: "right",
    opacity: 0.32,
    position: "70% 50%",
    photographer: "C. G.",
    profile: "https://unsplash.com/@cg",
    source: "https://unsplash.com/photos/a-wet-window-with-a-traffic-light-on-it-JgDUVGAXsso",
  },
};
