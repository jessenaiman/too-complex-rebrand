

Before you start complete always run the validation sequence

**Validation Sequence**:  
1. `pnpm lint --fix` → Fix all ESLint + TypeScript errors  
2. check the problems tool
3. `pnpm run dev` → Verify no terminal or console errors  
4. `curl -Is http://localhost:[PORT] | head -n 1` → Must return `HTTP/1.1 200 OK`  
5. `next build` → Must complete without warnings or failures
6. If the project is in better shape than when the validation sequence first ran commit the changes
7. If all the above are not problem and warning free repeat the 6 steps

Before you submit your code as complete run the Validation Sequence  

## WARNINGS

Your work will always be rejected if you fail to do the following

1. Did you run the Validation Sequence?
2. Did you fulfill the users request?
3. Does the chat log clearly show that you have used the context7 tool to validate your systax, or the codacy tool