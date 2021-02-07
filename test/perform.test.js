const nock = require('nock');
const assert = require('assert');
const {
  protocol, server, getTaskPath, submitTaskPath,
} = require('../src/config.js');
const Perform = require('../src/perform');

describe('Testing Perform methods', () => {
  describe('Addition', () => {
    it('Should validate a correct addition', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'addition', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(200);

      const perform = new Perform();
      perform.performOperation = () => 1 + 2;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'addition');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 3);
      assert.strictEqual(data.status, 'Success');
    });

    it('Should fail in an incorrect addition', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'addition', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 4 })
        .reply(400);

      const perform = new Perform();
      perform.performOperation = () => 1 + 2 + 1;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'addition');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 4);
      assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
    });
  });

  describe('Subtraction', () => {
    it('Should validate a correct subtraction', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'subtraction', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: -1 })
        .reply(200);

      const perform = new Perform();
      perform.performOperation = () => 1 - 2;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'subtraction');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, -1);
      assert.strictEqual(data.status, 'Success');
    });

    it('Should fail in an incorrect subtraction', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'subtraction', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: -2 })
        .reply(400);

      const perform = new Perform();
      perform.performOperation = () => 1 - 2 - 1;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'subtraction');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, -2);
      assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
    });
  });

  describe('Multiplication', () => {
    it('Should validate a correct multiplication', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'multiplication', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 2 })
        .reply(200);

      const perform = new Perform();
      perform.performOperation = () => 2;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'multiplication');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 2);
      assert.strictEqual(data.status, 'Success');
    });

    it('Should fail in an incorrect multiplication', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'multiplication', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 6 })
        .reply(400);

      const perform = new Perform();
      perform.performOperation = () => 1 * 2 * 3;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'multiplication');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 6);
      assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
    });
  });

  describe('Division', () => {
    it('Should validate a correct division', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'division', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 0.5 })
        .reply(200);

      const perform = new Perform();
      perform.performOperation = () => 1 / 2;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'division');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 0.5);
      assert.strictEqual(data.status, 'Success');
    });

    it('Should fail in an incorrect division', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 123, operation: 'division', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 1.5 })
        .reply(400);

      const perform = new Perform();
      perform.performOperation = () => 1 / 2 + 1;
      const data = await perform.run();
      assert.strictEqual(data.id, 123);
      assert.strictEqual(data.operation, 'division');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 1.5);
      assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
    });
  });

  describe('Value not found for ID', () => {
    it('Should fail when a value is not found for an ID', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, {
          id: 999, operation: 'addition', left: 1, right: 2,
        });

      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 999, result: 3 })
        .reply(404);

      const perform = new Perform();
      perform.performOperation = () => 1 + 2;
      const data = await perform.run();
      assert.strictEqual(data.id, 999);
      assert.strictEqual(data.operation, 'addition');
      assert.strictEqual(data.left, 1);
      assert.strictEqual(data.right, 2);
      assert.strictEqual(data.result, 3);
      assert.strictEqual(data.status, 'Value not found for specified ID');
    });
  });

  describe('Database error', () => {
    it('Should fail when a database error occurs while getting task', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(503);

      const perform = new Perform();
      perform.performOperation = () => 1 + 2;
      const data = await perform.run();
      assert.strictEqual(data.status, 'Error communicating with database');
    });
  });
});
