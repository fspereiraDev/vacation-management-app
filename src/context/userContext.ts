import { createContext } from "react"
import { AuthContextType } from "../types"

const userContext = createContext<AuthContextType | undefined>(undefined);

export default userContext