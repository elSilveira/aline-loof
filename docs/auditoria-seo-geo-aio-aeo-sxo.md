# Auditoria SEO, GEO, AIO, AEO e SXO

Data: 1 de outubro de 2026

## SEO técnico

- Metadados exclusivos em todas as páginas indexáveis.
- Canonical absoluto por página e idioma.
- `hreflang` para português, inglês, espanhol, francês e `x-default`.
- Open Graph e Twitter Cards em todas as páginas.
- Sitemap XML gerado pelo Next.js com versões de idioma.
- Robots gerado pelo Next.js, com rastreamento liberado e sitemap declarado.
- Página raiz marcada como `noindex` por ser apenas um redirecionamento para `/pt/`.
- HTML estático gerado para todas as páginas públicas.

## GEO e AIO

- Entidade Aline Loof descrita de forma objetiva: nome, profissão, área, serviço e contato.
- Schema `Person` com serviço, Instagram e telefone.
- Schema `WebSite` com nome oficial e publicadora.
- Conteúdo factual disponível em HTML e em quatro idiomas.
- Arquivo `llms.txt` com resumo factual e links oficiais.
- Nenhum endereço, avaliação, prêmio ou serviço não confirmado foi inventado.

## AEO

- FAQ com perguntas e respostas visíveis e schema `FAQPage`.
- Consultoria com respostas diretas para o que é, como funciona e para quem é indicada.
- Schema `Service` nas páginas Consultoria e Serviços.
- Hierarquia de títulos e textos explicativos preservada.

## SXO

- CTAs levam de conteúdo para serviço e contato.
- Links de WhatsApp usam o número confirmado `+55 45 99919-8058`.
- Navegação por idioma preserva a rota atual.
- Nome acessível do seletor de idioma inclui o texto visível.
- Contraste do seletor de idioma e do copyright foi reforçado.
- Quiz pode ser removido de todas as páginas pelo MCP sem deixar espaço vazio.
- Imagens importantes possuem texto alternativo e dimensões reservadas pelo `next/image`.

## Validação

- ESLint: aprovado.
- Testes do site: 59 aprovados.
- Teste do MCP remoto: aprovado.
- Build estático: 46 rotas geradas.
- HTML conferido para canonical, idiomas alternativos, Open Graph, Twitter Cards, `FAQPage`, `Service`, `Person` e `WebSite`.

## Medições externas necessárias

- Search Console: indexação, impressões, cliques, CTR e consultas.
- Core Web Vitals reais: LCP, INP e CLS com dados de usuários.
- Conversões: cliques no WhatsApp, formulários e agendamentos.
- Visibilidade em respostas de IA: citações e páginas referenciadas por consulta.

Essas métricas dependem de tráfego, rastreamento e contas externas; não podem ser garantidas apenas pelo código.

## Estado da publicação

- O workflow do GitHub Pages concluiu com sucesso para o commit `9a98975`.
- Em 1 de outubro de 2026, o domínio `alineloof.com` ainda servia uma versão anterior do site.
- Na mesma verificação, `/pt/`, `/robots.txt` e `/sitemap.xml` retornavam 404 no domínio público.
- O artefato local contém essas rotas corretamente. A associação do domínio ou a origem do GitHub Pages precisa apontar para o deployment deste repositório para que as melhorias entrem no ar.
