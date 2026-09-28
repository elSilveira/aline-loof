import assert from "node:assert/strict";
import { after, test } from "node:test";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  PROJECT_ROOT,
  readAssetInfo,
  readTextFile,
  replaceText,
  resolveSitePath,
  siteOverview,
  writeTextFile,
} from "./core.mjs";

const testRelativePath = "docs/.site-editor-mcp-test.md";
const testAbsolutePath = path.join(PROJECT_ROOT, testRelativePath);

after(async () => {
  await fs.rm(testAbsolutePath, { force: true });
});

test("blocks traversal and protected areas", async () => {
  await assert.rejects(() => resolveSitePath("../outside.ts"));
  await assert.rejects(() => resolveSitePath(".git/config"));
  await assert.rejects(() => resolveSitePath(".env.local"));
  await assert.rejects(() => resolveSitePath("mcp/site-editor/server.mjs"));
  await assert.rejects(() => readAssetInfo("src/app/favicon.ico"));
});

test("maps the current site architecture", async () => {
  const overview = await siteOverview();
  assert.ok(overview.locales.includes("pt"));
  assert.ok(overview.pages.some((page) => page.endsWith("/sobre/page.tsx")));
  assert.ok(overview.components.includes("src/components/Navbar.tsx"));
});

test("creates, reads, guards, and replaces text", async () => {
  const created = await writeTextFile({
    relativePath: testRelativePath,
    content: "alpha\nbeta\n",
    createOnly: true,
  });
  const read = await readTextFile(testRelativePath);
  assert.equal(read.sha256, created.sha256);
  await assert.rejects(() => writeTextFile({ relativePath: testRelativePath, content: "unsafe" }));
  const replaced = await replaceText({
    relativePath: testRelativePath,
    oldText: "beta",
    newText: "gamma",
  });
  assert.equal(replaced.replacements, 1);
  assert.match((await readTextFile(testRelativePath)).content, /gamma/);
});
