"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getNextLesson, getPreviousLesson } from "@/lib/lesson-navigation"

interface LessonNavigationProps {
  currentPath: string
  className?: string
}

export function LessonNavigation({ currentPath, className = "" }: LessonNavigationProps) {
  const router = useRouter()
  const nextLesson = getNextLesson(currentPath)
  const prevLesson = getPreviousLesson(currentPath)

  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      {prevLesson ? (
        <Button variant="secondary" onClick={() => router.push(prevLesson.path)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Previous Lesson</span>
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}

      <Button onClick={() => router.push("/roadmap")}>Back to Roadmap</Button>

      {nextLesson ? (
        <Button variant="secondary" onClick={() => router.push(nextLesson.path)} className="flex items-center gap-2">
          <span>Next Lesson</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
    </div>
  )
}

