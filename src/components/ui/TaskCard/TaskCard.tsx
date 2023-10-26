import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Modal from "../Modal/Modal";
import TaskModal from "../TaskModal/TaskModal";
import styles from "./TaskCard.module.scss";
import {ITaskResponse} from "../../../types/response/response";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

interface TaskProps {
    task: ITaskResponse;
    index: number;
    columnTitle: string

}

const TaskCard: React.FC<TaskProps> = ({ task, index,columnTitle }) => {
    const tasksStore = useSelector((state: RootState) => state.tasks.tasks);
    const [isCardModal, setIsCardModal] = useState<boolean>(false);
    const setColor = (name:string)=>{
        if(name==='Queue')return 'orange'
        else if(name==='Development')return 'purple'
        else return 'green'
    }
    return (
        <>
        <Draggable draggableId={task?._id} index={index}>
            {(provided) => (
                <div className={`${styles.taskCard} ${styles[setColor(columnTitle)]}`}
                    onClick={()=>{
                        setIsCardModal(true)}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                        <h1 className={styles.taskTitle}>{task?.title}</h1>
                        <div className={styles.taskInfo}>
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
                        </div>
                </div>
            )}
        </Draggable>
            {isCardModal && <Modal setIsModal={setIsCardModal} children={<TaskModal tasks={tasksStore}  task={task}/>}></Modal>}
        </>
    );
};

export default TaskCard