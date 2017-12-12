
const app = {
	title: 'Indecision app',
	subtitle: 'Put your life in the hands of a computer',
	options: []
};

//call this function in form without (), so like {onFormSubmit}, otherwise it will want to return back a value -> undefined
const onFormSubmit = (event) => {
	event.preventDefault();
	const option = event.target.elements.option.value;

	if(option){
		//add it to option
		app.options.push(option);
		//clear form
		event.target.elements.option.value = '';
		render();
	}
	console.log(app.options);
}

const removeAll = () => {
	app.options = [];
	render();
}


const appRoute = document.getElementById('app');

const onMakeDecision = () => {
	//generate random number - between 0 and the length of the array
	const randomNum = Math.floor(Math.random() * app.options.length);

	//pull some item from the options randomly based of the random number generated
	const option = app.options[randomNum];
	alert(option);
}

const render = () => {
	const template = (
			<div>
				<h1>{app.title}</h1>
				{app.subtitle && <p>{app.subtitle}</p>}
				<p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
				{/* if there is nothing in the list, disable the button*/}
				<button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
				<button onClick={removeAll}>Remove All</button>
				<ol>
					{
						//map and array needs to be used as objects are not working here
						/*app.options.map((option) => {
						 return <li key={option}>{option}</li>
						 })*/
						//es6
						app.options.map((option) => <li key={option}>{option}</li>)
					}
				</ol>
				<form onSubmit={onFormSubmit}>
					<input type="text" name="option"/>
					<button type="submit">Add Option</button>
				</form>
			</div>
	);
	ReactDOM.render(template, appRoute);
}
render() 