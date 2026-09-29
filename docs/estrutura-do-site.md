# Estrutura do site e escopo editorial do MCP

Este documento descreve as páginas, seções, conteúdos compartilhados e pontos técnicos do site Aline Loof. Ele serve como base para definir o que um administrador poderá editar por meio do MCP ou de um futuro painel administrativo.

## Visão geral

- **Framework:** Next.js 16 com App Router e exportação estática.
- **Idiomas:** português (`pt`), inglês (`en`), espanhol (`es`) e francês (`fr`).
- **Domínio:** `https://alineloof.com`.
- **Conteúdo traduzido:** `messages/pt.json`, `messages/en.json`, `messages/es.json` e `messages/fr.json`.
- **Páginas:** 9 rotas de conteúdo por idioma, totalizando 36 páginas estáticas.
- **Raiz `/`:** redireciona para `/pt/`.
- **Componentes globais:** menu, seletor de idioma e rodapé.
- **Conversão principal:** contato pelo WhatsApp.

## Mapa de rotas

| Página | Rota em português | Arquivo | Namespace de conteúdo |
| --- | --- | --- | --- |
| Home | `/pt/` | `src/app/(localized)/[locale]/page.tsx` | `home`, `entity`, `nav`, `StyleQuiz` |
| Sobre | `/pt/sobre/` | `src/app/(localized)/[locale]/sobre/page.tsx` | `about_page`, `entity` |
| Consultoria de imagem | `/pt/consultoria-de-imagem/` | `src/app/(localized)/[locale]/consultoria-de-imagem/page.tsx` | `image_consulting_page` |
| Serviços | `/pt/servicos/` | `src/app/(localized)/[locale]/servicos/page.tsx` | `services` |
| Categorias de estilo | `/pt/categorias/` | `src/app/(localized)/[locale]/categorias/page.tsx` | `categories`, `StyleQuiz` |
| Acessórios | `/pt/acessorios/` | `src/app/(localized)/[locale]/acessorios/page.tsx` | `accessories` |
| Método CEMA | `/pt/cema/` | `src/app/(localized)/[locale]/cema/page.tsx` | `cema` |
| FAQ | `/pt/faq/` | `src/app/(localized)/[locale]/faq/page.tsx` | `faq` |
| Contato | `/pt/contato/` | `src/app/(localized)/[locale]/contato/` | `contact` |

As mesmas rotas são geradas com os prefixos `/en/`, `/es/` e `/fr/`.

## Estrutura global

### Cabeçalho e navegação

Arquivo: `src/components/Navbar.tsx`

Itens atuais:

1. Entrada
2. Sobre
3. Categorias
4. Acessórios
5. CEMA
6. Serviços
7. FAQ
8. Contato
9. Seletor de idioma
10. Menu mobile

Conteúdo em `nav.*` nos quatro arquivos de idioma.

**Recomendação para o administrador:** permitir editar os rótulos, a ordem e a visibilidade dos links. A rota de destino deve usar uma lista controlada para evitar links quebrados.

### Identidade da Aline

Conteúdo em `entity.*`:

- Nome: Aline Loof.
- Profissão: Consultora de imagem.
- Área: Imagem e estilo.
- Serviço: Consultoria de imagem e estilo.

É exibido na Home e na página Sobre. Também alimenta dados estruturados de SEO.

**Recomendação para o administrador:** permitir editar profissão, área e serviço. O nome pode ser editável com confirmação, pois afeta títulos, SEO e dados estruturados.

### Rodapé

Arquivo: `src/components/Footer.tsx`

Seções:

- Nome e frase profissional.
- Navegação.
- Instagram.
- Direitos autorais.

Conteúdo textual em `footer.*` e `nav.*`. O endereço do Instagram está fixo no componente.

**Recomendação para o administrador:** permitir editar frase, redes sociais e links. O ano pode continuar automático.

## Páginas e seções

### 1. Home

Rota: `/[locale]/`

#### Hero

- Nome e profissão.
- H1 principal.
- Texto de apresentação.
- CTA para a consultoria.
- CTA para contato.
- Elementos decorativos e indicador de rolagem.

Campos: `home.hero.*`.

#### Explicação da consultoria de imagem

- H2 “O que é consultoria de imagem?”.
- Resposta direta.
- Texto complementar.

Campos: `home.image_consulting.*`.

#### Sobre Aline

- Monograma decorativo “AL”.
- Título e biografia curta.
- Nome, profissão, área e serviço.
- CTA para a página Sobre.

Campos: `home.about.*` e `entity.*`.

#### Prévia dos serviços

- Título.
- Texto introdutório.
- Lista de serviços em cards.
- CTA para a consultoria.

Campos: `home.services_preview.*`. Atualmente contém 1 serviço.

#### Como funciona e FAQ

Bloco em duas colunas:

- Título, texto e CTA da consultoria.
- Título, texto e CTA das perguntas frequentes.

Campos: `home.process.*` e `home.faq_preview.*`.

#### Quiz de estilo

- Quiz com quatro perguntas.
- Alternativas.
- Progresso.
- Resultado com os dois estilos predominantes.
- Botão para refazer.

Campos textuais: `StyleQuiz.*`.

A pontuação e as regras do quiz ficam no código em `src/lib/style-quiz/` e `src/lib/search/style-quiz/`.

#### CTA final

- Título de encerramento.
- Botão de contato.

Campos: `home.closing.*` e `nav.contact`.

**Editável pelo administrador:** todos os textos, CTAs, lista de serviços e conteúdo do quiz. Alterações na lógica de pontuação e na estrutura visual devem ficar restritas ao desenvolvedor.

### 2. Sobre

Rota: `/[locale]/sobre/`

#### Cabeçalho

- Nome Aline Loof.
- H1.
- Introdução.

#### Informações profissionais

- Nome.
- Profissão.
- Área.
- Serviço.

#### Como funciona o trabalho

- H2.
- Texto explicativo.
- CTA para conhecer os serviços.

Campos: `about_page.*` e `entity.*`.

**Editável pelo administrador:** todos os textos, informações profissionais, CTA e futura foto da Aline.

### 3. Consultoria de imagem

Rota: `/[locale]/consultoria-de-imagem/`

#### Cabeçalho

- Nome Aline Loof.
- H1.
- Introdução do serviço.

#### O que é consultoria de imagem

- H2.
- Resposta explicativa.

#### Como funciona

- H2.
- Etapas resumidas do processo.

#### Para quem é indicada

- H2.
- Perfil do público.

#### Conversão

- CTA “Falar com Aline”.
- Link para Contato.

Campos: `image_consulting_page.*`.

**Editável pelo administrador:** título, introdução, explicações, público, CTA e futura lista detalhada de etapas ou benefícios.

### 4. Serviços

Rota: `/[locale]/servicos/`

#### Cabeçalho

- H1 Serviços.
- Subtítulo.

#### Lista de serviços

Cada serviço pode conter:

- `slug`.
- Título.
- Descrição.
- Lista de itens incluídos.
- Texto do link “Conhecer a consultoria”.

Atualmente existe 1 serviço: Consultoria de imagem e estilo.

#### CTA final

- Texto de chamada.
- Botão para agendamento.

Campos: `services.*`.

**Editável pelo administrador:** serviços, descrições, itens incluídos, ordem, visibilidade e CTA. O `slug` deve ser validado e alterações nele devem atualizar links, canonical e sitemap.

### 5. Categorias de estilo

Rota: `/[locale]/categorias/`

#### Cabeçalho

- H1.
- Subtítulo.

#### Introdução

- Explicação das categorias de estilo.

#### Quiz de estilo

- Mesmo componente utilizado na Home.

#### Grade de categorias

Cada categoria possui:

- Nome.
- Descrição.
- Lista de características.

Categorias atuais:

1. Clássico
2. Romântico
3. Natural
4. Dramático
5. Criativo
6. Esportivo

#### CTA final

- Chamada para descobrir a categoria em uma consultoria.

Campos: `categories.*` e `StyleQuiz.*`.

**Editável pelo administrador:** introdução, categorias, descrições, características, ordem e CTA. A relação entre respostas do quiz e estilos deve ter uma ferramenta separada e protegida.

### 6. Acessórios

Rota: `/[locale]/acessorios/`

#### Cabeçalho

- H1.
- Subtítulo.

#### Introdução

- Texto sobre a função dos acessórios na imagem pessoal.

#### Seções de acessórios

Cada item possui ícone visual, título e descrição.

Itens atuais:

1. Joias e bijuterias
2. Bolsas
3. Calçados
4. Lenços e echarpes

#### Citação e CTA

- Frase de destaque.
- CTA para contato.

Campos: `accessories.*`.

**Editável pelo administrador:** textos, lista de acessórios, ordem, ícone escolhido dentro de uma lista permitida e CTA.

### 7. Método CEMA

Rota: `/[locale]/cema/`

#### Cabeçalho

- H1 Método CEMA.
- Subtítulo.

#### Introdução

- Explicação geral do método.

#### Pilares do método

Cada pilar possui letra, nome e descrição.

Pilares atuais:

1. C — Colorimetria
2. E — Estilo
3. M — Maquiagem
4. A — Acessórios

#### CTA final

- Chamada para contratar o método completo.

Campos: `cema.*`.

**Editável pelo administrador:** introdução, pilares, descrições e CTA. A sigla e a quantidade de pilares devem exigir confirmação, pois também definem o layout.

### 8. FAQ

Rota: `/[locale]/faq/`

#### Cabeçalho

- H1.
- Subtítulo.

#### Busca

- Rótulo e placeholder.
- Ranking por relevância.
- Mensagem sem resultados.

#### Perguntas e respostas

Atualmente existem 11 perguntas. Cada item contém:

- Pergunta.
- Resposta.

Campos: `faq.*`.

**Editável pelo administrador:** criar, editar, ordenar, ocultar e excluir perguntas; editar textos da busca. Perguntas iguais ou vazias devem ser bloqueadas.

### 9. Contato

Rota: `/[locale]/contato/`

#### Cabeçalho

- H1.
- Texto explicativo.
- CTA direto para WhatsApp.

#### Informações de contato

- Instagram.
- Prazo de resposta.
- Modalidade/local de atendimento.

#### Formulário

- Nome.
- E-mail.
- Telefone opcional.
- Serviço de interesse.
- Mensagem.
- Validações e mensagens de erro.
- Abertura do WhatsApp com mensagem preparada.

Campos: `contact.*`.

Valores ainda fixos no código:

- WhatsApp: `554591525773`.
- Instagram: `https://www.instagram.com/alineloof.consultoria`.
- Lista técnica de serviços do formulário.

**Editável pelo administrador:** textos, WhatsApp, Instagram, prazo de resposta, localização/modalidade, opções de serviço e mensagem inicial. Validações técnicas devem permanecer controladas.

## Quiz de estilo

O quiz aparece na Home e em Categorias.

### Conteúdo editável

- Título e descrição.
- Quatro perguntas.
- Quatro alternativas por pergunta.
- Nomes e descrições dos seis estilos.
- Textos dos resultados.
- Textos dos botões.

### Lógica protegida

- IDs das perguntas e alternativas.
- Pesos de pontuação.
- Cálculo dos percentuais.
- Desempate e ranking.
- Fluxo entre perguntas.

Uma edição incorreta nos IDs pode quebrar o cálculo. O MCP administrativo deve expor textos e pesos por meio de schemas validados, sem permitir edição direta dos arquivos de lógica.

## SEO e publicação

### Configurações atuais

- URL base em `src/lib/seo.ts`.
- Canonical próprio para Home, Sobre, Consultoria e Contato.
- Dados estruturados de pessoa e serviço na Home e Sobre.
- Metadados globais no layout.
- Sitemap em `public/sitemap.xml`.
- Robots em `public/robots.txt`.
- Domínio do GitHub Pages em `public/CNAME`.

### Pontos a melhorar

- Serviços, Categorias, Acessórios, CEMA e FAQ ainda usam os metadados globais do layout.
- O sitemap é mantido manualmente.
- Alterações em rotas precisam atualizar links, sitemap e canonical juntos.

**Recomendação para o administrador:** permitir editar title e description de cada página. Canonical, sitemap, domínio e regras de indexação devem ser gerados automaticamente pelo sistema.

## Imagens e mídia

Atualmente não há fotografias reais no conteúdo principal. A Home usa um monograma decorativo “AL”. A pasta `public` contém apenas SVGs padrão, `CNAME`, sitemap e robots.

O futuro módulo de mídia deve permitir:

- Foto principal da Aline.
- Imagem de compartilhamento social.
- Imagens opcionais de serviços, categorias e método CEMA.
- Texto alternativo obrigatório para imagens informativas.
- `alt=""` para imagens exclusivamente decorativas.
- Limite de peso e dimensões.
- Conversão preferencial para WebP ou AVIF.

## Modelo recomendado de permissões do MCP

### Nível 1 — Conteúdo seguro

Pode ser liberado primeiro para o administrador:

- Textos das páginas.
- Títulos e subtítulos.
- CTAs.
- Perguntas e respostas do FAQ.
- Dados profissionais da Aline.
- WhatsApp, Instagram e informações de atendimento.
- Title e description de SEO.
- Traduções.

### Nível 2 — Coleções estruturadas

Liberar com validação de schema:

- Serviços.
- Categorias de estilo.
- Seções de acessórios.
- Pilares do CEMA.
- Perguntas e alternativas do quiz.
- Ordem e visibilidade dos itens.

### Nível 3 — Mídia

Liberar com validação e otimização:

- Upload e substituição de imagens.
- Texto alternativo.
- Imagem social.
- Escolha de ícones a partir de uma lista permitida.

### Nível 4 — Estrutura e design

Manter inicialmente para o desenvolvedor:

- Criar ou excluir páginas.
- Alterar rotas e slugs.
- Reordenar seções inteiras.
- Cores, fontes e espaçamentos globais.
- Componentes React.
- Regras do quiz.
- Formulários e validações.
- Workflow de deploy.
- Dependências e arquivos de configuração.

## Ferramentas administrativas sugeridas para o MCP

O MCP atual edita arquivos genéricos. Para uso por um administrador, recomenda-se adicionar ferramentas específicas:

| Ferramenta sugerida | Finalidade |
| --- | --- |
| `get_site_structure` | Listar páginas, seções e campos disponíveis. |
| `get_page_content` | Ler o conteúdo estruturado de uma página e idioma. |
| `update_page_section` | Atualizar campos de uma seção sem editar código. |
| `list_services` | Listar serviços e sua ordem. |
| `upsert_service` | Criar ou atualizar um serviço validado. |
| `list_faq_items` | Listar perguntas e respostas. |
| `upsert_faq_item` | Criar ou atualizar uma pergunta. |
| `reorder_content_items` | Alterar a ordem de uma coleção. |
| `update_contact_settings` | Atualizar WhatsApp, Instagram e atendimento. |
| `update_entity` | Atualizar dados profissionais da Aline. |
| `update_seo` | Editar title e description por página. |
| `upload_site_image` | Enviar imagem com limite, otimização e alt. |
| `preview_changes` | Gerar um resumo antes da publicação. |
| `validate_content` | Conferir campos, links, traduções e SEO. |
| `publish_site` | Executar validação, commit e deploy com aprovação. |

## Fonte de verdade recomendada

Para o painel administrativo, o ideal é mover os dados editáveis para arquivos estruturados separados do código, por exemplo:

```text
content/
  settings.json
  pt/
    home.json
    sobre.json
    consultoria.json
    servicos.json
    categorias.json
    acessorios.json
    cema.json
    faq.json
    contato.json
  en/
  es/
  fr/
```

Cada arquivo deve ter um schema que define campos obrigatórios, limites, formatos e relações. O MCP administrativo editaria somente `content/` e `public/uploads/`. O código React consumiria esses dados sem precisar ser alterado pelo administrador.

Essa separação reduz o risco de quebrar o site, simplifica permissões e permite validar ou visualizar as mudanças antes do deploy.
