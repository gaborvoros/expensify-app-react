import {createStore} from 'redux';

// Action generators - functions that return action objects
//payload default value can be an empty object
/*const incrementCount = (payload = {}) => {
*	return {
*		type: 'INCREMENT',
*		incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
*	}
*}
*/

//destructuring the payload and adding a default value
const incrementCount = ({incrementBy = 1} = {}) => {
	return {
		type: 'INCREMENT',
		//incrementBy : incrementBy
		incrementBy
	}
}

const decrementCount = ({decrementBy = 1} = {}) => {
	return {
		type: 'DECREMENT',
		decrementBy
	}
}

const resetCount = () => {
	return {
		type: 'RESET'
	}
}

//count is required so there is no need for a default value
const setCount = ({count}) => {
	return {
		type: 'SET',
		count
	}
}


/************* REDUCER ***************/
/*
* 1. reducers are pure functions - they dont take anything from outside (vars, data etc), just the state and the action,
*    it doesnt interact with anything outside of its scope, like manipulating variables, objects etc
* 2. never change state or action - dont reassign the value - return an object which represents the new state
* */

const countReducer = (state = {count: 0}, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				//we can access incrementBy from incrementCount( {payload} ) -> which was actually the payload
				count: state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
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

}

// createStore is called a reducer, argument without ()
const store = createStore(countReducer);

console.log(store.getState(), 'default');


const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy:5}));

store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({decrementBy:10}));

store.dispatch(setCount({count:150}));



