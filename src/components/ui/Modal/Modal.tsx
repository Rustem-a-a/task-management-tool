import styles from './Modal.module.scss'
import React, {useEffect, useRef} from "react";
import {Task} from "../../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";


interface IProps{
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    children:React.ReactNode;
    taskData? :Task
    setIsSignIn?:React.Dispatch<React.SetStateAction<boolean>>;
    setIsSignUp?:React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({setIsModal,children,setIsSignIn,setIsSignUp}:IProps) => {
    const modalDivRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (modalDivRef.current) {
            modalDivRef.current.focus();
        }})
    return (
        <div className={styles.wrapper}
             ref={modalDivRef}
             tabIndex={100}
             onKeyDown={e=>{
                 if(e.key==='Escape'){
                     setIsModal(false)
                     if(setIsSignUp&&setIsSignIn){
                         setIsSignUp(false)
                         setIsSignIn(false)
             }}}}
             onClick={() => {
                 setIsModal(false)
                 if(setIsSignUp&&setIsSignIn){
                     setIsSignUp(false)
                     setIsSignIn(false)
                 }
        }}>

                {children}
        </div>
    );
};

export default Modal;