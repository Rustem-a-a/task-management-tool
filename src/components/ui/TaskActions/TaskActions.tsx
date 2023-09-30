import React, {FC, useState} from 'react';
import styles from './TaskActions.module.scss'
import {Project} from "../../../types";

interface IProps  {
    project:Project;
    onSelectFilter: (filter: string) => void;
}
const TaskActions:FC<IProps> = ({project,onSelectFilter} ) => {
    const [selectedFilter, setSelectedFilter] = useState<string>(''); // текущий выбранный фильтр

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedFilter(selectedValue);
        onSelectFilter(selectedValue);
    };
    return (
        <div className={styles.taskActionsTitle}>
            <h1>{project?.name}</h1>
            <div className={styles.taskActions}>
                <div className={styles.taskActionsAddTask}>
                    <img src="/addTask.svg" alt="addTask"/>
                    <span>Add Task</span>
                </div>
                <input type="text" placeholder='search'/>
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
