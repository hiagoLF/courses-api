import { IsArray, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"
import { MessagesHelper } from "src/helpers/messages";
import { RegExHelper } from "src/helpers/regex";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsArray()
    roles: string[]

    @IsString()
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}