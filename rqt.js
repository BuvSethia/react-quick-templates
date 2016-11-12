/**
 * @file
 * Module's core functions all reside here along with implementation details.
 *
 */

'use strict';

var fs = require('fs');
var path = require('path');
var write = require('write');
var CONSTANTS = require('./constants');

/**
 * What the createComponent callback looks like
 * @callback callback
 * @param {String} error - The error message, if there is an error
 * @param {String} filePath - Path to where the created file should be
 * @param {String} moduleName - Name of the module that should have been created
 */

/**
 * Creates a ReactJS skeleton component based on the user's specifications
 * @param {String} version - Should the template be ES5 or ES6
 * @param {String} type - Is this a presentation or container component
 * @param {String} path - Path of the file to be created
 * @param {callback} callback - callback function after component write is executed
 * @returns {Boolean} Whether or not the file creation was successful
 */
function createComponent(version, type, path, callback) {
	if (version === 'es5' && type === 'p') {
		_writeComponent(CONSTANTS.ES5_PRESENTATION, path, callback);
	}
	else if (version === 'es5' && type === 'c') {
		_writeComponent(CONSTANTS.ES5_CONTAINER, path, callback);
	}
	else if (version === 'es6' && type === 'p') {
		_writeComponent(CONSTANTS.ES6_PRESENTATION, path, callback);
	}
	else if (version === 'es6' && type === 'c') {
		_writeComponent(CONSTANTS.ES6_CONTAINER, path, callback);
	}
	else {
		callback(CONSTANTS.ERROR.BAD_OPTIONS, null, null);
	}
}

/**
 * Insert component name into template and write it to the specified location
 * @param {String} template - Path (starting at template directory) of template being used
 * @param {String} filePath - Path to file being written
 * @param {callback} callback - callback function after component write is executed
 * @returns {Boolean} Whether or not the file creation was successful
 */
function _writeComponent(template, filePath, callback) {
	// Get the individual components of the filepath provided
	var parsedPath = path.parse(filePath);
	var componentName = parsedPath.name;
	// Template path joined with the script directory to get the location of the template
	var templatePath = path.join(__dirname, template);

	// Read the template file first
	fs.readFile(templatePath, 'utf-8', function (error, template) {
		if (error) {
			callback(CONSTANTS.ERROR.TEMPLATE_ERROR, filePath, componentName);
			return;
		}
		// Insert the component name into the template
		var componentFileContents = template.replace(/{class_name}/g, componentName);

		// Now write the contents to the specified location
		write(filePath, componentFileContents, function (error) {
			if (error) {
				callback(CONSTANTS.ERROR.WRITE_ERROR, filePath, componentName);
				return;
			}
			callback(null, filePath, componentName);
		});
	});
}

module.exports = {
	createComponent: createComponent
};
