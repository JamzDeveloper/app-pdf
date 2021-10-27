"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var file_multer_1 = __importDefault(require("../middlewares/file-multer"));
var investigation_1 = require("../controllers/investigation");
var router = (0, express_1.Router)();
router.post("/", file_multer_1["default"], investigation_1.postInvestigation);
exports["default"] = router;
/* id_investigador,
    url_archivo,
    titulo,
    descripcion,
    fecha_inicio,
    id_asesor,*/ 
//# sourceMappingURL=investigation.js.map