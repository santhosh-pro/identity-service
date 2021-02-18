import { IBaseService } from "src/common/i.base.service";
import { Menu } from "./menu.entity";

export interface IMenuService extends IBaseService<Menu>{
    getMenuList():Promise<any>;
}