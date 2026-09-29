# MCP remoto de administração do site

Servidor MCP HTTP para administrar o site Aline Loof a partir de clientes compatíveis com MCP.

## Endpoints

- `GET /health`: verificação pública de funcionamento.
- `/mcp`: endpoint Streamable HTTP protegido por Bearer token.

## Variáveis

- `MCP_ADMIN_TOKEN`: token exigido no cabeçalho `Authorization`.
- `GITHUB_TOKEN`: token fino do GitHub com permissão **Contents: Read and write** somente no repositório do site.
- `GITHUB_OWNER`: proprietário do repositório; padrão `elSilveira`.
- `GITHUB_REPO`: nome do repositório; padrão `aline-loof`.
- `GITHUB_BRANCH`: branch publicada; padrão `main`.
- `PUBLIC_SITE_URL`: endereço público; padrão `https://alineloof.com`.

As ferramentas de escrita ficam bloqueadas quando `GITHUB_TOKEN` não está configurado.
