import React, {FC, useState} from 'react';
import styles from './TaskActions.module.scss'
import {Project} from "../../../types";

interface IProps  {
    project?:string;
    onSelectFilter: (filter: string) => void;
    nameFor:string
}
const TaskActions:FC<IProps> = ({nameFor,project='Projects',onSelectFilter} ) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedFilter(selectedValue);
        onSelectFilter(selectedValue);
    };
    return (
        <div className={styles.taskActionsTitle}>
            <h1>{project}</h1>
            <div className={styles.taskActions}>
                <div className={styles.taskActionsAddTask}>

                    <span><img src="/addTask.svg" alt="addTask"/> {nameFor}</span>
                </div>
                <input type="text" placeholder='search' className={styles.input}/>
                <div className={styles.filterDropdown}>
                    <label htmlFor="filterSelect">Sort:</label>
                    <select
                        id="filterSelect"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className={styles.select}
                    >
                        <option value="">-- Выбрать --</option>
                        <option value="name">По имени</option>
                        <option value="date">По дате</option>
                        <option value="priority">По приоритету</option>
                        <option value="deadline">По дедлайну</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskActions;
