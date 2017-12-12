

/************************** OBJECT DESTRUCTURING *************************/


const person = {
	name: 'Andrew',
	age: 29,
	location: {
		city: 'ph',
		temp: 32
	}
};

const {name, age} = person;
/*
* same as
* const name = person.name;
* const age = person.age;
* */

console.log(`${person.name} is ${person.age}`);

if(person.location.city && person.location.temp){
	console.log(`its ${person.location.temp} is ${person.location.city}`);
}

// we can add a default value or rename the property as a lokal variable
const {city = 'No city', temp:temperature} = person.location;
if(city && temperature){
	console.log(`its ${temperature} is ${city}`);
}


const book = {
	title: 'Ego',
	author: 'Ryan Holiday',
	publisher: {
		name: 'Penguin'
	}
};

const {name: publisherName = 'Self-published'} = book.publisher;

console.log(publisherName);


/************************** ARRAY DESTRUCTURING *************************/

const address = ['1299 Juniper Street', 'Philadelphia', 'Pennsylvania', '19465'];

console.log(`You are in ${address[0]} ${address[1]}`);

//leave out what is not needed
const [street, , state = 'default value'] = address;

console.log(`You are in ${street} ${state}`);