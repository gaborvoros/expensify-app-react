import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

/******** Actions **********/
//destructing theobject
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => {
	return {
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(), //generate unique id
			description,
			note,
			amount,
			createdAt
		}
	}
}

//desctruct the object what is passed in - id ///// { id: expense3.expense.id }
const removeExpense = ({id} = {}) => {
	return {
		type: 'REMOVE_EXPENSE',
		id
	}
}

const editExpense = (id, updates) => {
	return {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
}

const setTextFilter = (text = '') => {
	return {
		type: 'SET_TEXT_FILTER',
		text
	}
}

const sortByAmount = () => {
	return {
		type: 'SORT_BY_AMOUNT'
	}
}

const sortByDate = () => {
	return {
		type: 'SORT_BY_DATE'
	}
}

const setStartDate = (startDate = undefined) => {
	return {
		type: 'SET_START_DATE',
		startDate
	}
}

const setEndDate = (endDate = undefined) => ({
	type: 'SET_END_DATE',
	endDate
})

/******** Expenses *********/
/*
 * the reducers, which are registered in createStore => combineReducers, check the type
 * if the type is found in a reducer it will be executed
 * */

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			//create new array from the old one + add new values => concat
			//as demoState.expenses is an array, we create a new array
			//return state.concat(action.expense);

			//es6 => get old array, add new value to it -> return back a new array
			return [...state, action.expense];

		case 'REMOVE_EXPENSE':
			//using filter to remove an item
			//filter uses a function
			//the array expenses is used (demoState.expenses) so the return value can be expense
			return state.filter(({id}) => {
				return id !== action.id
			});

		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				//if the id matches
				if (expense.id === action.id) {

					// return new object
					// take the properties from the old object
					// override all properties which were submitted in editExpense -> updates argument
					// !!! needs a babel plugin !!!
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense
				}
			});
		default:
			return state;
	}
};

/*********** Filters *********/

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			}
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			}
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			}
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state;
	}
};


//get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	})
}


// Store creation
// combineReducers - combines reducers and takes an object (key: reducerName) as argument
// the reducers are then registered
// we basically build up the same layout as in demoStore to be able to change the states seaparately on expenses and filters
const store = createStore(combineReducers({
	expenses: expensesReducer,
	filters: filtersReducer
}));

//watch for changes
store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

//dispatch can also return the object which was created
const expense1 = store.dispatch(addExpense({description: 'rent', amount: 100, createdAt: 100}));
const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 35, createdAt: -150}));
const expense3 = store.dispatch(addExpense({description: 'Book', amount: 150, createdAt: 14562}));

//use the last created item, and delete it / by ID
/*store.dispatch(removeExpense({id: expense3.expense.id}));

 store.dispatch(editExpense(expense2.expense.id, {amount: 435}));

 store.dispatch(setTextFilter('rent'));

 store.dispatch(sortByAmount());

 store.dispatch(sortByDate());

 store.dispatch(setStartDate(125));
 store.dispatch(setStartDate());

 store.dispatch(setEndDate(1215));
 */
store.dispatch(sortByAmount());

const demoState = {
	expenses: [{
		id: 'sdfsdfsdf',
		description: 'January rent',
		note: 'This was the final payment for that address',
		amount: 54500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'date', //date, amount
		startDate: undefined,
		endDate: undefined
	}

};