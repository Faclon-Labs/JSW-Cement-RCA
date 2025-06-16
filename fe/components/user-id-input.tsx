"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserIcon } from "lucide-react"

interface UserIdInputProps {
  onSubmit: (userId: string) => void
}

// This component is no longer actively used since we hardcoded the userID
export function UserIdInput({ onSubmit }: UserIdInputProps) {
  // Hardcoded user ID as requested
  const hardcodedUserId = "66792886ef26fb850db806c5"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">JSW RCA Tool</CardTitle>
          <p className="text-gray-600 mt-2">
            Using hardcoded User ID: {hardcodedUserId}
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <p>This application now uses a hardcoded user ID.</p>
          <p>No login is required.</p>
        </CardContent>
      </Card>
    </div>
  )
} 