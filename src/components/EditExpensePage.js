import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.editExpense(this.props.expense.id, expense);
		//redirect to home after dispatch
		this.props.history.push('/')
	}

	onReamove = () => {
		//props is destructed so use {id} instead of id
		this.props.removeExpense({id: this.props.expense.id})
		this.props.history.push('/')
	}

	render() {
		return (
				<div>
					<p>edit expenses: {this.props.match.params.id}</p>
					<ExpenseForm
							expense={this.props.expense}
							onSubmit={this.onSubmit}
					/>
					<button onClick={this.onReamove}>
						Remove
					</button>
				</div>
		)
	}
}

//we have access to the store with connect, so we can access state and props
const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => {
			//if they match
			return expense.id === props.match.params.id
		})
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	editExpense: (id, expense) => dispatch(editExpense(id, expense)),
	removeExpense: (data) => dispatch(removeExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);