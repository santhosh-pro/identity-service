import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../../common/base.service";
import { IPermissionService } from "./i.permission.service";
import { PermissionEntity } from "./permission.entity";

@Injectable()
export class PermissionService extends BaseService<Repository<PermissionEntity>, PermissionEntity> implements IPermissionService {
    constructor(
        @InjectRepository(PermissionEntity) protected readonly repository: Repository<PermissionEntity>
    ) {
        super(repository);
    }
}