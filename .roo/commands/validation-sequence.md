# Validation Sequence

Run this script and provide a report if it is not all green

```bash
pnpm validate
```

## Optimized Validation Sequence

```mermaid
graph TD
    A[Start Validation] --> B[Lint & Fix]
    B --> C[Type Check]
    C --> D[Health Check Test]
    D --> E[Production Build]
    E --> F[Smoke Test]
    F --> G[Validation Complete]
    
    style A fill:#e1f5fe
    style G fill:#c8e6c9
    style B fill:#fff3e0
    style C fill:#fff3e0
    style D fill:#fce4ec
    style E fill:#f3e5f5
    style F fill:#fce4ec
```

## What is happening:

1. **[Lint & Fix](../../scripts/validate.sh)** - `pnpm lint --fix`
2. **[Type Check](../../scripts/validate.sh)** - `pnpm type-check`  
3. **[Health Check](../../tests/health-check.spec.ts)** - `pnpm health-check`
4. **[Production Build](../../scripts/validate.sh)** - `pnpm build`
5. **[Smoke Test](../../tests/smoke-test.spec.ts)** - `pnpm smoke-test`