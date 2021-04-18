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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let usuario = yield Usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: 'No se encontro el usuario'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    try {
        const existemail = yield Usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existemail) {
            return res.status(400).json({
                msg: "Ya existe el email: " + body.email
            });
        }
        const usuario = new Usuario_1.default(body);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el Administrador del Sitio Web'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { body } = req;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario no existe: " + id
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el Administrador del Sitio Web'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    const usuario = yield Usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario no existe: " + id
        });
    }
    // await usuario.destroy();
    yield usuario.update({ estado: false });
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map