import React from 'react';
import styles from './TaskAddModal.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {ICreateTask} from "../../../types/ITask";
import {createTaskAsync} from "../../../store/actions/taskActions";
import {Controller, useForm} from "react-hook-form";
interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>;
    projectId?:string;
    parentId?:string
    title:string
    req?:()=>void
}
const TaskAddModal: React.FC<IProps> = ({ title,parentId,projectId,setIsModal }) => {
    const dispatch = useDispatch()
    const {control,handleSubmit,formState:{errors}} = useForm<ICreateTask>()
    const onSubmit = (data: ICreateTask) => {
        if (projectId && !parentId){dispatch(createTaskAsync({...data,projectId:projectId}))}
        if (parentId && projectId){dispatch(createTaskAsync({...data,parentId:parentId,projectId:projectId}))}
        setIsModal(false)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addTaskForm}
        onClick={e=>e.stopPropagation()}>
            <h1>{title}</h1>
            <div className={styles.name}>
                <h2><label htmlFor='title'>Name:</label></h2>
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: 'Task name is required',
                        minLength: {
                            value: 5,
                            message: 'Project name must be at least 5 characters long',
                        },
                    }}
                    render={({field}) => (
                        <input id='title' {...field} type="text"/>
                    )}
                />
                {errors.title
                    ? <p className={styles.error}>{errors.title.message}</p>
                    : <p className={styles.error}></p>}
            </div>
            <div className={styles.date}>
                <h2>
                    <label htmlFor='start'>Start</label>
                </h2>
                <Controller
                    name="start"
                    control={control}
                    rules={{
                        required: 'Start date is required',
                    }}
                    render={({field}) => (
                        <input id='start' {...field} type="date"/>
                    )}
                />
                {errors.start
                    ? <p className={styles.error}>{errors.start.message}</p>
                    : <p className={styles.error}></p>}
            </div>
            <div className={styles.date}>
                <h2>
                    <label htmlFor='deadline'>Deadline</label>
                </h2>
                <Controller
                    name="deadline"
                    control={control}
                    rules={{
                        required: 'Deadline is required',
                        validate: (value) => {
                            const startDate = control._getWatch('start');
                            if (value && startDate && value < startDate) {
                                return 'Deadline must be greater than or equal to the start date';
                            }
                            return true;
                        },
                    }}
                    render={({field}) => (
                        <input id='deadline' {...field} type="date"/>
                    )}
                />
                {errors.deadline
                    ? <p className={styles.error}>{errors.deadline.message}</p>
                    : <p className={styles.error}></p>}
            </div>
            <div className={styles.name}>
            <h2><label htmlFor='priority'>Priority:</label></h2>
            <Controller
                name="priority"
                control={control}
                rules={{
                    required: 'Priority is required',
                    validate: (value) => {
                        if (!['1','2','3','4','5'].includes(value)) {
                            return 'Priority must be 1-5';
                        }
                        return true;
                    }
                }}
                render={({field}) => (
                    <input placeholder='1-5' id='priority' {...field} type="text"/>
                )}
            />
            {errors.priority
                ? <p className={styles.error}>{errors.priority.message}</p>
                : <p className={styles.error}></p>}
        </div>

            <button type='submit'>
                <h2>Создать</h2>
            </button>
        </form>
    );
};

export default TaskAddModal;