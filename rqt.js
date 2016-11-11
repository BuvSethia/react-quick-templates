/**
 * @file
 * Module's core functions all reside here along with implementation details.
 *
 */

'use strict';

var fs = require('fs');
var path = require('path');
var write = require('write');

/**
 * What the createComponent callback looks like
 * @callback callback
 * @param {Boolean} success - Was the component write successful
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
		_writeComponent('templates/es5/presentation.template', path, callback);
	}
	else if (version === 'es5' && type === 'c') {
		_writeComponent('templates/es5/container.template', path, callback);
	}
	else if (version === 'es6' && type === 'p') {
		_writeComponent('templates/es6/presentation.template', path, callback);
	}
	else if (version === 'es6' && type === 'c') {
		_writeComponent('templates/es6/container.template', path, callback);
	}
	else {
		callback(false, null, null);
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
			callback(false, filePath, componentName);
			return;
		}
		// Insert the component name into the template
		var componentFileContents = template.replace(/{class_name}/g, componentName);

		// Now write the contents to the specified location
		write(filePath, componentFileContents, function (error) {
			if (error) {
				callback(false, filePath, componentName);
				return;
			}
			callback(true, filePath, componentName);
		});
	});
}

module.exports = {
	createComponent: createComponent
};
