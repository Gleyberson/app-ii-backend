import {Router} from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

// Consultar todos los usuarios
router.get('/', getUsers);

// Crear un usuario
router.post('/', createUser);

// Actualizar un usuario
router.put('/:uid', updateUser);

// Eliminar un usuario
router.delete('/:uid', deleteUser);

export default router;