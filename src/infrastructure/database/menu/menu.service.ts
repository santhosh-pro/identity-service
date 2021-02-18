import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { SortingDirection } from "src/common/sorting-direction";
import { Repository } from "typeorm";
import { IMenuService } from "./i.menu.service";
import { Menu } from "./menu.entity";

@Injectable()
export class MenuService extends BaseService<Repository<Menu>, Menu> implements IMenuService {
  constructor(
    @InjectRepository(Menu) protected readonly repository: Repository<Menu>
  ) {
    super(repository);
  }

  getMenuList():Promise<any> {
    const queryBuilder = this.createQueryBuilder('m');
    queryBuilder.leftJoinAndSelect('m.menus','p').getMany();
    return this.paged(queryBuilder,1,10,SortingDirection.ASC,'m.name');
   // return this.repository.find();
  }
}