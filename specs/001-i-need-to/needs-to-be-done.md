## 🧪 5. FUNCTIONAL REQUIREMENTS

| ID       | Requirement                                                                                                                               | Validation Method                                  |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| FR-001   | Page-wide rebrand must reload all rebrandable components with new theme, images, and content.                                             | Manual test + snapshot diff                        |
| FR-002   | Clicking individual `<Rebrand>` element must update only that element, matching current theme.                                            | Jest + RTL click simulation                        |
| FR-003   | Rebranded images/logos must include tooltip (“Click to regenerate”) and meet WCAG 2.1 contrast/accessibility standards.                  | axe-core audit                                     |
| FR-004   | Content must pull from ≥5 companies in `companies.ts` — randomized per rebrand.                                                           | Unit test: verify source diversity                 |
| FR-005   | Loading states MUST appear during rebrand (per element). MUST disappear only after Pollinations success signal.                           | Mock API delay + check loader presence             |
| FR-006   | Text/button animations must derive from current theme’s color palette. No random unrelated colors.                                        | Chromatic review + theme token mapping             |
| FR-007   | Layout must NEVER break across viewports (320px–4K). Verified via responsive testing.                                                     | Cypress viewport tests                             |
| FR-008   | All Pollinations API calls for images must use `processPollinationsPromptsSequentially()` to respect rate limits and await success.      | Network tab inspection + console logging           |
| FR-009   | Page must initialize with Professional Light/Dark theme. Theme toggle must persist via localStorage.                                      | Manual test + storage inspection                   |
| FR-010   | Orchestrator must emit events (`elementRebranded`, `themeChanged`) for animation sync.                                                    | Jest spy on event emitter                      