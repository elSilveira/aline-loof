This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/aline-loof/pt/](http://localhost:3000/aline-loof/pt/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Estrutura do projeto

- `src/app`: páginas e layouts do App Router. Cada rota localizada fica dentro
  de `src/app/[locale]`, incluindo início, serviços, contato e FAQ.
- `src/components`: componentes React reutilizáveis, como `Navbar`, `Footer`,
  seletor de idiomas e cards de serviço.
- `src/i18n`: configuração de rotas, navegação e carregamento de mensagens do
  `next-intl`.
- `messages`: traduções em JSON para português (`pt`), inglês (`en`), espanhol
  (`es`) e francês (`fr`).
- `public`: arquivos estáticos, como imagens e ícones, servidos diretamente
  pela aplicação.

Para localizar rapidamente um componente no VS Code, use `Ctrl+P`. Para
encontrar todos os usos de um nome como `Navbar` ou `Footer`, use
`Ctrl+Shift+F`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
