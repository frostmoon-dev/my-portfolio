import type { ExperienceEntry } from "./types";

// "The Workshop" timeline. Only `role` is required.
// Add `org` (employer) and `period` (e.g. "2023 to present") when you want them shown.
// Fields you leave out are not displayed. Nothing is made up.

export const experience: ExperienceEntry[] = [
  {
    role: "Microsoft Dynamics 365 Finance & Operations Developer",
    // org: "Your employer",
    // period: "2023 to present",
    summary:
      "X++ development and customisation on D365 F&O: extensions, reports, integrations, workflow and production support.",
    points: [
      "Extend standard behaviour with Chain of Command and event handlers. No overlayering.",
      "Build SSRS reports with data providers, contracts and controllers.",
      "Move data in and out through data entities and integrations.",
      "Trace and fix production issues across procurement, payables and finance.",
    ],
  },
];

/** Tools of the day job, shown beside the timeline. Add the ones you use daily. */
export const workshopTools = ["X++", "SSRS", "SQL Server", "Data entities", "Workflow", "AL / Business Central"];
