export function normalizeText(text: string): string {

  console.log("Valor atual: ", text);
  console.log("Remove espaços do inicio e do fim: ", text.trim());
  console.log("Valor minusculo: ", text.toLowerCase());
  console.log("Valor maiusculo: ", text.toUpperCase());
  console.log("Troca S maiusculo por X: ", text.replace("S", " "));
  console.log("Troca s minusculo por Y: ", text.replace("s", "     ").replace(/\s+/g, " "));
  console.log("Troca todas as letras S por X: ", text.replaceAll("S", "X"));
  console.log("Troca todas as s minusculas por Y: ", text.replaceAll("s", "Y"));
  console.log("Divide a string em um array de strings: ", text.split("de"));

  let calculo = 0;
  const calculo2 = 10;

  console.log("Valor do calculo: ", calculo);
  console.log("Valor do calculo2: ", calculo2);

  console.log(`Valor do calculo ${calculo} + 10 = ${calculo + 10}`);
  console.log(`Valor do calculo2 ${calculo2} + 10 = ${calculo2 + 10}`);

  calculo = 20 * 5;

  console.log(`Valor do calculo ${calculo} + 10 = ${calculo + 10}`);


  if(text === '' || text === ' ') {
    return 'false';
  }

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

//string == text
//int == inteiro 1,2,4,10,50... 
//float == 1.5
//decimal == 1.5
//boolean == true or false

// toLowerCase() -> transforma todas as letras em minúsculas
// toUpperCase() -> transforma todas as letras em maiúsculas
// replace() -> substitui uma parte da string por outra
// replaceAll() -> substitui todas as partes da string por outra
// trim() -> remove espaços em branco do início e do fim da string
// split() -> divide uma string em um array de strings
