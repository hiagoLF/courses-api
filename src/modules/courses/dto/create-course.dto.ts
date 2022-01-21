import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @Length(5, 20)
    name: string;

    @IsString()
    @Length(20, 100)
    @IsOptional()
    description: string;

    @IsNumber()
    @Min(10)
    price: number;
    
    @IsString()
    @IsNotEmpty()
    author: string;
}