import { MiddlewareConsumer, Module, NestModule, RequestMethod, UseGuards } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { Course } from './courses.model';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';
import { TestMiddleware } from './test.middleware';

@Module({
    imports: [SequelizeModule.forFeature([Course])],
    controllers: [CoursesController],
    providers: [CoursesService, CoursesRepository],
})
export class CoursesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TestMiddleware)
            .forRoutes({ path: 'courses', method: RequestMethod.GET });
    }
}
