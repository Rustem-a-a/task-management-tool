import React, {FC} from 'react';
import styles from "./TasksForModal.module.scss";
import {ITaskResponse} from "../../../../types/response/response";

interface IProps{
    task: ITaskResponse
}
const TasksForModal:FC<IProps> = ({task}) => {
    return (
        <div className={styles.task}>
            <div className={styles.taskTitle}>
                <h1>{task.title}</h1>
            </div>
            <div className={styles.taskDetails}>
                <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Description:</p>
                    <p className={styles.detailValue}>{task.description}</p>
                </div>
                <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Deadline:</p>
                    <p className={styles.detailValue}>{task.deadline.split('T')[0]}</p>
                </div>
                <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Work time:</p>
                    <p className={styles.detailValue}>{task.workTime.split('T')[0]}</p>
                </div>
                <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Priority:</p>
                    <p className={styles.detailValue}>{task.priority.split('T')[0]}</p>
                </div>
                <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Status:</p>
                    <p className={styles.detailValue}>{task.status}</p>
                </div>
            </div>
        </div>
    );
};

export default TasksForModal;
