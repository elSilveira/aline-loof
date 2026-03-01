/**
 * Root page: performs a static meta-refresh redirect to the default locale.
 * Needed because middleware is not available in static export (output: 'export').
 */
export default function RootPage() {
  return (
    <html lang="pt">
      <head>
        <meta httpEquiv="refresh" content="0; url=/aline-loof/pt/" />
        <link rel="canonical" href="/aline-loof/pt/" />
        <title>Aline Loof</title>
      </head>
      <body>
        <p>Redirecionando… / Redirecting…</p>
      </body>
    </html>
  );
}
