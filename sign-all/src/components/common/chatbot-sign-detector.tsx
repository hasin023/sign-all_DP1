import { modelServerUrl } from "@/utils/const"
import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { FaVideoSlash, FaCheck } from "react-icons/fa"
import { MdClear } from "react-icons/md"

interface ChatbotSignDetectorProps {
    onSignDetected: (text: string) => void
    onClose: () => void
}

export default function ChatbotSignDetector({ onSignDetected, onClose }: ChatbotSignDetectorProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const [detectedWords, setDetectedWords] = useState<string[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    // Initialize socket connection
    useEffect(() => {
        const s = io(modelServerUrl)

        s.on("connect", () => {
            console.log("Socket Connected")
            setIsConnected(true)
        })

        s.on("disconnect", () => {
            console.log("Socket Disconnected")
            setIsConnected(false)
        })

        s.on("word", onWordReceived)
        s.on("keypoints", onFrameReceived)

        setSocket(s)

        // Start camera automatically when component mounts
        startCamera()

        return () => {
            s.off("connect")
            s.off("disconnect")
            s.off("word", onWordReceived)
            s.off("keypoints", onFrameReceived)
            s.disconnect()
            stopCamera()
        }
    }, [])

    // Handle camera stream
    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [mediaStream])

    // Start camera and video processing
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            setMediaStream(stream)

            // Start processing video frames
            const frameRate = 2
            const captureInterval = setInterval(() => {
                captureFrame()
            }, 1000 / frameRate)

            setIntervalId(captureInterval)
        } catch (err) {
            console.error("Error accessing camera:", err)
        }
    }

    // Stop camera and clear resources
    const stopCamera = () => {
        if (interval) {
            clearInterval(interval)
            setIntervalId(null)
        }

        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop())
            setMediaStream(null)
        }

        setDetectedWords([])
    }

    // Capture video frame and send to server
    const captureFrame = () => {
        if (!videoRef.current || !socket || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
            return
        }

        const canvas = document.createElement("canvas")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const context = canvas.getContext("2d")

        if (!context) return

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL("image/jpeg")
        const base64Data = dataURL.split(",")[1]

        socket.emit("frame", base64Data)
    }

    // Handle word detection from server
    const onWordReceived = (data: { word: string }) => {
        if (!data.word) return

        console.log("Word Received:", data.word)

        setDetectedWords((prev) => {
            // Don't add duplicate consecutive words
            if (prev.length > 0 && prev[prev.length - 1] === data.word) {
                return prev
            }
            return [...prev, data.word]
        })
    }

    // Handle keypoints frame from server
    const onFrameReceived = (data: string) => {
        if (imgRef.current) {
            imgRef.current.src = "data:image/jpeg;base64," + data
        }
    }

    // Clear detected words
    const clearWords = () => {
        setDetectedWords([])
    }

    // Accept the detected words and send to chatbot
    const acceptWords = () => {
        if (detectedWords.length > 0) {
            const text = detectedWords.join(" ")
            onSignDetected(text)
            onClose()
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50">
                {/* Main video feed */}
                <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full aspect-video relative mb-4">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <div className="bg-red-600/80 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                            {isConnected ? "Sign Detection Active" : "Connecting..."}
                        </div>
                    </div>
                </div>

                {/* AI visualization (optional) */}
                <div className="w-full mb-4">
                    <div className="rounded-xl overflow-hidden shadow-md bg-gray-800 aspect-video w-full">
                        <img ref={imgRef} className="w-full h-full object-cover" alt="AI detection visualization" />
                    </div>
                </div>

                {/* Detected words display */}
                <div className="w-full bg-white p-3 rounded-lg shadow-sm mb-4 min-h-[60px] border border-gray-200">
                    {detectedWords.length === 0 ? (
                        <p className="text-gray-400 text-center italic">Sign something to see it detected here...</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {detectedWords.map((word, index) => (
                                <span
                                    key={`${word}-${index}`}
                                    className="inline-block px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={clearWords}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <MdClear className="w-4 h-4" /> Clear
                    </button>
                    <button
                        onClick={acceptWords}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                        disabled={detectedWords.length === 0}
                    >
                        <FaCheck className="w-4 h-4" /> Accept
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <FaVideoSlash className="w-4 h-4" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

