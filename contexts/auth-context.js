"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

// Auth reducer to manage authentication state
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        dispatch({ type: "LOAD_USER", payload: parsedUser })
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("user")
    }
  }, [state.user])

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isAdmin = email === "admin@shophub.com"

    // Mock user data - in real app, this would come from your API
    const mockUser = {
      id: isAdmin ? 999 : 1,
      email: email,
      firstName: isAdmin ? "Admin" : "John",
      lastName: isAdmin ? "User" : "Doe",
      role: isAdmin ? "admin" : "customer",
      avatar: null,
    }

    dispatch({ type: "LOGIN", payload: mockUser })
    return { success: true }
  }

  const register = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user creation
    const newUser = {
      id: Date.now(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: "customer", // Default role for new users
      avatar: null,
    }

    dispatch({ type: "LOGIN", payload: newUser })
    return { success: true }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const updateProfile = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = {
      ...state.user,
      ...userData,
    }

    dispatch({ type: "LOGIN", payload: updatedUser })
    return { success: true }
  }

  const isAdmin = () => {
    return state.user?.role === "admin"
  }

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
