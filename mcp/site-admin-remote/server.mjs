import { createServer } from "node:http";
import { Readable } from "node:stream";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import {
  deletePublicAsset,
  listFiles,
  readFile,
  readPublicAssetInfo,
  replaceText,
  repositoryConfig,
  setAboutPageImage,
  setHomeAboutImage,
  setStyleQuizVisibility,
  setTranslation,
  writeFile,
  writePublicAsset,
} from "./github-content.mjs";

const jsonResult = (data) => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  structuredContent: data,
});

const errorResult = (error) => ({
  isError: true,
  content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
});

function register(server, name, config, handler) {
  server.registerTool(name, config, async (args) => {
    try {
      return jsonResult(await handler(args));
    } catch (error) {
      return errorResult(error);
    }
  });
}

function createSiteServer() {
  const server = new McpServer(
    { name: "aline-loof-site-admin", version: "1.0.0" },
    {
      instructions:
        "Administre o site Aline Loof em linguagem simples. Consulte site_overview primeiro. Antes de alterar um arquivo inteiro, use read_site_file e preserve o SHA. Explique ao usuário o que será publicado. Use dryRun em mudanças amplas e nunca solicite nem revele credenciais.",
    },
  );

  register(server, "site_overview", {
    description: "Mostra o repositório, estado de escrita, idiomas, páginas e fluxo de publicação.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
  }, async () => ({
    ...repositoryConfig(),
    siteUrl: process.env.PUBLIC_SITE_URL || "https://alineloof.com",
    locales: ["pt", "en", "es", "fr"],
    pages: ["home", "consultoria-de-imagem", "servicos", "sobre", "contato", "faq", "quiz"],
    contentFiles: ["messages/pt.json", "messages/en.json", "messages/es.json", "messages/fr.json"],
    publication: "Cada alteração cria um commit na branch configurada e inicia o deploy do site.",
  }));

  register(server, "list_site_files", {
    description: "Lista arquivos editáveis do site no GitHub.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
  }, async () => ({ files: await listFiles() }));

  register(server, "read_site_file", {
    description: "Lê um arquivo editável e retorna conteúdo e SHA para uma atualização segura.",
    inputSchema: z.object({ path: z.string().min(1) }),
    annotations: { readOnlyHint: true },
  }, ({ path }) => readFile(path));

  register(server, "get_page_content", {
    description: "Lê o conteúdo traduzido de uma página pelo idioma e pela chave principal.",
    inputSchema: z.object({
      locale: z.enum(["pt", "en", "es", "fr"]).default("pt"),
      page: z.string().min(1),
    }),
    annotations: { readOnlyHint: true },
  }, async ({ locale, page }) => {
    const file = await readFile(`messages/${locale}.json`);
    const data = JSON.parse(file.content);
    return { locale, page, sha: file.sha, content: data[page] ?? null };
  });

  register(server, "get_style_quiz", {
    description: "Consulta a visibilidade e todo o conteúdo editável do quiz de estilo em um idioma.",
    inputSchema: z.object({
      locale: z.enum(["pt", "en", "es", "fr"]).default("pt"),
    }),
    annotations: { readOnlyHint: true },
  }, async ({ locale }) => {
    const [settingsFile, messagesFile] = await Promise.all([
      readFile("src/content/site-settings.json"),
      readFile(`messages/${locale}.json`),
    ]);
    const settings = JSON.parse(settingsFile.content);
    const messages = JSON.parse(messagesFile.content);
    return {
      locale,
      enabled: settings.home?.styleQuiz?.enabled !== false,
      content: messages.StyleQuiz ?? null,
    };
  });

  register(server, "set_translation", {
    description: "Atualiza um texto do site por idioma e chave pontuada; publica um commit no GitHub.",
    inputSchema: z.object({
      locale: z.enum(["pt", "en", "es", "fr"]),
      key: z.string().min(1),
      value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, setTranslation);

  register(server, "set_style_quiz_content", {
    description: "Edita um texto do quiz, incluindo títulos, perguntas, alternativas e resultados. Use uma chave relativa como questions.occasion.title.",
    inputSchema: z.object({
      locale: z.enum(["pt", "en", "es", "fr"]),
      key: z.string().min(1),
      value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, ({ locale, key, value, message }) => setTranslation({
    locale,
    key: `StyleQuiz.${key.replace(/^StyleQuiz\./, "")}`,
    value,
    message: message || `Atualiza conteúdo do quiz (${locale}) pelo MCP`,
  }));

  register(server, "replace_text", {
    description: "Troca uma ocorrência exata em um arquivo. Use dryRun para revisar antes de publicar.",
    inputSchema: z.object({
      path: z.string().min(1),
      oldText: z.string().min(1),
      newText: z.string(),
      expectedSha: z.string().optional(),
      message: z.string().min(1).max(120).optional(),
      dryRun: z.boolean().default(true),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, replaceText);

  register(server, "write_site_file", {
    description: "Cria ou reescreve um arquivo editável. Arquivos existentes exigem o SHA obtido na leitura.",
    inputSchema: z.object({
      path: z.string().min(1),
      content: z.string(),
      expectedSha: z.string().optional(),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, writeFile);

  register(server, "read_public_asset_info", {
    description: "Consulta tamanho, extensão e SHA de uma imagem pública sem retornar seus dados binários.",
    inputSchema: z.object({ path: z.string().min(1) }),
    annotations: { readOnlyHint: true },
  }, ({ path }) => readPublicAssetInfo(path));

  register(server, "write_public_asset", {
    description: "Envia ou substitui uma imagem pública em base64. Imagens existentes exigem o SHA obtido na leitura.",
    inputSchema: z.object({
      path: z.string().min(1),
      base64: z.string().min(1),
      expectedSha: z.string().optional(),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, writePublicAsset);

  register(server, "set_home_about_image", {
    description: "Exibe, oculta ou troca a imagem da seção Sobre na Home. Para trocar, envie a nova imagem antes com write_public_asset.",
    inputSchema: z.object({
      enabled: z.boolean(),
      src: z.string().min(1).optional(),
      alt: z.string().min(1).optional(),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, setHomeAboutImage);

  register(server, "set_about_page_image", {
    description: "Exibe, oculta ou troca a foto principal da página Sobre. Para trocar, envie a nova imagem antes com write_public_asset.",
    inputSchema: z.object({
      enabled: z.boolean(),
      src: z.string().min(1).optional(),
      alt: z.string().min(1).optional(),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, setAboutPageImage);

  register(server, "set_style_quiz_visibility", {
    description: "Exibe ou oculta o quiz de estilo inteiro na página principal.",
    inputSchema: z.object({
      enabled: z.boolean(),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, setStyleQuizVisibility);

  register(server, "delete_public_asset", {
    description: "Exclui uma imagem pública. Uma imagem em uso precisa ser ocultada antes para evitar link quebrado.",
    inputSchema: z.object({
      path: z.string().min(1),
      expectedSha: z.string().min(1),
      confirmation: z.literal("DELETE"),
      message: z.string().min(1).max(120).optional(),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true },
  }, deletePublicAsset);

  return server;
}

const mcpHandler = createMcpHandler(createSiteServer, {
  responseMode: "auto",
  onerror: (error) => console.error("MCP error", error),
});

function isAuthorized(request) {
  const configuredToken = process.env.MCP_ADMIN_TOKEN;
  if (!configuredToken) return false;
  return request.headers.get("authorization") === `Bearer ${configuredToken}`;
}

async function toRequest(req) {
  const origin = `http://${req.headers.host || "localhost"}`;
  const init = { method: req.method, headers: req.headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }
  return new Request(new URL(req.url || "/", origin), init);
}

async function sendResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  if (!response.body) return res.end();
  Readable.fromWeb(response.body).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    const request = await toRequest(req);
    const pathname = new URL(request.url).pathname;
    if (pathname === "/health") {
      return sendResponse(res, Response.json({ ok: true, service: "aline-loof-site-admin-mcp" }));
    }
    if (pathname !== "/mcp") {
      return sendResponse(res, new Response("Not found", { status: 404 }));
    }
    if (!isAuthorized(request)) {
      return sendResponse(res, Response.json({ error: "Unauthorized" }, { status: 401 }));
    }
    return sendResponse(res, await mcpHandler.fetch(request));
  } catch (error) {
    console.error(error);
    return sendResponse(res, Response.json({ error: "Internal server error" }, { status: 500 }));
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, "0.0.0.0", () => {
  console.log(`Aline Loof site admin MCP listening on ${port}`);
});
