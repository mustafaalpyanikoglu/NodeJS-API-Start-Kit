const sendResponse = (res, statusCode, success, message, data) => {
  const responseData = {
    status: success,
  };
  if (data !== undefined) {
    responseData.data = data;
  }

  responseData.message = message.toString();

  return res.status(statusCode).json(responseData);
};

const successResponse = (res, statusCode, message, data) => {
  return sendResponse(res, statusCode, true, message, data);
};

const errorResponse = (res, statusCode, message, data) => {
  return sendResponse(res, statusCode, false, message, data);
};

module.exports = {
  successResponse,
  errorResponse,
};
