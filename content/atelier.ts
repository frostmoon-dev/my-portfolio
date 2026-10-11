import type { AtelierObject } from "./types";

// Everything the room says. The 3D scene and the 2D fallback both read this.

export const arrival = {
  title: "The Midnight Atelier",
  tagline: "Somewhere Between Dreams & Syntax.",
  line: "An archive of things built, learned, loved, and yet to be discovered.",
  enter: "Enter the Atelier",
};

export const introduction = {
  hello: "Hello, I'm Teha.",
  lines: [
    "A developer by profession. A curious soul by nature.",
    "I spend my days translating problems into solutions, and my quieter hours building little worlds of my own.",
  ],
  hint: "Anything that glows faintly opens. Or choose from the list:",
};

/** Room objects, in keyboard order. `target` is a section id on the home page. */
export const atelierObjects: AtelierObject[] = [
  { id: "notebook", name: "The notebook", target: "person", label: "01 · The Person" },
  { id: "monitor", name: "The monitor", target: "workshop", label: "02 · The Workshop" },
  { id: "drawer", name: "The desk drawer", target: "archives", label: "03 · The Archives" },
  { id: "bookshelf", name: "The bookshelf", target: "knowledge", label: "04 · Acquired Knowledge" },
  { id: "coffee", name: "The coffee cup", target: "after-hours", label: "05 · After Hours" },
  { id: "window", name: "The window", target: "becoming", label: "06 · Still Becoming" },
  { id: "letter", name: "The letter", target: "letter", label: "07 · Leave a Letter" },
];

/** Notes the coffee cup leaves. One is picked each time you visit After Hours. */
export const coffeeNotes = [
  "Current operating system: caffeine and curiosity.",
  "Iced, always. Even at midnight.",
  "This cup has outlived three refactors.",
  "Refill pending. Build succeeding.",
];

/** The Easter egg: what the cat says when you wake it. */
export const catNote = {
  label: "The sleeping cat",
  woken: "You woke the cat. For a moment, every clock in the atelier reads 12:47.",
};
