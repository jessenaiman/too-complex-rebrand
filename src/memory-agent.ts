// src/memory-agent.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface MemoryQuery {
  term: string;
  question: string;
}

interface MemoryResponse {
  query: string;
  answer: string;
  found_in?: string;
  version?: string;
  source_url?: string;
  context7_command?: string;
  timestamp: string;
  requires_update?: boolean;
  followup_suggestions?: string[];
}

const MEMORY_ROOT = './docs/memory';
const KNOWLEDGE_DIR = path.join(MEMORY_ROOT, 'knowledge');

export async function checkMemory(term: string, question: string): Promise<MemoryResponse> {
  const query = `${term} ${question}`;
  const safeFilename = `${term.replace(/\s+/g, '-').toLowerCase()}.md`;
  const knowledgePath = path.join(KNOWLEDGE_DIR, safeFilename);

  // 1. Check if knowledge snippet exists
  let content: string | null = null;
  let foundIn: string | undefined;

  try {
    content = await fs.readFile(knowledgePath, 'utf-8');
    foundIn = knowledgePath;
  } catch {
    // Not found — invoke context7
    const context7Cmd = `context7 "${query}"`;
    console.log(`🔍 Invoking: ${context7Cmd}`);
    const { stdout } = await execAsync(context7Cmd);
    
    // Assume context7 returns structured markdown (you’ll define this format)
    content = stdout;
    await fs.mkdir(KNOWLEDGE_DIR, { recursive: true });
    await fs.writeFile(knowledgePath, content, 'utf-8');
    foundIn = knowledgePath;
  }

  // 2. Parse TOC-style metadata from content
  const answer = extractAnswer(content);
  const version = extractMetadata(content, 'version');
  const sourceUrl = extractMetadata(content, 'source_url');
  const timestamp = new Date().toISOString();

  return {
    query,
    answer,
    found_in: foundIn,
    version,
    source_url: sourceUrl,
    context7_command: `context7 "${query}"`,
    timestamp,
    followup_suggestions: [
      `Update active-context.md with this info?`,
      `Add to tech-context.md under CSS section?`
    ]
  };
}

function extractAnswer(content: string): string {
  // Extract first non-comment, non-metadata line as answer
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.startsWith('<!--') && line.trim() !== '' && !line.includes(':')) {
      return line.trim();
    }
  }
  return content.split('\n')[0]; // fallback
}

function extractMetadata(content: string, key: string): string | undefined {
  const regex = new RegExp(`<!--\\s*${key}:\\s*(.+?)\\s*-->`);
  const match = content.match(regex);
  return match?.[1];
}

// CLI Usage
if (require.main === module) {
  const [term, ...questionParts] = process.argv.slice(2);
  const question = questionParts.join(' ');

  if (!term || !question) {
    console.error('Usage: ts-node memory-agent.ts <term> <question>');
    process.exit(1);
  }

  checkMemory(term, question)
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}