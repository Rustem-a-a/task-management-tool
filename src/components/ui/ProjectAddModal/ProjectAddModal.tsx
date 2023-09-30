import React, {FC, useState} from "react";
import styles from './ProjectAddModal.module.scss'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>
}
interface Task {
    name: string;
    deadline: Date;
    start: Date;
}

const ProjectAddModal : FC<IProps>= ({setIsModal}) => {
    const [task, setTask] = useState<Task>({
        name: '',
        deadline: new Date(),
        start: new Date(),
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const handleDateChange = (date: Date, field: string) => {
        setTask({ ...task, [field]: date });
    };

    const handleSubmit = () => {
        setTask({
            name: '',
            deadline: new Date(),
            start: new Date(),
        });
        setIsModal(false)
    };

    return (
        <div className={styles.addTaskForm}
            onClick={e=>e.stopPropagation()}
        >
            <h2>Добавить задачу</h2>
            <div className={styles.field}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label>Срок:</label>
                <DatePicker
                    selected={task.deadline}
                    onChange={(date) => handleDateChange(date as Date, 'deadline')}
                />
            </div>
            <div className={styles.field}>
                <label>Начало:</label>
                <DatePicker
                    selected={task.start}
                    onChange={(date) => handleDateChange(date as Date, 'start')}
                />
            </div>
            <button onClick={handleSubmit}>Создать</button>
        </div>
    );
};

export default ProjectAddModal;
