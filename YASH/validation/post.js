const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "text field required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "post must be btwd10 - 300";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
