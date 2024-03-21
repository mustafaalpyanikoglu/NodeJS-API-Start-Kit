/**
 * A wrapper for the Validation Error class.
 * @description Adds properties for the kind and the source of the error.
 */

module.exports = class ValidationError extends Error {
  constructor(message, kind, source, errors) {
    super(message);
    this.name = 'ValidationError';
    this.kind = kind || 'UNHANDLED';
    this.source = source || 'Unknown';
    this.errors = errors || [];
  }

  getInfo() {
    return {
      kind: this.kind,
      source: this.source,
    };
  }

  getErrorDetails() {
    return this.errors.map((error) => ({
      msg: error.msg,
      path: error.path,
      value: error.value,
    }));
  }
};
