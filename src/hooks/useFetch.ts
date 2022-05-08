import { useState,useReducer, useEffect } from "react";
type Action<T> = {
    type: "FETCH_INIT" | "FETCH_SUCCESS" | "FETCH_FAILURE";
    payload?: T;  

}

function dispatchReducer<T,R>(state:T, action:Action<R>)  {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,

                isLoading: true,
                isError: false
            };
        case "FETCH_SUCCESS":

            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:    
            throw new Error();
    }
}

export function useFetch<T>(callBack:(params?:any)=>Promise<T>,initData?:T) {
  const [data, setData] = useState<T|null>(null);
  const [params,setParams] = useState(null);
    const [state, dispatch] = useReducer(dispatchReducer, {
        isLoading: false,
        isError: false,
        data: initData,
    });

    const onChangeParams = (params:any) => {
        setParams(params);
    }
    const fetchData = async (params?:any) => {
        dispatch({ type: "FETCH_INIT" });
        try {
            const result = await callBack(params);
            dispatch({ type: "FETCH_SUCCESS", payload: result });
            setData(result);
        } catch (error) {
            dispatch({ type: "FETCH_FAILURE" });
        }

    }
    useEffect(() => {
        if (params) {
            fetchData(params);
        }
    }, [params]);
    return { data, state,onChangeParams};

};