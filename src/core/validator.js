import { createThunkAttributeDescriptor } from './helpers';

export const isString = createValidator(function (value) {
  return typeof value === 'string';
})

class Validator {
  static isValidator (o) {
    return o && o instanceof Validator;
  }

  constructor (fn, options, prepare) {
    this._fn = fn;
    this._options = options;
    this.addPrepare(prepare);
  }

  addPrepare (prepare) {
    this._prepare = prepare;
  }

  runPrepare (value) {
    if (this._prepare && this._prepare.run) {
      return this._prepare.run(value);
    }
  }

  async run (value) {
    try {
      await this.runPrepare(value)
      await this._fn(value)
    } catch (e) {
      return e;
    }
    return true;
  }
}

function createValidator (fn) {
  return function (options) {
    return new Validator(fn, options, this);
  }
}