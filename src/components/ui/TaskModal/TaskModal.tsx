import React, {useState} from "react";
import styles from './TaskModal.module.scss'
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {ITaskResponse} from "../../../types/response/response";
import Modal from "../Modal/Modal";
import {editTaskAsync, getColumnsTaskAsync} from "../../../store/actions/taskActions";
import TaskAddModal from "../TaskAddModal/TaskAddModal";
import {useParams} from "react-router-dom";
import SubtasksForModal from "./Subtasks/SubtasksForModal";
import TasksForModal from "./Tasks/TasksForModal";
import CommetnsForModal from "./Commetns/CommetnsForModal";
import CommentAddModal from "../CommentAddModal/CommentAddModal";

interface IProps {
    task: ITaskResponse
    tasks: {[key: string]: ITaskResponse}
}

const TaskModal = ({task,tasks}: IProps) => {
    const {projectId } = useParams()
    const [tab, setTab] = useState<string>('task');
    const [comments, setComments] = useState<any>({});
    const [changeState, setChangeState] = useState(true);
    const [isSubtaskModal, setIsSubtaskModal] = useState<boolean>(false)
    const [isModalAddComments, setIsModalAddComments] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();


    return (
        <div className={styles.taskInfo} onClick={e => {
            e.stopPropagation()
        }}>
            <nav className={styles.tabs}>
                <div className={styles.tab}
                     onClick={() => {
                         setTab('task')
                     }}
                >
                    Task info
                </div>
                <div className={styles.tab}
                     onClick={() => {
                         setTab('subtasks')
                     }}
                >
                    Subtasks
                </div>
                <div className={styles.tab}
                     onClick={() => {
                         setTab('comments')
                     }}
                >
                    Comments
                </div>
                <div className={styles.tab}
                     onClick={() => {
                         setTab('attachments')
                     }}
                >
                    Attachments
                </div>
            </nav>
            {tab === 'task' && <TasksForModal task={task}/>}
            {tab === 'subtasks' && <SubtasksForModal setIsSubtaskModal={setIsSubtaskModal} tasks={tasks} task={task}/>}
            {tab === 'comments' && <CommetnsForModal setIsModalAddComments={setIsModalAddComments} comments={comments}/>}

            {
                isSubtaskModal && <Modal setIsModal={setIsSubtaskModal}><TaskAddModal title='Add subtask' projectId={projectId as string}  parentId={task._id as string} setIsModal={setIsSubtaskModal}/></Modal>
            }
            {
                isModalAddComments && <Modal setIsModal={setIsModalAddComments}><CommentAddModal taskId={task._id as string} setIsModalAddComments={setIsModalAddComments}/></Modal>
            }
        </div>
    );
};

export default TaskModal;
