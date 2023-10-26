import React from 'react';
import styles from './ProjectModal.module.scss';
import {createProjectAsync} from "../../../store/actions/projectActions";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";

interface IProps {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface INewProject {
    name: string;
    start: string;
    deadline: string;
}

const ProjectModal: React.FC<IProps> = ({setIsModal}) => {
    const dispatch = useDispatch()
    const {control, handleSubmit, formState: {errors}} = useForm<INewProject>();
    const onSubmit = (data: INewProject) => {
        dispatch(createProjectAsync(data))
        setIsModal(false)
    };
    return (
        <form className={styles.addProjectForm}
              onClick={e => e.stopPropagation()}
              onSubmit={handleSubmit(onSubmit)}>
            <h1>Add project</h1>
            <div className={styles.name}>
                <h2><label htmlFor='name'
                >Project name</label></h2>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: 'Project name is required',
                        minLength: {
                            value: 5,
                            message: 'Project name must be at least 5 characters long',
                        },
                    }}
                    render={({field}) => (
                        <input id='name' {...field} type="text"/>
                    )}
                />
                {errors.name
                    ? <p className={styles.error}>{errors.name.message}</p>
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
                            console.log(startDate)
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


            <button type='submit'>
                <h2>Создать</h2>
            </button>
        </form>
    );
};
export default ProjectModal;