import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MCP_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = path.resolve(
  process.env.SITE_ROOT || path.join(MCP_DIRECTORY, "..", ".."),
);

const EDITABLE_DIRECTORIES = new Set(["src", "messages", "public", "docs"]);
const EDITABLE_ROOT_FILES = new Set([
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
]);
const DENIED_SEGMENTS = new Set([
  ".git",
  ".next",
  ".codex",
  "node_modules",
  "out",
  "build",
  "coverage",
  "mcp",
]);
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);
const MAX_TEXT_BYTES = 1_500_000;
const MAX_ASSET_BYTES = 10_000_000;

function relativePosix(absolutePath) {
  return path.relative(PROJECT_ROOT, absolutePath).split(path.sep).join("/");
}

function isInsideProject(absolutePath) {
  const relative = path.relative(PROJECT_ROOT, absolutePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function nearestExistingParent(absolutePath) {
  let candidate = absolutePath;
  while (candidate !== path.dirname(candidate)) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      candidate = path.dirname(candidate);
    }
  }
  return candidate;
}

export async function resolveSitePath(relativePath, options = {}) {
  const { kind = "text", mustExist = false } = options;
  if (typeof relativePath !== "string" || !relativePath.trim()) {
    throw new Error("Informe um caminho relativo ao projeto.");
  }
  if (relativePath.includes("\0") || path.isAbsolute(relativePath)) {
    throw new Error("O caminho deve ser relativo e não pode conter bytes nulos.");
  }

  const normalized = relativePath.replaceAll("\\", "/").replace(/^\.\//, "");
  const segments = normalized.split("/").filter(Boolean);
  if (segments.includes("..") || segments.some((segment) => DENIED_SEGMENTS.has(segment))) {
    throw new Error("O caminho aponta para uma área protegida do projeto.");
  }
  if (segments.some((segment) => /^\.env(?:\.|$)/i.test(segment))) {
    throw new Error("Arquivos de ambiente e segredos não podem ser acessados pelo MCP.");
  }

  const first = segments[0];
  if (!EDITABLE_DIRECTORIES.has(first) && !EDITABLE_ROOT_FILES.has(normalized)) {
    throw new Error(
      "Caminho fora das áreas do site: src, messages, public, docs e arquivos de configuração permitidos.",
    );
  }

  const extension = path.extname(normalized).toLowerCase();
  const allowedExtensions = kind === "asset" ? ASSET_EXTENSIONS : TEXT_EXTENSIONS;
  if (!allowedExtensions.has(extension)) {
    throw new Error(`Extensão ${extension || "sem extensão"} não permitida para ${kind}.`);
  }

  const absolutePath = path.resolve(PROJECT_ROOT, ...segments);
  if (!isInsideProject(absolutePath)) {
    throw new Error("O caminho sai da raiz do projeto.");
  }

  const existingParent = await nearestExistingParent(absolutePath);
  const realParent = await fs.realpath(existingParent);
  if (!isInsideProject(realParent)) {
    throw new Error("O caminho atravessa um link simbólico fora do projeto.");
  }

  if (mustExist) {
    const stat = await fs.stat(absolutePath);
    if (!stat.isFile()) throw new Error("O caminho não aponta para um arquivo.");
    const realFile = await fs.realpath(absolutePath);
    if (!isInsideProject(realFile)) {
      throw new Error("O arquivo resolve para fora do projeto.");
    }
  }
  return absolutePath;
}

export function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export async function readTextFile(relativePath, startLine = 1, endLine) {
  const absolutePath = await resolveSitePath(relativePath, { mustExist: true });
  const stat = await fs.stat(absolutePath);
  if (stat.size > MAX_TEXT_BYTES) throw new Error("Arquivo de texto maior que 1,5 MB.");
  const content = await fs.readFile(absolutePath, "utf8");
  const lines = content.split(/\r?\n/);
  const safeStart = Math.max(1, Math.trunc(startLine || 1));
  const safeEnd = Math.min(lines.length, Math.trunc(endLine || lines.length));
  return {
    path: relativePosix(absolutePath),
    sha256: sha256(content),
    totalLines: lines.length,
    startLine: safeStart,
    endLine: safeEnd,
    content: lines.slice(safeStart - 1, safeEnd).join("\n"),
  };
}

async function walk(directory, output, limit = 2000) {
  if (output.length >= limit) return;
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (output.length >= limit || DENIED_SEGMENTS.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolutePath, output, limit);
    else if (entry.isFile()) output.push(relativePosix(absolutePath));
  }
}

export async function listSiteFiles(area = "all", limit = 500) {
  const areas = area === "all" ? [...EDITABLE_DIRECTORIES] : [area];
  if (areas.some((item) => !EDITABLE_DIRECTORIES.has(item))) {
    throw new Error("Área inválida. Use all, src, messages, public ou docs.");
  }
  const output = [];
  for (const currentArea of areas) {
    await walk(path.join(PROJECT_ROOT, currentArea), output, Math.min(limit, 2000));
  }
  return output.sort().slice(0, Math.min(limit, 2000));
}

export async function siteOverview() {
  const files = await listSiteFiles("all", 2000);
  const pages = files.filter((file) => /src\/app\/.+\/page\.tsx$/.test(file));
  const components = files.filter((file) => file.startsWith("src/components/") && /\.tsx$/.test(file));
  const locales = files
    .filter((file) => /^messages\/[a-z-]+\.json$/.test(file))
    .map((file) => path.basename(file, ".json"));
  return {
    projectRoot: PROJECT_ROOT,
    framework: "Next.js 16 App Router, React 19, next-intl, Tailwind CSS 4",
    output: "Static export with basePath /aline-loof",
    editableAreas: [...EDITABLE_DIRECTORIES],
    locales,
    pages,
    components,
    importantFiles: [
      "src/app/globals.css",
      "src/lib/seo.ts",
      "src/i18n/routing.ts",
      "messages/pt.json",
      "next.config.ts",
    ],
  };
}

export async function searchSite({ query, area = "all", regex = false, maxResults = 100 }) {
  if (!query) throw new Error("Informe o texto de busca.");
  const expression = regex
    ? new RegExp(query, "giu")
    : new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "giu");
  const files = await listSiteFiles(area, 2000);
  const results = [];
  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
    const absolutePath = await resolveSitePath(file, { mustExist: true });
    const stat = await fs.stat(absolutePath);
    if (stat.size > MAX_TEXT_BYTES) continue;
    const lines = (await fs.readFile(absolutePath, "utf8")).split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      expression.lastIndex = 0;
      if (expression.test(lines[index])) {
        results.push({ path: file, line: index + 1, text: lines[index].trim().slice(0, 500) });
        if (results.length >= Math.min(maxResults, 500)) return results;
      }
    }
  }
  return results;
}

async function atomicWrite(absolutePath, content) {
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  const temporaryPath = `${absolutePath}.${randomUUID()}.tmp`;
  await fs.writeFile(temporaryPath, content);
  await fs.rename(temporaryPath, absolutePath);
}

export async function writeTextFile({ relativePath, content, expectedSha256, createOnly = false }) {
  if (Buffer.byteLength(content, "utf8") > MAX_TEXT_BYTES) {
    throw new Error("Conteúdo maior que 1,5 MB.");
  }
  const absolutePath = await resolveSitePath(relativePath);
  let previousContent = null;
  try {
    previousContent = await fs.readFile(absolutePath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (createOnly && previousContent !== null) throw new Error("O arquivo já existe.");
  if (previousContent !== null && !expectedSha256) {
    throw new Error("Para sobrescrever, leia o arquivo e informe expectedSha256.");
  }
  if (previousContent !== null && sha256(previousContent) !== expectedSha256) {
    throw new Error("O arquivo mudou desde a leitura. Leia novamente antes de editar.");
  }
  await atomicWrite(absolutePath, content);
  return {
    path: relativePosix(absolutePath),
    created: previousContent === null,
    bytes: Buffer.byteLength(content, "utf8"),
    sha256: sha256(content),
  };
}

export async function replaceText({ relativePath, oldText, newText, replaceAll = false, dryRun = false }) {
  if (!oldText) throw new Error("oldText não pode ser vazio.");
  const file = await readTextFile(relativePath);
  const count = file.content.split(oldText).length - 1;
  if (count === 0) throw new Error("O texto antigo não foi encontrado.");
  if (!replaceAll && count !== 1) {
    throw new Error(`O texto aparece ${count} vezes. Use replaceAll ou forneça um trecho mais específico.`);
  }
  const updated = replaceAll
    ? file.content.split(oldText).join(newText)
    : file.content.replace(oldText, newText);
  if (!dryRun) {
    await writeTextFile({ relativePath, content: updated, expectedSha256: file.sha256 });
  }
  return {
    path: file.path,
    replacements: replaceAll ? count : 1,
    dryRun,
    beforeSha256: file.sha256,
    afterSha256: sha256(updated),
  };
}

export async function writeAsset({ relativePath, base64, expectedSha256, createOnly = false }) {
  if (!relativePath.replaceAll("\\", "/").startsWith("public/")) {
    throw new Error("Assets binários devem ficar dentro de public/.");
  }
  const absolutePath = await resolveSitePath(relativePath, { kind: "asset" });
  const content = Buffer.from(base64, "base64");
  if (content.length > MAX_ASSET_BYTES) throw new Error("Asset maior que 10 MB.");
  let previous = null;
  try {
    previous = await fs.readFile(absolutePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (createOnly && previous) throw new Error("O asset já existe.");
  if (previous && !expectedSha256) {
    throw new Error("Para substituir um asset, informe expectedSha256.");
  }
  if (previous && sha256(previous) !== expectedSha256) {
    throw new Error("O asset mudou desde a leitura.");
  }
  await atomicWrite(absolutePath, content);
  return { path: relativePosix(absolutePath), bytes: content.length, sha256: sha256(content) };
}

export async function readAssetInfo(relativePath) {
  if (!relativePath.replaceAll("\\", "/").startsWith("public/")) {
    throw new Error("Informe um asset dentro de public/.");
  }
  const absolutePath = await resolveSitePath(relativePath, { kind: "asset", mustExist: true });
  const content = await fs.readFile(absolutePath);
  return {
    path: relativePosix(absolutePath),
    bytes: content.length,
    extension: path.extname(absolutePath).toLowerCase(),
    sha256: sha256(content),
  };
}

export async function deleteSiteFile({ relativePath, expectedSha256, confirmation }) {
  if (confirmation !== "DELETE") throw new Error('Use confirmation: "DELETE" para excluir.');
  const extension = path.extname(relativePath).toLowerCase();
  const kind = ASSET_EXTENSIONS.has(extension) ? "asset" : "text";
  const absolutePath = await resolveSitePath(relativePath, { kind, mustExist: true });
  const content = await fs.readFile(absolutePath);
  if (sha256(content) !== expectedSha256) {
    throw new Error("O hash não confere. Leia o arquivo novamente antes de excluir.");
  }
  await fs.unlink(absolutePath);
  return { path: relativePosix(absolutePath), deleted: true };
}

export async function setTranslation({ locale, key, value }) {
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error("Locale inválido.");
  if (!key || key.split(".").some((part) => !part)) throw new Error("Chave de tradução inválida.");
  const relativePath = `messages/${locale}.json`;
  const file = await readTextFile(relativePath);
  const json = JSON.parse(file.content);
  const parts = key.split(".");
  let cursor = json;
  for (const part of parts.slice(0, -1)) {
    if (cursor[part] === undefined) cursor[part] = {};
    if (!cursor[part] || typeof cursor[part] !== "object" || Array.isArray(cursor[part])) {
      throw new Error(`A chave intermediária ${part} não é um objeto.`);
    }
    cursor = cursor[part];
  }
  const leaf = parts.at(-1);
  const previousValue = cursor[leaf];
  cursor[leaf] = value;
  const content = `${JSON.stringify(json, null, 2)}\n`;
  const result = await writeTextFile({ relativePath, content, expectedSha256: file.sha256 });
  return { ...result, key, previousValue, value };
}

function runCommand(command, args, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: PROJECT_ROOT,
      env: process.env,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout: stdout.slice(-50_000), stderr: stderr.slice(-50_000) });
    });
  });
}

export async function validateSite(checks = ["lint", "test", "build"]) {
  const allowed = new Set(["lint", "test", "build"]);
  if (!checks.length || checks.some((check) => !allowed.has(check))) {
    throw new Error("Checks permitidos: lint, test e build.");
  }
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const results = [];
  for (const check of checks) {
    const result = await runCommand(npmCommand, ["run", check], check === "build" ? 300_000 : 180_000);
    results.push({ check, ...result });
    if (result.code !== 0) break;
  }
  return { passed: results.every((result) => result.code === 0), results };
}
