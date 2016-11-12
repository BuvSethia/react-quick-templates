# react-quick-templates
[![Build Status](https://travis-ci.org/BuvSethia/react-quick-templates.svg?branch=master)](https://travis-ci.org/BuvSethia/react-quick-templates)
![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)


Save some typing by auto-generating simple React component skeletons. All you have to do is specify the path to the component!

## Installation
	npm install react-quick-templates
This will install it locally, though if you are planning on using the command line interface, it is probably better to install it globally with:
	npm install react-quick-templates -g
## Usage
You can use react-quick-templates in two ways: from your code or from the command line.
### From your code
Using react-quick-templates from your code is easy. All you have to do is say if you want an ES5 or ES6 style component, a presentation (p) or container (c) component, the path to your component, and a callback method (which will return the component's filepath and name).

	var rqt = require('react-quick-templates');

	//version (es5 or es6), type (p or c), filepath, callback
	rqt.createComponent('es5', 'c', './Hello.js', (error) => {
		if(error === null) {
			console.log("Boom. Done.");
		}
	});

And we're done! You should see the following Hello.js file in the current directory.

	// Hello.js

	'use strict';

	var React = require('react');
	var PropTypes = React.PropTypes;

	var Hello = React.createClass({
		getInitialState: function () {
			return {

			};
		},

		render: function () {
			return (
				<div>

				</div>
			);
		},

		propTypes: {

		}
	});

	module.exports = Hello;

### From the command line
This is the best way to use react-quick-templates.

	rqt --help

	Usage: rqt [options] <file> [otherFiles...]

	Options:

		-h, --help                  output usage information
		-V, --version               output the version number
		-t --type <type>            Container (c) or presentation (p) components
		-e --esversion <esversion>  ES5 (es5) or ES6 (es6) style components

react-quick-templates' CLI defaults to ES6 container components, but you can specify your ES-version and component type by passing in options. For example, the command:

	rqt -p ./Hi/Sup.js

will create the following file:

	//Sup.js, which is inside ./Hi/

	import React, {PropTypes} from 'react';

	export default class Sup extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<div>

				</div>
			);
		}
	}

	Sup.PropTypes = {

	};


Bad options will result in the default options being used. You can also pass in multiple filepaths and they will all be created with the same options.

	rqt Hi.js What.jsx IsUp.jsx

Like that^^

## Issues
If you run into any issues using react-quick-templates or have any feature suggestions, drop an issue or a pull request and I'll take a look at it!

## License
MIT
