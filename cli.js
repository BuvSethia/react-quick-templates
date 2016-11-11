#!/usr/bin/env node

/**
 * @file
 * The CLI for the application
 *
 */

'use strict';

var program = require('commander');
var chalk = require('chalk');
var rqt = require('./rqt');

program
	.version('0.0.1')
	.arguments('<file> [otherFiles...]')
	.action(function (file, otherFiles) {
		rqt.createComponent(program.esversion, program.type, file, _logResults);
		if (otherFiles) {
			otherFiles.forEach(function (path) {
				rqt.createComponent(program.esversion, program.type, path, _logResults);
			});
		}
	})
	.option('-t --type <type>',
		'Container (c) or presentation (p) components', /^(c|p)$/i, 'c')
	.option('-e --esversion <esversion>', 'ES5 (es5) or ES6 (es6) style components', /^(es5|es6)$/i, 'es6');

program.parse(process.argv);

/**
 * The callback function used to tell the user the results after writing the file
 * @param {Boolean} successful - Was the write successful
 * @param {String} filePath - Path to the file which should have been written
 * @param {String} componentName - Name of the component which should have been created
 */
function _logResults(successful, filePath, componentName) {
	if (successful) {
		console.log(chalk.green('Successfully created component ' + componentName + ' at ' + filePath + '!'));
	}
	else {
		console.log(chalk.red('There was an error creating the component ' + componentName + ' at ' + filePath + '...'));
	}
}
