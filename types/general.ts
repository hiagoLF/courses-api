import { Course } from "src/modules/courses/courses.model";

export interface Pagination {
    currentPage: number,
    pagesNumber: number,
    objects: number,
}

export interface PaginationResponse {
    pagination: Pagination
    data: Course[]
}