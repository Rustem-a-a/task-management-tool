import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskColumn.module.scss'
import {Column, Task} from "../../../types";
interface ColumnProps {
    column: Column;
    tasks: Task[];
}

const TaskColumn: React.FC<ColumnProps> = ({ column, tasks }) => {
    const setColor = (name:string)=>{
        if(name==='Queue')return 'purple'
        else if(name==='Development')return 'orange'
        else return 'green'
    }
    return (
            <Droppable   droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.column}
                    >
                        <h1 onClick={()=>{
                        console.log(column.title)}}
                        // style={{color:setColor(column.title)}}
                        >{column.title}</h1>

                        {tasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index} columnTitle={column.title}/>

                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
    );
};

export default TaskColumn