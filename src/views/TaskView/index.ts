import { Category, Priority, Status } from '../../types/enums'

export interface ITaskView{
    id: string
    title: string
    description?: string
    status: Status
    category: Category
    priority: Priority
    createdAt: string
}