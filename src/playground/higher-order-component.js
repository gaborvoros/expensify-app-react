/** Higher order component **/
/*
* renders an other component
* */

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
		<div>
			<h1>Info</h1>
			<p>The info is {props.info}</p>
		</div>
);

const withAdminWarning = (WrappedComponent) => {
	//this is the higher component what is returned here
	return (props) => (
			<div>
				{props.isAdmin && <p>This is private info.</p>}
				<WrappedComponent {...props}/>
			</div>
	)
}

const requireAuthentication = (WrappedComponent) => {
	//this is the higher component what is returned here
	return (props) => (
			<div>
				{props.isAuthenticated ? (
								<WrappedComponent {...props}/>
						) : (
								<p>login please</p>
						)}

			</div>
	)
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);



ReactDOM.render(<AuthInfo isAuthenticated={false} info="my info"/>, document.getElementById('app'))