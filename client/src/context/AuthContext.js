import { createContext, useEffect, useState } from "react";
import axios from "axios";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const loginStart = () => {
    setState({ user: null, loading: true, error: null });
  };

  const loginSuccess = (user) => {
    setState({ user, loading: false, error: null });
  };

  const loginFailure = (error) => {
    setState({ user: null, loading: false, error });
  };

  const logout = () => {
    setState({ user: null, loading: false, error: null });
  };

  useEffect(() => {
    const fetchUser = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const res = await axios.get("http://localhost:8080/api/auth/profile", {
          withCredentials: true,
        });
        setState({ user: res.data, loading: false, error: null });
      
      } catch (error) {
        setState({ user: null, loading: false, error: error.response?.data || "Failed to authenticate" });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        loginStart,
        loginSuccess,
        loginFailure,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};