import { Module, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesGuard } from 'src/utils/roles/roles.guard';
import { CoursesController } from './courses.controller';
import { Course } from './courses.model';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
    imports: [SequelizeModule.forFeature([Course])],
    controllers: [CoursesController],
    providers: [CoursesService, CoursesRepository],
})
export class CoursesModule { }
