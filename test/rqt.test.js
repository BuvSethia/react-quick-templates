/**
 * @file
 * Unit tests for the rqt.createComponent
 *
 */

import fs from 'fs';
import test from 'ava';
import rimraf from 'rimraf';
import rqt from '../rqt';

// All created files will go in this directory
const created = './created/';

test.cb('ES5 container in a new directory', t => {
	// The control to which we will compare the created file
	const compareFilePath = './compare/es5/Hello.js';
	const createFilePath = created + 'es5c/Hello.js';

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

test.cb('ES5 presentation in a new directory', t => {
	// The control to which we will compare the created file
	const compareFilePath = './compare/es5/Bye.js';
	const createFilePath = created + 'es5p/Bye.jsx';

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

test.cb('ES6 container in a new directory', t => {
	// The control to which we will compare the created file
	const compareFilePath = './compare/es6/Sup.js';
	const createFilePath = created + 'es6c/Sup.js';

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

test.cb('ES6 presentation in a new directory', t => {
	// The control to which we will compare the created file
	const compareFilePath = './compare/es6/Yo.js';
	const createFilePath = created + 'es6p/Yo.js';

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
