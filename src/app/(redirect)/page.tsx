/**
 * Root page: performs a static meta-refresh redirect to the default locale.
 * Needed because middleware is not available in static export (output: 'export').
 */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/pt/" />
      <link rel="canonical" href="https://alineloof.com/pt/" />
      <p>Redirecionando… / Redirecting…</p>
    </>
  );
}
