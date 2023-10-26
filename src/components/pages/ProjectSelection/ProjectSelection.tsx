import React, {FC, useState} from 'react';
import styles from './ProjectSelection.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Link} from "react-router-dom";
import TaskActions from "../../ui/TaskActions/TaskActions";
import Modal from "../../ui/Modal/Modal";
import ProjectAddModal from "../../ui/ProjectModal/ProjectModal";
import {getColumnsTask, getColumnsTaskAsync} from "../../../store/actions/taskActions";

type filter = 'start' | 'deadline'
const ProjectSelection: FC = () => {
    const projects = useSelector((state: RootState) => state.projects)
    const isAuth = useSelector((state: RootState) => state.user.isAuth)
    const [isModal, setIsModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');
    const [filterValue, setSFilterValue] = useState<filter>('start');
    const dispatch = useDispatch()
    const handleFilterSelect = (selectedFilter: filter) => {
        setSFilterValue(selectedFilter)
    }
    return (
        <div className={styles.wrapper}>
            <TaskActions searchValue={searchValue} setSearchValue={setSearchValue} setIsModal={setIsModal}
                         nameFor={'Add project'} onSelectFilter={handleFilterSelect}/>

                   {isAuth &&
                       <div className={styles.projectsTable}>
                            <div className={`${styles.projects} ${styles.projectsHeader}`}>
                                <h3>Project name</h3>
                                <h3>Start</h3>
                                <h3>Deadline</h3>
                                <h3>Finish</h3>
                            </div>
                           {isAuth &&
                               projects.filter(v => v.name.toLowerCase().includes(searchValue.toLowerCase()))
                                   .sort((a,b)=>a?.[filterValue]?.localeCompare(b?.[filterValue]))
                                   .map(project => (
                                       <div key={project._id} className={styles.projects}>
                                           <Link   onClick={()=>{dispatch(getColumnsTaskAsync(project._id))}}
                                                   key={project._id} to={`/${project._id}`}>
                                               <p>{project.name}</p>
                                           </Link>
                                           <p>{project.start.split('T')[0]}</p>
                                           <p>{project.deadline.split('T')[0]}</p>
                                           <p>{project.finish ? project.finish.split('T')[0] : 'In progress'}</p>
                                       </div>

                                   ))}
                       </div>


                    }

            {
                isModal && <Modal setIsModal={setIsModal}><ProjectAddModal setIsModal={setIsModal}/></Modal>
            }
        </div>
    );
};

export default ProjectSelection;
