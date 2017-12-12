/******** Expenses *********/
/*
 * the reducers, which are registered in createStore => combineReducers, check the type
 * if the type is found in a reducer it will be executed
 * */

const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
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
