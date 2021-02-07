const nock = require('nock');
const assert = require('assert');
const {
  protocol, server, getTaskPath, submitTaskPath,
} = require('../src/config.js');
const { getTask, submitTask } = require('../src/http');

describe('Testing HTTP methods', () => {
  describe('GetTask', () => {
    it('Should fail when an incorrect JSON is returned', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(200, '{ id: 123 }');
      await assert.rejects(
        getTask(),
        { message: 'Invalid response from server' },
      );
    });

    it('Should fail when status is 503', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(503);
      await assert.rejects(
        getTask(),
        { message: 'Error communicating with database' },
      );
    });

    it('Should fail when status is not 200', async () => {
      nock(`${protocol}${server}`)
        .get(getTaskPath)
        .reply(500);
      await assert.rejects(
        getTask(),
        { message: 'Unknown error from server' },
      );
    });
  });

  describe('SubmitTask', () => {
    it('Should succeed when status is 200', async () => {
      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(200);
      const data = await submitTask(123, 3);
      assert.strictEqual(data.status, 'Success');
      assert.strictEqual(data.result, 3);
    });

    it('Should succeed when status is 400', async () => {
      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(400);
      const data = await submitTask(123, 3);
      assert.strictEqual(data.status, 'Incorrect value in result; no ID specified; value is invalid');
      assert.strictEqual(data.result, 3);
    });

    it('Should succeed when status is 404', async () => {
      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(404);
      const data = await submitTask(123, 3);
      assert.strictEqual(data.status, 'Value not found for specified ID');
      assert.strictEqual(data.result, 3);
    });

    it('Should succeed when status is 503', async () => {
      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(503);
      const data = await submitTask(123, 3);
      assert.strictEqual(data.status, 'Error communicating with database');
      assert.strictEqual(data.result, 3);
    });

    it('Should fail when status is other than 200', async () => {
      nock(`${protocol}${server}`)
        .post(submitTaskPath, { id: 123, result: 3 })
        .reply(599);

      await assert.rejects(
        submitTask(123, 3),
        { message: 'Unknown error from server' },
      );
    });
  });
});
