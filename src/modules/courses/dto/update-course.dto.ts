import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @Length(5, 20)
    name: string;

    @IsOptional()
    @IsString()
    @Length(20, 100)
    description: string;

    @IsOptional()
    @IsNumber()
    @Min(10)
    price: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author: string;
}