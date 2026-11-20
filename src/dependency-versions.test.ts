import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
const fixed = { next: "15.5.24", tinypool: "2.1.2", postcss: "8.5.18", sharp: "0.35.4", "source-map-js": "1.2.2", vite: "7.3.7", zod: "4.6.6" };
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
test("security dependency versions are pinned", () => {
  for (const [name, version] of Object.entries(fixed)) expect(lock.packages[`node_modules/${name}`]?.version, name).toBe(version);
  expect(pkg.dependencies.next).toBe(fixed.next);
  expect(pkg.dependencies.zod).toBe(fixed.zod);
});
