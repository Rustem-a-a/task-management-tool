import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {Task} from "../../../types";
import Modal from "../Modal/Modal";

interface TaskProps {
    task: Task;
    index: number;
}

const TaskCard: React.FC<TaskProps> = ({ task, index }) => {
    const [isCardModal, setIsCardModal] = useState<boolean>(false);
    return (<>

        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    onClick={()=>{
                        setIsCardModal(true)}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <h6>{task.title}</h6>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                </div>
            )}
        </Draggable>
        {isCardModal && <Modal setIsModal={setIsCardModal} Children={<h1>Hello</h1>}/>}
        </>
    );
};

export default TaskCard