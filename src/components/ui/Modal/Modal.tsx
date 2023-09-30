import styles from './Modal.module.scss'
import React from "react";
import {Task} from "../../../types";


interface IProps{
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    children:React.ReactNode;
    taskData? :Task
}
const Modal = ({setIsModal,children}:IProps) => {
    return (
        <div className={styles.wrapper}
             onClick={() => setIsModal(false)}>

                {children}
        </div>
    );
};

export default Modal;