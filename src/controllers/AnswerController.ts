import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";


class AnswerController {
    /**
     * Route Params => It's a param that is a part of a route.
     * Identified by: routes.get("/answers/:value");
     * 
     * Query Params => Search, pagination, it's not required.
     * Identified by: ? key=value
     * 
     * Link example: http://localhost:3333/answers/1?u=7d903b64-9c3d-4e29-bee7-79c6edf40ba7
     */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not exist!");
        }

        surveyUser.value = Number(value);

        await surveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }