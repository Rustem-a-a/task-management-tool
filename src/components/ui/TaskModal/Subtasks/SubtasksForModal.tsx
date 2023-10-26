import React, {FC} from 'react';
import styles from "./SubtasksForModal.module.scss";
import {editTaskAsync, getColumnsTaskAsync} from "../../../../store/actions/taskActions";
import {ITaskResponse} from "../../../../types/response/response";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

interface IProps{
    tasks: {[key:string]:ITaskResponse};
    setIsSubtaskModal: React.Dispatch<React.SetStateAction<boolean>>
    task:ITaskResponse
}
const SubtasksForModal:FC<IProps> = ({tasks,setIsSubtaskModal,task}) => {
    const {projectId } = useParams()
    const dispatch = useDispatch()
    const setColor = (status:string)=>{
        if(status==='Queue')return 'orange'
        else if(status==='Development')return 'purple'
        else return 'green'
    }
    return (
        <div className={styles.subtasks}>
            <div className={styles.taskActionsAddTask}>
                <span onClick={()=>{setIsSubtaskModal(true)}}><img src="/addTask.svg" alt="addTask"/>Add subtask</span>
            </div>
            {Object.values(tasks).filter(v=>v.child && task.subtasks.includes(v._id)).map(task =>
                <div key={task._id} className={`${styles.subtaskInfo} ${styles[setColor(task.status)]}`}>
                    <div className={styles.subtaskTitleStatus}>
                        <h1 className={styles.subtaskTitle}>{task?.title}</h1>
                        <div className={styles.subtaskStatus}>
                            <p
                                onClick={ () => {
                                    dispatch(editTaskAsync({...task,status:'Queue'},projectId as string))
                                    dispatch(getColumnsTaskAsync(projectId as string))
                                }}
                            >Queue</p>
                            <p
                                onClick={()=> {
                                    dispatch(editTaskAsync({...task,status:'Development'},projectId as string))
                                    dispatch(getColumnsTaskAsync(projectId as string))

                                }}>Development</p>
                            <p
                                onClick={()=> {
                                    dispatch(editTaskAsync({...task,status:'Done'},projectId as string))
                                    dispatch(getColumnsTaskAsync(projectId as string))
                                }}>Done</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Description:</span>
                        <span className={styles.infoValue}>{task?.description}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Start:</span>
                        <span className={styles.infoValue}>{task?.start.split('T')[0]}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Deadline:</span>
                        <span className={styles.infoValue}>{task?.deadline.split('T')[0]}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Priority:</span>
                        <span className={styles.infoValue}>{task?.priority}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Status:</span>
                        <span className={styles.infoValue}>{task?.status}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubtasksForModal;
