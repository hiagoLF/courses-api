import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateCourseDto } from 'src/modules/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/modules/courses/dto/update-course.dto';
import { Role } from 'src/utils/roles/role.enum';
import { Roles } from 'src/utils/roles/roles.decorator';
import { RolesGuard } from 'src/utils/roles/roles.guard';
import { PaginationResponse } from 'types/general';
import { Course } from './courses.model';
import { CoursesService } from './courses.service';
import { FindCoursesQueryDto } from './dto/find-courses.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @Get()
    findAll(@Query() query: FindCoursesQueryDto): Promise<PaginationResponse> {
        return this.coursesService.findAllCourses(query)
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Course> {
        return this.coursesService.findOneCourse(id)
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @Res() res: Response
    ): Promise<Response> {
        await this.coursesService.deleteCourse(id)
        return res.status(410).json({ message: 'Course deleted successfully' })
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCourseDto: UpdateCourseDto,
        @Res() res: Response
    ): Promise<Response> {
        await this.coursesService.updateCourse(id, updateCourseDto);
        return res.status(410).json({ message: 'Course updated successfully' })
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    create(
        @Body() createCourseDto: CreateCourseDto,
    ) {
        return this.coursesService.createCourse(createCourseDto)
    }
}
