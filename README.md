# react-quick-templates
[![Build Status](https://travis-ci.org/BuvSethia/react-quick-templates.svg?branch=master)](https://travis-ci.org/BuvSethia/react-quick-templates)
![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)


Save some typing by auto-generating simple React component skeletons. All you have to do is specify the path to the component, and all sub-directories and the component skeleton will be automatically generated for you!

## Installation
	npm install react-quick-templates

This will install it locally, though if you are planning on using the command line interface, it is probably better to install it globally with:

	npm install react-quick-templates -g

## Usage

The best way to use react-quick-templates is from the command line.

	rqt --help

	Usage: rqt [options] <file> [otherFiles...]

	Options:

		-h, --help                  output usage information
		-V, --version               output the version number
		-t --type <type>            Container (c) or presentation (p) components
		-e --esversion <esversion>  ES5 (es5) or ES6 (es6) style components
		-b --batch                  Create components from a text file with a list of components

react-quick-templates' CLI defaults to ES6 container components, but you can specify your ES-version and component type by passing in options. For example, the command:

	rqt ./Hi/Sup.js

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

	rqt Hi.js What.jsx ./secret_folder/IsUp.jsx

Like that^^. That command would result in the following directory structure:

	|-- Hi.js
	|-- What.jsx
	|-- secret_folder
	  |-- IsUp.jsx

Each of those files would be a React component, with the skeleton filled out and ready for your custom code!

## Batch Insert
What if you've architected your entire piece of software, know your directory structure, and want to create a bunch of files with varying options at once? You can batch insert! Simply create a text file like this one:

		//contents of somefile.txt
		hi/welcome/to/rqt.js, p
		we/have
		cookies.jsx
		pie.jsx
		./partytime.js

Then, run this command:

		rqt -b somefile.txt

This will create the following directory structure, with each file being a React component skeleton meeting your specifications!

		|-hi
		 |-welcome
		  |-to
		   |-rqt.js
		|-we
		 |-have
		  |-cookies.jsx
		  |-pie.jsx
		|-partytime.js

### Batch Insert File Syntax

A line of the txt file you specify can be read in one of two ways: as a filepath or as a partial path. If a line contains a .js, .jsx, .ts, or .tsx file extension, it is read as a filepath. If not, it is read as a partial path.

#### Filepath

If a line is a filepath, a file will be created at that location using the settings you specify. A filepath line can also have a "p" or "c", comma separated from the filepath, to create a specific component type:

	path/to/File.jsx, p

If you don't specify a component type, the default one will be used. You can use react-quick-templates' command line options to specify what the default should be.

#### Partial Path

If a line doesn't have a file extension in it, it is treated as a partial path. When you specify a partial path, every filepath specified after the partial path will have the partial path appended to the front of it. This is useful for when you have multiple files going inside the same directory.

	partial/path
	file1.js
	file2.js

The above file would result in the following:

	|-partial
	 |-path
	  |-file1.js
	  |-file2.js

You can overwrite the partial path in one of two ways: by specifying a new one, or by putting a ./ in front of a file path. The former will overwrite the partial path to whatever your specified, while the latter will create the file you specified and reset the partial path to the current directory.

	partial/path1
	afile.js, p
	partial/path2
	anotherfile.js, c
	./incurrentdir.js

The above would result in the following:

	|-partial
 	 |-path1
	  |-afile.js
	|-partial
	 |-path2
	  |-anotherfile.js
	|-incurrentdir.js

### Batch Insert Command Line Options

In order to use batch insert, pass -b or --batch as a command line option. Batch insert also uses the --esversion and --type options to specify what kind of skeletons to create. Use the --esversion option to specify if the skeletons should be ES5 or ES6 and use the --type option to state what the component type should be by default if it isn't specified inside the txt file.

For example, the following command will create ES5 components with container components as the default type:

	rqt -b -e es5 -t c batch.txt

If you don't explicitly provide options, the version will be set to ES6 and the default component type will be set to container (c).

## Issues
If you run into any issues using react-quick-templates or have any feature suggestions, drop an issue or a pull request and I'll take a look at it!

## License
MIT
