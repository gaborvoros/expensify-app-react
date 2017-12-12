"use strict";

var user = {
	name: "Gabor",
	age: 36,
	location: "Augsburg"
};

function getLocation(location) {
	if (location) {
		return React.createElement(
			"p",
			null,
			"Location: ",
			location
		);
	}
}
//very handy: {user.age >= 18 && <p>Age: {user.age}</p>}
//like an if
var templateTwo = React.createElement(
	"div",
	null,
	React.createElement(
		"h1",
		null,
		user.name ? user.name : 'Anonymus'
	),
	user.age >= 18 && React.createElement(
		"p",
		null,
		"Age: ",
		user.age
	),
	getLocation(user.location)
);

var count = 0;
var addOne = function addOne() {
	count++;
	renderCounterApp();
};
var removeOne = function removeOne() {
	count--;
	renderCounterApp();
};
var reset = function reset() {
	count = 0;
	renderCounterApp();
};

var appRoute = document.getElementById('app');

var renderCounterApp = function renderCounterApp() {
	var templateThree = React.createElement(
		"div",
		null,
		React.createElement(
			"h1",
			null,
			"Count: ",
			count
		),
		React.createElement(
			"button",
			{ onClick: addOne },
			"+1"
		),
		React.createElement(
			"button",
			{ onClick: removeOne },
			"-1"
		),
		React.createElement(
			"button",
			{ onClick: reset },
			"Reset"
		)
	);
	ReactDOM.render(templateThree, appRoute);
};
renderCounterApp();