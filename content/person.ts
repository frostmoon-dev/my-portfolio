import type { NotebookPage } from "./types";

// "The Person": the notebook. Each page turns like paper.
// Everything here comes from how Teha describes herself — edit freely.

export const personLead =
  "A developer, yes. Also a person who dreams, experiments, imagines, learns and makes things — mostly to find out whether they can exist.";

export const notebookPages: NotebookPage[] = [
  {
    id: "who",
    heading: "who lives here",
    paragraphs: [
      "I'm Teha — Fatihah on paper, frostmoon on GitHub. By day I build on Microsoft Dynamics 365 Finance & Operations. In the quieter hours I build small worlds: chat apps for my characters, editor themes, tools for myself.",
      "I am soft-spoken, but I am not without ambition. I notice small things, and I care about the details most people scroll past.",
    ],
    margin: "a little sleepy. always curious.",
  },
  {
    id: "why",
    heading: "what keeps me curious",
    paragraphs: [
      "Most of my side projects start with one question: could this exist? A messenger built for exactly two people. A chat where characters I love can answer back. A theme that feels like a person.",
      "I like knowing how things work underneath — then making the surface quiet and kind.",
    ],
    margin: "could this exist? → let's see",
  },
  {
    id: "two-halves",
    heading: "precision & imagination",
    paragraphs: [
      "ERP work taught me precision: extend, don't overwrite; trace before you fix; respect the process people depend on.",
      "Storytelling taught me the rest: fictional worlds, alternate universes, the feeling of a room at 1 a.m. I don't think the two halves argue. They take turns.",
    ],
    margin: "Delight in the means, too.",
  },
  {
    id: "small-things",
    heading: "small true things",
    paragraphs: [
      "Iced coffee, always. Cats are the best colleagues. Cozy rooms, rainy windows, beautiful interfaces, melancholy music I haven't written down here yet.",
      "I'm a perfectionist about things nobody will notice. This notebook, for example.",
    ],
  },
];
