"use strict";
exports.__esModule = true;
var express_1 = require("express");
var login_1 = require("../controllers/login");
var router = (0, express_1.Router)();
router.get("/", login_1.getLogin);
exports["default"] = router;
//# sourceMappingURL=login.js.map