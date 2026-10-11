import type { ErpCapability, ErpCase } from "./types";

// "ERP work". Keep it generic: no client names, company names, screenshots,
// code or data from client work.

export const erpIntro =
  "My day job is Microsoft Dynamics 365 Finance & Operations. I write X++ that extends standard behaviour without overwriting it, build the reports and integrations the business runs on, and chase down the bugs that only appear in production.";

export const erpCapabilities: ErpCapability[] = [
  {
    title: "X++ extensions",
    detail: "Chain of Command and event handlers, so standard code stays upgrade-safe.",
  },
  {
    title: "SSRS reports",
    detail: "Report data providers, contracts and controllers for documents people print and sign.",
  },
  {
    title: "Data entities & integrations",
    detail: "Moving data in and out of F&O through entities instead of around them.",
  },
  {
    title: "Workflow & approvals",
    detail: "Approval logic that routes documents to the right person, the first time.",
  },
  {
    title: "Production debugging",
    detail: "Reproduce it, trace it, fix it. Calmly, while users wait.",
  },
  {
    title: "Business Central (AL)",
    detail: "The same thinking, in Business Central's AL extensions.",
  },
];

export const erpCases: ErpCase[] = [
  {
    ref: "JV-001",
    title: "Purchase requisition approvals",
    problem: "Requisitions that stalled or did not reach the right approver.",
    approach: "Traced the workflow setup and the approval logic behind it, then fixed where the routing broke.",
    tags: ["Procurement", "Workflow", "X++"],
  },
  {
    ref: "JV-002",
    title: "Multi-line non-PO vendor invoices",
    problem: "Vendor invoices without a purchase order that needed many lines, not one.",
    approach: "Built the creation logic for multi-line invoices so they post like any other invoice.",
    tags: ["Accounts payable", "X++"],
  },
  {
    ref: "JV-003",
    title: "CAPEX approval flow",
    problem: "Capital expenditure requests that needed their own approval path.",
    approach: "Designed approval logic for CAPEX requests on top of the standard workflow framework.",
    tags: ["Workflow", "Finance"],
  },
  {
    ref: "JV-004",
    title: "Regression testing for upgrades",
    problem: "Every update meant re-testing core processes, and the Regression Suite Automation Tool (RSAT) was slow to maintain.",
    approach: "Built an MVP of an AI agent that runs regression checks, as a lighter replacement for RSAT.",
    tags: ["Upgrades", "Testing", "AI"],
  },
];
