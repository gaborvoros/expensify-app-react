const user = {
	name: "Gabor",
	age: 36,
	location: "Augsburg"
};

function getLocation(location) {
	if(location){
		return <p>Location: {location}</p>;
	}
}
//very handy: {user.age >= 18 && <p>Age: {user.age}</p>}
//like an if
const templateTwo = (
		<div>
			<h1>{user.name ? user.name : 'Anonymus'}</h1>
			{user.age >= 18 && <p>Age: {user.age}</p>}
			{getLocation(user.location)}
		</div>
);

let count = 0;
const addOne = () => {
	count++
	renderCounterApp()
}
const removeOne = () => {
	count--
	renderCounterApp()
}
const reset = () => {
	count = 0
	renderCounterApp()
}

const appRoute = document.getElementById('app');

const renderCounterApp = () => {
	const templateThree = (
			<div>
				<h1>Count: {count}</h1>
				<button onClick={addOne}>+1</button>
				<button onClick={removeOne}>-1</button>
				<button onClick={reset}>Reset</button>
			</div>
	);
	ReactDOM.render(templateThree, appRoute);
}
renderCounterApp();