import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/courses.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './modules/courses/courses.model';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/users.model';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './utils/roles/roles.guard';


@Module({
  imports: [
    CoursesModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'courses',
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [Course, User],
    }),
    AuthModule,
  ],
  providers: [
    RolesGuard
  ]
})

export class AppModule { }
