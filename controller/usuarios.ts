
import { Request, Response } from "express";
import Usuario from "../models/Usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
}

export const getUsuario = async (req: Request, res: Response) => {
    let { id } = req.params;
    let usuario = await Usuario.findByPk(id)
    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg: 'No se encontro el usuario'
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    let { body } = req;
    try {
        const existemail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (existemail) {
            return res.status(400).json({
                msg: "Ya existe el email: " + body.email
            })
        }
        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el Administrador del Sitio Web'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario no existe: " + id
            })
        }
        await usuario.update(body);
        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el Administrador del Sitio Web'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    let { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario no existe: " + id
        })
    }
    // await usuario.destroy();
    await usuario.update({ estado: false })
    res.json(usuario)
}