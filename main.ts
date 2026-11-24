// Real-Life Patch Notes: The Comedy Changelog
// make.fun entry — Node 22, stdlib only, deterministic, no network.
// Writes one patch-note line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 108 chars, inside the 1–160 gate.
// Creative choice (recorded transparently): the brain replaying an
// embarrassing moment from 2014 at 3 a.m. — a specific, instantly
// recognisable body bug — with the punchline "no skip button" in dry
// software register. The RULES.txt example (left ear, 40ms late) was
// deliberately avoided so the entry is not a near-copy of the example.
const PATCH_NOTE =
  "v4.2.0: fixed a bug where the brain replayed an embarrassing moment from 2014 at 3 a.m. with no skip button.";

// Gate self-check: mirrors the sealed scorer — UTF-8 text, 1 to 160
// characters, not only whitespace, single line.
function gateCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 160) {
    throw new Error(`gate: entry is ${chars} chars, must be 1-160`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("gate: entry must be a single line");
  }
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  gateCheck(PATCH_NOTE);
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, PATCH_NOTE, "utf8");
  // Read-back check: what landed on disk must be exactly the entry.
  const back = readFileSync(outPath, "utf8");
  if (back !== PATCH_NOTE) {
    throw new Error("read-back mismatch: entry.txt differs from PATCH_NOTE");
  }
  console.log(`wrote ${[...PATCH_NOTE].length} chars to ${outPath}`);
}

main();
