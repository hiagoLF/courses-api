import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async index() {
        return await this.userService.findAll()
    }

    @Post()
    async store(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async show(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.findOneOrFail(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateUserDto,
        @Res() res: Response
    ) {
        await this.userService.update(id, body)
        return res.status(201).json({ message: 'User updated' })
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async destroy(
        @Param('id', ParseUUIDPipe) id: string,
        @Res() res: Response
    ) {
        await this.userService.destroy(id)
        return res.status(201).json({ message: 'User deleted' })
    }
}
