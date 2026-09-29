# MCP remoto no Railway

## Objetivo

Permitir que uma pessoa sem conhecimento técnico altere o site Aline Loof conversando com uma IA compatível com MCP.

## Arquitetura

1. A IA chama o endpoint remoto `https://<dominio-railway>/mcp`.
2. O Railway valida o Bearer token do administrador.
3. O MCP lê ou altera arquivos do repositório `elSilveira/aline-loof` pela API do GitHub.
4. Cada alteração publicada cria um commit na branch `main`.
5. O fluxo de deploy do site publica a nova versão.

O servidor não depende do disco temporário do Railway para guardar mudanças.

## Segurança

- O endpoint `/health` é público e só informa se o processo está funcionando.
- O endpoint `/mcp` exige `Authorization: Bearer <MCP_ADMIN_TOKEN>`.
- Escritas no GitHub exigem `GITHUB_TOKEN` no ambiente do Railway.
- O token do GitHub recomendado é um fine-grained personal access token limitado ao repositório `aline-loof`, com permissão **Contents: Read and write**.
- Credenciais não devem ser salvas no Git nem enviadas como argumento de uma ferramenta MCP.

## Variáveis do Railway

| Variável | Finalidade |
|---|---|
| `MCP_ADMIN_TOKEN` | Autoriza clientes MCP administradores |
| `GITHUB_TOKEN` | Autoriza leitura e commits no GitHub |
| `GITHUB_OWNER` | `elSilveira` |
| `GITHUB_REPO` | `aline-loof` |
| `GITHUB_BRANCH` | `main` |
| `PUBLIC_SITE_URL` | `https://alineloof.com` |

Sem `GITHUB_TOKEN`, consultas continuam funcionando e todas as escritas retornam uma mensagem clara de bloqueio.

## Endpoints

- `GET /health`
- `POST /mcp`

## Ferramentas iniciais

- `site_overview`
- `list_site_files`
- `read_site_file`
- `get_page_content`
- `set_translation`
- `replace_text`
- `write_site_file`

## Próxima evolução

O conteúdo deverá migrar gradualmente para um modelo estruturado por páginas e seções. Isso permitirá ferramentas como `update_page_section`, `upsert_service`, `upsert_faq_item`, `update_contact_settings`, `update_seo`, `preview_changes` e `publish_site`, com nomes compreensíveis para administradores não técnicos.
