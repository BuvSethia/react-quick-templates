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
function createTemplateFile(version, type, path) {
	if (version === 'es5' && type === 'p') {
		return _writeComponent('./templates/es5/presentation.template', path);
	}
	else if (version === 'es5' && type === 'c') {
		return _writeComponent('./templates/es5/container.template', path);
	}
	else if (version === 'es6' && type === 'p') {
		return _writeComponent('./templates/es6/presentation.template', path);
	}
	else if (version === 'es6' && type === 'c') {
		return _writeComponent('./templates/es6/container.template', path);
	}
	return false;
}

/**
 * Insert component name into template and write it to the specified location
 * @param {String} templatePath - Path to the template being used
 * @param {String} filePath - Path to file being written
 * @returns {Boolean} Whether or not the file creation was successful
 */
function _writeComponent(templatePath, filePath) {
	var normalizedPath = slash(filePath);
	var parsedPath = path.parse(normalizedPath);
	var componentName = parsedPath.name;
	// Read the template file first
	fs.readFile(templatePath, 'utf-8', function (error, template) {
		if (error) {
			return false;
		}
		// Insert the component name into the template
		var componentFileContents = template.replace(/{class_name}/g, componentName);

		// Now write the contents to the specified location
		write(normalizedPath, componentFileContents, function (error) {
			if (error) {
				return false;
			}
		});
	});
}

module.exports = createTemplateFile;
