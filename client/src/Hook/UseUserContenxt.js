import { useContext } from "react"
import { UserContext } from "../Context/UserContext"


export const useUserContext = () => {
    return useContext(UserContext);
}