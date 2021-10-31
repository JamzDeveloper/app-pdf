"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var getDocuments = function (req, res) {
    console.log(req);
    res.json("getdocuments");
};
router.get("/documents/:data", getDocuments);
router.get("/image/:data", getDocuments);
exports["default"] = router;
//# sourceMappingURL=documents.js.map