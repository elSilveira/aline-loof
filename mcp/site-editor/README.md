# MCP de edição do site Aline Loof

Servidor MCP local via `stdio` para inspecionar e alterar o projeto com limites definidos para este site.

## Ferramentas

- `site_overview`: arquitetura, páginas, componentes e idiomas.
- `list_site_files`: inventário das áreas editáveis.
- `read_site_file`: leitura com linhas e SHA-256.
- `search_site`: busca textual ou por expressão regular.
- `replace_text`: substituição exata, com opção de simulação.
- `write_site_file`: criação ou reescrita protegida por SHA-256.
- `set_translation`: alteração de uma chave em `messages/*.json`.
- `read_public_asset_info`: tamanho e SHA-256 de uma imagem pública.
- `write_public_asset`: criação ou substituição de imagem em base64.
- `delete_site_file`: exclusão protegida por hash e confirmação literal.
- `validate_site`: executa `lint`, `test` e/ou `build`.

O servidor permite editar `src`, `messages`, `public`, `docs` e os arquivos principais de configuração. Ele bloqueia `.git`, `.codex`, `.next`, `node_modules`, artefatos de build, o próprio MCP e arquivos `.env`.

## Executar

```powershell
npm --prefix mcp/site-editor install
npm --prefix mcp/site-editor start
```

O processo fica aguardando um cliente MCP pelo `stdin`/`stdout`.

## Usar no Codex

O projeto contém `.codex/config.toml`. Feche e reabra a sessão do Codex para carregar o servidor `aline_loof_site`. Ferramentas de escrita usam aprovação para alterações.

Também é possível registrar pelo terminal:

```powershell
codex mcp add aline_loof_site -- node mcp/site-editor/server.mjs
codex mcp list
```

## Testar

```powershell
npm --prefix mcp/site-editor test
node --check mcp/site-editor/server.mjs
```
