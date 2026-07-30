/**
 * Este é o formato de cada pedaço do texto.
 *
 * Exemplo:
 * { text: "Pagamento", highlighted: true }
 *
 * Isso quer dizer:
 * - o pedaço contém a palavra "Pagamento";
 * - esse pedaço deve ficar marcado na tela.
 */
export type HighlightedTextPart = {
  // O pedaço de texto que aparecerá na tela.
  text: string;

  // true = marcar o pedaço. false = mostrar normalmente.
  highlighted: boolean;
};

/**
 * Este tipo ajuda a ligar o texto usado na busca ao texto original.
 *
 * A busca troca "Cartão" por "cartao" para facilitar a comparação.
 * Porém, na tela ainda queremos mostrar "Cartão".
 *
 * Estes três valores ajudam a encontrar a posição correta no texto original.
 */
type SearchIndex = {
  // Texto simples, sem acentos e em letras minúsculas.
  normalizedText: string;

  // Onde cada letra começa no texto original.
  originalStarts: number[];

  // Onde cada letra termina no texto original.
  originalEnds: number[];
};

/**
 * Deixa um texto mais fácil de comparar.
 *
 * Exemplos:
 * "CARTÃO" vira "cartao".
 * "Sessão" vira "sessao".
 *
 * A função só usa essa versão para pesquisar.
 * Ela não muda o texto que será mostrado para o usuário.
 */
function normalizeCharacter(character: string): string {
  return character
    // Transforma letras maiúsculas em minúsculas.
    .toLocaleLowerCase()

    // Separa a letra do acento.
    // Por exemplo: "ã" vira uma letra "a" e um sinal de acento.
    .normalize("NFD")

    // Apaga os sinais de acento que foram separados na linha anterior.
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Cria uma cópia simples do texto para fazer a busca.
 *
 * Também anota onde cada letra estava no texto original.
 * Isso permite pesquisar "sessao" e depois marcar "Sessão" na tela.
 */
function createSearchIndex(text: string): SearchIndex {
  // Aqui será montada a cópia sem acentos e em letras minúsculas.
  let normalizedText = "";

  // Estes arrays guardarão as posições das letras no texto original.
  const originalStarts: number[] = [];
  const originalEnds: number[] = [];

  // Passa por cada caractere do texto.
  for (let index = 0; index < text.length; ) {
    // Pega o número que representa o caractere atual.
    const codePoint = text.codePointAt(index);

    // Se não existir caractere nessa posição, encerra o loop.
    if (codePoint === undefined) {
      break;
    }

    // Transforma o número novamente em um caractere.
    const character = String.fromCodePoint(codePoint);

    // Cria a versão simples desse caractere.
    const normalizedCharacter = normalizeCharacter(character);

    // Descobre onde o caractere termina no texto original.
    // Alguns símbolos, como certos emojis, podem ocupar duas posições.
    const originalEnd = index + character.length;

    // Adiciona o caractere simples e salva sua posição original.
    for (const normalizedPart of normalizedCharacter) {
      normalizedText += normalizedPart;
      originalStarts.push(index);
      originalEnds.push(originalEnd);
    }

    // Vai para o próximo caractere.
    index = originalEnd;
  }

  // Entrega o texto simples e as posições que foram anotadas.
  return { normalizedText, originalStarts, originalEnds };
}

/**
 * Divide um texto em pedaços normais e pedaços que devem ser marcados.
 *
 * Exemplo:
 *
 * splitHighlightedText("Pagamento no Cartão", "cartao")
 *
 * devolve:
 *
 * [
 *   { text: "Pagamento no ", highlighted: false },
 *   { text: "Cartão", highlighted: true },
 * ]
 *
 * `text` é o texto que aparece na FAQ.
 * `query` é o que a pessoa digitou no campo de busca.
 */
export function splitHighlightedText(
  text: string,
  query: string,
): HighlightedTextPart[] {
  // Remove espaços do começo e do fim da busca.
  // Depois cria uma versão em letras minúsculas e sem acentos.
  const normalizedQuery = normalizeCharacter(query.trim());

  // Se o texto ou a busca estiverem vazios, nada deve ser marcado.
  if (text === "" || normalizedQuery === "") {
    return [{ text, highlighted: false }];
  }

  // Prepara o texto para pesquisar sem perder as posições originais.
  const { normalizedText, originalStarts, originalEnds } =
    createSearchIndex(text);

  // Aqui serão salvas todas as palavras encontradas.
  // start = onde a palavra começa.
  // end = onde a palavra termina.
  const matches: Array<{ start: number; end: number }> = [];

  // A primeira busca começa no início do texto.
  let searchFrom = 0;

  // Repete a busca para encontrar todas as vezes que a palavra aparece.
  while (searchFrom < normalizedText.length) {
    const matchIndex = normalizedText.indexOf(normalizedQuery, searchFrom);

    // -1 quer dizer que nenhuma outra palavra foi encontrada.
    if (matchIndex === -1) {
      break;
    }

    // Descobre a posição da última letra da palavra encontrada.
    const matchEndIndex = matchIndex + normalizedQuery.length - 1;

    // Salva as posições usando o texto original.
    matches.push({
      start: originalStarts[matchIndex],
      end: originalEnds[matchEndIndex],
    });

    // A próxima busca começa depois da palavra que acabou de ser encontrada.
    searchFrom = matchIndex + normalizedQuery.length;
  }

  // Se nada foi encontrado, devolve o texto inteiro sem marcação.
  if (matches.length === 0) {
    return [{ text, highlighted: false }];
  }

  // Aqui serão colocados os pedaços prontos para aparecer na tela.
  const parts: HighlightedTextPart[] = [];

  // Guarda até qual posição do texto já foi processada.
  let originalPosition = 0;

  // Passa por cada palavra encontrada.
  for (const match of matches) {
    // Se existir texto antes da palavra, adiciona esse texto sem marcação.
    if (match.start > originalPosition) {
      parts.push({
        text: text.slice(originalPosition, match.start),
        highlighted: false,
      });
    }

    // Adiciona a palavra encontrada com marcação.
    // O pedaço vem do texto original, então mantém acentos e maiúsculas.
    parts.push({
      text: text.slice(match.start, match.end),
      highlighted: true,
    });

    // Anota que o texto foi processado até o final dessa palavra.
    originalPosition = match.end;
  }

  // Se sobrou texto depois da última palavra, adiciona sem marcação.
  if (originalPosition < text.length) {
    parts.push({
      text: text.slice(originalPosition),
      highlighted: false,
    });
  }

  // Entrega todos os pedaços na ordem certa.
  return parts;
}
