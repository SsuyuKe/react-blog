import { useState } from "react"

export const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = JSON.parse(localStorage.getItem(key))
    return value || null
  })
  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setStoredValue(value)
  }
  return [storedValue, setValue]
}