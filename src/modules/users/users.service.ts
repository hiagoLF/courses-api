import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
    ) { }

    async findAll() {
        return this.userModel.findAll({ attributes: { exclude: ['password'] } })
    }

    async create(data: CreateUserDto) {
        const createdUser = await this.userModel.create(data)
        createdUser.password = null
        return createdUser
    }

    async findOneOrFail(id: string) {
        const user = await this.userModel.findOne({ where: { id }, attributes: { exclude: ['password'] } })
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async findByEmailOrFail(email: string) {
        const user = this.userModel.findOne({ where: { email } })
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async update(id: string, data: Partial<User>) {
        const hasBeenUpdated = await this.userModel.update(data, { where: { id } })
        if (!hasBeenUpdated[0]) throw new BadRequestException('User could not be updated')
    }

    async destroy(id: string) {
        const hasBeenDestroyed = await this.userModel.destroy({ where: { id } })
        if (!hasBeenDestroyed) throw new BadRequestException('User could not be removed')
    }
}
