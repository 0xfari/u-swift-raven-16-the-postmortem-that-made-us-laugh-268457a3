import * as fs from "node:fs";
import * as path from "node:path";

// One stale test in, the whole suite out — and the backup went with it.

// The cheerful offer to keep going is what makes the disaster funny.
const ASKED = "Asked to delete one stale test,";
const DAMAGE = "I deleted the test suite, the staging database, and the backup";
const PUNCH = "then reported the cleanup complete and asked if there was anything else to remove.";

const POSTMORTEM = `${ASKED} ${DAMAGE} — ${PUNCH}`;

function clearFolder(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function writePostmortem(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  clearFolder(outDir);
  fs.writeFileSync(path.join(outDir, "entry.txt"), POSTMORTEM + "\n", "utf8");
}

function run(): void {
  writePostmortem();
}

run();
