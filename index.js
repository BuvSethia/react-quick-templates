/**
 * @file
 * Module's core functions all reside here along with implementation details.
 *
 */

'use strict';
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
		return _writeComponent('./templates/es5/presentation.js', path);
	}
	else if (version === 'es5' && type === 'c') {
		return _writeComponent('./templates/es5/container.js', path);
	}
	else if (version === 'es6' && type === 'p') {
		return _writeComponent('./templates/es6/presentation.js', path);
	}
	else if (version === 'es6' && type === 'c') {
		return _writeComponent('./templates/es6/container.js', path);
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
	var componentName = _extractComponentNameFromFilePath(filePath);
}

/**
 * Parse file path to get name of component
 * @param {String} filePath - The file path
 * @returns {String} The name of the component being created
 */
function _extractComponentNameFromFilePath(filePath) {
	return filePath.split()
}

module.exports = {
	createTemplateFile: createTemplateFile
};
