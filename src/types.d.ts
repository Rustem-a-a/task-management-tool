export interface Project{
    id:string;
    name:string;
    start:Date
    finish: Date | null
    deadline:Date
}

export interface Task {
    id: string;
    title: string;
    description: string;
    start: string;
    workTime: string;
    deadline: string;
    priority: string;
    attachments: string[];
    status: string;
    subTasks: Task[];
    comments: Comment[];
    // parentId:null
}

// export interface Projects{
//     projects:Project[]
// }

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface Comment {
    id: number;
    text: string;
    subComments: Comment[];
}

export interface Types {
    columns: { [key: string]: Column };
    tasks: {[key:string]:Task};
}

export interface DragResult {
    destination?: {
        droppableId: string;
        index: number;
    };
    source: {
        droppableId: string;
        index: number;
    };
    draggableId: string;
}
