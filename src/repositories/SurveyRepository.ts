import { Entity, EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";



//This "SurveyRepository" is used to access the Database repository from Survey.ts
@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> { //Add the heritage from "Repository" from typeorm.

}

export { SurveyRepository }