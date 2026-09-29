import assert from "node:assert/strict";
import test from "node:test";

import { repositoryConfig } from "./github-content.mjs";

test("uses safe repository defaults", () => {
  const config = repositoryConfig();
  assert.equal(config.repository, "elSilveira/aline-loof");
  assert.equal(config.branch, "main");
  assert.equal(typeof config.writesEnabled, "boolean");
});
