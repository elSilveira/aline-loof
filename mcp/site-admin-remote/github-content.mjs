const OWNER = process.env.GITHUB_OWNER || "elSilveira";
const REPO = process.env.GITHUB_REPO || "aline-loof";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const API = "https://api.github.com";

const editableRoots = ["src/", "messages/", "public/", "docs/"];
const editableFiles = new Set([
  "package.json",
  "next.config.ts",
  "README.md",
  "CNAME",
]);

function assertEditable(path) {
  if (typeof path !== "string" || path.includes("\\") || path.includes("..") || path.startsWith("/")) {
    throw new Error("Caminho inválido.");
  }
  if (!editableRoots.some((root) => path.startsWith(root)) && !editableFiles.has(path)) {
    throw new Error(`Arquivo fora das áreas editáveis: ${path}`);
  }
  return path;
}

function headers({ write = false } = {}) {
  const result = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "aline-loof-site-admin-mcp",
  };
  if (process.env.GITHUB_TOKEN) result.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  if (write && !process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN ainda não foi configurado no Railway; alterações estão bloqueadas.");
  }
  return result;
}

async function github(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { ...headers({ write: options.method && options.method !== "GET" }), ...options.headers },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub respondeu ${response.status}: ${detail.slice(0, 500)}`);
  }
  return response.status === 204 ? null : response.json();
}

export function repositoryConfig() {
  return {
    repository: `${OWNER}/${REPO}`,
    branch: BRANCH,
    writesEnabled: Boolean(process.env.GITHUB_TOKEN),
  };
}

export async function listFiles() {
  const tree = await github(`/repos/${OWNER}/${REPO}/git/trees/${encodeURIComponent(BRANCH)}?recursive=1`);
  return tree.tree
    .filter((item) => item.type === "blob")
    .map((item) => item.path)
    .filter((path) => editableRoots.some((root) => path.startsWith(root)) || editableFiles.has(path));
}

export async function readFile(path) {
  assertEditable(path);
  const item = await github(`/repos/${OWNER}/${REPO}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(BRANCH)}`);
  if (Array.isArray(item) || item.type !== "file") throw new Error(`${path} não é um arquivo.`);
  const content = Buffer.from(item.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { path, sha: item.sha, content, size: item.size };
}

export async function writeFile({ path, content, expectedSha, message }) {
  assertEditable(path);
  if (typeof content !== "string") throw new Error("O conteúdo precisa ser texto.");

  let current = null;
  try {
    current = await readFile(path);
  } catch (error) {
    if (!String(error.message).includes("404")) throw error;
  }
  if (current && !expectedSha) throw new Error("Leia o arquivo antes e envie expectedSha para evitar sobrescrever outra alteração.");
  if (current && current.sha !== expectedSha) throw new Error("O arquivo mudou desde a leitura. Leia novamente antes de salvar.");

  const body = {
    message: message || `Atualiza ${path} pelo MCP`,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: BRANCH,
    ...(current ? { sha: current.sha } : {}),
  };
  const result = await github(`/repos/${OWNER}/${REPO}/contents/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { path, commit: result.commit.sha, url: result.commit.html_url, sha: result.content.sha };
}

async function writeEncodedFile({ path, base64, expectedSha, message }) {
  assertEditable(path);
  let current = null;
  try {
    current = await readFile(path);
  } catch (error) {
    if (!String(error.message).includes("404")) throw error;
  }
  if (current && !expectedSha) throw new Error("Leia o arquivo antes e envie expectedSha para evitar sobrescrever outra alteração.");
  if (current && current.sha !== expectedSha) throw new Error("O arquivo mudou desde a leitura. Leia novamente antes de salvar.");

  const result = await github(`/repos/${OWNER}/${REPO}/contents/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message || `Atualiza ${path} pelo MCP`,
      content: base64,
      branch: BRANCH,
      ...(current ? { sha: current.sha } : {}),
    }),
  });
  return { path, commit: result.commit.sha, url: result.commit.html_url, sha: result.content.sha };
}

export async function readPublicAssetInfo(path) {
  if (!path.startsWith("public/")) throw new Error("Informe um arquivo dentro de public/.");
  const file = await readFile(path);
  return { path, sha: file.sha, size: file.size, extension: path.split(".").at(-1)?.toLowerCase() };
}

export async function writePublicAsset({ path, base64, expectedSha, message }) {
  if (!path.startsWith("public/")) throw new Error("Imagens devem ficar dentro de public/.");
  if (!/\.(avif|gif|jpe?g|png|webp)$/i.test(path)) throw new Error("Formato permitido: AVIF, GIF, JPG, PNG ou WebP.");
  const normalized = base64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "").replace(/\s/g, "");
  const bytes = Buffer.from(normalized, "base64");
  if (!bytes.length) throw new Error("A imagem enviada está vazia.");
  if (bytes.length > 8 * 1024 * 1024) throw new Error("A imagem excede o limite de 8 MB.");
  return writeEncodedFile({ path, base64: bytes.toString("base64"), expectedSha, message });
}

export async function setHomeAboutImage({ enabled, src, alt, message }) {
  const settingsPath = "src/content/site-settings.json";
  const file = await readFile(settingsPath);
  const settings = JSON.parse(file.content);
  const current = settings.home?.aboutImage || {};
  const next = {
    enabled,
    src: src ?? current.src,
    alt: alt ?? current.alt,
  };
  if (next.enabled) {
    if (!next.src?.startsWith("/")) throw new Error("src deve começar com /, por exemplo /images/foto.png.");
    if (!next.alt?.trim()) throw new Error("Informe um texto alternativo para a imagem.");
    await readFile(`public${next.src}`);
  }
  settings.home = settings.home || {};
  settings.home.aboutImage = next;
  return writeFile({
    path: settingsPath,
    content: `${JSON.stringify(settings, null, 2)}\n`,
    expectedSha: file.sha,
    message: message || `${enabled ? "Exibe" : "Oculta"} foto da seção Sobre na Home`,
  });
}

export async function setAboutPageImage({ enabled, src, alt, message }) {
  const settingsPath = "src/content/site-settings.json";
  const file = await readFile(settingsPath);
  const settings = JSON.parse(file.content);
  const current = settings.aboutPage?.heroImage || {};
  const next = {
    enabled,
    src: src ?? current.src,
    alt: alt ?? current.alt,
  };
  if (next.enabled) {
    if (!next.src?.startsWith("/")) throw new Error("src deve começar com /, por exemplo /images/foto.png.");
    if (!next.alt?.trim()) throw new Error("Informe um texto alternativo para a imagem.");
    await readFile(`public${next.src}`);
  }
  settings.aboutPage = settings.aboutPage || {};
  settings.aboutPage.heroImage = next;
  return writeFile({
    path: settingsPath,
    content: `${JSON.stringify(settings, null, 2)}\n`,
    expectedSha: file.sha,
    message: message || `${enabled ? "Exibe" : "Oculta"} foto principal da página Sobre`,
  });
}

export async function setStyleQuizVisibility({ enabled, message }) {
  const settingsPath = "src/content/site-settings.json";
  const file = await readFile(settingsPath);
  const settings = JSON.parse(file.content);
  settings.home = settings.home || {};
  settings.home.styleQuiz = { enabled };
  return writeFile({
    path: settingsPath,
    content: `${JSON.stringify(settings, null, 2)}\n`,
    expectedSha: file.sha,
    message: message || `${enabled ? "Exibe" : "Oculta"} quiz de estilo na Home`,
  });
}

export async function setServicesPageImage({ enabled, src, alt, message }) {
  const settingsPath = "src/content/site-settings.json";
  const file = await readFile(settingsPath);
  const settings = JSON.parse(file.content);
  const current = settings.servicesPage?.cardImage || {};
  const next = {
    enabled,
    src: src ?? current.src,
    alt: alt ?? current.alt,
  };
  if (next.enabled) {
    if (!next.src?.startsWith("/")) throw new Error("src deve começar com /, por exemplo /images/foto.png.");
    if (!next.alt?.trim()) throw new Error("Informe um texto alternativo para a imagem.");
    await readFile(`public${next.src}`);
  }
  settings.servicesPage = settings.servicesPage || {};
  settings.servicesPage.cardImage = next;
  return writeFile({
    path: settingsPath,
    content: `${JSON.stringify(settings, null, 2)}\n`,
    expectedSha: file.sha,
    message: message || `${enabled ? "Exibe" : "Oculta"} foto da página Serviços`,
  });
}

export async function deletePublicAsset({ path, expectedSha, confirmation, message }) {
  if (confirmation !== "DELETE") throw new Error("Confirmação inválida.");
  if (!path.startsWith("public/")) throw new Error("Somente arquivos dentro de public/ podem ser excluídos.");
  const file = await readFile(path);
  if (file.sha !== expectedSha) throw new Error("A imagem mudou desde a leitura. Leia novamente antes de excluir.");

  const settings = JSON.parse((await readFile("src/content/site-settings.json")).content);
  const activeImages = [
    { image: settings.home?.aboutImage, tool: "set_home_about_image", location: "Home" },
    { image: settings.aboutPage?.heroImage, tool: "set_about_page_image", location: "página Sobre" },
    { image: settings.servicesPage?.cardImage, tool: "set_services_page_image", location: "página Serviços" },
  ];
  const activeUsage = activeImages.find(({ image }) => image?.enabled && `public${image.src}` === path);
  if (activeUsage) {
    throw new Error(`A imagem ainda está visível na ${activeUsage.location}. Use ${activeUsage.tool} com enabled=false antes de excluí-la.`);
  }

  const result = await github(`/repos/${OWNER}/${REPO}/contents/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message || `Remove ${path} pelo MCP`,
      sha: file.sha,
      branch: BRANCH,
    }),
  });
  return { path, deleted: true, commit: result.commit.sha, url: result.commit.html_url };
}

export async function setTranslation({ locale, key, value, message }) {
  const path = `messages/${locale}.json`;
  const file = await readFile(path);
  const data = JSON.parse(file.content);
  const parts = key.split(".").filter(Boolean);
  if (!parts.length) throw new Error("Informe uma chave como home.hero.title.");
  let cursor = data;
  for (const part of parts.slice(0, -1)) {
    if (!cursor[part] || typeof cursor[part] !== "object" || Array.isArray(cursor[part])) cursor[part] = {};
    cursor = cursor[part];
  }
  cursor[parts.at(-1)] = value;
  return writeFile({
    path,
    content: `${JSON.stringify(data, null, 2)}\n`,
    expectedSha: file.sha,
    message: message || `Atualiza texto ${key} (${locale}) pelo MCP`,
  });
}

export async function replaceText({ path, oldText, newText, expectedSha, message, dryRun }) {
  const file = await readFile(path);
  if (expectedSha && file.sha !== expectedSha) throw new Error("O arquivo mudou desde a leitura.");
  const occurrences = file.content.split(oldText).length - 1;
  if (occurrences !== 1) throw new Error(`Era esperada 1 ocorrência, mas foram encontradas ${occurrences}.`);
  const content = file.content.replace(oldText, newText);
  if (dryRun) return { path, changed: true, occurrences, beforeSha: file.sha, preview: content.slice(0, 4000) };
  return writeFile({ path, content, expectedSha: file.sha, message });
}
