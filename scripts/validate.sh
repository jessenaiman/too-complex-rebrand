#!/bin/bash
set -e

echo "🚀 Starting optimized validation sequence..."

# 1. Lint and fix issues
echo "📋 Step 1: Linting and fixing..."
pnpm lint --fix

# 2. Type checking
echo "🔍 Step 2: Type checking..."
pnpm type-check

# 3. Install Playwright browsers (first time only)
echo "🎭 Step 3: Installing Playwright browsers..."
npx playwright install --with-deps

# 4. Run health check test
echo "🏥 Step 4: Running health check test..."
npx playwright test --grep "health-check" --reporter=line

# 5. Production build
echo "🏗️ Step 5: Production build..."
pnpm build

# 6. Run smoke test on built version
echo "💨 Step 6: Running smoke tests..."
npx playwright test --grep "smoke-test" --reporter=line

echo "✅ All validation steps completed successfully!"