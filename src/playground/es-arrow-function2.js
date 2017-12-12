const add = function (a, b) {
	//arguments are available in es5
	console.log(arguments);
	return a + b;
}
console.log(add(5, 78));

const addArrow = (a, b) => {
	//arguments are not available in es6
	//console.log(arguments);
	return a + b;
}


//this keyword
const user = {
	name: 'Gabor',
	cities: ['pecs', 'nhampt'],
	printPlacesLived: function () {
		//this keyword is bound to this object so it can be accessed
		console.log(this.name);

		const that = this;
		this.cities.forEach(function (city) {
			//this.name is not working here, as it is bound to the object and not valid in this loop
			// console.log(this.name + ' has lived in ' + city);

			//workaround is to declare a const and assign the value this to it, so it can be used in the loop
			console.log(that.name + ' has lived in ' + city);
		});

		//using arrow function to be able to access the this key, arrow function doesnt bind the this key
		this.cities.forEach((city) => {
			//with arrow function the this key works
			console.log(this.name + ' has lived in ' + city);
		});
	},
	printPlacesLived2() {
		//method can be added without the :

		//map is used to loop through an array
		//function is called for each city
		//city can only be transformed -> it returns a new, manipulated array, which is crutial (state)

		/*const cityMessage = this.cities.map((city) => {
		 	return this.name + ' has lived in ' + city + '!'
		 });
		 return cityMessage;
		 */

		//es6
		return this.cities.map((city) => this.name + ' has lived in ' + city + '!');
	}
}
user.printPlacesLived();
console.log(user.printPlacesLived2());


const multiplier = {
	numbers: [1,5,6,42],
	multiplyBy: 5,
	multiply(){
		return this.numbers.map((num) => num * this.multiplyBy)
	}
}
console.log(multiplier.multiply());

