import { FindConditions, FindOneOptions, SelectQueryBuilder, UpdateResult } from "typeorm";
import { SortingDirection } from "./sorting-direction";

export interface IBaseService<T> {
    findById(id: number | string, options?: FindOneOptions<T>):any;
    findOne(options?: FindOneOptions<T> | FindConditions<T>): Promise<T>;
    paged(queryBuilder: SelectQueryBuilder<T>,pageNumber:number,pageSize:number,orderBy:SortingDirection,orderByPropertyName:string):any;
    create(record: Partial<T>):any;
    createMany(records: Partial<T[]>):any;
    updateById(id: number | string, record: Partial<T>): Promise<UpdateResult>;
    updateMany(criteria: FindConditions<T>, record: Partial<T>):any;
    deleteById(id: number | string):any;
    delete(criteria: FindConditions<T>):any;
    createQueryBuilder(alias:string):SelectQueryBuilder<T>;
}