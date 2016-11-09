/**
 * @file
 * Module's core functions all reside here along with implementation details.
 *
 */

'use strict';

var fs = require('fs');
var path = require('path');
var slash = require('slash');
var write = require('write');

/**
 * Creates a ReactJS skeleton component based on the user's specifications
 * @param {String} version - Should the template be ES5 or ES6
 * @param {String} type - Is this a presentation or container component
 * @param {String} path - Path of the file to be created
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
		callback(false);
	}
}

/**
 * Insert component name into template and write it to the specified location
 * @param {String} template - Path (starting at template directory) of template being used
 * @param {String} filePath - Path to file being written
 * @returns {Boolean} Whether or not the file creation was successful
 */
function _writeComponent(template, filePath, callback) {
	var normalizedPath = slash(filePath);
	var parsedPath = path.parse(normalizedPath);
	var componentName = parsedPath.name;
	var templatePath = path.join(__dirname, template);
	// Read the template file first
	fs.readFile(templatePath, 'utf-8', function (error, template) {
		if (error) {
			callback(false);
			return;
		}
		// Insert the component name into the template
		var componentFileContents = template.replace(/{class_name}/g, componentName);

		// Now write the contents to the specified location
		write(normalizedPath, componentFileContents, function (error) {
			if (error) {
				callback(false);
				return;
			}
			callback(true);
		});
	});
}

module.exports = {
	createComponent: createComponent
};
