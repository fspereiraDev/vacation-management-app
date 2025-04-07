import { useContext } from "react";
import userContext from "../context/userContext"; // Import your context
import { AuthContextType } from "../types"; // Assuming you have an appropriate type for the context

const useAuth = (): AuthContextType => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;