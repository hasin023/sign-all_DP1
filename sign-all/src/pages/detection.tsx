"use client"

import Navbar from "@/components/common/Navbar"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { modelServerUrl } from "@/utils/const"
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2"

interface VideoRefElement extends HTMLVideoElement {
  srcObject: MediaStream | null
}

const SignDetection: React.FC = () => {
  const videoRef = useRef<VideoRefElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [interval, setInterval] = useState<NodeJS.Timeout | null>(null)
  const [words, setWords] = useState<string[]>([])
  const [socket, setSocket] = useState<Socket>({} as Socket)
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false)

  // Socket connection setup
  useEffect(() => {
    const s = io(modelServerUrl)
    s.on("connect", onSocketConnect)
    s.on("word", onWordReceived)
    s.on("disconnect", onSocketDisconnect)
    s.on("keypoints", onFrameReceived)

    setSocket(s)

    return () => {
      s.off("connect", onSocketConnect)
      s.off("disconnect", onSocketDisconnect)
      s.off("word", onWordReceived)
      s.off("keypoints", onFrameReceived)
      s.disconnect()
      if (interval != null) clearInterval(interval)
    }
  }, [])

  // Text-to-speech for detected words
  useEffect(() => {
    if (!isAudioEnabled || !words.length) return
    const utterance = new SpeechSynthesisUtterance(words[words.length - 1])
    // Select a voice
    const voices = speechSynthesis.getVoices()
    utterance.voice = voices[0] // Choose a specific voice
    // Speak the text
    speechSynthesis.speak(utterance)
  }, [isAudioEnabled, words])

  // Clear interval when camera is disabled
  useEffect(() => {
    if (!isCameraActive && interval != null) {
      clearInterval(interval)
    }
  }, [isCameraActive, interval])

  // Handle camera stream
  useEffect(() => {
    if (isCameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
    if (!isCameraActive && stream != null) {
      videoRef.current?.pause()
      if (videoRef.current) videoRef.current.srcObject = null
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [isCameraActive, stream])

  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }

      setIsCameraActive(true)
      processVideo()
    } catch (err) {
      console.error("Error accessing the camera: ", err)
    }
  }

  const stopCamera = (): void => {
    setIsCameraActive(false)
  }

  // Process video frames and send to server
  const processVideo = () => {
    const frameRate = 2
    const captureFrame = () => {
      const video = videoRef.current
      if (!video) return
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext("2d")
        if (!context) return
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL("image/jpeg")
        const base64Data = dataURL.split(",")[1]
        socket.emit("frame", base64Data)
      }
    }
    setInterval(setInterval(captureFrame, 1000 / frameRate))
  }

  // Socket event handlers
  function onSocketConnect() {
    console.log("Socket Connected")
  }

  function onSocketDisconnect() {
    console.log("Socket Disconnected")
  }

  function onWordReceived(data: { word: string }) {
    console.log("Word Received:", data.word)
    setWords((w) => {
      if (!data.word || w[w.length - 1] === data.word) return w
      else return [...w, data.word]
    })
  }

  function onFrameReceived(data: string) {
    const img = imgRef.current
    if (!img) return
    img.src = "data:image/jpeg;base64," + data
  }

  function clearWords() {
    setWords([])
  }

  function toggleAudio() {
    setIsAudioEnabled(!isAudioEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ASL Recognition</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Experience real-time American Sign Language detection powered by advanced AI. Start your camera to begin
            converting signs into text instantly.
          </p>
        </div>

        {/* Detected Words Display */}
        {isCameraActive && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4 justify-between">
                <div className="p-2 rounded min-h-12 w-full">
                  {words.length === 0 ? (
                    <span className="text-gray-400">No signs detected yet</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {words.map((word, i) => (
                        <span key={`${word}-${i}`} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {words.length > 0 && (
                    <button
                      onClick={clearWords}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={toggleAudio}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                    aria-label={isAudioEnabled ? "Disable audio" : "Enable audio"}
                  >
                    {isAudioEnabled ? <HiMiniSpeakerWave size={22} /> : <HiMiniSpeakerXMark size={22} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Feeds Container */}
        <div className="max-w-6xl mx-auto">
          <div className={`grid gap-6 ${isCameraActive ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
            {/* Main Video Feed */}
            <div className="relative">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />

                {/* Camera Controls */}
                {!isCameraActive ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                    <button
                      onClick={startCamera}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      type="button"
                      aria-label="Start camera"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.5-4.5M19.5 5.5L15 10M19 11v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7M7 15h7"
                        />
                      </svg>
                      Start Camera
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 group"
                    type="button"
                    aria-label="Stop camera"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isCameraActive ? "bg-green-500" : "bg-gray-500"}`}></div>
                  <span className="text-white text-sm font-medium">
                    {isCameraActive ? "Camera Active" : "Camera Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Processed Video Feed with Keypoints */}
            {isCameraActive && (
              <div className="relative">
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video">
                  <img ref={imgRef} className="w-full h-full object-cover" alt="Processed video feed with keypoints" />
                  {/* Processing Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Processing Feed</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions Panel */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">1</span>
                </div>
                <p>Click the start button to activate your camera</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">2</span>
                </div>
                <p>Position yourself in frame and start signing</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">3</span>
                </div>
                <p>View the real-time text translation on screen</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignDetection

