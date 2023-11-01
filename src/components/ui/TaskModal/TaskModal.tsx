import React, {useEffect, useState} from "react";
import styles from './TaskModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {ITaskResponse} from "../../../types/response/response";
import Modal from "../Modal/Modal";
import TaskAddModal from "../TaskAddModal/TaskAddModal";
import {useParams} from "react-router-dom";
import SubtasksForModal from "./Subtasks/SubtasksForModal";
import TasksForModal from "./Tasks/TasksForModal";
import CommetnsForModal from "./Commetns/CommetnsForModal";
import CommentAddModal from "../CommentAddModal/CommentAddModal";
import {getCommentsAsync} from "../../../store/actions/commentActions";
import AttachmentsForModal from "./Attachments/AttachmentsForModal";

interface IProps {
    task: ITaskResponse
    tasks: {[key: string]: ITaskResponse}
}
const TaskModal = ({task,tasks}: IProps) => {
    const {projectId } = useParams()
    const [tab, setTab] = useState<string>('task');
    const [isSubtaskModal, setIsSubtaskModal] = useState<boolean>(false)
    const [isModalAddComments, setIsModalAddComments] = useState<boolean>(false)
    const comments = useSelector((state:RootState) => state.comments)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommentsAsync(task._id))
    }, []);
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
                    Task
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
            {tab === 'comments' && <CommetnsForModal taskId={task._id}  setIsModalAddComments={setIsModalAddComments} comments={comments}/>}
            {tab === 'attachments' && <AttachmentsForModal task={task}/>}

            {
                isSubtaskModal && <Modal setIsModal={setIsSubtaskModal}><TaskAddModal title='Add subtask' projectId={projectId as string}  parentId={task._id as string} setIsModal={setIsSubtaskModal}/></Modal>
            }
            {
                isModalAddComments && <Modal setIsModal={setIsModalAddComments}><CommentAddModal taskIdQuery={task._id}  taskId={task._id as string} setIsModalAddComments={setIsModalAddComments}/></Modal>
            }
        </div>
    );
};
export default TaskModal;