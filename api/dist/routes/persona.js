"use strict";
exports.__esModule = true;
var express_1 = require("express");
var persona_1 = require("../controllers/persona");
var router = (0, express_1.Router)();
router.get("/", persona_1.getPersons);
exports["default"] = router;
//# sourceMappingURL=persona.js.map