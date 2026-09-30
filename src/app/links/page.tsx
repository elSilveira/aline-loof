export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#181818] text-[#f5f0e8] px-5 py-12">
      <div className="mx-auto max-w-3xl text-center">

        <header className="mb-10">
          <h1 className="text-5xl font-serif">
            Aline Loof
          </h1>

          <p className="mt-2 text-xs tracking-[0.4em] text-[#c49a2c]">
            CONSULTORA DE IMAGEM
          </p>
        </header>

        <p className="mx-auto mb-10 max-w-xl leading-7 text-[#cfc9bf]">
          Consultoria de imagem para transformar a forma como você se vê,
          se veste e se apresenta ao mundo.
        </p>

        <div className="flex flex-col gap-4">

          <a
            href="https://wa.me/55SEUNUMERO"
            target="_blank"
            className="bg-[#c49a2c] px-6 py-5 text-xs font-semibold tracking-[0.25em] text-black transition hover:bg-[#d6af45]"
          >
            AGENDE SUA CONSULTORIA
          </a>

          <a
            href="/servicos"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            CONHEÇA MEUS SERVIÇOS
          </a>

          <a
            href="/eventos"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            CONSULTORIA PARA EVENTOS
          </a>

          <a
            href="/sobre"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            SOBRE ALINE LOOF
          </a>

          <a
            href="/cema"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            CEMA
          </a>

          <a
            href="https://instagram.com/SEUINSTAGRAM"
            target="_blank"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            INSTAGRAM
          </a>

          <a
            href="https://wa.me/55SEUNUMERO"
            target="_blank"
            className="border border-[#aaa49b] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#c49a2c] hover:bg-[#c49a2c] hover:text-black"
          >
            FALE COMIGO NO WHATSAPP
          </a>

        </div>

        <p className="mt-10 text-[10px] tracking-[0.2em] text-[#777]">
          ALINE LOOF · CONSULTORIA DE IMAGEM
        </p>

      </div>
    </main>
  );
}