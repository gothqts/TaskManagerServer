import { Category, Priority, Status } from '../../types/enums'

export interface IUpdateTaskModel {
    title: string,
    description?: string,
    status?: Status,
    category: Category,
    priority?: Priority,
    date: string,
}