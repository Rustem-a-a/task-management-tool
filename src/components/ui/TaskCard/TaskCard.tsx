import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {Task} from "../../../types";
import Modal from "../Modal/Modal";
import TaskModal from "../TaskModal/TaskModal";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./TaskCard.module.scss";

interface TaskProps {
    task: Task;
    index: number;
    columnTitle: string
}

const TaskCard: React.FC<TaskProps> = ({ task, index,columnTitle }) => {
    const [isCardModal, setIsCardModal] = useState<boolean>(false);
    const setColor = (name:string)=>{
        if(name==='Queue')return 'purple'
        else if(name==='Development')return 'orange'
        else return 'green'
    }
    return (
        <>
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div className={`${styles.taskCard} ${styles[setColor(columnTitle)]}`}
                    onClick={()=>{
                        setIsCardModal(true)}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                        <h2 className={styles.taskTitle}>{index+1}. {task.title}</h2>
                        <div className={styles.taskInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Создана:</span>
                                <span className={styles.infoValue}>{task.start}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Срок:</span>
                                <span className={styles.infoValue}>{task.deadline}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Приоритет:</span>
                                <span className={styles.infoValue}>{task.priority}</span>
                            </div>
                        </div>
                </div>
            )}
        </Draggable>
            {isCardModal && <Modal setIsModal={setIsCardModal} children={<TaskModal setIsModal={setIsCardModal} task={task}/>}></Modal>}
        </>
    );
};

export default TaskCard