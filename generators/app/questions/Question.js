module.exports = class Question {
  constructor(data, validation) {
    this.data = data;
    this.validation = validation;
  }

  validate(answer) {
    return this.validation.call(this, answer);
  }
};
