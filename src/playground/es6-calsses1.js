class Person {
	//default value can be defined, constructor is called each time
	constructor(name = 'Anonymus', age = 0) {
		this.name = name;
		this.age = age;
	}

	getGreeting() {
		//return 'Hi ' + this.name;

		//es6
		return `Hi I'm ${this.name}.`
	}

	getDescription() {
		return `${this.name} is ${this.age} years old.`
	}
}

//creating a subclass
class Student extends Person{
	//we override the constructor
	constructor(name = 'Anonymus', age = 0, major) {
		//name and age are already defined, so there is no need to define again
		/*this.name = name;
		this.age = age;*/

		//call parent classes constructor and add a new property
		super(name, age);
		this.major = major;
	}

	hasMajor() {
		// !! -> flip it 2 times so if there is no value provided it ends up as false and not undefined
		return !!this.major;
	}

	//override the method from the parent class
	getDescription() {
		//its also possible to call the return value of the method with super from the parent class
		let description = super.getDescription();

		if(this.hasMajor()){
			description += ` Their major is ${this.major}.`
		}

		return description
	}
}

class Traveler extends Person {
	constructor(name, age, homeLocation) {
		super(name, age);
		this.homeLocation = homeLocation;
	}

	getGreeting() {
		let home = super.getGreeting();

		//homeLocation has no default value in the constructor so there is no need for a flipping function
		if(this.homeLocation){
			home += ` I'm visiting from ${this.homeLocation}`
		}
		return home
	}

}

const me = new Student('Gabor Vörös', 36, 'React');
console.log(me);
console.log(me.getDescription());

const other = new Student();
console.log(other);
console.log(other.getDescription());

const trav1 = new Traveler('John Doe', 34, 'Pecs');
console.log(trav1.getGreeting());

const trav2 = new Traveler('John Doe');
console.log(trav2.getGreeting());