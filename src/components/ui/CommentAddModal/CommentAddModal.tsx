import React from 'react';
import styles from './CommentAddModal.module.scss';
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {ICreateComment} from "../../../types/IComment";
import {createCommentAsync} from "../../../store/actions/commentActions";
interface IProps{
    setIsModalAddComments :  React.Dispatch<React.SetStateAction<boolean>>;
    parentId?:string;
    taskId?:string;
    taskIdQuery:string;
}
const CommentAddModal: React.FC<IProps> = ({ taskIdQuery,taskId,parentId,setIsModalAddComments }) => {
    const dispatch = useDispatch()
    const {control,handleSubmit,formState:{errors}} = useForm<ICreateComment>()
    const onSubmit = (data: ICreateComment) => {
        if (taskId){dispatch(createCommentAsync({...data,taskId:taskId,taskIdQuery:taskIdQuery}))}
        if (parentId){dispatch(createCommentAsync({...data,parentId:parentId,taskIdQuery:taskIdQuery}))}
        setIsModalAddComments(false)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addCommentForm}
              onClick={e=>e.stopPropagation()}>
            <h1>Add Comment</h1>
            <div className={styles.text}>
                <h2><label htmlFor='text'>Text:</label></h2>
                <Controller
                    name="text"
                    control={control}
                    rules={{
                        required: 'Comment text is required',
                        minLength: {
                            value: 1,
                            message: 'Text must consist at least of 1 characters long',
                        },
                    }}
                    render={({field}) => (
                        <textarea id='text' {...field} />
                    )}
                />
                {errors.text
                    ? <p className={styles.error}>{errors.text.message}</p>
                    : <p className={styles.error}></p>}
            </div>
            <button type='submit'>
                <h2>Создать</h2>
            </button>
        </form>
    );
};
export default CommentAddModal;
