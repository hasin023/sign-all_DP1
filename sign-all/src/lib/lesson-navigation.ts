// This file defines the lesson structure and navigation

// Define the structure for a lesson
export interface LessonInfo {
    name: string
    path: string
    duration: string
  }
  
  // Define the structure for a module
  export interface ModuleInfo {
    title: string
    description: string
    category: string
    lessons: LessonInfo[]
  }
  
  // Define all modules and their lessons
  export const modules: ModuleInfo[] = [
    {
      title: "Thematic Learning Modules",
      description: "Learn signs for specific contexts and situations",
      category: "advanced",
      lessons: [
        { name: "Emergency signs (help, danger, call police)", path: "/lessons/EmergencySigns", duration: "25 min" },
        { name: "Workplace and school-related signs", path: "/lessons/WorkplaceSigns", duration: "30 min" },
        { name: "Family and relationship signs", path: "/lessons/FamilySigns", duration: "25 min" },
      ],
    },
    {
      title: "Storytelling & Expressive Signing",
      description: "Learn to express yourself fluently through stories",
      category: "advanced",
      lessons: [
        { name: "Learning to tell a simple story in ASL", path: "/lessons/TellingAStory", duration: "45 min" },
        { name: "Using facial expressions to convey emotions", path: "/lessons/ExpressiveSigning", duration: "30 min" },
        {
          name: "Watching and imitating real ASL conversations",
          path: "/lessons/ImitatingConversations",
          duration: "40 min",
        },
      ],
    },
  ]
  
  // Flatten all lessons for easy lookup
  export const allLessons: LessonInfo[] = modules.flatMap((module) => module.lessons)
  
  // Get a lesson by its path
  export function getLessonByPath(path: string): LessonInfo | undefined {
    return allLessons.find((lesson) => lesson.path === path)
  }
  
  // Get the next lesson
  export function getNextLesson(currentPath: string): LessonInfo | undefined {
    const currentIndex = allLessons.findIndex((lesson) => lesson.path === currentPath)
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return undefined
    }
    return allLessons[currentIndex + 1]
  }
  
  // Get the previous lesson
  export function getPreviousLesson(currentPath: string): LessonInfo | undefined {
    const currentIndex = allLessons.findIndex((lesson) => lesson.path === currentPath)
    if (currentIndex === -1 || currentIndex === 0) {
      return undefined
    }
    return allLessons[currentIndex - 1]
  }
  
  