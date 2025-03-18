import { modelServerUrl } from "@/utils/const"
import { Poppins } from "next/font/google"
import { useEffect, useRef, useState } from "react"
import { FaVideo, FaVideoSlash } from "react-icons/fa"
import { io, type Socket } from "socket.io-client"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

interface SignDetectorProps {
    currentLetter?: string
    onDetection?: (word: string) => void
}

export default function SignDetector({ currentLetter, onDetection }: SignDetectorProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [mediaStream, setMediaStream] = useState(null as MediaStream | null)
    const [interval, _setInterval] = useState(null as NodeJS.Timeout | null)
    const [enableCam, setEnableCam] = useState(false)
    const [words, setWords] = useState([] as string[])
    const [socket, setSocket] = useState({} as Socket)

    useEffect(() => {
        const s = io(modelServerUrl)
        s.on("connect", onSocketConnect)
        s.on("word", onWordRecieved)
        s.on("disconnect", onSocketDisconnect)
        s.on("keypoints", onFrameRecieved)

        setSocket(s)

        return () => {
            s.off("connect", onSocketConnect)
            s.off("disconnect", onSocketDisconnect)
            s.off("word", onWordRecieved)
            s.off("keypoints", onFrameRecieved)
            s.disconnect()
            if (interval != null) clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if (!enableCam && interval != null) {
            clearInterval(interval)
        }
    }, [enableCam])

    useEffect(() => {
        if (enableCam && videoRef.current) {
            videoRef.current.srcObject = mediaStream
        }
        if (!enableCam && mediaStream != null) {
            videoRef.current?.pause()
            if (videoRef.current) videoRef.current.src = ""
            mediaStream.getTracks().forEach((track) => {
                track.stop()
            })
        }
        return () => {
            mediaStream?.getTracks().forEach((track) => {
                track.stop()
            })
        }
    }, [enableCam, mediaStream])

    function startCam() {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                setEnableCam(true)
                setMediaStream(stream)
                const video = videoRef.current
                if (!video) return

                video.srcObject = stream
                processVideo()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function stopCam() {
        setEnableCam(false)
        setWords([])
    }

    function processVideo() {
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
        _setInterval(setInterval(captureFrame, 1000 / frameRate))
    }

    function onSocketConnect() {
        console.log("Socket Connected")
    }

    function onSocketDisconnect() {
        console.log("Socket Disconnected")
    }

    function onWordRecieved(data: { word: string }) {
        console.log("Word Received:", data.word)

        // Call the onDetection callback if provided
        if (onDetection && data.word) {
            // Ensure we're passing a clean string to the callback
            const cleanWord = data.word.trim()
            if (cleanWord) {
                console.log("Calling onDetection with:", cleanWord)
                onDetection(cleanWord)
            }
        }

        setWords((w) => {
            if (!data.word || w[w.length - 1] === data.word) return w
            else return [...w, data.word]
        })
    }

    function onFrameRecieved(data: string) {
        const img = imgRef.current
        if (!img) return
        img.src = "data:image/jpeg;base64," + data
    }

    function clearWords() {
        console.log("Clearing detected words")
        setWords([])
    }

    useEffect(() => {
        console.log("Current letter changed to:", currentLetter)
        // Clear words when the current letter changes
        if (currentLetter) {
            clearWords()
        }
    }, [currentLetter])

    return (
        <div className={`${poppins.className} w-full`}>
            {enableCam && (
                <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                    <div className="flex items-center gap-4 justify-between mb-4">
                        <div className="p-3 rounded-lg border border-gray-200 min-h-12 w-full bg-gray-50">
                            {words.length === 0 && <span className="text-gray-400 italic text-lg">No signs detected yet...</span>}
                            {words.map((word, i) => (
                                <span
                                    key={`${word} ${i}`}
                                    className={`inline-block px-4 py-2 rounded-full mr-2 mb-2 text-base md:text-lg font-medium border ${currentLetter && word.toUpperCase() === currentLetter.toUpperCase()
                                        ? "bg-green-50 text-green-700 border-green-100"
                                        : "bg-red-50 text-red-700 border-red-100"
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>

                    {words.length > 0 && (
                        <div className="mt-3">
                            <button
                                onClick={clearWords}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-base font-medium rounded-lg shadow-sm"
                            >
                                Clear Text
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className={`${enableCam ? "grid md:grid-cols-2" : ""} gap-6 items-center`}>
                <div className="relative w-full">
                    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 aspect-video w-full">
                        <video ref={videoRef} width={640} height={480} autoPlay className="w-full h-full object-cover"></video>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        {enableCam ? (
                            <button
                                onClick={stopCam}
                                className="bg-red-600 hover:bg-red-700 shadow-lg text-white p-4 rounded-full transition-all"
                                title="Stop camera"
                            >
                                <FaVideoSlash size={22} />
                            </button>
                        ) : (
                            <button
                                onClick={startCam}
                                className="bg-red-600 hover:bg-red-700 shadow-lg text-white p-4 rounded-full transition-all"
                                title="Start camera"
                            >
                                <FaVideo size={22} />
                            </button>
                        )}
                    </div>
                </div>

                {enableCam && (
                    <div className="w-full">
                        <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 aspect-video w-full">
                            <img
                                ref={imgRef}
                                width={640}
                                height={480}
                                className="w-full h-full object-cover"
                                alt="AI detection visualization"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

