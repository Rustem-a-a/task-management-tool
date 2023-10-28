import React, {FC,useState} from 'react';
import styles from './CommetnsForModal.module.scss'
import {ICommentsResponse} from "../../../../types/response/response";
import Modal from "../../Modal/Modal";
import CommentAddModal from "../../CommentAddModal/CommentAddModal";
import CommentRecursive from "./CommentRecursive";
interface IProps{
    comments: ICommentsResponse[];
    setIsModalAddComments: React.Dispatch<React.SetStateAction<boolean>>;
    taskId:string
}
const CommentsForModal:FC<IProps> = ({taskId,comments,setIsModalAddComments}) => {
    const [isReplyModal, setIsReplyModal] = useState<boolean>(false);
    const [parentCommentId, setParentCommentId] = useState<string>('');
    const [allComments, setAllComments] = useState<ICommentsResponse[]>([]);
    return (
        <div className={styles.comments}>
                  <span onClick={()=>{setIsModalAddComments(true)}}><img src="/addTask.svg" alt="addTask"/>Add comment</span>
        <div className={styles.printedComment}>
            {
                comments.map(comment=>(<CommentRecursive setParentCommentId={setParentCommentId} setIsReplyModal={setIsReplyModal} allComments={allComments} comment={comment} key={comment._id}/> ))
            }
            {
                isReplyModal && <Modal setIsModal={setIsReplyModal}><CommentAddModal taskIdQuery={taskId} parentId={parentCommentId} setIsModalAddComments={setIsReplyModal}/></Modal>
            }
        </div>
        </div>
    );
};
export default CommentsForModal;