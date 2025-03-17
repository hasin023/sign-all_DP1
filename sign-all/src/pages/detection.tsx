import { modelServerUrl } from "@/utils/const";
import { Poppins } from "next/font/google"
import Head from "next/head"
import { useEffect, useRef, useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import Navbar from "@/components/common/Navbar";

const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

function SignDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mediaStream, setMediaStream] = useState(null as MediaStream | null);
  const [interval, _setInterval] = useState(null as NodeJS.Timeout | null);
  const [enableCam, setEnableCam] = useState(false);
  const [words, setWords] = useState([] as string[]);
  const [socket, setSocket] = useState({} as Socket);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    if (!isAudioEnabled || !words.length) return;
    const utterance = new SpeechSynthesisUtterance(words[words.length - 1]);
    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice
    // Speak the text
    speechSynthesis.speak(utterance);
  }, [isAudioEnabled, words])

  useEffect(() => {
    const s = io(modelServerUrl);
    s.on('connect', onSocketConnect);
    s.on('word', onWordRecieved);
    s.on('disconnect', onSocketDisconnect);
    s.on('keypoints', onFrameRecieved);

    setSocket(s);

    return () => {
      s.off('connect', onSocketConnect)
      s.off('disconnect', onSocketDisconnect);
      s.off('word', onWordRecieved);
      s.off('keypoints', onFrameRecieved);
      s.disconnect();
      if (interval != null) clearInterval(interval);
    }
  }, [])

  useEffect(() => {
    if (!enableCam && interval != null) {
      clearInterval(interval);
    }
  }, [enableCam])


  useEffect(() => {
    if (enableCam && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
    if (!enableCam && mediaStream != null) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.src = "";
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });

    }
    return () => {
      mediaStream?.getTracks().forEach(track => {
        track.stop();
      });
    }
  }, [enableCam, mediaStream])

  function startCam() {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => {
      setEnableCam(true);
      setMediaStream(stream);
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;
      processVideo();
    }).catch(err => {
      console.log(err);
    })
  }

  function stopCam() {
    setEnableCam(false);
  }

  function processVideo() {
    const frameRate = 2;
    const captureFrame = () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg');
        const base64Data = dataURL.split(',')[1];
        socket.emit('frame', base64Data);
      }
    };
    _setInterval(setInterval(captureFrame, 1000 / frameRate));
  }

  function onSocketConnect() {
    console.log('Socket Connected');
  }
  function onSocketDisconnect() {
    console.log('Socket Disconnected');
  }

  function onWordRecieved(data: { word: string }) {
    console.log('Word Recieved:', data.word);
    setWords(w => {
      if (!data.word || w[w.length - 1] == data.word) return w
      else return [...w, data.word];
    });
  }

  function onFrameRecieved(data: string) {
    const img = imgRef.current;
    if (!img) return;
    img.src = 'data:image/jpeg;base64,' + data;
  }
  function clearWords() {
    setWords([]);
  }
  function toggleAudio() {
    setIsAudioEnabled(!isAudioEnabled);
  }
  return (
    <>
      <Head>
        <title>Detect Signs - Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">ASL</span> Detection
            </h1>
            <div className="h-1 w-24 bg-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Detect American Sign Language gestures in real-time. Our custom AI translates sign language into text instantly, bridging communication gaps.
            </p>
          </div>

          {enableCam && (
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
              <div className="flex items-center gap-4 justify-between">
                <div className="p-3 rounded-lg border border-gray-200 min-h-12 w-full bg-gray-50">
                  {words.length === 0 && (
                    <span className="text-gray-400 italic">No signs detected yet...</span>
                  )}
                  {words.map((word, i) => (
                    <span key={`${word} ${i}`} className="inline-block bg-red-50 text-red-700 px-3 py-1 rounded-full mr-2 mb-2 text-sm font-medium border border-red-100">
                      {word}
                    </span>
                  ))}
                </div>
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full shadow-sm transition-all ${isAudioEnabled ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                  title={isAudioEnabled ? "Disable audio" : "Enable audio"}
                >
                  {isAudioEnabled ? <HiMiniSpeakerWave size={24} /> : <HiMiniSpeakerXMark size={24} />}
                </button>
              </div>
              {words.length > 0 && (
                <div className="mt-3">
                  <button
                    onClick={clearWords}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium rounded-lg shadow-sm"
                  >
                    Clear Text
                  </button>
                </div>
              )}
            </div>
          )}

          <div className={`${enableCam ? 'grid md:grid-cols-2' : ''} gap-8 items-center`}>
            <div className="relative max-w-xl mx-auto w-full">
              <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 aspect-video w-full">
                <video
                  ref={videoRef}
                  width={640}
                  height={480}
                  autoPlay
                  className="w-full h-full object-cover"
                ></video>
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
              <div className="max-w-xl mx-auto w-full">
                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 aspect-video w-full">
                  <img
                    ref={imgRef}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover"
                    alt="AI detection visualization"
                  />
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Visualization</h3>
                  <p className="text-gray-600 text-sm">
                    This image shows the AI model's visual analysis of your sign gestures, highlighting the detected hand positions and movement patterns.
                  </p>
                </div>
              </div>
            )}
          </div>

          {!enableCam && (
            <div className="bg-white rounded-xl shadow-md p-6 mt-8 max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center p-4 bg-red-50 rounded-full mb-4">
                  <FaVideo size={30} className="text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Start Detecting Sign Language</h3>
                <p className="text-gray-600 mt-2">
                  Click the camera button to begin real-time ASL detection. Our AI will analyze your gestures and convert them into text.
                </p>
              </div>
              <button
                onClick={startCam}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-medium rounded-lg shadow-md"
              >
                Enable Camera
              </button>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">
              Privacy note: All processing happens on your device and our secure servers. Video data is not stored.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignDetection


// import React, { useState, useEffect, useRef } from "react";
// import { Groq } from "groq-sdk";
// import { io, type Socket } from "socket.io-client";
// import { modelServerUrl } from "@/utils/const";
// import Navbar from "@/components/common/Navbar";

// const groq = new Groq({
//   apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// const languages = [
//   { code: "en", name: "English" },
//   { code: "bn", name: "Bangla" },
//   { code: "es", name: "Spanish" },
//   { code: "fr", name: "French" },
//   { code: "de", name: "German" },
//   { code: "zh", name: "Chinese" },
// ];

// const SignDetectionWithTranslation = () => {
//   const videoRef = useRef(null);
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [words, setWords] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("bn");
//   const [translatedText, setTranslatedText] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const s = io(modelServerUrl);
//     s.on("connect", () => console.log("Socket Connected"));
//     s.on("word", onWordReceived);
//     s.on("disconnect", () => console.log("Socket Disconnected"));
//     setSocket(s);
//     return () => s.disconnect();
//   }, []);

//   useEffect(() => {
//     if (words.length > 0) {
//       handleTranslate();
//     }
//   }, [selectedLanguage, words]);

//   const handleTranslate = async () => {
//     if (!words.length) return;
//     setLoading(true);
//     try {
//       const response = await groq.chat.completions.create({
//         model: "llama-3.3-70b-versatile",
//         temperature: 0.7,
//         max_tokens: 100,
//         messages: [
//           {
//             role: "system",
//             content: "You are a translation assistant. Translate the provided text into the specified language. Nothing other than the translated text should be given",
//           },
//           {
//             role: "user",
//             content: `Translate the following sentence to ${languages.find((l) => l.code === selectedLanguage)?.name}: ${words.join(" ")}`,
//           },
//         ],
//       });
//       setTranslatedText(response.choices[0]?.message?.content || "Translation unavailable.");
//     } catch (error) {
//       console.error("Translation error:", error);
//       setTranslatedText("Error translating text.");
//     }
//     setLoading(false);
//   };

//   const onWordReceived = (data) => {
//     if (!data.word) return;
//     setWords((prevWords) => [...prevWords, data.word]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">ASL Recognition with Translation</h1>
//         {isCameraActive && (
//           <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
//             <div className="p-2 rounded min-h-12 w-full">
//               {words.length === 0 ? (
//                 <span className="text-gray-400">No signs detected yet</span>
//               ) : (
//                 <p className="text-lg font-semibold">Detected: {words.join(" ")}</p>
//               )}
//             </div>
//           </div>
//         )}
//         <div className="bg-white rounded-xl p-4 shadow-lg">
//           <p className="text-gray-600 mb-2">Select Translation Language:</p>
//           <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="border rounded-md px-3 py-2 w-full mb-4">
//             {languages.map((lang) => (
//               <option key={lang.code} value={lang.code}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleTranslate} disabled={loading} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:bg-gray-400 mb-4">
//             {loading ? "Translating..." : "Translate"}
//           </button>
//           <p className="text-gray-600 mb-2">Translated Text:</p>
//           <input type="text" value={translatedText} disabled className="border rounded-md px-3 py-2 w-full mb-4" />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SignDetectionWithTranslation;