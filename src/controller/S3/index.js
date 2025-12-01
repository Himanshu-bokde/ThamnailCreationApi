const controller = require("./controller");
const BASE_URI = "/api";

module.exports = function (router) {
   router.get(BASE_URI + "/getSignUrl", controller.getSignUrl);
  router.get(BASE_URI + "/getDownloadUrl", controller.getDownloadUrl);
   

//   router.post(BASE_URI + "/register", authController.register);
};