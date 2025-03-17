import type React from "react"
import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Groq } from "groq-sdk"
import { Camera, Send, X, MessageSquare, Upload, ImageIcon } from "lucide-react"

const FloatingChatbot = () => {
  const [inputText, setInputText] = useState("")
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [conversation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputText.trim() && !selectedImage) return

    setLoading(true)

    let messageContent = inputText

    // If there's an image, include it in the message
    if (selectedImage) {
      // For the user message, we'll show text + image indicator
      messageContent = inputText ? `${inputText} [Attached an image]` : "[Attached an image]"
    }

    const userMessage = { role: "user", content: messageContent }

    // Add image to conversation for display
    const updatedConversation = [
      ...conversation,
      selectedImage ? { ...userMessage, image: selectedImage } : userMessage,
    ]

    setConversation(updatedConversation)

    try {
      // Prepare messages for Groq API
      const messages = [
        {
          role: "system",
          content:
            "You are SignBuddy, an AI chatbot specializing in American Sign Language (ASL). Your goal is to assist users in learning ASL, understanding sentence structure, and improving their signing skills. If a user uploads an image of a sign, identify what sign it is and explain its meaning and usage. Provide helpful explanations and suggest ASL-related exercises. If the user asks about something outside ASL, politely redirect the conversation.",
        },
        ...updatedConversation.map((msg) => {
          // Remove image property for API call
          const { image, ...apiMsg } = msg as any

          // If this message has an image, include it in the content
          if (image) {
            return {
              role: apiMsg.role,
              content: [
                { type: "text", text: apiMsg.content || "Please analyze this sign language image:" },
                { type: "image_url", image_url: { url: image } },
              ],
            }
          }

          return apiMsg
        }),
      ]

      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        messages: messages as any,
      })

      const aiResponse = chatCompletion.choices[0]?.message?.content || "No response from AI."

      setConversation([...updatedConversation, { role: "assistant", content: aiResponse }])

      // Clear input and selected image
      setInputText("")
      setSelectedImage(null)
    } catch (error) {
      console.error("Error fetching from Groq:", error)
      // Add error message to conversation
      setConversation([
        ...updatedConversation,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Function to start the camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      console.log("Camera Stream:", mediaStream)

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }

      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing the camera: ", err)
    }
  }

  // Function to stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsCameraActive(false)
  }

  // Function to capture image from camera
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setSelectedImage(imageDataUrl)
        stopCamera()
      }
    }
  }

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Function to trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Function to remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null)
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isChatOpen && (
        <button
          className="fixed bottom-6 right-6 bg-primary rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-50 flex items-center justify-center"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open SignBuddy Chat"
        >
          <div className="relative">
            <MessageSquare className="w-8 h-8" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
        </button>
      )}

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-10">
          {/* Chat Header with Logo */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full shadow-md">
                <img src="/Chatbot.png" alt="SignBuddy Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SignBuddy</h1>
                <p className="text-xs text-red-100 opacity-90">Your ASL learning assistant</p>
              </div>
            </div>
            <button
              className="text-white hover:text-red-200 transition-colors p-1 rounded-full hover:bg-red-800/30"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat or Camera View */}
          {isCameraActive ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50">
              <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full aspect-video relative">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="bg-red-600/80 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                    Camera Active
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={captureImage}
                  className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-colors shadow-md flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-colors shadow-md flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {conversation.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                  <img src="/chatbot.png" alt="SignBuddy" className="w-20 h-20 mb-4 opacity-50" />
                  <h3 className="font-medium text-lg text-gray-700 mb-2">Welcome to SignBuddy!</h3>
                  <p className="text-sm mb-4">
                    Ask me anything about American Sign Language (ASL) or upload a sign image for identification.
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                    <button
                      onClick={() => setInputText("How do I sign 'hello' in ASL?")}
                      className="text-left text-sm bg-white p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      How do I sign "hello" in ASL?
                    </button>
                    <button
                      onClick={() => setInputText("What's the basic structure of ASL sentences?")}
                      className="text-left text-sm bg-white p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      What's the basic structure of ASL sentences?
                    </button>
                    <button
                      onClick={handleUploadClick}
                      className="text-left text-sm bg-white p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" /> Upload a sign image
                    </button>
                  </div>
                </div>
              ) : (
                conversation.map((message: any, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${message.role === "user"
                        ? "bg-red-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                        }`}
                    >
                      {/* Display message content */}
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>

                      {/* Display image if present */}
                      {message.image && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-white/30">
                          <img
                            src={message.image || "/placeholder.svg"}
                            alt="Uploaded sign"
                            className="w-full h-auto max-h-48 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef}></div>

              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">SignBuddy is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Input & Camera Button */}
          {!isCameraActive && (
            <div className="p-3 border-t bg-white">
              {/* Image preview */}
              {selectedImage && (
                <div className="mb-2 relative">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected sign"
                      className="w-full h-auto max-h-32 object-contain"
                    />
                  </div>
                  <button
                    onClick={removeSelectedImage}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
                      aria-label="Start camera"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
                      aria-label="Upload image"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={selectedImage ? "Describe this sign or ask a question..." : "Type your message..."}
                      rows={1}
                      className="w-full p-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 resize-none bg-gray-50 placeholder-gray-500 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          if (inputText.trim() || selectedImage) {
                            handleSubmit(e as any)
                          }
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading || (!inputText.trim() && !selectedImage)}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full ${(inputText.trim() || selectedImage) && !loading
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } transition-colors`}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Upload images of signs for identification or ask questions about ASL
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default FloatingChatbot

