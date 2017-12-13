//get all named exports and dump them into the variable firebase
import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyA1G8_xn72eVmwzPe9973yox-Yyd51kQTo",
	authDomain: "expensify-237a9.firebaseapp.com",
	databaseURL: "https://expensify-237a9.firebaseio.com",
	projectId: "expensify-237a9",
	storageBucket: "expensify-237a9.appspot.com",
	messagingSenderId: "1048314112327"
};

firebase.initializeApp(config);

const database = firebase.database();

//firebase takes entries as objects
//using promise inside set -> then -> catch (If error)
database.ref().set({
	name: 'Gabor',
	age: 36,
	isSingle: false,
	stressLevel: 5,
	job: {
		title: 'Developer',
		company: 'Google'
	},
	location: {
		city: 'Augsburg',
		zip: 86153
	}
}).then(() => {
	console.log('data saved')
}).catch((e) => {
	console.log('error: ', e)
})



/*
 * firebase.database
 * getting database related features - accessing the database
 *
 *
 * .ref()
 * referencing a specific part of the database, store and get data from there
 * without arguments its referencing the root of the database
 *
 *
 * .set()
 * set is called upon a reference
 * it usually takes an object but it can take anything
 * if called again, it overrides the previous one!!!
 *
 * firebase.database().ref().set({
 *    age: 38
 * })
 * would override the previous object entirely, everything else is deleted!
 * .ref() needs an argument to override just the property + in set the new value
 *
 * firebase is asynchronous!!!
 *
 * methods: value, child_removed, child_changed
 *
 * */

/*database.ref('age').set(38)
 database.ref('location/city').set('München')*/
/*
 database.ref('attributes').set({
 height: 180,
 weight: 98
 }).then(() => {
 console.log('it worked')
 }).catch((e) => {
 console.log('it didnt worked', e)
 })*/

/*database.ref('isSingle')
 .remove()
 .then(() => {
 console.log('removed')
 }).catch((e) => {
 console.log('error', e)
 })*/

//update needs to be called with an object, new data can be added as well
//it only updates on root level, nested objects are wiped!!!
/*database.ref().update({
 name: 'Mike',
 age: 29,
 job: 'Developer',
 isSingle: null,
 'location/city': 'Boston'
 })*/

database.ref().update({
	stressLevel: 9,
	'job/company': 'Amazon',
	'location/city': 'Seattle'
}).then(() => {
	console.log('updated successfully')
}).catch((e) => {
	console.log('error', e)
})


//fetch data from database only 1 time
//ref can have an argument about which property to fetch, like 'location'
database
 .ref()
 .once('value')
 .then((snapshot) => {
 //snapshot has all data
 const val = snapshot.val()
 console.log(val)
 }).catch((e) => {
 console.log('error fetching data', e)
 })

//fire if data is changing in the database
//there is no promise, as it is running constantly
//with ref we can watch only a property change like 'location', so its possible to have multiple watchers on multiple properties
// .on(type, snapshot, error)
database.ref().on('value', (snapshot) => {
	console.log(snapshot.val())
}, (e) => {
	console.log(e)
})

// with .off() the listener can be unsubscribed

//creates a new entry, creates a unique id by default
database.ref('notes').push({
 title: 'first',
 body: 'sadasd'
 })

database.ref('notes/-L0F6nAJe0yHqzNL-_Zj').update({
	body: 'updated body'
})

//child_removed fires when a child is deleted from expenses
database.ref('expenses').on('child_removed', (snapshot) => {
	console.log(snapshot.key, snapshot.val())
})

//child_changed fires when a child is changed in expenses
database.ref('expenses').on('child_changed', (snapshot) => {
	console.log(snapshot.key, snapshot.val())
})

//child_added fires one time for each existing children + for all new ones
database.ref('expenses').on('child_added', (snapshot) => {
	console.log(snapshot.key, snapshot.val())
})