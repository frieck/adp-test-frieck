const { getTask, submitTask } = require('./http');
const {
  addition, subtraction, multiplication, division, remainder,
} = require('./compute');

class Perform {
  /**
  * Calls a specific operation based on **operation**
  * @param {} operation the desired operation
  * @param {*} left left value
  * @param {*} right right value
  */
  static performOperation(operation, left, right) {
    if (operation === 'addition') {
      return addition(left, right);
    }
    if (operation === 'subtraction') {
      return subtraction(left, right);
    }
    if (operation === 'multiplication') {
      return multiplication(left, right);
    }
    if (operation === 'division') {
      return division(left, right);
    }
    if (operation === 'remainder') {
      return remainder(left, right);
    }
    return null;
  }

  /**
   * Gets a task, compute the operation result and send the result to validation
   * @returns a promise resolving the operation status and result, otherwise returns a rejection
   */
  static run() {
    return new Promise((resolve) => {
      let currentTask = {};
      getTask().then((task) => {
        currentTask = task;
        const {
          id, operation, left, right,
        } = task;
        const result = Perform.performOperation(operation, left, right);
        return submitTask(id, result);
      }).then((data) => {
        const {
          id, operation, left, right,
        } = currentTask;
        resolve({
          id, operation, left, right, result: data.result, status: data.status,
        });
      }).catch((error) => {
        resolve({
          status: error.message,
        });
      });
    });
  }
}

module.exports = Perform;
