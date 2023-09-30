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
    console.log(tasks)
    return (
            <Droppable   droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.column}
                    >
                        <h2>{column.title}</h2>

                        {tasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index} />

                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
    );
};

export default TaskColumn