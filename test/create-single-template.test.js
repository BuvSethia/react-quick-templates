var fs = require('fs');
var test = require('ava');
var rimraf = require('rimraf');
var rqt = require('../rqt');

// All created files will go in this directory
var created = './created';

test('Testing is good to go', t => {
	t.pass();
});

test.cb('ES5 container named Hello in a new directory - POSIX filepath', t => {
	// The control to which we will compare the created file
	var compareFilePath = './compare/es5/Hello.js';
	var createFilePath = created + '/es5c/Hello.js';

	rqt.createComponent('es5', 'c', createFilePath, function (created) {
		// If the file was created the function should return true
		t.true(created);

		fs.exists(createFilePath, function (exists) {
			t.true(exists);
		});

		fs.readFile(compareFilePath, 'utf-8', function (errorCompare, compareData) {
			// If this error is hit there is something wrong with the test
			if (errorCompare) {
				t.fail('TEST ERROR: Error reading control file ' + compareFilePath);
			}

			fs.readFile(createFilePath, 'utf-8', function (errorCreate, createData) {
				if (errorCreate) {
					t.fail('Error reading created file ' + createFilePath);
				}

				t.is(createData, compareData);
				t.end();
			});
		});
	});
});

test.after.always('Clean up created directory', t => {
	rimraf(created, function (error) {
		t.fail('Could not clean created directory with error: ' + error);
	});
});
