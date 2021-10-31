"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.postInvestigation = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var pool = require("../mysql/database");
var postInvestigation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigador, url_archivo, titulo, descripcion, fecha_inicio, id_asesor, newInvestigation, investigacion, newDetalleInvestigation, detalleInvestigation, e_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, id_investigador = _a.id_investigador, url_archivo = _a.url_archivo, titulo = _a.titulo, descripcion = _a.descripcion, fecha_inicio = _a.fecha_inicio, id_asesor = _a.id_asesor;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Solo se aceptan archivos pdf"
                        })];
                }
                url_archivo = req.body.document;
                //console.log("url_archivo:", url_archivo);
                return [4 /*yield*/, fs_1["default"].readFileSync(path_1["default"].join(__dirname, "../documents/" + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename)))];
            case 2:
                //console.log("url_archivo:", url_archivo);
                _c.sent();
                newInvestigation = {
                    id_investigador: id_investigador,
                    url_archivo: url_archivo,
                    titulo: titulo,
                    descripcion: descripcion,
                    fecha_inicio: fecha_inicio
                };
                return [4 /*yield*/, pool.query("INSERT INTO investigacion set ?", [
                        newInvestigation,
                    ])];
            case 3:
                investigacion = _c.sent();
                newDetalleInvestigation = {
                    id_investigacion: investigacion.insertId,
                    id_asesor: id_asesor,
                    estado: "Por revisar",
                    avance: "0"
                };
                return [4 /*yield*/, pool.query("INSERT INTO detalle_investigacion set ?", [newDetalleInvestigation])];
            case 4:
                detalleInvestigation = _c.sent();
                res.json({ investigacion: investigacion, detalleInvestigation: detalleInvestigation });
                return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                console.log(e_1);
                res.status(500).json({ msg: "Error al crear investigacion" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postInvestigation = postInvestigation;
//# sourceMappingURL=investigation.js.map