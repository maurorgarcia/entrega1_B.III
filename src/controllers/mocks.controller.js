import { generateMockPets, generateMockUsers } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

const getMockingPets = async (req, res) => {
    try {
        const pets = generateMockPets(50);
        res.send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const getMockingUsers = async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (users === undefined || pets === undefined) {
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }

        const mockUsers = await generateMockUsers(Number(users));
        const mockPets = generateMockPets(Number(pets));

        for (const user of mockUsers) {
            await usersService.create(user);
        }

        for (const pet of mockPets) {
            await petsService.create(pet);
        }

        res.send({
            status: "success",
            message: "Data generated successfully"
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
