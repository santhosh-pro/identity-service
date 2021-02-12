import { IBaseService } from "src/common/i.base.service";
import { UserEntity } from "./user.entity";

export interface IUserService extends IBaseService<UserEntity>{
    validateUser(username: string):Promise<boolean>;
    signIn(username: string, password: string):Promise<UserEntity>;
}