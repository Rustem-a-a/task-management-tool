import {ADD_TASK, DELETE_TASK, UPDATE_COLUMNS_ID, UPDATE_TASK} from '../actions/taskActions';
import {Types} from "../../types";

export const initialState: Types = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Queue',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4',
                // 'task-5', 'task-6', 'task-7', 'task-8'
            ],
        },
        'column-2': {
            id: 'column-2',
            title: 'Development',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        }
    },
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Задача 2',
            description: 'Описание задачи 2',
            start: '02.01.2023',
            workTime: '2 часа',
            deadline: '12.01.2023',
            priority: 'Средний',
            attachments: ['file3.pdf'],
            status: 'Завершена',
            subTasks: [],
            comments: [],
        },
        'task-2': {
            id: 'task-2',
            title: 'Задача 3',
            description: 'Описание задачи 3',
            start: '03.01.2023',
            workTime: '4 часа',
            deadline: '15.01.2023',
            priority: 'Низкий',
            attachments: [],
            status: 'В процессе',
            subTasks: [],
            comments: [],
        },
        'task-3': {
            id: 'task-3',
            title: 'Задача 4',
            description: 'Описание задачи 4',
            start: '04.01.2023',
            workTime: '5 часов',
            deadline: '20.01.2023',
            priority: 'Средний',
            attachments: ['file4.docx'],
            status: 'В процессе',
            subTasks: [],
            comments: [],
        },
        'task-4': {
            id: 'task-4',
            title: 'Задача 5',
            description: 'Описание задачи 5',
            start: '05.01.2023',
            workTime: '1 час',
            deadline: '25.01.2023',
            priority: 'Высокий',
            attachments: [],
            status: 'Завершена',
            subTasks: [],
            comments: [],
        },
        'task-5': {
            id: 'task-5',
            title: 'Задача 2',
            description: 'Описание задачи 2',
            start: '02.01.2023',
            workTime: '2 часа',
            deadline: '12.01.2023',
            priority: 'Средний',
            attachments: ['file3.pdf'],
            status: 'Завершена',
            subTasks: [],
            comments: [],
        },
        'task-6': {
            id: 'task-6',
            title: 'Задача 3',
            description: 'Описание задачи 3',
            start: '03.01.2023',
            workTime: '4 часа',
            deadline: '15.01.2023',
            priority: 'Низкий',
            attachments: [],
            status: 'В процессе',
            subTasks: [],
            comments: [],
        },
        'task-7': {
            id: 'task-7',
            title: 'Задача 4',
            description: 'Описание задачи 4',
            start: '04.01.2023',
            workTime: '5 часов',
            deadline: '20.01.2023',
            priority: 'Средний',
            attachments: ['file4.docx'],
            status: 'В процессе',
            subTasks: [],
            comments: [],
        },
        'task-8': {
            id: 'task-8',
            title: 'Задача 5',
            description: 'Описание задачи 5',
            start: '05.01.2023',
            workTime: '1 час',
            deadline: '25.01.2023',
            priority: 'Высокий',
            attachments: [],
            status: 'Завершена',
            subTasks: [],
            comments: [],
        }
    }
}

const taskReducer = (state = initialState, action: any) => {
    switch (action.type) {
            case UPDATE_COLUMNS_ID:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default taskReducer;
