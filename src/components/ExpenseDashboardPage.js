import React from 'react';
//ExpenseList can be imported as it is connected
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary'

const ExpenseDashboardPage = () => (
		<div>
			<ExpensesSummary/>
			<ExpenseListFilters/>
			<ExpenseList/>
		</div>
);

export default ExpenseDashboardPage;