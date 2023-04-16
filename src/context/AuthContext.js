import { createContext, useReducer ,useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
    user: localStorage.getItem("user")=="undefined"? null:JSON.parse(localStorage.getItem("user")),
    isFetching:false,
    error:false
};
// console.log(JSON.parse(localStorage.getItem("user")));
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
       const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

       useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

       return ( 
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
            }}>
                {children}
            </AuthContext.Provider>
       
        )
}