import { Priority, Status, Category } from '../../types/enums'

export interface ICreateTaskModel {
    title: string,
    description?: string,
    priority: Priority,
    category: Category,
    status: Status,
    createdAt: string,
}



