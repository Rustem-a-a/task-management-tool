import React, {useEffect, useState} from 'react';
import styles from './LeftSidebar.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Project} from "../../../types";
import {addProject} from "../../../store/actions/projectActions";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
const LeftSidebar = () => {
    const projects = useSelector((state:RootState) => state.projects)
    const dispatch = useDispatch()
    const [newProject, setNewProject] = useState<Project>({}as Project);
    const [isModal, setIsModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(()=>{
        // dispatch()
    }
    )
    return (
        <div className={styles.wrapper}>
            <Link to = '/'>
                <img src='/home.svg'/>
                <h2>Main</h2>
            </Link>
            <hr/>
            <div className={styles.projectsActions}>
                <input type="text"
                       value={searchValue}
                       onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search'/>
                <img src='/add.svg'
                     title='Add project'
                     onClick={()=>{
                         setIsModal(true)
                         // dispatch(addProject({
                         //     id:'project-3',
                         //     name: 'Third project',
                         //     start: new Date(),
                         //     finish:null
                         // }))
                     }}/>
            </div>

            <div className={styles.projectsContainer}>
                {
                    projects.filter(v=>v.name.toLowerCase().includes(searchValue.toLowerCase())).map(project=>
                        <div className={styles.tasks}>
                            <Link key={project.id} to={`/${project.id}`}>
                                <img src="/task.svg" alt="task"/>
                                <p>{project.name}</p>
                            </Link>
                        </div>)
                }
            </div>
            {
                isModal && <Modal setIsModal={setIsModal} children={<h1>Modal from left</h1>} />
            }
        </div>
    );
};

export default LeftSidebar;
