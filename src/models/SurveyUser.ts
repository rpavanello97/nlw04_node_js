import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

//Creating survery entity(Entidade)
@Entity("surveys_users")
class SurveyUser {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    survey_id: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date

    constructor() { //Verify if the id is valid
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveyUser }