import { Category, Priority, Status } from './src/types/enums'
import { ITaskView } from './src/views/TaskView'


export let tasks: ITaskView[] = [
    {
        id: '1a2b3c4d-5678-90ef-ghij-klmnopqrstuv',
        title: 'Авторизация пользователей',
        description: 'Реализовать авторизацию пользователей',
        status: Status.TODO,
        category: Category.FEATURE,
        priority: Priority.HIGH,
        createdAt: '2025-07-22T09:15:00.000Z',
    },
    {
        id: '9a8b7c6d-5432-10fe-dcba-zyxwvutsrqpo',
        title: 'Загрузка изображений',
        description: 'Оптимизировать загрузку изображений',
        status: Status.IN_PROGRESS,
        category: Category.BUG,
        priority: Priority.MEDIUM,
        createdAt: '2025-07-30T19:00:00.000Z',
    },
    {
        id: '0f9e8d7c-6b5a-4938-7210-fedcba987654',
        title: 'Фильтрация таблицы',
        description: 'Добавить фильтрацию данных в таблице',
        status: Status.DONE,
        category: Category.DOCUMENTATION,
        priority: Priority.LOW,
        createdAt: '2025-07-23T16:45:30.750Z',
    }
]



