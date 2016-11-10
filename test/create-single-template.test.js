var fs = require('fs');
var test = require('ava');
var rimraf = require('rimraf');
var rqt = require('../rqt');

// All created files will go in this directory
var created = './created/';

test('Testing is good to go', t => {
	t.pass();
});

test.cb('ES5 container in a new directory - POSIX filepath', t => {
	// The control to which we will compare the created file
	var compareFilePath = './compare/es5/Hello.js';
	var createFilePath = created + 'es5c/Hello.js';

	rqt.createComponent('es5', 'c', createFilePath, function (created) {
		// If the file was created the function should return true
		t.true(created);

		// Check if the file was actually created
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

test.cb('ES5 presentation in a new directory - POSIX filepath', t => {
	// The control to which we will compare the created file
	var compareFilePath = './compare/es5/Bye.js';
	var createFilePath = created + 'es5p/Bye.jsx';

	rqt.createComponent('es5', 'p', createFilePath, function (created) {
		// If the file was created the function should return true
		t.true(created);

		// Check if the file was actually created
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

test.cb('ES6 container in a new directory - POSIX filepath', t => {
	// The control to which we will compare the created file
	var compareFilePath = './compare/es6/Sup.js';
	var createFilePath = created + 'es6c/Sup.js';

	rqt.createComponent('es6', 'c', createFilePath, function (created) {
		// If the file was created the function should return true
		t.true(created);

		// Check if the file was actually created
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

test.cb('ES6 presentation in a new directory - POSIX filepath', t => {
	// The control to which we will compare the created file
	var compareFilePath = './compare/es6/Yo.js';
	var createFilePath = created + 'es6p/Yo.js';

	rqt.createComponent('es6', 'p', createFilePath, function (created) {
		// If the file was created the function should return true
		t.true(created);

		// Check if the file was actually created
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

test.after.always.cb('Clean up created directory', t => {
	rimraf(created, t.end);
});
