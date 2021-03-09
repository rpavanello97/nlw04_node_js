import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

//This "UserRepository" is used to access the Database repository from User.ts 

@EntityRepository(User)
class UserRepository extends Repository<User> { //Add the heritage from "Repository" from typeorm.

}

export { UserRepository }