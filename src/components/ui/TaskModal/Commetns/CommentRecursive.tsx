import React, {useState} from 'react';
import {ICommentsResponse} from "../../../../types/response/response";
import styles from './CommetnsForModal.module.scss'

interface IProps {
    comment: ICommentsResponse;
    allComments: ICommentsResponse[];
    setParentCommentId: React.Dispatch<React.SetStateAction<string>>;
    setIsReplyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comment = ({setParentCommentId, setIsReplyModal, comment, allComments}: IProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div>
            <div className={styles.commentInfo}>
                <p className={styles.user}>{comment.author} {comment.createdAt.split('T')[0]}</p>
                <p className={styles.text}>{comment.text}</p>
                <div className={styles.replyCommentWrapper}>
                    {comment.subcomments.length
                        ? <><img
                            src="/tree.svg"
                            alt="subcomments"
                            onClick={toggleCollapse}/>
                            <span>
                                {comment.subcomments.length === 1  ? `${comment.subcomments.length} comment` : `${comment.subcomments.length} comments`}
                            </span>
                        </>
                        : null}
                    <img
                        alt="reply"
                        src='/reply.svg'
                        onClick={() => {
                            setParentCommentId(comment?._id)
                            setIsReplyModal(true)}}/>
                </div>
            </div>
            {!isCollapsed && comment.subcomments?.length > 0 && (
                <div style={{marginLeft: '20px'}}>
                    {comment.subcomments.map((subcomment) => (
                        <Comment setParentCommentId={setParentCommentId} setIsReplyModal={setIsReplyModal} allComments={allComments} key={subcomment._id} comment={subcomment}/>))}
                </div>
            )}
        </div>
    );
};

export default Comment;
