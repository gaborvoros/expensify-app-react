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

export {firebase, database as default}