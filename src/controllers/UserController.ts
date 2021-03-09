import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({ //select * from users where email = "email"
            email
        })

        if (userAlreadyExists) { //Verify if the email already exist in database.
            return response.status(400).json({
                error: "400 Bad Request",
                description: "User already exists"
            })
        }

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const all = await userRepository.find();

        return response.json(all);
    }
}

export { UserController };
