import React, {FC, useState} from 'react';
import styles from './TaskActions.module.scss'
import {Project} from "../../../types";
type filter = 'start' | 'deadline'

interface IProps  {
    project?:string;
    onSelectFilter?: (filter: filter) => void;
    nameFor:string
    searchValue:string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>

}
const TaskActions:FC<IProps> = ({searchValue,setSearchValue,setIsModal,nameFor,project='Projects',onSelectFilter} ) => {
    const [selectedFilter, setSelectedFilter] = useState<filter>('start');
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue:filter = event.target.value as filter;
        setSelectedFilter(selectedValue);
        if(onSelectFilter){onSelectFilter(selectedValue);}

    };
    return (
        <div className={styles.taskActionsTitle}>
            <h1>{project}</h1>
            <div className={styles.taskActions}>
                <div className={styles.taskActionsAddTask}>

                    <span onClick={()=>{setIsModal(true)}}><img src="/addTask.svg" alt="addTask"/> {nameFor}</span>
                </div>
                <input type="text" placeholder='search' className={styles.input}
                       value={searchValue}
                       onChange={(e)=>setSearchValue(e.target.value)}
                />
                <div className={styles.filterDropdown}>
                    <label htmlFor="filterSelect">Sort:</label>
                    <select
                        id="filterSelect"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className={styles.select}
                    >
                        <option value="">-- Выбрать --</option>
                        <option value="start">Start</option>
                        <option value="deadline">Deadline</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskActions;
