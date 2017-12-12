import React from 'react';
//ExpenseList can be imported as it is connected
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
		<div>
			<ExpenseListFilters/>
			<ExpenseList/>
		</div>
);

export default ExpenseDashboardPage;