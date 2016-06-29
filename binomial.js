// Um apelido para a função de potência
const pow = Math.pow;

// Definição da função fatorial recursiva
let fact = n =>
	n <= 1 ?
		1 :
		n * fact(n - 1);

// Definição da combinação
let combination = (n, p) =>
	fact(n) / (fact(p) * fact(n - p));

// Gera uma lista de `n` elementos começando por 0
let range = (n) =>
	Array.from(Array(n + 1), (_, i) => i);

// Dado um espaço amostral e uma probabilidade de eventos favoráveis,
// returna uma função P(x) onde `x` é o número de sucessos desejados. 
function binomial(space, p) {
	return x => combination(space, x) * pow(p, x) * pow(1 - p, space - x);
}

// Dado um espaço amostral e uma probabilidade de eventos favoráveis `p`,
// retorna uma função P(g(x)) onde g(x) é uma função de filtro definindo uma
// família de número de eventos favoráveis.
// Exemplo
// poisson(10, 0.1)(x => x >= 5)
// Retorna o somatório de todas as probabilidades favoráveis de eventos de
// `x` tal que x = {5 <= x <= 10}
function poisson(space, p) {
	return filterFn =>
		range(space)
			.filter(filterFn)
			.map(binomial(space, p))
			.reduce((acc, x) => acc + x);
}

// Em uma rodovia, toda semana há 5 desastres.

// Primeira questão:
// Qual a probabilidade de acontecerem entre segunda e sábado? 
// Nota: dado que a contagem começa do 0 supõe-se 0 como domingo.
console.log(poisson(7, 5 / 7)(x => x >= 1 && x <= 6));
// =~ 90.49%

// Segunda questão:
// Qual a probabilidade de acontecerem nos primeiros 4 dias
console.log(poisson(7, 5 / 7)(x => x <= 3));
// =~ 10.82%
