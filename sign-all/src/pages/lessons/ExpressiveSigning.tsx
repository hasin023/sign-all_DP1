"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, ArrowLeft, Smile, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { LessonNavigation } from "@/components/LessonNavigation"

const ExpressiveSigning = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("learn")
  const [currentTopic, setCurrentTopic] = useState("basics")
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [practiceStep, setPracticeStep] = useState(0)

  // Current lesson path for navigation
  const currentPath = "/lessons/ExpressiveSigning"

  // Facial expressions topics data
  const topics = {
    basics: {
      title: "Basics of Facial Grammar",
      description: "Understanding the grammatical role of facial expressions",
      content:
        "In ASL, facial expressions aren't just for showing emotion—they're a critical grammatical component. They can indicate questions, conditionals, intensity, and more. Without appropriate facial expressions, your signing may be grammatically incorrect or confusing.",
      examples: [
        "Raised eyebrows for yes/no questions",
        "Furrowed brows for wh-questions (who, what, when, where, why, how)",
        "Puffed cheeks for large size or intensity",
        "Squinted eyes for distance or precision",
      ],
      videoUrl: "https://www.youtube.com/embed/rj9SnZ5Fy-U",
      tips: "Practice facial expressions in front of a mirror to become more comfortable and natural with them",
    },
    emotions: {
      title: "Emotional Expressions",
      description: "Conveying feelings through facial expressions",
      content:
        "Emotional expressions in ASL are often more exaggerated than in everyday interactions. Clear facial expressions help convey the emotional context of your message and make your signing more engaging and authentic.",
      examples: [
        "Happiness: Raised cheeks, wide smile, bright eyes",
        "Sadness: Downturned mouth, drooping eyelids, furrowed brows",
        "Anger: Narrowed eyes, tense jaw, furrowed brows",
        "Surprise: Raised eyebrows, widened eyes, open mouth",
      ],
      videoUrl: "https://www.youtube.com/embed/pR_Fy9Vn9Ao",
      tips: "Match the intensity of your facial expressions to the intensity of the emotion you're conveying",
    },
    adverbs: {
      title: "Adverbial Expressions",
      description: "Using faces to modify verbs and adjectives",
      content:
        "In ASL, facial expressions often function as adverbs, modifying verbs to show how an action is performed. They can indicate intensity, frequency, effort, ease, and many other qualities that would require additional words in English.",
      examples: [
        "Intensity: Tightened lips and squinted eyes for 'very' or 'extremely'",
        "Effort: Puffed cheeks and tensed face for 'with difficulty'",
        "Ease: Relaxed face with slight smile for 'easily' or 'effortlessly'",
        "Frequency: Repeated head nods with raised eyebrows for 'regularly' or 'often'",
      ],
      videoUrl: "https://www.youtube.com/embed/EJj9neFgHBw",
      tips: "Practice transitioning between different adverbial expressions to build fluency",
    },
  }

  // Quiz questions
  const quizQuestions = [
    {
      id: "q1",
      question: "Which facial expression is used for yes/no questions in ASL?",
      options: ["Furrowed brows", "Raised eyebrows", "Puffed cheeks", "Squinted eyes"],
      answer: "Raised eyebrows",
    },
    {
      id: "q2",
      question: "What type of questions require furrowed brows in ASL?",
      options: ["Yes/no questions", "Rhetorical questions", "Wh-questions", "Either/or questions"],
      answer: "Wh-questions",
    },
    {
      id: "q3",
      question: "How would you show that something is very far away in ASL?",
      options: ["Puffed cheeks", "Wide eyes", "Squinted eyes", "Raised eyebrows"],
      answer: "Squinted eyes",
    },
    {
      id: "q4",
      question: "What happens if you sign with incorrect facial expressions in ASL?",
      options: [
        "Nothing, facial expressions are optional",
        "Your signing may be grammatically incorrect",
        "It only affects emotional content",
        "It only matters for formal settings",
      ],
      answer: "Your signing may be grammatically incorrect",
    },
  ]

  // Practice scenarios
  const practiceScenarios = [
    {
      instruction: "Practice yes/no questions with appropriate facial expressions",
      tips: "Raise your eyebrows while asking questions like 'Do you like coffee?' or 'Are you going to the store?'",
    },
    {
      instruction: "Practice wh-questions with appropriate facial expressions",
      tips: "Furrow your brows while asking questions like 'What is your name?' or 'Where do you live?'",
    },
    {
      instruction: "Practice showing different intensities of the same emotion",
      tips: "Show slight happiness, moderate happiness, and extreme happiness with increasingly exaggerated facial expressions",
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
    <LessonLayout title="Using Facial Expressions to Convey Emotions in ASL">
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Facial Expressions in ASL</h2>
        <p className="text-gray-700">
          Facial expressions are not just supplementary in ASL—they're essential grammatical features. Learning to use
          facial expressions effectively will make your signing more accurate, natural, and expressive.
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
                <h3 className="text-3xl font-bold text-blue-600 mb-4 flex items-center">
                  {currentTopic === "basics" && <Eye className="mr-2 h-6 w-6" />}
                  {currentTopic === "emotions" && <Smile className="mr-2 h-6 w-6" />}
                  {currentTopic === "adverbs" && <Eye className="mr-2 h-6 w-6" />}
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

                    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Cultural Note</h5>
                      <p className="text-gray-700">
                        In Deaf culture, clear and expressive facial expressions are highly valued. Many Deaf people
                        consider limited facial expression while signing to be equivalent to speaking in a monotone
                        voice—it's technically understandable but lacks richness and nuance.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Common Facial Grammar Patterns</h3>
            <p className="text-gray-700 mb-4">
              These facial expressions are essential grammatical markers in ASL that you'll use in everyday
              conversations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg">Questions</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Yes/No: Raised eyebrows</li>
                    <li>Wh-questions: Furrowed brows</li>
                    <li>Rhetorical: Head tilt, raised eyebrows</li>
                    <li>Maintain expression throughout question</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg">Conditionals</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Raised eyebrows</li>
                    <li>Slight head tilt</li>
                    <li>Pause between condition and result</li>
                    <li>Example: "IF RAIN, STAY HOME"</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg">Intensity Markers</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Tightened lips for intensity</li>
                    <li>Puffed cheeks for large size</li>
                    <li>Squinted eyes for small/precise</li>
                    <li>Widened eyes for surprise/emphasis</li>
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
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Facial Expressions</h3>

            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => setPracticeStep(Math.max(0, practiceStep - 1))}
                variant="outline"
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-lg font-medium text-blue-600">
                {practiceStep + 1} / {practiceScenarios.length}
              </span>
              <Button onClick={nextPracticeStep} variant="outline" className="flex items-center">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Progress value={((practiceStep + 1) / practiceScenarios.length) * 100} className="mb-6" />

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-4">{practiceScenarios[practiceStep].instruction}</h4>
              <p className="text-gray-700">{practiceScenarios[practiceStep].tips}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Record Your Practice</h4>
                <p className="text-gray-700 mb-4">
                  Practice the facial expressions described above. Use your device's camera to record yourself and
                  review your expressions.
                </p>
                <Button className="w-full">Start Recording</Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Mirror Practice</h4>
                <p className="text-gray-700 mb-4">
                  Practice in front of a mirror to see your facial expressions in real-time:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Exaggerate expressions at first, then refine them</li>
                  <li>Pay attention to your eyebrows, eyes, mouth, and cheeks</li>
                  <li>Practice transitioning between different expressions</li>
                  <li>Try to maintain expressions while signing</li>
                  <li>Record yourself to compare with native signers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Practice Tips
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Practice facial expressions separately from signs at first, then combine them</li>
              <li>Watch videos of native signers with the sound off to focus on facial expressions</li>
              <li>Record yourself and compare your expressions to those of fluent signers</li>
              <li>
                Remember that facial expressions in ASL are often more exaggerated than in typical hearing conversation
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons - Using the LessonNavigation component */}
      <LessonNavigation currentPath={currentPath} className="mt-12" />
    </LessonLayout>
  )
}

export default ExpressiveSigning

