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

## Administração de imagens

- `read_public_asset_info`: consulta uma imagem e retorna seu SHA para alterações seguras.
- `write_public_asset`: envia ou substitui imagens de até 8 MB em base64.
- `set_home_about_image`: exibe, oculta ou aponta a seção Sobre da Home para outra imagem.
- `set_about_page_image`: exibe, oculta ou aponta a foto principal da página Sobre para outra imagem.
- `delete_public_asset`: exclui uma imagem e impede a remoção enquanto ela estiver ativa no site.
