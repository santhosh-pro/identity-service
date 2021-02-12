import { ApiProperty } from '@nestjs/swagger';
import { SortingDirection } from './sorting-direction';
export class PagedResponse<T> {
    @ApiProperty()
    
    readonly pageNumber!: number;

    @ApiProperty()
    
    readonly pageSize!: number;

    @ApiProperty()
    
    readonly itemCount!: number;

    @ApiProperty()
    
    readonly pageCount!: number;

    @ApiProperty()
    
    readonly orderBy!: string | SortingDirection;

    @ApiProperty()
    
    readonly orderByPropertyName!: string;

    @ApiProperty()
    
    readonly items!: T[];



    constructor({ pageNumber,pageSize,orderBy,orderByPropertyName,itemCount,items }:any) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.itemCount = itemCount;
        this.orderBy=orderBy;
        this.orderByPropertyName=orderByPropertyName;
        this.pageCount = Math.ceil(itemCount / this.pageSize);
        this.items=items;
    }
}