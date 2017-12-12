'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp(props) {
		_classCallCheck(this, IndecisionApp);

		var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

		_this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
		_this.handlePick = _this.handlePick.bind(_this);
		_this.handleAddOption = _this.handleAddOption.bind(_this);
		_this.handleDeleteOptionSingular = _this.handleDeleteOptionSingular.bind(_this);
		//using default values for options -> at the end of the class definition
		_this.state = {
			options: props.options
		};
		return _this;
	}

	//livecycle component will be fired automatically, available in class based components only


	_createClass(IndecisionApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			try {
				//get saved data from localstorage
				var json = localStorage.getItem('options');
				var options = JSON.parse(json);
				if (options) {
					this.setState(function () {
						return {
							options: options
						};
					});
				}
			} catch (e) {
				//do nothing
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			//only if the length has been changed -> was added / deleted
			if (prevState.options.length !== this.state.options.length) {
				var json = JSON.stringify(this.state.options);
				//saving stuff in browsers localstorage
				localStorage.setItem('options', json);
			}
		}
	}, {
		key: 'handleDeleteOptions',
		value: function handleDeleteOptions() {
			/*this.setState(() => {
    *	return {
    *		options: []
    *	}
    *});*/
			//es6
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: 'handleDeleteOptionSingular',
		value: function handleDeleteOptionSingular(optionToRemove) {
			this.setState(function (prevState) {
				return {
					options: prevState.options.filter(function (option) {
						//using filter to create a new array with the elements which are not the same as optionToRemove
						//resulting in, that optionToRemove is not included in the new array
						return optionToRemove !== option;
					})
				};
			});
		}
	}, {
		key: 'handlePick',
		value: function handlePick() {
			var randomNum = Math.floor(Math.random() * this.state.options.length);
			var option = this.state.options[randomNum];
			alert(option);
		}
	}, {
		key: 'handleAddOption',
		value: function handleAddOption(option) {
			if (!option) {
				return 'Enter valid value';
			} else if (this.state.options.indexOf(option) > -1) {
				return 'This option already exists';
			}

			this.setState(function (prevState) {
				//dont manipulate the original array,
				//make a new array with concat which takes the old values and adds the new options by creating a new array
				return {
					options: prevState.options.concat(option)
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var title = 'Indecision App';
			var subtitle = 'Put your life in the hands of a computer!';

			return React.createElement(
				'div',
				null,
				React.createElement(Header, { title: title, subtitle: subtitle }),
				React.createElement(Action, {
					hasOptions: this.state.options.length > 0,
					handlePickAction: this.handlePick
				}),
				React.createElement(Options, {
					options: this.state.options,
					handleDeleteOptions: this.handleDeleteOptions,
					handleDeleteOptionSingular: this.handleDeleteOptionSingular
				}),
				React.createElement(AddOption, {
					handleAddOption: this.handleAddOption
				})
			);
		}
	}]);

	return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
	options: []
};
var Header = function Header(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			props.title
		),
		React.createElement(
			'h2',
			null,
			props.subtitle
		)
	);
};
//define default values after the function or class, it can be used if values are not provided
Header.defaultProps = {
	title: 'some default tile'
};

var Action = function Action(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'button',
			{
				onClick: props.handlePickAction,
				disabled: !props.hasOptions },
			'What should I do?'
		)
	);
};

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

var Options = function Options(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'button',
			{ onClick: props.handleDeleteOptions },
			'Remove All'
		),
		React.createElement(
			'p',
			null,
			'Length: ',
			props.options.length
		),
		props.options.length === 0 && React.createElement(
			'p',
			null,
			'Please add an option to get started'
		),
		props.options.map(function (option) {
			return React.createElement(Option, {
				key: option,
				optionText: option,
				handleDeleteOptionSingular: props.handleDeleteOptionSingular
			});
		})
	);
};

var Option = function Option(props) {
	return React.createElement(
		'div',
		null,
		props.optionText,
		React.createElement(
			'button',
			{
				onClick: function onClick(e) {
					props.handleDeleteOptionSingular(props.optionText);
				}
			},
			'remove'
		)
	);
};

var AddOption = function (_React$Component2) {
	_inherits(AddOption, _React$Component2);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this2.handleAddOption = _this2.handleAddOption.bind(_this2);
		//this state is not the top class state
		_this2.state = {
			error: undefined
		};
		return _this2;
	}

	_createClass(AddOption, [{
		key: 'handleAddOption',
		value: function handleAddOption(event) {
			event.preventDefault();
			var option = event.target.elements.option.value.trim();

			//this handleAddOption comes from the parent and has to be bind in the constructor
			var error = this.props.handleAddOption(option);

			this.setState(function () {
				return { error: error };
			});

			if (!error) {
				event.target.elements.option.value = '';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.state.error && React.createElement(
					'p',
					null,
					this.state.error
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleAddOption },
					React.createElement('input', { type: 'text', name: 'option' }),
					React.createElement(
						'button',
						{ type: 'submit' },
						'Add Option'
					)
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

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


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));