"use client"

import LessonLayout from "@/components/LessonLayout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, ArrowLeft, Video, Users, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { LessonNavigation } from "@/components/LessonNavigation"

const ImitatingConversations = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("learn")
  const [currentTopic, setCurrentTopic] = useState("observation")
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [practiceStep, setPracticeStep] = useState(0)

  // Current lesson path for navigation
  const currentPath = "/lessons/ImitatingConversations"

  // Conversation topics data
  const topics = {
    observation: {
      title: "Observation Skills",
      description: "How to effectively watch and analyze ASL conversations",
      content:
        "Developing strong observation skills is essential for learning ASL. When watching conversations, focus on the signers' facial expressions, body movements, and use of space. Notice how they establish context, introduce topics, and take turns in conversation.",
      examples: [
        "Watch with the sound off to focus on visual cues",
        "Observe turn-taking behaviors and attention-getting strategies",
        "Notice how signers establish and refer to locations in signing space",
        "Pay attention to non-manual signals (facial expressions, body posture)",
      ],
      videoUrl: "https://www.youtube.com/embed/DaMjr4AfYA0",
      tips: "Try watching the same conversation multiple times, focusing on different aspects each time",
    },
    imitation: {
      title: "Imitation Techniques",
      description: "Strategies for effective imitation practice",
      content:
        "Imitation is a powerful learning tool for ASL. By copying native signers, you internalize not just individual signs but natural rhythm, appropriate facial expressions, and grammatical structures. Start with short segments and gradually increase complexity.",
      examples: [
        "Shadow signing: Sign along with the video in real-time",
        "Delayed repetition: Watch a short segment, then repeat it",
        "Record yourself and compare with the original",
        "Practice with and without sound to focus on different aspects",
      ],
      videoUrl: "https://www.youtube.com/embed/GsWaKUzwozg",
      tips: "Don't just imitate the hands—pay equal attention to facial expressions, body posture, and rhythm",
    },
    cultural: {
      title: "Cultural Context",
      description: "Understanding Deaf cultural norms in conversation",
      content:
        "ASL conversations reflect Deaf cultural norms and values. These include direct communication, maintaining eye contact, appropriate attention-getting strategies, and specific turn-taking behaviors. Understanding these cultural aspects will help you communicate more naturally.",
      examples: [
        "Maintaining eye contact throughout conversations",
        "Using appropriate attention-getting strategies (waving, light touch on shoulder/arm)",
        "Visual backchanneling (nodding, facial feedback) while someone is signing",
        "Direct communication style with descriptive rather than evaluative language",
      ],
      videoUrl: "https://www.youtube.com/embed/uKKZxNGZWmI",
      tips: "Engage with the Deaf community to better understand cultural norms in different contexts",
    },
  }

  // Quiz questions
  const quizQuestions = [
    {
      id: "q1",
      question: "What should you focus on when watching ASL conversations?",
      options: [
        "Only the handshapes",
        "Facial expressions, body movements, and use of space",
        "The speed of signing",
        "The number of signs used",
      ],
      answer: "Facial expressions, body movements, and use of space",
    },
    {
      id: "q2",
      question: "What is 'shadow signing'?",
      options: [
        "Signing in a dimly lit room",
        "Signing behind someone",
        "Signing along with a video in real-time",
        "Practicing with your shadow",
      ],
      answer: "Signing along with a video in real-time",
    },
    {
      id: "q3",
      question: "Why is maintaining eye contact important in ASL conversations?",
      options: [
        "It's a cultural norm in Deaf communication",
        "It helps you see the signs better",
        "It's not actually important",
        "It helps you hear better",
      ],
      answer: "It's a cultural norm in Deaf communication",
    },
    {
      id: "q4",
      question: "What is an appropriate way to get a Deaf person's attention?",
      options: [
        "Shouting their name",
        "Tapping them on the shoulder",
        "Waving in their peripheral vision",
        "Both B and C are appropriate",
      ],
      answer: "Both B and C are appropriate",
    },
  ]

  // Practice scenarios
  const practiceScenarios = [
    {
      instruction: "Watch a short ASL conversation video and identify key elements",
      tips: "Focus on turn-taking, attention-getting strategies, and use of space. Take notes on what you observe.",
    },
    {
      instruction: "Practice shadow signing with a simple ASL conversation",
      tips: "Find a short, simple conversation video and try to sign along in real-time. Focus on matching the rhythm and facial expressions.",
    },
    {
      instruction: "Record yourself imitating a short ASL dialogue",
      tips: "Watch a brief exchange between two signers, practice it several times, then record yourself. Compare your recording with the original.",
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
    <LessonLayout title="Watching and Imitating Real ASL Conversations">
      <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Learning from Real Conversations</h2>
        <p className="text-gray-700">
          Watching and imitating native signers is one of the most effective ways to develop natural ASL skills. This
          approach helps you internalize grammar, rhythm, and cultural aspects that are difficult to learn from
          textbooks alone.
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
                <h3 className="text-3xl font-bold text-green-600 mb-4 flex items-center">
                  {currentTopic === "observation" && <Video className="mr-2 h-6 w-6" />}
                  {currentTopic === "imitation" && <Users className="mr-2 h-6 w-6" />}
                  {currentTopic === "cultural" && <BookOpen className="mr-2 h-6 w-6" />}
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

                    <div className="mt-4 bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-800 mb-2">Cultural Note</h5>
                      <p className="text-gray-700">
                        In Deaf culture, learning through observation and imitation is a traditional and respected way
                        of acquiring language. Many Deaf children learn ASL by watching adults and peers communicate,
                        and this visual learning approach remains valuable throughout life.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-2">Finding Good ASL Conversation Resources</h3>
            <p className="text-gray-700 mb-4">
              To effectively learn from real conversations, you need access to authentic ASL content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg">Online Resources</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>ASL THAT (YouTube channel)</li>
                    <li>The Daily Moth (news in ASL)</li>
                    <li>ASL Storytelling (various platforms)</li>
                    <li>Deaf vlogs and social media</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg">What to Look For</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Native or fluent signers</li>
                    <li>Clear video quality</li>
                    <li>Natural conversations (not lessons)</li>
                    <li>Content at your comprehension level</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg">Community Engagement</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Deaf events and gatherings</li>
                    <li>ASL conversation groups</li>
                    <li>Deaf-led workshops</li>
                    <li>Virtual Deaf community spaces</li>
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
                            : "bg-green-100 border border-green-300"
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
                  className="bg-green-600 hover:bg-green-700"
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
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Practice Imitating Conversations</h3>

            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => setPracticeStep(Math.max(0, practiceStep - 1))}
                variant="outline"
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-lg font-medium text-green-600">
                {practiceStep + 1} / {practiceScenarios.length}
              </span>
              <Button onClick={nextPracticeStep} variant="outline" className="flex items-center">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Progress value={((practiceStep + 1) / practiceScenarios.length) * 100} className="mb-6" />

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-green-800 mb-4">{practiceScenarios[practiceStep].instruction}</h4>
              <p className="text-gray-700">{practiceScenarios[practiceStep].tips}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Record Your Practice</h4>
                <p className="text-gray-700 mb-4">
                  After watching and practicing, record yourself imitating the conversation. Compare your recording with
                  the original.
                </p>
                <Button className="w-full">Start Recording</Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Imitation Process</h4>
                <p className="text-gray-700 mb-4">Follow these steps for effective imitation practice:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Watch the entire conversation first without signing</li>
                  <li>Watch again, focusing on specific elements (handshapes, facial expressions, etc.)</li>
                  <li>Break down the conversation into smaller segments</li>
                  <li>Practice each segment multiple times</li>
                  <li>Gradually put segments together</li>
                  <li>Record yourself and compare with the original</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Practice Tips
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Start with shorter, simpler conversations before attempting longer ones</li>
              <li>
                Use videos with captions or translations initially, then challenge yourself with content without
                translations
              </li>
              <li>Practice regularly—even 10-15 minutes daily is more effective than occasional longer sessions</li>
              <li>
                Don't get discouraged if you don't understand everything—comprehension will improve with continued
                exposure
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

export default ImitatingConversations

