import {createStore} from 'redux';

const store = createStore((state = {count: 0}, action) => {
	switch (action.type) {
		case 'INCREMENT':

			//check if there was an optional property added and use it, otherwise use 1
			const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;

			return {
				count: state.count + incrementBy
			}
		case 'DECREMENT':
			const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
			return {
				count: state.count - decrementBy
			}
		case 'SET':
			return {
				count: action.count
			}
		case 'RESET':
			return {
				count: 0
			}
		default:
			return state;
	}

});

console.log(store.getState(), 'default');

/*
 *
 * this function is called by default every time a change is done to the store - like watch
 *
 *
 * store.subscribe(() => {
 *   console.log(store.getState());
 * });
 *
 *
 * if we assign it to a variable and call it later, all the following dispatch methods will be omitted,
 * the state is still changing but we are not notified!!!
 */

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

// additional properties can be added - optional
store.dispatch({
	type: 'INCREMENT',
	incrementBy: 5
});

// all the following dispatch methods are omitted, the state is still changing but we are not notified!!!
// unsubscribe();

store.dispatch({
	type: 'INCREMENT'
});

//decrement count
store.dispatch({
	type: 'DECREMENT',
	decrementBy: 10
});

//reset count
store.dispatch({
	type: 'RESET'
});

//set
store.dispatch({
	type: 'SET',
	count: 101
});



