import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserRepository";


class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id });

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exist!"
            });
        }

        //Save informations on surveyUser table
        const surveyUser = surveyUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: surveyAlreadyExists.id
        });

        await surveyUserRepository.save(surveyUser);
        //Send e-mail to user

        return response.json(surveyUser);
    }
}

export { SendMailController }