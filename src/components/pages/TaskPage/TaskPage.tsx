import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {DropResult} from 'react-beautiful-dnd';
import TaskColumn from '../../ui/TaskColumn/TaskColumn';
import styles from './TaskPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {useParams} from "react-router-dom";
import {Column} from "../../../types";
import TaskActions from "../../ui/TaskActions/TaskActions";
import {IColumnsResponse, IColumnsTaskResponse, ITaskResponse, ProjectResponse} from "../../../types/response/response";
import Modal from "../../ui/Modal/Modal";
import TaskAddModal from "../../ui/TaskAddModal/TaskAddModal";
import {editColumnAsync} from "../../../store/actions/columnActions";
import {editTaskAsync, getColumnsTaskAsync} from "../../../store/actions/taskActions";

const TaskPage: React.FC = () => {
    const {projectId } = useParams()
    const project = useSelector((state: RootState) => state.projects).find(v => v._id === projectId) as ProjectResponse
    const dataStore = useSelector((state: RootState) => state.tasks);
    const [data, setData] = useState<IColumnsTaskResponse>(dataStore);
    const dispatch = useDispatch<AppDispatch>();
    const [isModal, setIsModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(() => {
            dispatch(getColumnsTaskAsync(projectId as string))
    }, [projectId]);

    useEffect(() => {
            setData(dataStore)
    }, [dataStore]);
    useEffect(() => {
            setData({...dataStore,tasks:Object.values(dataStore.tasks)
                    .filter(value => value.title.includes(searchValue))
                    .reduce((ac,value) =>
                    {ac[value._id]=value
                     return ac},{} as {[key:string]:ITaskResponse})})
    }, [searchValue]);
    const statusMap = {
        'column-1':'Queue',
        'column-2':'Development',
        'column-3':'Done',
    }
    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;
        // console.log('source '+ JSON.stringify(source))
        // console.log('destination ' + JSON.stringify(destination))
        // console.log('draggableId '+ draggableId)
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
            setData({...data,...newData});
            dispatch(editColumnAsync(projectId as string,newData))
        }
        if(source?.droppableId!==destination?.droppableId && destination?.droppableId!==undefined && destination?.droppableId!==null){
            //@ts-ignore
            dispatch(editTaskAsync({...dataStore.tasks[draggableId],status:statusMap[destination?.droppableId]},projectId as string))
            }
        };

    return (
        <div className={styles.wrapper}>
        <TaskActions searchValue={searchValue} setSearchValue={setSearchValue} setIsModal={setIsModal} nameFor={'Add Task'} project={project?.name}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.columnsWrapper}>
                    {Object.values(data?.columns)?.map((column) => {
                        return (
                            <TaskColumn key={column.id} column={column}
                                        tasks={column.taskIds.filter((taskId) => data.tasks[taskId]).map((taskId) => data.tasks[taskId])}/>
                        )
                    })}
                </div>
            </DragDropContext>
            {
                isModal && <Modal setIsModal={setIsModal}><TaskAddModal title='Add task' projectId={projectId as string} setIsModal={setIsModal}/></Modal>
            }
        </div>
    );
};

export default TaskPage;
