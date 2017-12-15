import React from 'react';
//connect connects the component to the store
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//connect allows to read from the store
//ExpenseList has access in props to name:Andrew as it is connected to store and a custom key-value is added in return object
export const ExpenseList = (props) => (
		<div className="content-container">
			<div className="list-header">
				<div className="show-for-mobile">Expenses</div>
				<div className="show-for-desktop">Expense</div>
				<div className="show-for-desktop">Amount</div>
			</div>
			<div className="list-body">
				{
					props.expenses.length === 0 ? (
									<div className="list-item list-item--message"><span>No expenses</span></div>

							) : (
									props.expenses.map((expense) => {
										return <ExpenseListItem {...expense} key={expense.id}/>
									})
							)
				}
			</div>
		</div>
)


/*
 * higher order component
 * provide the info what we want to connect, not all infos from the store is needed, provide only those which are used
 * the stores state is passed in as argument
 *
 * now ExpenseList component has access to name:Andrew and can be accessed in the props
 *
 * connect(function to access necessary store infos)(component which is using store infos)
 * */

/*export default connect((state) => {
 *	//what information the component should access from the store comes into this function
 *	//store state is passed in as argument
 *	//anything can be returned back, not only the stores state
 *
 *	return {
 *		name: 'Andrew',
 *		expenses: state.expenses //getting store state and assigning it to expenses
 *	}
 *})(ExpenseList);
 */

//same as above, we put the function in a separate const, convention called mapStateToProps
/*const mapStateToProps = (state) => {
 *	return {
 *		expenses: state.expenses,
 *		filters: state.filters
 *	}
 *}
 */

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
}

export default connect(mapStateToProps)(ExpenseList);