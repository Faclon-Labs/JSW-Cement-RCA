"use client"

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'jsw_selected_insight_id'

export const useUserId = () => {
  // Hardcoded user ID as requested
  const hardcodedUserId = "66792886ef26fb850db806c5"
  
  // Selected insight state - still needed for the UI
  const [selectedInsightId, setSelectedInsightIdState] = useState<string>('')

  // Load saved insight ID from localStorage on mount
  useEffect(() => {
    try {
      const savedInsightId = localStorage.getItem(STORAGE_KEY)
      if (savedInsightId) {
        console.log('Restoring saved insight ID:', savedInsightId)
        setSelectedInsightIdState(savedInsightId)
      }
    } catch (error) {
      console.error('Error loading saved insight ID:', error)
    }
  }, [])

  // Simple no-op function to maintain API compatibility
  const setUserId = () => {
    // No-op function, we always use the hardcoded ID
    console.log("Using hardcoded userId:", hardcodedUserId)
  }

  // Save insight ID to localStorage when it changes
  const setSelectedInsightId = (insightId: string) => {
    setSelectedInsightIdState(insightId)
    try {
      if (insightId) {
        localStorage.setItem(STORAGE_KEY, insightId)
        console.log('Saved insight ID to localStorage:', insightId)
      } else {
        localStorage.removeItem(STORAGE_KEY)
        console.log('Cleared saved insight ID')
      }
    } catch (error) {
      console.error('Error saving insight ID:', error)
    }
  }

  const clearUserId = () => {
    // No-op function since we can't clear the hardcoded ID
    console.log("clearUserId called, but using hardcoded userId")
    
    // Clear the selected insight ID
    setSelectedInsightIdState('')
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('Cleared saved insight ID')
    } catch (error) {
      console.error('Error clearing saved insight ID:', error)
    }
  }

  return {
    userId: hardcodedUserId,
    selectedInsightId,
    setUserId,
    setSelectedInsightId,
    clearUserId,
    hasUserId: true, // Always true since userId is hardcoded
    isLoading: false, // Never loading since data is hardcoded
    error: null // Never an error since data is hardcoded
  }
} 