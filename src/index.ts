import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import { tasks } from '../db';
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
} from './types/global';
import { ICreateTaskModel } from './models/CreateTaskModel';
import { ITaskView } from './views/TaskView';
import { Response } from 'express';
import { IGetTaskModel } from './models/GetTaskModel';
import { IGetTasksModel } from './models/GetTasksModel';
import { IUpdateTaskModel } from './models/UpdateTaskModel';
import { IUrlParamsTaskModel } from './models/UrlParamsTaskModel';
import { ITaskErrorResponse } from './views/Error'
import { IDeleteTaskView } from './views/DeleteTaskView/interface'
import { Category, Priority, Status } from './types/enums'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/tasks', (req: RequestWithBody<ICreateTaskModel>, res: Response<ITaskView | ITaskErrorResponse>) =>{

    const { title, description, status, category, priority, createdAt} = req.body;


    if (!title || !status || !category || !priority || !createdAt) {
        return res.status(400).json({ error: 'Missing required fields: title, status, category, priority' });
    }

    if (!Object.values(Status).includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    if (!Object.values(Category).includes(category)) {
        return res.status(400).json({ error: 'Invalid category value' });
    }

    if (!Object.values(Priority).includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
    }


    const newTask: ITaskView = {
        id: crypto.randomUUID(),
        title,
        description,
        status,
        category,
        priority,
        createdAt,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks', (req: RequestWithQuery<IGetTasksModel>, res: Response<ITaskView[] | ITaskErrorResponse>) => {
    const { status, category, priority, title } = req.query;

    let filteredTasks = [...tasks];

    if (status && Object.values(Status).includes(status)) {
        filteredTasks = filteredTasks.filter((task) => task.status === status);
    } else if (status) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    if (category && Object.values(Category).includes(category)) {
        filteredTasks = filteredTasks.filter((task) => task.category === category);
    } else if (category) {
        return res.status(400).json({ error: 'Invalid category value' });
    }

    if (priority && Object.values(Priority).includes(priority)) {
        filteredTasks = filteredTasks.filter((task) => task.priority === priority);
    } else if (priority) {
        return res.status(400).json({ error: 'Invalid priority value' });
    }

    if (title) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    res.status(200).json(filteredTasks);
});


app.get('/tasks/:id', (req: RequestWithParams<IGetTaskModel>, res: Response<ITaskView | ITaskErrorResponse>) => {
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

app.delete('/tasks/:id', (req: RequestWithParams<IUrlParamsTaskModel>, res: Response<IDeleteTaskView | ITaskErrorResponse>) => {
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({body: 'Task deleted successfully.'});
});


app.patch('/tasks/:id', (req: RequestWithParamsAndBody<IUrlParamsTaskModel, IUpdateTaskModel>, res: Response<ITaskView | ITaskErrorResponse>) => {
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, status, category, priority } = req.body;
    const task = tasks[taskIndex];

    if (status) {
        if (!Object.values(Status).includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        task.status = status;
    }

    if (category) {
        if (!Object.values(Category).includes(category)) {
            return res.status(400).json({ error: 'Invalid category value' });
        }
        task.category = category;
    }

    if (priority) {
        if (!Object.values(Priority).includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority value' });
        }
        task.priority = priority;
    }

    if (title) {
        task.title = title;
    }

    if (description !== undefined) {
        task.description = description;
    }

    res.json(task);
});


app.listen(80, () => {
    console.log('Server running on port 80');
});