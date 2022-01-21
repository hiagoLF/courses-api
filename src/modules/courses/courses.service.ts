import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesRepository } from './courses.repository'
import { UpdateCourseDto } from './dto/update-course.dto';
import { FindCoursesQueryDto } from './dto/find-courses.dto';

@Injectable()
export class CoursesService {

    constructor(
        @InjectModel(Course) private coursesModel: typeof Course,
        private coursesRepository: CoursesRepository
    ) { }

    async findAllCourses(query: FindCoursesQueryDto) {
        return this.coursesRepository.findAllByQuery(query)
    }

    async findOneCourse(id: string) {
        const course = await this.coursesRepository.findById(id)
        if (!course) throw new NotFoundException('Course not Found')
        return course
    }

    async createCourse(data: CreateCourseDto) {
        const newCourse = await this.coursesModel.create(data)
        return newCourse
    }

    async deleteCourse(id: string) {
        const deletedCourse = await this.coursesRepository.destroyById(id)
        if (!deletedCourse) throw new NotFoundException('Course not Found')
    }

    async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
        const updatedCourse = await this.coursesRepository.updateCourseById(id, updateCourseDto)
        if (!updatedCourse[0]) throw new NotFoundException('Course not Found')
    }
}
