const assert = require('assert');
const {
  addition, subtraction, multiplication, division, remainder,
} = require('../src/compute');

describe('Compute operations', () => {
  it('Should perform Additions correctly', () => {
    const right = Number.MAX_SAFE_INTEGER - 1;
    const left = 1;
    const result = addition(left, right);
    assert.strictEqual(result, Number.MAX_SAFE_INTEGER);
  });

  it('Should perform Subtractions correctly', () => {
    const right = Number.MAX_SAFE_INTEGER;
    const left = 1;
    const result = subtraction(left, right);
    assert.strictEqual(result, (-Number.MAX_SAFE_INTEGER) + 1);
  });

  it('Should perform Multiplications correctly', () => {
    const right = Number.MAX_SAFE_INTEGER / 2;
    const left = 2;
    const result = multiplication(left, right);
    assert.strictEqual(result, Number.MAX_SAFE_INTEGER);
  });

  it('Should perform Divisions correctly', () => {
    const right = Number.MAX_SAFE_INTEGER;
    const left = Number.MAX_SAFE_INTEGER;
    const result = division(left, right);
    assert.strictEqual(result, 1);
  });

  it('Should perform Remainders correctly', () => {
    const right = Number.MAX_SAFE_INTEGER;
    const left = Number.MAX_SAFE_INTEGER;
    const result = remainder(left, right);
    assert.strictEqual(result, 0);
  });
});
