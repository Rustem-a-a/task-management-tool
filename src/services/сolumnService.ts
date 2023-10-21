import $api from "../http";
import {IColumnsResponse} from "../types/response/response";
import {AxiosResponse} from "axios";


class OlumnService {
    static async editColumn (editColumnData: {projectId:string,columns:{[key:string]:IColumnsResponse} }):Promise<AxiosResponse<{ columns:{[key:string]:IColumnsResponse} }>>{
        return  $api.patch<{columns:{[key:string]:IColumnsResponse} }>('/column/edit', editColumnData)

    }
}

export default OlumnService