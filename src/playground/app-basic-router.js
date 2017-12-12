import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

//stateless function just to render some jsx
const ExpenseDashboardPage = () => (<div>This is from my dashboard component</div>);
const AddExpensePage = () => (<div>add expenses</div>);
const EditExpense = () => (<div>edit expenses</div>);
const HelpPage = () => (<div>help page</div>);
const NotFoundPage = () => (
		<div>
			404 Page - <a href="/">go back</a><br/>
			<Link to="/">go back without page-refresh</Link>
		</div>
);
const Header = () => (
		<header>
			<h1>Expensify</h1>
			<NavLink to="/" exact={true}>Home</NavLink>
			<NavLink to="/create">Create Expense</NavLink>
			<NavLink to="/edit">Edit Expense</NavLink>
			<NavLink to="/help">Help</NavLink>
		</header>
);

const routes = (
		/* BrowserRouter doesnt render anything, its a setup for the routes
		 * it expexts 0 or just 1 element, thats why we put the routes in a div
		 * not even comments are allowed in BrowserRouter directly
		 * set historyApiFallback in webpack
		 * */
		<BrowserRouter>
			<div>
				<Header/>
				<Switch>
					{/*
					 use Switch for looping over the routes for a match
					 use exact as / is encluded in all paths
					 */}
					<Route path="/" component={ExpenseDashboardPage} exact={true}/>
					<Route path="/create" component={AddExpensePage}/>
					<Route path="/edit" component={EditExpense}/>
					<Route path="/help" component={HelpPage}/>
					<Route component={NotFoundPage}/>
				</Switch>
			</div>
		</BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
