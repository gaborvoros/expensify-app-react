'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp() {
		_classCallCheck(this, IndecisionApp);

		return _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).apply(this, arguments));
	}

	_createClass(IndecisionApp, [{
		key: 'render',

		//only functions can stand here, render has to be defined!
		value: function render() {
			var title = 'Indecision App';
			var subtitle = 'Put your life in the hands of a computer!';
			var options = ['One', 'Two', 'Three'];

			return React.createElement(
				'div',
				null,
				React.createElement(Header, { title: title, subtitle: subtitle }),
				React.createElement(Action, null),
				React.createElement(Options, { options: options }),
				React.createElement(AddOption, null)
			);
		}
	}]);

	return IndecisionApp;
}(React.Component);

var Header = function (_React$Component2) {
	_inherits(Header, _React$Component2);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: 'render',

		//this -> we have access to this -> it is the reference to the current instance of the component

		//render has to be defined in jsx!!!
		value: function render() {
			//this.props contains the attribute values / properties

			//return template can be enclosed in () if its more than 1 line
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					this.props.title
				),
				React.createElement(
					'h2',
					null,
					this.props.subtitle
				)
			);
		}
	}]);

	return Header;
}(React.Component);

var Action = function (_React$Component3) {
	_inherits(Action, _React$Component3);

	function Action() {
		_classCallCheck(this, Action);

		return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
	}

	_createClass(Action, [{
		key: 'handlePick',
		value: function handlePick() {
			alert('hooo');
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ onClick: this.handlePick },
					'What should I do?'
				)
			);
		}
	}]);

	return Action;
}(React.Component);

var Options = function (_React$Component4) {
	_inherits(Options, _React$Component4);

	//by calling the constructor we can bind this again
	//Component constructor has props by default, so we can use it
	function Options(props) {
		_classCallCheck(this, Options);

		//whenever we call handleRemoveAll the context is always correct, no need to bind it anywhere else
		var _this4 = _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, props));

		_this4.handleRemoveAll = _this4.handleRemoveAll.bind(_this4);
		return _this4;
	}

	_createClass(Options, [{
		key: 'handleRemoveAll',
		value: function handleRemoveAll() {
			/*
    this.props.options can not be accessed like in the render function as the binding is destroyed
    calling the bind method in the onClick event allows to use the this props again
    this means in .bind(this) the object we want to use - it can be an other one if needed
    onClick={this.handleRemoveAll.bind(this)}
    */
			console.log(this.props.options);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ onClick: this.handleRemoveAll },
					'Remove All'
				),
				React.createElement(
					'p',
					null,
					'Length: ',
					this.props.options.length
				),

				//key has to be always defined in a map
				this.props.options.map(function (option) {
					return React.createElement(Option, { key: option, optionText: option });
				}),
				React.createElement(Option, null)
			);
		}
	}]);

	return Options;
}(React.Component);

var Option = function (_React$Component5) {
	_inherits(Option, _React$Component5);

	function Option() {
		_classCallCheck(this, Option);

		return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
	}

	_createClass(Option, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'p',
				null,
				this.props.optionText
			);
		}
	}]);

	return Option;
}(React.Component);

var AddOption = function (_React$Component6) {
	_inherits(AddOption, _React$Component6);

	function AddOption() {
		_classCallCheck(this, AddOption);

		return _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).apply(this, arguments));
	}

	_createClass(AddOption, [{
		key: 'handleAddOption',
		value: function handleAddOption(event) {
			event.preventDefault();
			var option = event.target.elements.option.value.trim();
			if (option) {
				alert(option);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				{ onSubmit: this.handleAddOption },
				React.createElement('input', { type: 'text', name: 'option' }),
				React.createElement(
					'button',
					{ type: 'submit' },
					'Add Option'
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

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


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));