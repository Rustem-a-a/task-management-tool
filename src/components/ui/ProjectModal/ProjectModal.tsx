import React, { useState } from 'react';
import styles from './ProjectModal.module.scss';
interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>
}
interface INewProject {
    name: string;
    deadline: Date;
    start: Date;
}
const AddTaskForm: React.FC<IProps> = ({ setIsModal }) => {
    const [project, setProject] = useState<INewProject>({
        name: '',
        deadline: new Date(),
        start: new Date(),
    });
    console.log(project.deadline)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    return (
        <div className={styles.addTaskForm}
        onClick={e=>e.stopPropagation()}>
            <h1>Add project</h1>
            <div className={styles.name}>
                <label><h2>Название:</h2></label>
                <input
                    type="text"
                    name="name"
                    value={project.name}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.date}>
                <label><h2>Срок:</h2></label>
                <input
                    type="date"
                    name="deadline"
                    value={project.deadline.toISOString().slice(0, 10)}
                    onChange={(e) => {
                                setProject({ ...project, deadline: new Date(e.target.value)});
                        }
                    }
                />
            </div>
            <div className={styles.date}>
                <label><h2>Начало:</h2></label>
                <input
                    type="date"
                    name="start"
                    value={project.start.toISOString().slice(0, 10)}
                    onChange={(e) => {
                        setProject({ ...project, start: new Date(e.target.value)});
                    }
                }
                />
            </div>
            <button onClick={()=>{
                setIsModal(false)}}>
                <h2>Создать</h2>
            </button>
        </div>
    );
};

export default AddTaskForm;