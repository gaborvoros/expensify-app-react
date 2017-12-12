class IndecisionApp extends React.Component {
	//only functions can stand here, render has to be defined!
	render() {
		const title = 'Indecision App';
		const subtitle = 'Put your life in the hands of a computer!'
		const options = ['One', 'Two', 'Three']

		return (
				<div>
					{/* we can add custom attributes to the components, which will be passed to the class */}
					<Header title={title} subtitle={subtitle}/>
					<Action />
					<Options options={options}/>
					<AddOption />
				</div>
		)
	}
}

class Header extends React.Component {
//this -> we have access to this -> it is the reference to the current instance of the component

	//render has to be defined in jsx!!!
	render() {
		//this.props contains the attribute values / properties

		//return template can be enclosed in () if its more than 1 line
		return (
				<div>
					<h1>{this.props.title}</h1>
					<h2>{this.props.subtitle}</h2>
				</div>
		)
	}
}

class Action extends React.Component {
	handlePick() {
		alert('hooo');
	}

	render() {
		return (
				<div>
					{/* this -> points to the component class instance, no () as we dont call it, just reference it */}
					<button onClick={this.handlePick}>What should I do?</button>
				</div>
		)
	}
}

class Options extends React.Component {
	//by calling the constructor we can bind this again
	//Component constructor has props by default, so we can use it
	constructor(props) {
		super(props);
		//whenever we call handleRemoveAll the context is always correct, no need to bind it anywhere else
		this.handleRemoveAll = this.handleRemoveAll.bind(this)
	}

	handleRemoveAll() {
		/*
		 this.props.options can not be accessed like in the render function as the binding is destroyed
		 calling the bind method in the onClick event allows to use the this props again
		 this means in .bind(this) the object we want to use - it can be an other one if needed
		 onClick={this.handleRemoveAll.bind(this)}
		 */
		console.log(this.props.options);
	}

	render() {
		return (
				<div>
					<button onClick={this.handleRemoveAll}>Remove All</button>
					<p>Length: {this.props.options.length}</p>
					{
						//key has to be always defined in a map
						this.props.options.map((option) => <Option key={option} optionText={option}/>)
					}
					<Option />
				</div>
		)
	}
}

class Option extends React.Component {
	render() {
		return (
				<p>{this.props.optionText}</p>
		)
	}
}

class AddOption extends React.Component {
	handleAddOption(event) {
		event.preventDefault();
		const option = event.target.elements.option.value.trim();
		if (option) {
			alert(option);
		}

	}

	render() {
		return (
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option"/>
					<button type="submit">Add Option</button>
				</form>
		)
	}
}

//jsx is the main layout and includes the components
//it can be omitted if a main component is defined - IndecisionApp - which is then rendered
/*const jsx = (
 <div>
 <Header />
 <Action />
 <Options />
 <AddOption />
 </div>
 )

 ReactDOM.render(jsx, document.getElementById('app'))*/

//render indecisionapp instead of jsx const
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))