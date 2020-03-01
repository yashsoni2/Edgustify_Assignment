const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle must be btw 2 - 40";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "profile handle is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
