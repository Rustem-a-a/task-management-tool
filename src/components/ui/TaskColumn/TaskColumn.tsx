import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskColumn.module.scss'
import {Column, Task} from "../../../types";
import {IColumnsResponse, ITaskResponse} from "../../../types/response/response";
interface ColumnProps {
    column: IColumnsResponse;
    tasks: ITaskResponse[];
}

const TaskColumn: React.FC<ColumnProps> = ({ column, tasks }) => {
    return (
            <Droppable   droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.column}
                    >
                        <p>{column.title}</p>

                        {tasks?.map((task:ITaskResponse, index:number) => (
                                <TaskCard key={task?._id} task={task}  index={index} columnTitle={column.title}/>

                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
    );
};

export default TaskColumn