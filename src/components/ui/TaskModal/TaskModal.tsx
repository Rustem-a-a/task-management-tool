import React from "react";
import styles from './TaskModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {Task} from "../../../types";
import {ITaskResponse} from "../../../types/response/response";

interface IProps{
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    task :ITaskResponse
}
const TaskModal = ({setIsModal,task}:IProps) => {

    const data = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={styles.taskInfo} onClick={e=>{e.stopPropagation()}}>
            <h2 className={styles.taskTitle}>{task.title}</h2>
            <div className={styles.taskDescription}>{task.description}</div>
            <div className={styles.taskDetails}>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Создана:</span>
                    <span className={styles.detailValue}>{task.start}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Время в работе:</span>
                    <span className={styles.detailValue}>{task.workTime}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Срок:</span>
                    <span className={styles.detailValue}>{task.deadline}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Приоритет:</span>
                    <span className={styles.detailValue}>{task.priority}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Статус:</span>
                    <span className={styles.detailValue}>{task.status}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
