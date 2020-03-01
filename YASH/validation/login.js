const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
