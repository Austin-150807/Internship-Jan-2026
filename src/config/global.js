export const RESPONSE = {
  REQUIRED: {
    code: 201,
    message: "is mandatory",
  },
  INVALID: {
    code: 203,
    message: "is invalid",
  },

  ALREADY_EXISTS: {
    code: 203,
    message: "already exists",
  },

  NOT_FOUND: {
    code: 205,
    message: "Not found",
  },

  SUCCESS: {
    code: 200,
    message: "Everything is ok",
  },

  UNKNOWN_ERR: {
    code: 500,
    message: "Something went wrong",
  },
};
