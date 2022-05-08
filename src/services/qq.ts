import axios from "axios";
import { ServerResponse } from "../types/common";



type ILvzuan = {
    code:number;
    subcode:number;
    level:number;
    vip:number;
    sorce:number;
    place:number;
    payway:number;
    isyear:number;
    vendor:number;
}
type IUser = {
    qq:string;
    name:string;
    qlogo:string;
    lvzuan:ILvzuan;
} & ServerResponse



export function fetchUser(params?: any):Promise<IUser> {
    return axios.get("https://api.uomg.com/api/qq.info", { params }).then(res => res.data);
}