const s3 = require('../controller/S3')

module.exports = function (app) {
  s3(app);
};