import { IBaseService } from "src/common/i.base.service";
import { User } from "./user.entity";

export interface IUserService extends IBaseService<User>{
    validateUser(username: string):Promise<boolean>;
    signIn(username: string, password: string):Promise<User>;
}