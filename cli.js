#!/usr/bin/env node

/**
 * @file
 * The definition of the CLI for the application
 *
 */

'use strict';

var program = require('commander');
var chalk = require('chalk');
var rqt = require('./rqt');
var batchInsert = require('./batch-insert');

program
	.version('1.0.0')
	.arguments('<file> [otherFiles...]')
	.action(function (file, otherFiles) {
		if (program.batch) {
			batchInsert(program.esversion, program.type, file, _logResults);
			if (otherFiles) {
				otherFiles.forEach(function (path) {
					batchInsert(program.esversion, program.type, path, _logResults);
				});
			}
		}
		else {
			rqt.createComponent(program.esversion, program.type, file, _logResults);
			if (otherFiles) {
				otherFiles.forEach(function (path) {
					rqt.createComponent(program.esversion, program.type, path, _logResults);
				});
			}
		}
	})
	.option('-t --type <type>',
		'Container (c) or presentation (p) components', /^(c|p)$/i, 'c')
	.option('-e --esversion <esversion>', 'ES5 (es5) or ES6 (es6) style components', /^(es5|es6)$/i, 'es6')
	.option('-b --batch', 'Create components from a text file with a list of components', false);

program.parse(process.argv);

/**
 * The callback function used to tell the user the results after writing the file
 * @param {String} error - Error message if there is an error
 * @param {String} filePath - Path to the file which should have been written
 * @param {String} componentName - Name of the component which should have been created
 */
function _logResults(error, filePath, componentName) {
	if (error === null) {
		console.log(chalk.green('Successfully created component ' + componentName + ' at ' + filePath + '!'));
	}
	else {
		console.log(chalk.red('Error creating the component ' + componentName + ' at ' + filePath + '. ' + error));
	}
}
