import React,{FC} from 'react';
import styles from './ProjectSelection.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Link} from "react-router-dom";
import TaskActions from "../../ui/TaskActions/TaskActions";

const ProjectSelection: FC = () => {
        const projects = useSelector((state:RootState) => state.projects)
    const isAuth = useSelector((state:RootState) => state.user.isAuth)
    console.log(isAuth)
    const handleFilterSelect = (selectedFilter: string) => {
        // Здесь вы можете обработать выбранный фильтр
        console.log(`Выбран фильтр: ${selectedFilter}`)}
        return (
        <div className={styles.wrapper}>
            <TaskActions nameFor={'Add project'} onSelectFilter={handleFilterSelect}/>
            <div className={styles.projects}>
                <p>project.id</p>
                <p>project.name</p>
                <p>project.start</p>
                <p>project.deadline</p>
                <p>project.finish</p>
                { isAuth&&
                    projects.map(project=><Link key={project.id} to={`/${project.id}`}>
                        <p>{project.name}</p>
                    </Link>)}
            </div>

        </div>
    );
};

export default ProjectSelection;
