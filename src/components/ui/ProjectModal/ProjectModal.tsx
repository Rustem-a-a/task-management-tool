import React, { useState } from 'react';
import styles from './ProjectModal.module.scss';
import {createProjectAsync} from "../../../store/actions/projectActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {ICreateProject} from "../../../types/IProject";
interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>
}
interface INewProject {
    name: string;
    deadline: string;
    start: string;
}
const ProjectModal: React.FC<IProps> = ({ setIsModal }) => {
    // const userId = useSelector((state:RootState) => state.user.user.id)
    const [project, setProject] = useState<ICreateProject>({
        name: '',
        deadline: '',
        start: '',
    });
    console.log(project)
    console.log(project.deadline)
    const dispatch = useDispatch()

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
                    // value={project.deadline.toISOString().slice(0, 10)}
                    value={project.deadline}
                    onChange={(e) => {
                                setProject({ ...project, deadline: e.target.value});
                        }
                    }
                />
            </div>
            <div className={styles.date}>
                <label><h2>Начало:</h2></label>
                <input
                    type="date"
                    name="start"
                    value={project.start}
                    onChange={(e) => {
                        setProject({ ...project, start: e.target.value});
                    }
                }
                />
            </div>
            <button onClick={()=>{
                dispatch(createProjectAsync({...project}))
                setIsModal(false)}}>
                <h2

                >Создать</h2>
            </button>
        </div>
    );
};

export default ProjectModal;