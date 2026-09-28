import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

import {
  deleteSiteFile,
  listSiteFiles,
  readAssetInfo,
  readTextFile,
  replaceText,
  searchSite,
  setTranslation,
  siteOverview,
  validateSite,
  writeAsset,
  writeTextFile,
} from "./core.mjs";

const textResult = (data) => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});

const errorResult = (error) => ({
  isError: true,
  content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
});

const register = (server, name, config, handler) => {
  server.registerTool(name, config, async (args) => {
    try {
      return textResult(await handler(args));
    } catch (error) {
      return errorResult(error);
    }
  });
};

function createServer() {
  const server = new McpServer(
    { name: "aline-loof-site-editor", version: "1.0.0" },
    {
      instructions:
        "Use site_overview before broad changes. Read a file before overwriting it and pass its SHA-256. Prefer replace_text or set_translation for small edits. After writes, run validate_site with lint and the relevant checks. Never request secret files; this server only exposes site source, content, public assets, docs, and approved config files.",
    },
  );

  register(server, "site_overview", {
    description: "Map pages, components, locales, framework, and important editable files.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
  }, siteOverview);

  register(server, "list_site_files", {
    description: "List editable files in the site, optionally restricted to one area.",
    inputSchema: z.object({
      area: z.enum(["all", "src", "messages", "public", "docs"]).default("all"),
      limit: z.number().int().min(1).max(2000).default(500),
    }),
    annotations: { readOnlyHint: true },
  }, ({ area, limit }) => listSiteFiles(area, limit));

  register(server, "read_site_file", {
    description: "Read a UTF-8 site file with line bounds and return its SHA-256 for safe updates.",
    inputSchema: z.object({
      path: z.string().min(1),
      startLine: z.number().int().min(1).default(1),
      endLine: z.number().int().min(1).optional(),
    }),
    annotations: { readOnlyHint: true },
  }, ({ path, startLine, endLine }) => readTextFile(path, startLine, endLine));

  register(server, "search_site", {
    description: "Search source, translations, public text assets, or docs using text or a regular expression.",
    inputSchema: z.object({
      query: z.string().min(1),
      area: z.enum(["all", "src", "messages", "public", "docs"]).default("all"),
      regex: z.boolean().default(false),
      maxResults: z.number().int().min(1).max(500).default(100),
    }),
    annotations: { readOnlyHint: true },
  }, searchSite);

  register(server, "replace_text", {
    description: "Replace an exact text fragment in one editable UTF-8 file; supports dry-run and guarded replace-all.",
    inputSchema: z.object({
      path: z.string().min(1),
      oldText: z.string().min(1),
      newText: z.string(),
      replaceAll: z.boolean().default(false),
      dryRun: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, ({ path, ...args }) => replaceText({ relativePath: path, ...args }));

  register(server, "write_site_file", {
    description: "Create or fully rewrite an editable text file. Existing files require the SHA-256 returned by read_site_file.",
    inputSchema: z.object({
      path: z.string().min(1),
      content: z.string(),
      expectedSha256: z.string().length(64).optional(),
      createOnly: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, ({ path, ...args }) => writeTextFile({ relativePath: path, ...args }));

  register(server, "set_translation", {
    description: "Create or update one dotted translation key in messages/<locale>.json while preserving valid JSON.",
    inputSchema: z.object({
      locale: z.string().min(2),
      key: z.string().min(1),
      value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, setTranslation);

  register(server, "write_public_asset", {
    description: "Create or replace a base64 image asset in public. Existing assets require their SHA-256.",
    inputSchema: z.object({
      path: z.string().min(1),
      base64: z.string().min(1),
      expectedSha256: z.string().length(64).optional(),
      createOnly: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: false },
  }, ({ path, ...args }) => writeAsset({ relativePath: path, ...args }));

  register(server, "read_public_asset_info", {
    description: "Read the byte size, extension, and SHA-256 of an image in public without returning binary data.",
    inputSchema: z.object({
      path: z.string().min(1),
    }),
    annotations: { readOnlyHint: true },
  }, ({ path }) => readAssetInfo(path));

  register(server, "delete_site_file", {
    description: "Delete one editable site file only when its current SHA-256 and the literal confirmation DELETE are supplied.",
    inputSchema: z.object({
      path: z.string().min(1),
      expectedSha256: z.string().length(64),
      confirmation: z.literal("DELETE"),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true },
  }, ({ path, ...args }) => deleteSiteFile({ relativePath: path, ...args }));

  register(server, "validate_site", {
    description: "Run the site's allow-listed npm checks in sequence: lint, test, and/or production build.",
    inputSchema: z.object({
      checks: z.array(z.enum(["lint", "test", "build"])).min(1).default(["lint", "test", "build"]),
    }),
    annotations: { readOnlyHint: true },
  }, ({ checks }) => validateSite(checks));

  return server;
}

void serveStdio(createServer);
console.error("Aline Loof site editor MCP running on stdio");
