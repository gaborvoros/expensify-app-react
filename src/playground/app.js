class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOptionSingular = this.handleDeleteOptionSingular.bind(this);
		//using default values for options -> at the end of the class definition
		this.state = {
			options: props.options
		};
	}

	//livecycle component will be fired automatically, available in class based components only
	componentDidMount() {
		try {
			//get saved data from localstorage
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
			if (options) {
				this.setState(() => {
					return {
						options: options
					}
				});
			}
		} catch (e) {
			//do nothing
		}

	}

	componentDidUpdate(prevProps, prevState) {
		//only if the length has been changed -> was added / deleted
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			//saving stuff in browsers localstorage
			localStorage.setItem('options', json);
		}
	}

	handleDeleteOptions() {
		/*this.setState(() => {
		 *	return {
		 *		options: []
		 *	}
		 *});*/
		//es6
		this.setState(() => ({options: []}));
	}

	handleDeleteOptionSingular(optionToRemove) {
		this.setState((prevState) => {
			return {
				options: prevState.options.filter((option) => {
					//using filter to create a new array with the elements which are not the same as optionToRemove
					//resulting in, that optionToRemove is not included in the new array
					return optionToRemove !== option
				})
			}
		});
	}

	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		alert(option);
	}

	handleAddOption(option) {
		if (!option) {
			return 'Enter valid value';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists'
		}

		this.setState((prevState) => {
			//dont manipulate the original array,
			//make a new array with concat which takes the old values and adds the new options by creating a new array
			return {
				options: prevState.options.concat(option)
			}
		})
	}

	render() {
		const title = 'Indecision App';
		const subtitle = 'Put your life in the hands of a computer!'

		return (
				<div>
					<Header title={title} subtitle={subtitle}/>
					<Action
							hasOptions={this.state.options.length > 0}
							handlePickAction={this.handlePick}
					/>
					{/*
					 handleDeleteOptions is defined in the top class and
					 can manipulate the state as we pass it as a prop to the Options class
					 */}
					<Options
							options={this.state.options}
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOptionSingular={this.handleDeleteOptionSingular}
					/>
					<AddOption
							handleAddOption={this.handleAddOption}
					/>
				</div>
		)
	}
}

IndecisionApp.defaultProps = {
	options: []
}
const Header = (props) => {
	return (
			<div>
				<h1>{props.title}</h1>
				<h2>{props.subtitle}</h2>
			</div>
	)
}
//define default values after the function or class, it can be used if values are not provided
Header.defaultProps = {
	title: 'some default tile'
}

const Action = (props) => {
	return (
			<div>
				<button
						onClick={props.handlePickAction}
						disabled={!props.hasOptions}>
					What should I do?
				</button>
			</div>
	)
}


/*
 *class Options extends React.Component {
 *	render() {
 *		return (
 *				<div>
 *				 //handleDeleteOptions comes from the top class IndecisionApp
 *             //so it can manipulate the state defined in the constructor
 *					<button onClick={this.props.handleDeleteOptions}>Remove All</button>
 *					<p>Length: {this.props.options.length}</p>
 *					{
 *						this.props.options.map((option) => <Option key={option} optionText={option}/>)
 *					}
 *					<Option />
 *				</div>
 *		)
 *	}
 *}
 */

const Options = (props) => {
	return (
			<div>
				<button onClick={props.handleDeleteOptions}>Remove All</button>
				<p>Length: {props.options.length}</p>
				{props.options.length === 0 && <p>Please add an option to get started</p>}
				{
					props.options.map((option) => (
							<Option
									key={option}
									optionText={option}
									handleDeleteOptionSingular={props.handleDeleteOptionSingular}
							/>
					))
				}
			</div>
	)
}

const Option = (props) => {
	return (
			<div>
				{props.optionText}
				<button
						onClick={(e) => {
							props.handleDeleteOptionSingular(props.optionText);
						}}
				>
					remove
				</button>
			</div>

	)
}

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this)
		//this state is not the top class state
		this.state = {
			error: undefined
		}
	}

	handleAddOption(event) {
		event.preventDefault();
		const option = event.target.elements.option.value.trim();

		//this handleAddOption comes from the parent and has to be bind in the constructor
		const error = this.props.handleAddOption(option);

		this.setState(() => ({error}));

		if(!error){
			event.target.elements.option.value = '';
		}

	}

	render() {
		return (
				<div>
					{this.state.error && <p>{this.state.error}</p>}
					<form onSubmit={this.handleAddOption}>
						<input type="text" name="option"/>
						<button type="submit">Add Option</button>
					</form>
				</div>
		)
	}
}


//stateless component - can take arguments from the properties
//faster than class based components
/*
 * const User = (props) => {
 *   return (
 *      <div>
 *        <p>Name: {props.name}</p>
 *        <p>Age: </p>
 *      </div>
 *    )
 * }
 */
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))