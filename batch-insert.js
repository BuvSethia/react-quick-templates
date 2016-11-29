/**
 * @file
 * The functions for mass-creating components from a text file
 *
 */

var readline = require('readline');
var fs = require('fs');
var path = require('path');
var rqt = require('./rqt');

/**
 * Creates a set of ReactJS skeleton components based on the user's specifications
 * in a text file containing paths to multiple components
 * @param {String} version - Should the template be ES5 or ES6
 * @param {String} defaultType - Component type to use when none is specified
 * @param {String} txtFile - Path to the text file being read
 * @param {callback} callback - Callback function after EACH component write is executed
 */
function createComponentsFromFile(version, defaultType, txtFile, callback) {
	// Store a partial path specified by the user in the file (if specified)
	var partialPath = '';
	// Read file line by line
	var reader = readline.createInterface({
		input: fs.createReadStream(txtFile)
	});
	reader.on('line', function (line) {
		// If the line specifies a file
		if (line.indexOf('.js') > -1) {
			// Split the file from the component type
			var splitLine = line.split(',');

			var filePath = splitLine[0].trim();
			// If the filePath should include the most recent partial path
			if (filePath.indexOf('./') < 0) {
				filePath = path.normalize(path.join(partialPath, filePath));
			}
			/*
			If the filePath doesn't use the most recent parital path, assume the
			user is done with the current parital path and reset it
			*/
			else {
				partialPath = '';
			}

			var componentType = defaultType;
			// If component type was specified and valid, don't use the default
			if (splitLine.length > 1 && _validComponentType(splitLine[1].trim())) {
				componentType = splitLine[1].trim();
			}

			// Do the actual component write now that we have the information we need
			rqt.createComponent(version, componentType, filePath, callback);
		}
		// Else line is part of a filepath which should be joined with upcoming lines
		else if (line !== '\n') {
			partialPath = line;
		}
	});
}

function _validComponentType(type) {
	return type === 'p' || type === 'c';
}

module.exports = createComponentsFromFile;
