import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class FindCoursesQueryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    order?: string;

    @IsNumberString()
    page: number;
}