import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Course } from "./courses.model";
import { FindCoursesQueryDto } from "./dto/find-courses.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CoursesRepository {
    constructor(
        @InjectModel(Course) private coursesModel: typeof Course,
    ) { }

    async findById(id: string) {
        return this.coursesModel.findOne({ where: { id } })
    }

    async destroyById(id: string) {
        return this.coursesModel.destroy({ where: { id } })
    }

    async updateCourseById(id: string, data: UpdateCourseDto) {
        return this.coursesModel.update(data, { where: { id } })
    }

    async findAllByQuery(query: FindCoursesQueryDto) {
        const data = await this.coursesModel.findAll({
            limit: 10,
            offset: query.page * 10 - 10,
            where: query.name && {
                name: {
                    [Op.like]: `%${query.name || ''}%`
                }
            },
            order: query.order && [['name', query.order]]
        })
        const count = await this.coursesModel.count({
            where: query.name && {
                name: {
                    [Op.like]: `%${query.name || ''}%`
                }
            },
        })
        return {
            pagination: {
                currentPage: Number(query.page),
                pagesNumber: Math.ceil(count / 10),
                objects: data.length,
            },
            data
        }
    }
}
