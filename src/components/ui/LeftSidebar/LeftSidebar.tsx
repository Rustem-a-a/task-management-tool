import React, {useState} from 'react';
import styles from './LeftSidebar.module.scss'
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import ProjectAddModal from "../ProjectModal/ProjectModal";
import {ProjectResponse} from "../../../types/response/response";
interface IProps{
    projects:ProjectResponse[]
}
const LeftSidebar = ({projects}:IProps) => {
    // const projects = useSelector((state:RootState) => state.projects)
    const [isModal, setIsModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');
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
                     }}/>
            </div>

            <div className={styles.projectsContainer}>
                {
                    projects.filter(v=>v.name.toLowerCase().includes(searchValue.toLowerCase())).map(project=>
                        <div className={styles.tasks} key={project._id}>
                            <Link to={`/${project._id}`}>
                                <img src="/task.svg" alt="task"/>
                                <p>{project.name}</p>
                            </Link>
                        </div>)
                }
            </div>
            {
                isModal && <Modal setIsModal={setIsModal}><ProjectAddModal setIsModal={setIsModal}/></Modal>
            }
        </div>
    );
};

export default LeftSidebar;
