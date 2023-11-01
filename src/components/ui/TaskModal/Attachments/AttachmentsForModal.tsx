import React, {FC, useState} from 'react';
import styles from "./AttachmentsForModal.module.scss";
import $api from "../../../../http";
import {useDispatch} from "react-redux";
import {ITaskResponse} from "../../../../types/response/response";

interface IProps{
    task:ITaskResponse
}
const AttachmentsForModal:FC<IProps> = ({task}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const diapatch = useDispatch()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('taskId', '653b735183d941a715463e48')
            console.log(formData)
            try {
                const response = await $api.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                // diapatch(getCo)
                ;
                console.log('File uploaded:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    return (
        <div className={styles.attachments}>
            <div className={styles.taskActionsAddTask}>
                <label htmlFor='inputFile'>
                    <img src="/addTask.svg" alt="addTask"/>
                    <input style={{display:'none'}} id='inputFile' type='file' onChange={handleFileChange}/>Add attachment</label>

                {
                    selectedFile &&
                    <div className={styles.selectSendFile}>
                        <p>{selectedFile.name}</p>
                        <img onClick={handleFileUpload} src='/send.svg' alt = 'send'/>
                    </div>
                }
            </div>
            {task.attachments.length
                ? task.attachments.map(attachment=> (
                    <div className={styles.selectSendFile}>
                        <p>{attachment}</p>
                        <img onClick={handleFileUpload} src='/download.svg' alt = 'send'/>
                    </div>

                ))
                :   <p>No attachments</p> }
        </div>
    );
};

export default AttachmentsForModal;
