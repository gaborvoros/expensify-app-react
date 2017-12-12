import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
		<div>
			404 Page - <a href="/">go back</a><br/>
			<Link to="/">go back without page-refresh</Link>
		</div>
);

export default NotFoundPage;