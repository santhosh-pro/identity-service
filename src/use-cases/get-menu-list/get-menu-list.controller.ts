import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IMenuService } from "src/infrastructure/database/menu/i.menu.service";

@ApiTags('menus')
@Controller('menus')
export class GetMenuListController {
    constructor(
        @Inject('IMenuService') private readonly userService: IMenuService
    ) {
    }

    @Get()
    async execute():Promise<any>{
        return this.userService.getMenuList();
    }
}