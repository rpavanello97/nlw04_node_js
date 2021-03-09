import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

//Creating survery entity(Entidade)
@Entity("surveys")
class Survey {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date

    constructor() { //Verify if the id is valid
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Survey }