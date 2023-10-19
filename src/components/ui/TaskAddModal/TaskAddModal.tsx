import React, { useState } from 'react';
import styles from './TaskAddModal.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {ICreateTask} from "../../../types/ITask";
import {createTaskAsync} from "../../../store/actions/taskActions";
interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>
}
interface INewProject {
    name: string;
    deadline: string;
    start: string;
}
const TaskAddModal: React.FC<IProps> = ({ setIsModal }) => {
    // const userId = useSelector((state:RootState) => state.user.user.id)
    const [task, setTask] = useState<ICreateTask>({
        title: 'string',
        start: '12.09.2023',
        deadline: '11.12.2023',
        priority: 'middle',
        projectId: '6522acb56e82f84be734f3fd'
    });
    console.log(task)

    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    return (
        <div className={styles.addTaskForm}
        onClick={e=>e.stopPropagation()}>
            <h1>Add Task</h1>
            <div className={styles.name}>
                <label><h2>Название:</h2></label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.date}>
                <label><h2>Срок:</h2></label>
                <input
                    type="date"
                    name="deadline"
                    // value={project.deadline.toISOString().slice(0, 10)}
                    value={task.deadline}
                    onChange={(e) => {
                                setTask({ ...task, deadline: e.target.value});
                        }
                    }
                />
            </div>
            <div className={styles.date}>
                <label><h2>Начало:</h2></label>
                <input
                    type="date"
                    name="start"
                    value={task.start}
                    onChange={(e) => {
                        setTask({ ...task, start: e.target.value});
                    }
                }
                />
            </div>
            <button onClick={()=>{
                console.log(task)
                dispatch(createTaskAsync({...task}))
                setIsModal(false)}}>
                <h2

                >Создать</h2>
            </button>
        </div>
    );
};

export default TaskAddModal;