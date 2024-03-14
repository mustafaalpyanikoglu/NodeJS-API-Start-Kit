const cors = require('cors');
const constants = require('../utils/constants/constants');

module.exports = cors({
  origin: constants.ALLOW_ALL_ORIGINS,
  methods: [
    constants.OPTIONS,
    constants.GET,
    constants.POST,
    constants.PUT,
    constants.PATCH,
    constants.DELETE,
  ],
  allowedHeaders: [
    constants.CONTENT_TYPE,
    constants.AUTHORIZATION,
  ],
});
