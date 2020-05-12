let faker = require('faker');

let total = 0
console.log("\n=========================================================")
console.log("                     listProducts                        ")
console.log("=========================================================\n")
for(let i = 0; i < 10 ; i++ ){
	let p = faker.commerce.price();
	console.log(faker.commerce.productName() + "\t=\t" + p)
	total = total = p
}
console.log("\nTotal\t=\t" + total + "\n")