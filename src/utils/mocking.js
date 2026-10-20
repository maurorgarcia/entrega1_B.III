import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { createHash } from './index.js';

/**
 * Genera un conjunto de mascotas simuladas (mock)
 * @param {number} quantity - Cantidad de mascotas a generar
 * @returns {Array} Listado de mascotas simuladas
 */
export const generateMockPets = (quantity = 1) => {
    const pets = [];
    const speciesList = ['dog', 'cat', 'bird', 'hamster', 'rabbit', 'fish'];

    for (let i = 0; i < quantity; i++) {
        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name: faker.person.firstName(),
            specie: faker.helpers.arrayElement(speciesList),
            birthDate: faker.date.past({ years: 5 }),
            adopted: false,
            image: faker.image.url({ width: 640, height: 480 })
        });
    }

    return pets;
};

/**
 * Genera un conjunto de usuarios simulados (mock)
 * Características requeridas:
 * - password: 'coder123' encriptada
 * - role: 'user' o 'admin'
 * - pets: [] (array vacío)
 * - Formato idéntico al entregado por Mongo (_id, first_name, last_name, email, password, role, pets)
 * @param {number} quantity - Cantidad de usuarios a generar
 * @returns {Promise<Array>} Listado de usuarios simulados
 */
export const generateMockUsers = async (quantity = 1) => {
    const users = [];
    const rolesList = ['user', 'admin'];
    const hashedPassword = await createHash('coder123');

    for (let i = 0; i < quantity; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        // Garantizamos emails únicos para evitar colisiones en Mongo
        const email = `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${lastName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${Date.now()}.${i}@example.com`;

        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
            role: faker.helpers.arrayElement(rolesList),
            pets: []
        });
    }

    return users;
};

export default {
    generateMockPets,
    generateMockUsers
};
