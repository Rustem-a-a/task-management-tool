import React,{FC} from 'react';
import styles from './ProjectSelection.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Link} from "react-router-dom";

const ProjectSelection: FC = () => {
        const projects = useSelector((state:RootState) => state.projects)

        return (
        <div className={styles.projectSelection}>
                <h1>Выбор проекта</h1>
                {
                    projects.map(project=><Link key={project.id} to={`/${project.id}`}>
                            <p>{project.name}</p>
                    </Link>)}
        </div>
    );
};

export default ProjectSelection;
