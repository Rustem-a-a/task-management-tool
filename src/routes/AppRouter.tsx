import React from 'react';
import {Routes, Route } from 'react-router-dom';
import TaskPage from "../../src/components/pages/TaskPage/TaskPage";
import ProjectSelection from "../components/pages/ProjectSelection/ProjectSelection";
import styles from './AppRouter.module.scss'


const AppRouter = () => {
    return (
        <div className={styles.wrapper}>
            <Routes>
                <Route  path="/" element={<ProjectSelection/>} />
                <Route path="/:projectId" element={<TaskPage/>}/>
            </Routes>
        </div>

    );
};

export default AppRouter;
