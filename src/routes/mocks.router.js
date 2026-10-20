import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

// GET /api/mocks/mockingpets -> Retorna listado de mascotas simuladas
router.get('/mockingpets', mocksController.getMockingPets);

// GET /api/mocks/mockingusers -> Retorna 50 usuarios simulados formato Mongo
router.get('/mockingusers', mocksController.getMockingUsers);

// POST /api/mocks/generateData -> Genera e inserta usuarios y mascotas en la DB
router.post('/generateData', mocksController.generateData);

export default router;
