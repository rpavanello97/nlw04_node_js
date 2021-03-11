import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

/**
 * Bussines informations
 * NPS(Net Promoter Score) Calculation
 * Score {
 *  Detratores => 0 - 6
 *  Passivos => 7 - 8
 *  Promotores => 9-10
 * }
 * 
 * (N promotores - N detratores) / (respondentes) * 100
 * 
 */


class NpsController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoter = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number((Math.abs(((promoter - detractor) / totalAnswers) * 100)).toFixed(2));

        return response.json({
            detractor,
            promoter,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}

export { NpsController }