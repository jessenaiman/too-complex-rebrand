**Validation Sequence**:  
1. `pnpm lint --fix && pnpm build` → Fix all ESLint + TypeScript warning and errors  
2. check the problems tool, check [codacy](../.././codacy-check.prompt.md)
3. `pnpm run dev` → Verify no terminal or console errors  
4. `curl -Is http://localhost:[PORT] | head -n 1` → Must return `HTTP/1.1 200 OK` - must use desktop-commmander
5. `next build` → Must complete without warnings or failures
6. If the project is in better shape than when the validation sequence first ran commit the changes
7. If all the above are not problem and warning free repeat the 6 steps