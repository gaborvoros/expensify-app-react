import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Header = () => (
		<header>
			<h1>Expensify</h1>
			<NavLink to="/" exact={true}>Home</NavLink>
			<NavLink to="/create">Create Expense</NavLink>
			<NavLink to="/help">Help</NavLink>
		</header>
);

export default Header;