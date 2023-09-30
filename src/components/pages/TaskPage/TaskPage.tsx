import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {DropResult} from 'react-beautiful-dnd';
import TaskColumn from '../../ui/TaskColumn/TaskColumn';
import styles from './TaskPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {updateColumnsId} from "../../../store/actions/taskActions";
import {useParams, useSearchParams} from "react-router-dom";
import {Column, Project, Types} from "../../../types";
import TaskActions from "../../ui/TaskActions/TaskActions";

const TaskPage: React.FC = () => {
    const {projectId} = useParams()
    const project = useSelector((state: RootState) => state.projects).find(v => v.id === projectId) as Project
    const data = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch<AppDispatch>();
    const handleFilterSelect = (selectedFilter: string) => {
        // Здесь вы можете обработать выбранный фильтр
        console.log(`Выбран фильтр: ${selectedFilter}`)}
    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;
        console.log(source)
        console.log(destination)
        console.log(draggableId)
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startColumn = data.columns[source.droppableId];
        const endColumn = data.columns[destination.droppableId];

        if (startColumn === endColumn) {
            const newTaskIds = Array.from(startColumn.taskIds);
            let element = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, element[0]);

            const newColumn: Column = {
                ...startColumn,
                taskIds: newTaskIds,
            };

            const newData: Types = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };
            console.log(newData)
            dispatch(updateColumnsId(newData))
            // setData(newData);//
        } else {
            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStartColumn: Column = {
                ...startColumn,
                taskIds: startTaskIds,
            };

            const endTaskIds = Array.from(endColumn.taskIds);
            endTaskIds.splice(destination.index, 0, draggableId);
            const newEndColumn: Column = {
                ...endColumn,
                taskIds: endTaskIds,
            };
            const newData: Types = {
                ...data,
                columns: {
                    ...data.columns,
                    [newStartColumn.id]: newStartColumn,
                    [newEndColumn.id]: newEndColumn,
                },
            };
            console.log('!!!!!!!!!!')

            // dispatch(updateColumnsId(newEndColumn.id,newData))
            dispatch(updateColumnsId(newData))
            // setData(newData);
        }
    };

    return (
        <div className={styles.wrapper}>
        <TaskActions project={project} onSelectFilter={handleFilterSelect} />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.columnsWrapper}>
                    {Object.values(data.columns).map((column) => {
                        return (
                            <TaskColumn key={column.id} column={column}
                                        tasks={column.taskIds.map((taskId) => data.tasks[taskId])}/>
                        )
                    })}
                </div>

            </DragDropContext></div>
    );
};

export default TaskPage;
