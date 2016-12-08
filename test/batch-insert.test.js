/**
 * @file
 * Unit tests for batch insert from text file
 *
 */

import fs from 'fs';
import test from 'ava';
import rimraf from 'rimraf';
import batchInsert from '../batch-insert';

test.cb('Test 1 - Single file without parital directory', t => {
	batchInsert('es6', 'p', './batchtests/test1.txt', error => {
		if (error) {
			t.fail();
			t.end();
		}
		else {
			fs.exists('./created/test1/Sup.jsx', exists => {
				t.true(exists);
				let compareData = fs.readFileSync('./compare/es6/Sup.js', 'utf-8');
				let createData = fs.readFileSync('./created/test1/Sup.jsx', 'utf-8');
				t.is(createData, compareData);
				t.end();
			});
		}
	});
});

test.cb('Test 2 - Multiple files single parital directory', t => {
	const createFilePaths = ['./created/test2/Sup.jsx', './created/test2/Yo.jsx'];
	const compareFilePaths = ['./compare/es6/Sup.js', './compare/es6/Yo.js'];

	// Keep track of how many assertions have been asserted
	var assertions = 0;
	batchInsert('es6', 'p', './batchtests/test2.txt', error => {
		if (error) {
			t.fail();
			t.end();
		}
		else {
			fs.exists(createFilePaths[assertions], exists => {
				t.true(exists);
				let compareData = fs.readFileSync(compareFilePaths[assertions], 'utf-8');
				let createData = fs.readFileSync(createFilePaths[assertions], 'utf-8');
				t.is(createData, compareData);
				assertions++;
				// Keep the test running until all fs.exists run.
				if (assertions === 2) {
					t.end();
				}
			});
		}
	});
});

test.cb('Test 3 - Multiple file multiple partial directories', t => {
	const createFilePaths = ['./created/test3_1/Bye.js', './created/test3_2/Hello.js'];
	const compareFilePaths = ['./compare/es5/Bye.js', './compare/es5/Hello.js'];

	// Keep track of how many assertions have been asserted
	var assertions = 0;
	batchInsert('es5', 'c', './batchtests/test3.txt', error => {
		if (error) {
			t.fail();
			t.end();
		}
		else {
			fs.exists(createFilePaths[assertions], exists => {
				t.true(exists);
				let compareData = fs.readFileSync(compareFilePaths[assertions], 'utf-8');
				let createData = fs.readFileSync(createFilePaths[assertions], 'utf-8');
				t.is(createData, compareData);
				assertions++;
				// Keep the test running until all fs.exists run.
				if (assertions === 2) {
					t.end();
				}
			});
		}
	});
});

test.cb('Test 4 - Overwrite partial directory with filepath', t => {
	const createFilePaths = ['./created/test4_1/Bye.js', './created/test4_2/Hello.js'];
	const compareFilePaths = ['./compare/es5/Bye.js', './compare/es5/Hello.js'];

	// Keep track of how many assertions have been asserted
	var assertions = 0;
	batchInsert('es5', 'c', './batchtests/test4.txt', error => {
		if (error) {
			t.fail();
			t.end();
		}
		else {
			fs.exists(createFilePaths[assertions], exists => {
				t.true(exists);
				let compareData = fs.readFileSync(compareFilePaths[assertions], 'utf-8');
				let createData = fs.readFileSync(createFilePaths[assertions], 'utf-8');
				t.is(createData, compareData);
				assertions++;
				// Keep the test running until all fs.exists run.
				if (assertions === 2) {
					t.end();
				}
			});
		}
	});
});

test.cb('Test 5 - No component type specified', t => {
	batchInsert('es6', 'c', './batchtests/test5.txt', error => {
		if (error) {
			t.fail();
			t.end();
		}
		else {
			fs.exists('./created/test5/Sup.jsx', exists => {
				t.true(exists);
				let compareData = fs.readFileSync('./compare/es6/Sup.js', 'utf-8');
				let createData = fs.readFileSync('./created/test5/Sup.jsx', 'utf-8');
				t.is(createData, compareData);
				t.end();
			});
		}
	});
});

test.afterEach.always.cb('Clean up created directory', t => {
	rimraf('created', t.end);
});
