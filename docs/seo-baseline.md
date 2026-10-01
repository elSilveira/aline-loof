# Baseline — Aline Loof

Data: 28/09/2026

## Lighthouse público — 01/10/2026

Medição mobile da Home publicada em `https://alineloof.com/pt/`:

| Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 97 | 96 | 100 | 100 | 2,6 s | 30 ms | 0 |

Esta é uma medição de laboratório e pode variar entre execuções.

## Lighthouse (mobile)

Medição única por página com Lighthouse 13.5.0 no Chrome headless, usando o servidor local de desenvolvimento em `http://localhost:3000/aline-loof/pt/`. As pontuações são de laboratório e podem variar entre execuções. A Performance deve ser medida novamente no build de produção antes de ser usada como referência de publicação.

| Página | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home (`/pt/`) | 69 | 96 | 100 | 100 | 6,5 s | 360 ms | 0 |
| Consultoria (`/pt/consultoria-de-imagem/`) | 85 | 95 | 100 | 100 | 3,1 s | 370 ms | 0 |
| Sobre (`/pt/sobre/`) | 89 | 96 | 100 | 100 | 3,1 s | 250 ms | 0 |
| Contato (`/pt/contato/`) | 69 | 96 | 100 | 100 | 6,4 s | 260 ms | 0 |

### Problemas encontrados

- **Acessibilidade — contraste:** textos dourados `#b8942a` sobre fundos claros têm contraste aproximado de 2,66–2,75:1, abaixo dos 4,5:1 esperados para texto pequeno. O problema aparece sobretudo na Home e na página Sobre. O aviso de direitos autorais no rodapé também tem contraste baixo (2,96:1) nas quatro páginas.
- **Acessibilidade — seletor de idioma:** o botão mostra “PT”, mas seu nome acessível é “Switch language”; o Lighthouse sinalizou que o texto visível não está incluído no nome acessível em todas as páginas.
- **Performance — LCP:** Home (6,5 s) e Contato (6,4 s) foram as páginas mais lentas nesta execução mobile. O tempo de bloqueio total ficou entre 250 e 370 ms.
- **Performance — JavaScript:** o relatório apontou cerca de 170 KiB de JavaScript não minificado e 281–306 KiB de JavaScript não utilizado. Esses números são do servidor de desenvolvimento e precisam ser reavaliados no build de produção.
- **Performance — cache de navegação:** o back/forward cache falhou por respostas com `Cache-Control: no-store` e uso de WebSocket, compatíveis com o ambiente de desenvolvimento. Confirmar no build de produção.

As verificações automatizadas de SEO e Best Practices passaram nas quatro páginas; a nota 100 não substitui a revisão manual de conteúdo, links, metadados e experiência real.

## SEO (Search Console)

- Páginas indexadas: não medido
- Impressões: não medido
- Cliques: não medido
- CTR: não medido
- Posição média: não medido

## Web Vitals em usuários reais

- LCP: não medido (valores de laboratório na tabela acima)
- INP: não medido pelo Lighthouse nesta execução
- CLS: não medido em usuários reais (0 no laboratório nas quatro páginas)

## Conversão

- Cliques no WhatsApp: não medido
- Formulários enviados: não medido
- Agendamentos: não medido
- Contatos recebidos: não medido

## IA / Busca

- Páginas citadas: não medido
- Citações: não medido
- Consultas relacionadas: não medido
