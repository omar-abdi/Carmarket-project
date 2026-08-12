import { createContext, useState, useContext , useEffect} from "react";

const AppContext = createContext();
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const AppProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(()=>{
        const userData = localStorage.getItem('current-user-data');
        if(userData){
          try {
            const user = JSON.parse(userData);
            return {
              ...user,
              avatar: user.avatar || DEFAULT_AVATAR,
            };
          } catch {
            return null;
          }
        }
        return null;
    });
      const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);


  //Actions 
    const signInStart = () => setLoading(true);
    const updateInStart = () => setLoading(true);

      const signInSuccess = (user) => {
    const nextUser = {
      ...user,
      avatar: user.avatar || DEFAULT_AVATAR,
    };
    setCurrentUser(nextUser);
    localStorage.setItem('current-user-data', JSON.stringify(nextUser));
    setLoading(false);
    setError(null);
  };
      const updateSuccess = (user) => {
    const nextUser = {
      ...currentUser,
      ...user,
      avatar: user.avatar || user.avatarUrl || currentUser?.avatar || DEFAULT_AVATAR,
    };
    setCurrentUser(nextUser);
    localStorage.setItem('current-user-data', JSON.stringify(nextUser));
    setLoading(false);
    setError(null);
  };
  // set local stoare 
  useEffect(() => {
  if(currentUser){
    localStorage.setItem('current-user-data', JSON.stringify(currentUser))
    }
  }, [currentUser])


   const signInFailure = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };
   const updateFailure = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };
  const value ={
     currentUser,
    error,
    loading,
    signInStart,
    signInFailure,
    signInSuccess,
    updateInStart,
    updateSuccess,  
     updateFailure,
  }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;


    
};
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAPpContext must be used within an AppProvider");
  }
  return context;
};