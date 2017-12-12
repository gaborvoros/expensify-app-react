import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'

export const ExpenseSummary = ({expenseCount, expensesTotal}) => {
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
	const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00')
	return (
			<div>
				<h1>Viewng {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
			</div>
	)
}