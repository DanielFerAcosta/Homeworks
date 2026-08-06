// at 
const myArray = [1, 2, 3, 4]
console.log (myArray.at(2))
 // R: 3

// concat 
let otros = [6, 7]

console.log (myArray.concat(otros))
// R:[1,2,3,4,5,6,7]

// constructor
let numeros = [1, 2, 3, 4]
console.log(numeros.constructor)
//R: Array


// copyWithin
const myArray = [1,2,3,4]
myArray.copyWithin(0, 2)
console.log(myArray)
// R: [3,4,3,4]

// entries
let frutas = ["Manzana", "Pera", "Piña", "Banano"]
for (let [indice, valor] of frutas.entries()){
    console.log(indice, valor)
}
//R: 0 Manzana, 1 Pera, 2 Piña, 3 Banano


//every 
let numeros = [2, 4, 6, 8]
console.log (numeros.every(n => n % 2 == 0))
//R: true

// fill
const myArray = [1,2,3,4]
myArray.fill(9)
console.log(myArray)
// R: [9,9,9,9]

//Filter
let numeros = [1,2,3,4,5];
let pares = numeros.filter(n => n % 2 == 0);
console.log(pares);
// R: [2,4]

//Find
let numeros = [3,7,9,10];

console.log(numeros.find(n => n > 8));
// R: 9

//findIndex
let numeros = [3,7,9,10];
console.log(numeros.findIndex(n => n > 8));
// R: 2

//findLast
let numeros = [2,5,8,10];

console.log(numeros.findLast(n => n % 2 == 0));
// R: 10

//findLastIndex
let numeros = [2,5,8,10];
console.log(numeros.findLastIndex(n => n % 2 == 0));
// R: 3

//flat 
let datos = [1,[2,[3]]];
console.log(datos.flat());
// R: [1,2,[3]]
console.log(datos.flat(2));
// R: [1,2,3]

//flatMap
let numeros = [1,2,3];
let resultado = numeros.flatMap(n => [n, n*2]);
console.log(resultado);
// R: [1,2,2,4,3,6]

//forEach
let frutas = ["Manzana","Pera","Uva"];
frutas.forEach(fruta => {
    console.log(fruta);
});

//includes
let frutas = ["Manzana","Pera","Uva"];
console.log(frutas.includes("Pera"));
// R: true

//indexOf 
let frutas = ["Manzana","Pera","Uva"];
console.log(frutas.indexOf("Pera"));
// R: 1

//join
let frutas = ["Manzana","Pera","Uva"];
console.log(frutas.join("-"));
// R: Manzana-Pera-Uva

//keys
let frutas = ["Manzana","Pera","Uva"];
for (let indice of frutas.keys()) {
    console.log(indice);
}
// R: 0 1 2

//lastIndexOf
let numeros = [1,2,3,2];
console.log(numeros.lastIndexOf(2));
// R: 3

//lenght
let frutas = ["Manzana","Pera","Uva"];
console.log(frutas.length);
// R: 3

//map
let numeros = [1,2,3];
let dobles = numeros.map(n => n*2);
console.log(dobles);
// R: [2,4,6]

//pop
let numeros = [1,2,3];
numeros.pop();
console.log(numeros);
// R: [1,2]

//push
let numeros = [1,2];
numeros.push(3);
console.log(numeros);
// R: [1,2,3]

//reduce 
let numeros = [1,2,3,4];
let suma = numeros.reduce((acum, n) => acum + n, 0);
console.log(suma);
// R: 10

//reduceRight
let letras = ["A","B","C"];

console.log(letras.reduceRight((a,b)=>a+b));
// R: CBA

//reverse
let numeros = [1,2,3];
numeros.reverse();
console.log(numeros);
// R: [3,2,1]

// shift 
let numeros = [1,2,3];
numeros.shift();
console.log(numeros);
// R: [2,3]

//slice 
let numeros = [1,2,3,4,5];
console.log(numeros.slice(1,4));
// R: [2,3,4]

//some 
let numeros = [1,2,3];
console.log(numeros.some(n => n > 2));
// R: true

//sort 
let numeros = [8,2,5,1];
numeros.sort((a,b)=>a-b);
console.log(numeros);
// R: [1,2,5,8]

//splice
let numeros = [1,4];
numeros.splice(1,0,2,3);
console.log(numeros);
// R: [1,2,3,4]

//toLocaleString
let numeros = [1000.5,2000.75];
console.log(numeros.toLocaleString("es-CO"));
// R: 1000,5,2000,75

//toString
let numeros = [1,2,3];
console.log(numeros.toString());
// R: "1,2,3"

//unShift
let numeros = [2,3];
numeros.unshift(1);
console.log(numeros);
// R: [1,2,3]

//values 
let frutas = ["Manzana","Pera","Uva"];
for (let fruta of frutas.values()) {
    console.log(fruta);
}
//R: Manzana Pera Uva


