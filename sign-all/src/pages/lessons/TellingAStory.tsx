"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, ArrowLeft, BookOpen, MessageSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { LessonNavigation } from "@/components/LessonNavigation"

const TellingAStory = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("learn")
  const [currentTopic, setCurrentTopic] = useState("structure")
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [practiceStep, setPracticeStep] = useState(0)

  // Current lesson path for navigation
  const currentPath = "/lessons/TellingAStory"

  // Storytelling topics data
  const topics = {
    structure: {
      title: "Story Structure",
      description: "How to organize your ASL story",
      content:
        "ASL stories follow a clear structure with setting, characters, and action. Begin by establishing the setting and introducing characters before moving into the action.",
      examples: [
        "First, set up the scene (WHERE and WHEN)",
        "Introduce characters (WHO)",
        "Describe the main events (WHAT happened)",
      ],
      videoUrl: "https://www.youtube.com/embed/iyR_iDCc9kk",
      tips: "Use space consistently to represent locations and characters throughout your story",
    },
    roleShift: {
      title: "Role Shifting",
      description: "Taking on character perspectives",
      content:
        "Role shifting is when you temporarily become a character in your story. This is shown by shifting your body position, changing your facial expression, and altering your signing style.",
      examples: [
        "Shift your shoulders and eye gaze to indicate different characters",
        "Use facial expressions appropriate to each character",
        "Maintain consistent positions for each character",
      ],
      videoUrl: "https://www.youtube.com/embed/1VcHW_O274I",
      tips: "Practice smooth transitions between characters to keep your story clear",
    },
    classifiers: {
      title: "Classifiers",
      description: "Visual representations in storytelling",
      content:
        "Classifiers are handshapes that represent categories of objects or people. They're essential for visual storytelling in ASL, allowing you to show movement, location, and appearance.",
      examples: [
        "Use '1' handshape to show a person walking",
        "Use 'C' handshape to show holding a cup",
        "Use '3' handshape to show a vehicle moving",
      ],
      videoUrl: "https://www.youtube.com/embed/JOzxzS1oJzI",
      tips: "Combine classifiers with facial expressions to create vivid visual scenes",
    },
  }

  // Quiz questions
  const quizQuestions = [
    {
      id: "q1",
      question: "What should you establish first when telling a story in ASL?",
      options: ["The ending", "The setting (where and when)", "The moral", "The conflict"],
      answer: "The setting (where and when)",
    },
    {
      id: "q2",
      question: "What is 'role shifting' in ASL storytelling?",
      options: [
        "Changing the topic",
        "Taking on character perspectives",
        "Switching between signs",
        "Moving to a different location",
      ],
      answer: "Taking on character perspectives",
    },
    {
      id: "q3",
      question: "Which handshape is commonly used as a classifier to represent a person walking?",
      options: ["'O' handshape", "'B' handshape", "'1' handshape", "'5' handshape"],
      answer: "'1' handshape",
    },
    {
      id: "q4",
      question: "How do you maintain clarity when shifting between multiple characters?",
      options: [
        "Sign the character's name each time",
        "Use consistent body positions for each character",
        "Always face the same direction",
        "Pause between character shifts",
      ],
      answer: "Use consistent body positions for each character",
    },
  ]

  // Practice scenarios
  const practiceScenarios = [
    {
      instruction: "Tell a simple story about going to a restaurant",
      tips: "Establish the setting (restaurant), introduce characters (you, server, etc.), and show actions (ordering, eating, paying)",
    },
    {
      instruction: "Tell a story about a lost dog finding its way home",
      tips: "Use classifiers to show the dog's movement, role shift to show different characters (dog, owner, helpers), and establish clear locations",
    },
    {
      instruction: "Tell a story about a funny misunderstanding between friends",
      tips: "Use facial expressions to show emotions, role shift between the friends, and show the resolution of the misunderstanding",
    },
  ]

  // Handle quiz submission
  const handleQuizSubmit = () => {
    const results: Record<string, boolean> = {}

    quizQuestions.forEach((q) => {
      results[q.id] = quizAnswers[q.id] === q.answer
    })

    setQuizResults(results)
    setQuizSubmitted(true)
  }

  // Calculate quiz score
  const calculateScore = () => {
    return Object.values(quizResults).filter((result) => result).length
  }

  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizResults({})
    setQuizSubmitted(false)
  }

  // Next practice step
  const nextPracticeStep = () => {
    if (practiceStep < practiceScenarios.length - 1) {
      setPracticeStep(practiceStep + 1)
    } else {
      setPracticeStep(0)
    }
  }

  return (
    <LessonLayout title="Learning to Tell a Simple Story in ASL">
      <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Storytelling in ASL</h2>
        <p className="text-gray-700">
          Storytelling is a rich tradition in Deaf culture. Learning to tell stories in ASL helps you develop fluency,
          express yourself creatively, and connect with the Deaf community through shared experiences.
        </p>
      </div>

      {/* Mode Tabs */}
      <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        {/* Learn Mode */}
        <TabsContent value="learn">
          {/* Topic Selection */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.keys(topics).map((topic) => (
              <Button
                key={topic}
                variant={currentTopic === topic ? "default" : "outline"}
                onClick={() => {
                  setCurrentTopic(topic)
                  setShowExplanation(false)
                }}
                className="capitalize"
              >
                {topics[topic as keyof typeof topics].title}
              </Button>
            ))}
          </div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`learn-${currentTopic}`}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-purple-600 mb-4 flex items-center">
                  {currentTopic === "structure" && <BookOpen className="mr-2 h-6 w-6" />}
                  {currentTopic === "roleShift" && <MessageSquare className="mr-2 h-6 w-6" />}
                  {currentTopic === "classifiers" && <MessageSquare className="mr-2 h-6 w-6" />}
                  {topics[currentTopic as keyof typeof topics].title}
                </h3>
                <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                  <iframe
                    src={topics[currentTopic as keyof typeof topics].videoUrl}
                    title={`ASL ${currentTopic}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex justify-center">
                  <Button onClick={() => setShowExplanation(!showExplanation)} variant="outline">
                    {showExplanation ? "Hide Examples" : "Show Examples"}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {topics[currentTopic as keyof typeof topics].description}
                </h4>
                <p className="text-gray-700 mb-6">{topics[currentTopic as keyof typeof topics].content}</p>

                <h4 className="text-xl font-semibold text-gray-800 mb-2">Tips</h4>
                <p className="text-gray-700 mb-6">{topics[currentTopic as keyof typeof topics].tips}</p>

                {showExplanation && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Examples</h4>
                    <ul className="list-disc pl-6 text-gray-700">
                      {topics[currentTopic as keyof typeof topics].examples.map((example, index) => (
                        <li key={index} className="mb-2">
                          {example}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-purple-800 mb-2">Cultural Note</h5>
                      <p className="text-gray-700">
                        Storytelling is highly valued in Deaf culture. ASL stories are often more visual and
                        action-oriented than spoken language stories, taking full advantage of the visual-spatial nature
                        of sign language.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Elements of a Good ASL Story</h3>
            <p className="text-gray-700 mb-4">
              Effective ASL storytelling combines several key elements to create engaging, visual narratives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-lg">Visual Imagery</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Use classifiers to show objects</li>
                    <li>Create clear visual scenes</li>
                    <li>Show, don't tell</li>
                    <li>Use space consistently</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-lg">Character Development</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Distinct role shifts for each character</li>
                    <li>Consistent character positions</li>
                    <li>Unique signing styles per character</li>
                    <li>Clear character introductions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-lg">Pacing & Rhythm</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Vary signing speed for emphasis</li>
                    <li>Use pauses effectively</li>
                    <li>Build to climactic moments</li>
                    <li>Clear beginning, middle, and end</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Quiz Mode */}
        <TabsContent value="quiz">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Test Your Knowledge</h3>

            {quizQuestions.map((q) => (
              <div key={q.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">{q.question}</h4>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <div
                      key={option}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        quizAnswers[q.id] === option
                          ? quizSubmitted
                            ? quizResults[q.id]
                              ? "bg-green-100 border border-green-500"
                              : "bg-red-100 border border-red-500"
                            : "bg-blue-100 border border-blue-300"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        if (!quizSubmitted) {
                          setQuizAnswers({ ...quizAnswers, [q.id]: option })
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <span className="flex-grow">{option}</span>
                        {quizSubmitted &&
                          quizAnswers[q.id] === option &&
                          (quizResults[q.id] ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <span className="text-red-600 font-medium">✗</span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                {quizSubmitted && !quizResults[q.id] && (
                  <div className="mt-2 text-sm text-red-600">Correct answer: {q.answer}</div>
                )}
              </div>
            ))}

            <div className="flex justify-center mt-6">
              {!quizSubmitted ? (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit Answers
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-xl font-bold mb-4">
                    Your Score: {calculateScore()} / {quizQuestions.length}
                  </div>
                  <Button onClick={resetQuiz} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Practice Mode */}
        <TabsContent value="practice">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Storytelling</h3>

            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => setPracticeStep(Math.max(0, practiceStep - 1))}
                variant="outline"
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-lg font-medium text-purple-600">
                {practiceStep + 1} / {practiceScenarios.length}
              </span>
              <Button onClick={nextPracticeStep} variant="outline" className="flex items-center">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Progress value={((practiceStep + 1) / practiceScenarios.length) * 100} className="mb-6" />

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-purple-800 mb-4">{practiceScenarios[practiceStep].instruction}</h4>
              <p className="text-gray-700">{practiceScenarios[practiceStep].tips}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Record Your Story</h4>
                <p className="text-gray-700 mb-4">
                  Practice telling the story above. Use your device's camera to record yourself and review your signing.
                </p>
                <Button className="w-full">Start Recording</Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Story Planning</h4>
                <p className="text-gray-700 mb-4">Before you start signing, plan your story:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>What is the setting? (Where and when)</li>
                  <li>Who are the characters?</li>
                  <li>What happens first, next, and last?</li>
                  <li>What classifiers will you need?</li>
                  <li>How will you show different characters?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Practice Tips
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Start with simple stories before attempting complex narratives</li>
              <li>Record yourself and watch the playback to identify areas for improvement</li>
              <li>Practice in front of a mirror to see your facial expressions and signing space</li>
              <li>Watch native ASL storytellers to learn techniques and styles</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons - Using the LessonNavigation component */}
      <LessonNavigation currentPath={currentPath} className="mt-12" />
    </LessonLayout>
  )
}

export default TellingAStory

