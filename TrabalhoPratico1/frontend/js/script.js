let recipes = [];

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

async function start() {
  const resources = await fetch('http://localhost:3001/recipes');
  const json = await resources.json();
  recipes = json;

  const answers = [];

  answers.push(question01());
  answers.push(question02());
  answers.push(question03());
  answers.push(question04());
  answers.push(question05());
  answers.push(question06());
  answers.push(question07());
  answers.push(question08());
  answers.push(question09());
  answers.push(question10());

  for (const [index, answer] of answers.entries()) {
    const style =
      index % 2 === 0
        ? 'backgroundColor: black; color: white'
        : 'backgroundColor: black; color: orange';

    console.log(
      `%c Questão ${(index + 1).toString().padStart(2, '0')}: ${answer}`,
      style
    );
  }
}

function question01() {
  /**
   * Questão 01: Quantas descrições existem ao todo?
   */
  return recipes.length;
}

function question02() {
  /**
   * Questão 02: Qual é a média de preços das descrições?
   */
  var sum=0;

  for(var i=0; i < recipes.length; i++){
    var currentRecipe = recipes[i];
    sum += currentRecipe.price;
    }
  return moneyFormatter.format(sum / question01());
}

function question03() {
  /**
   * Questão 03: Qual é a receita mais cara e o seu preço?
   * Dica 01: formate o número obtido com o moneyFormatter, declarado
   * no início deste arquivo
   */
  const sortedRecipes =[...recipes].sort((a, b) => b.price - a.price);
  const {title, price} = sortedRecipes[0];
 
  return `${title} | ${moneyFormatter.format(price)}`;
}

function question04() {
  /**
   * Questão 04: Qual é a receita que possui mais ingredientes? Mostre também a
   * quantidade de ingredientes desta receita
   */
  const sortedRecipes =[...recipes].sort((a, b) => b.ingredients.length - a.ingredients.length);
  const {title, ingredients} = sortedRecipes[0];
 
  return `${title} | ${ingredients.length}`;  
}

function question05() {
  /**
   * Questão 05: Liste todos os ingredientes distintos considerando todas
   * as receitas. Liste os ingredientes separados por ', '.
   * Dica 01: pesquise por array.flat()
   * Dica 02: pesquise por array.join()
   * Dica 03: pesquise por Set em JavaScript e faça a re-conversão
   * para array com Array.from
   */
  const allIngredients = recipes.map(recipe => recipe.ingredients).flat();
  const uniqueIngredients = Array.from(new Set(allIngredients)).sort();
  return uniqueIngredients.join(', ');
}

function question06() {
  /**
   * Questão 06: existe algum ingrediente que aparece em todas as receitas?
   * Em caso afirmativo, informe-o(os).
   * Dica 01: reaproveite funções já implementadas
   * Dica 02: utilize array.every
   * Dica 03: utilize arrey.forEach
   * Dica 04: pesquise pelo método array.includes
   * Dica 05: pesquise pelo método array.split
   */
   const uniqueIngredients = question05().split(', ');
   const ingredientsOfEvertRecipe = [];

   uniqueIngredients.forEach(ingredients => {
     if (recipes.every(recipe => recipe.ingredients.includes(ingredients))){
       ingredientsOfEvertRecipe.push(ingredients);
     }
   })
return ingredientsOfEvertRecipe;
}

function question07() {
  /**
   * Questão 07: Quantas receitas possuem "uva" como ingrediente?
   * Dica 01: pesquise pelo método array.includes
   */
  const filter = recipes.filter(recipe => recipe.ingredients.includes('uva'));
  return filter.length;
}

function question08() {
  /**
   * Questão 08: Quantas receitas possuem "abóbora" e "aveia" como ingredientes?
   * Dica 01: pesquise pelo método array.includes
   */
   const filter = recipes.filter(({ingredients}) =>
   ingredients.includes('aveia') && ('abóbora'))
  return filter.length;
}

function question09() {
  /**
   * Questão 09: Um determinado cliente quer comprar 2 itens de cada receita
   * que contenha "calabresa" com ingrediente. Quanto ele vai pagar?
   */
   let itemA = 'calabresa';
   let counter = null;
   let priceArray = [];
   let addingPrice = 0;
   let doublePriceFix = 0;
 
   for (let index = 0; index < recipes.length; index++) {
     let buscaIndex = recipes[index].ingredients;
     if (buscaIndex.includes(itemA)) {
       let indexPrice = recipes[index].price;
       priceArray.push(indexPrice);
     }
   }
 
   for (let i = 0; i < priceArray.length; i++) {
     addingPrice = addingPrice + priceArray[i]; 
   }
 
   doublePriceFix = moneyFormatter.format(addingPrice.toFixed(2) * 2);
   return doublePriceFix;
}

function question10() {
  /**
   * Questão 10: Qual seria o faturamento bruto mensal se fossem vendidos,
   * durante um mês, 3 itens de cada receita?
   */
  let priceArray = [];
  let addingPrice = 0;
  let triplePriceFix = 0;

  for (let index = 0; index < recipes.length; index++) {
    let indexPrice = recipes[index].price;
    priceArray.push(indexPrice);
  }

  for (let i = 0; i < priceArray.length; i++) {
    addingPrice = addingPrice + priceArray[i]; 
  }

  triplePriceFix = moneyFormatter.format(addingPrice.toFixed(2) * 3);
  return triplePriceFix;
}

start();
