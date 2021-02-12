
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortingDirection } from './sorting-direction';


export class PagingParams {
    @ApiPropertyOptional({
        enum: SortingDirection,
        default: SortingDirection.ASC,
    })
    @IsEnum(SortingDirection)
    @IsOptional()
    
    readonly orderBy: SortingDirection = SortingDirection.ASC;

    @ApiPropertyOptional()
    readonly orderByPropertyName:string='created_on';

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    
    readonly pageNumber: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Max(50)
    @IsOptional()
    
    readonly pageSize: number = 10;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    
    readonly search!: string;
}