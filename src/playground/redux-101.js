import {createStore} from 'redux';

/*createStore requires 1 argument - a function
* we pass in the current state with the default values - an object,
* as the function in createStore is called immediately for the first time
*
* second argument is the action which comes from the dispatch call with the type
* store tracks the changing data
*/
const store = createStore((state = {count: 0}, action) => {
	//is fired 2 times - first with default value then with changed state
	console.log('running', action);

	/*if(action.type === 'INCREMENT'){
		//return an object with the new state value
		return {
			count: state.count + 1
		}
	}else{
		return state;
	}*/

	//more common to use a switch
	switch (action.type){
		case 'INCREMENT':
			return {
				count: state.count + 1
			}
		case 'DECREMENT':
			return {
				count: state.count - 1
			}
		case 'RESET':
			return {
				count: 0
			}
		default:
			return state;
	}

});

/* similar to above
*this.setState((prevState) => {
*	return prevState;
*});
*/

//get state value back
console.log(store.getState());


/********* ACTIONS **************/
/*
* an action is an object that gets sent to the store
* */


/*
* type has to be defined for the action object
* naming convention for type is uppercase
* for sending the action object to the store to do something with it, we use dispatch
*/
store.dispatch({
	type: 'INCREMENT'
});
store.dispatch({
	type: 'INCREMENT'
});
console.log(store.getState());

//decrement count
store.dispatch({
	type: 'DECREMENT'
});
console.log(store.getState());

//reset count
store.dispatch({
	type: 'RESET'
});
console.log(store.getState());