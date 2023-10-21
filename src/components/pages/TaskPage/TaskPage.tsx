import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {DropResult} from 'react-beautiful-dnd';
import TaskColumn from '../../ui/TaskColumn/TaskColumn';
import styles from './TaskPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {useParams, useSearchParams} from "react-router-dom";
import {Column, Project, Types} from "../../../types";
import TaskActions from "../../ui/TaskActions/TaskActions";
import {IColumnsResponse, IColumnsTaskResponse, ProjectResponse} from "../../../types/response/response";
import Modal from "../../ui/Modal/Modal";
import TaskAddModal from "../../ui/TaskAddModal/TaskAddModal";
import {editColumn, editColumnAsync} from "../../../store/actions/columnActions";
import {getColumnsTaskAsync} from "../../../store/actions/taskActions";

const TaskPage: React.FC = () => {
    const {projectId } = useParams()
    const project = useSelector((state: RootState) => state.projects).find(v => v._id === projectId) as ProjectResponse
    const dataStore = useSelector((state: RootState) => state.tasks);
    const [data, setData] = useState(dataStore);
    // console.log(dataStore.columns)
    const dispatch = useDispatch<AppDispatch>();
    const [isModal, setIsModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(() => {
            dispatch(getColumnsTaskAsync(projectId as string))
    }, [projectId]);

    useEffect(() => {
            setData(dataStore)
    }, [dataStore]);


    const handleFilterSelect = (selectedFilter: string) => {
        // Здесь вы можете обработать выбранный фильтр
        console.log(`Выбран фильтр: ${selectedFilter}`)}
    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;
        console.log('source '+ JSON.stringify(source))
        console.log('destination ' + JSON.stringify(destination))
        console.log('draggableId '+ draggableId)
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

            const newData: {columns:{[key:string]:IColumnsResponse} } = {
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };
            console.log(newData)
            setData({...data,...newData})

            dispatch(editColumnAsync(projectId as string,newData))
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
            const newData: { columns:{[key:string]:IColumnsResponse} } = {
                columns: {
                    ...data.columns,
                    [newStartColumn.id]: newStartColumn,
                    [newEndColumn.id]: newEndColumn,
                },
            };
            console.log(newData)

            // dispatch(updateColumnsId(newEndColumn.id,newData))
            console.log(projectId)
            setData({...data,...newData});

            dispatch(editColumnAsync(projectId as string,newData))
        }
    };

    return (
        <div className={styles.wrapper}>
        <TaskActions searchValue={searchValue} setSearchValue={setSearchValue} setIsModal={setIsModal} nameFor={'Add Task'} project={project?.name} onSelectFilter={handleFilterSelect}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.columnsWrapper}>
                    {Object.values(data?.columns)?.map((column) => {
                        return (
                            <TaskColumn key={column.id} column={column}
                                        tasks={column.taskIds.map((taskId) => data.tasks[taskId])}/>
                        )
                    })}
                </div>
            </DragDropContext>
            {
                isModal && <Modal setIsModal={setIsModal}><TaskAddModal projectId={projectId as string} setIsModal={setIsModal}/></Modal>
            }
        </div>
    );
};

export default TaskPage;
