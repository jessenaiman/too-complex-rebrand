<!-- SYNC IMPACT REPORT v1.0.0
Version Change: N/A (initial constitution) → 1.0.0 (first version)
Modified Principles: All principles are new (initial creation)
Added Sections: Core Principles (5 principles), Development Standards, Build System Requirements, Governance
Removed Sections: None (initial creation)
Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Update "Constitution Check" alignment
✅ .specify/templates/spec-template.md - Update scope/requirements alignment
✅ .specify/templates/tasks-template.md - Update task categorization
✅ .specify/templates/commands/ - Verify no outdated references
⚠️ README.md - Update references to new principles
⚠️ docs/quickstart.md - Update runtime guidance references
Follow-up TODOs:
- None (initial constitution)
-->
# Rebrand System Constitution

## Core Principles

### I. Orchestrator-First Architecture (NON-NEGOTIABLE)
All rebranding operations MUST be coordinated through the orchestrator system following the specific sequence: theme → content → assets. Components MUST NOT contain hardcoded rebrand logic but instead connect to the orchestrator via the event emitter system. This ensures consistent AI processing and prevents duplicate functionality.

**Rationale**: The orchestrator pattern provides centralized control over the complex rebranding process, ensuring proper sequencing and preventing race conditions during AI generation.

### II. Theme-Content-Asset Coupling (NON-NEGOTIABLE)
Business profiles MUST match theme metadata for proper AI generation. All AI prompts MUST combine company information, theme mood, and element type to create cohesive rebranding. This coupling ensures professional, contextually appropriate results.

**Rationale**: Professional rebranding requires semantic consistency between visual themes, business content, and generated assets to maintain brand coherence.

### III. Sequential AI Processing (NON-NEGOTIABLE)
AI generation requests MUST be processed sequentially using `processPollinationsPromptsSequentially` to respect rate limits. No concurrent AI requests are permitted. Each request MUST include a delay between operations to prevent API throttling.

**Rationale**: Rate limiting prevents service disruption and ensures reliable AI generation, which is critical for user experience during rebranding operations.

### IV. Validation Sequence Compliance (NON-NEGOTIABLE)
All development work MUST follow the exact validation sequence: `pnpm lint --fix` → `pnpm run dev` → `curl -Is http://localhost:3000 | head -n 1` → `next build`. Each step MUST pass completely before proceeding. Zero lint warnings, build errors, or console errors are acceptable.

**Rationale**: This sequence ensures code quality, runtime stability, and production readiness while preventing the accumulation of technical debt.

### V. Component Integration Standards (NON-NEGOTIABLE)
All rebrandable components MUST use the `<Rebrandable>` wrapper pattern and implement proper loading states. Components MUST be accessible with ARIA labels, tooltips, and keyboard navigation. Individual component rebranding MUST trigger via click handlers that emit orchestrator events.

**Rationale**: Consistent component patterns ensure maintainability, accessibility compliance, and proper integration with the orchestrator system.

## Development Standards

### Technology Stack Requirements
- **Framework**: Next.js 15.5.3 with React 19.1.0 (no version downgrades permitted)
- **Styling**: Tailwind CSS 4.1.13 with shadcn/ui components only
- **AI Service**: Pollinations.AI API for all asset generation
- **Package Manager**: pnpm exclusively (no npm/yarn usage)
- **Directory Structure**: All rebrand logic confined to `app/` directory using kebab-case naming

### Code Quality Requirements
- **Zero Inline Styles**: No custom CSS overrides of shadcn/Tailwind themes
- **No Component Duplication**: Use only shadcn/ui and MagicUI via CLI installation
- **TypeScript Strict**: All code must pass strict type checking
- **Performance**: Implement proper React.memo, useMemo, and useCallback patterns
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes

## Build System Requirements

### Mandatory Validation Process
1. **Linting**: `pnpm lint --fix` MUST pass with zero warnings or errors
2. **Development Server**: `pnpm run dev` MUST start without console errors
3. **HTTP Validation**: `curl -Is http://localhost:3000 | head -n 1` MUST return `HTTP/1.1 200 OK`
4. **Production Build**: `next build` MUST complete without warnings or failures
5. **Codacy Grade**: MUST achieve A+ grade with zero issues

### Directory and Naming Conventions
- **Rebrand Logic**: All rebranding functionality confined to `app/` directory
- **File Naming**: Use kebab-case exclusively (e.g., `use-rebrandable.ts`)
- **Component Location**: UI components only in `components/` directory
- **Utility Organization**: All rebrand utilities in `utils/` with clear separation of concerns

## Governance

### Amendment Process
The constitution supersedes all other development practices and documentation. Amendments require:

1. **Issue Creation**: GitHub issue documenting the proposed change
2. **Validation**: All existing functionality must pass validation sequence
3. **Approval**: Technical review by project maintainers
4. **Migration Plan**: Clear upgrade path for existing implementations
5. **Documentation**: Update of all dependent templates and guides

### Versioning Policy
- **MAJOR**: Breaking changes to orchestrator interface or core principles
- **MINOR**: New principle additions or architectural enhancements
- **PATCH**: Clarifications, bug fixes, or non-breaking improvements
- Version increments require corresponding updates to all dependent artifacts

### Compliance Requirements
- **Code Reviews**: All PRs must verify constitutional compliance
- **Quality Gates**: CI/CD must enforce all principles
- **Documentation**: Runtime guidance must reference active principles
- **Template Alignment**: All `.specify/templates/` files must align with constitution

**Version**: 1.0.0 | **Ratified**: 2025-01-20 | **Last Amended**: 2025-01-20