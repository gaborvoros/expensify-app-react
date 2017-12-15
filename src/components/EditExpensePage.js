import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense);
		//redirect to home after dispatch
		this.props.history.push('/')
	}

	onRemove = () => {
		//props is destructed so use {id} instead of id
		this.props.startRemoveExpense({id: this.props.expense.id})
		this.props.history.push('/')
	}

	render() {
		return (
				<div>
					<div className="page-header">
						<div className="content-container">
							<h1 className="page-header__title">Edit Expense</h1>
						</div>
					</div>
					<div className="content-container">
						<ExpenseForm
								expense={this.props.expense}
								onSubmit={this.onSubmit}
						/>
						<button className="button button--secondary" onClick={this.onRemove}>
							Remove Expense
						</button>
					</div>
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
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
	startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);