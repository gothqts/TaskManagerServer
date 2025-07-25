import { Category, Priority, Status } from '../../types/enums'

export interface IGetTasksModel{
    status?: Status,
    category?: Category,
    priority?: Priority,
    title: string
}