import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Groq } from "groq-sdk";

const FloatingChatbot = () => {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);

    const updatedConversation = [
      ...conversation,
      { role: "user", content: inputText },
    ];

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content:
              "You are SignBuddy, an AI chatbot specializing in American Sign Language (ASL). Your goal is to assist users in learning ASL, understanding sentence structure, and improving their signing skills. Provide helpful explanations and suggest ASL-related exercises. If the user asks about something outside ASL, politely redirect the conversation.",
          },
          ...updatedConversation,
        ],
      });

      const aiResponse =
        chatCompletion.choices[0]?.message?.content || "No response from AI.";

      setConversation([
        ...updatedConversation,
        { role: "assistant", content: aiResponse },
      ]);

      setInputText("");
    } catch (error) {
      console.error("Error fetching from Groq:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to start the camera
  const startCamera = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera Stream:", mediaStream); // ✅ Debugging log

        setStream(mediaStream);

        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            await videoRef.current.play();
        }

        setIsCameraActive(true);
    } catch (err) {
        console.error("Error accessing the camera: ", err);
    }
};


  // Function to stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isChatOpen && (
        <button
          className="fixed bottom-4 right-4 transition-all z-50"
          onClick={() => setIsChatOpen(true)}
        >
          <img src="/chatbot.png" alt="Chatbot Icon" className="w-16 h-16" />
        </button>
      )}

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className="fixed bottom-12 right-12 w-96 h-[36rem] bg-white rounded-lg shadow-lg flex flex-col z-50 border border-gray-300">
          {/* Chat Header with Logo */}
          <div className="relative bg-red-600 text-white p-4 rounded-t-lg flex flex-col items-center">
            <img
              src="/chatbot.png"
              alt="Chatbot Logo"
              className="w-full h-24 object-contain bg-white rounded-lg p-2"
            />
            <h1 className="text-lg font-bold mt-2">SignBuddy</h1>
            <p className="text-sm text-red-200">
              Your ASL learning assistant. Ask me anything!
            </p>
            <button
              className="absolute top-3 right-4 text-white hover:text-gray-300"
              onClick={() => setIsChatOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Chat or Camera View */}
          {isCameraActive ? (
            <div className="flex-1 flex flex-col items-center justify-center p-3">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-full aspect-video">
                <video
    ref={videoRef}
    className="w-full h-full object-cover bg-black rounded-lg"
    autoPlay
    playsInline
    muted
/>

              </div>

              <button
                onClick={stopCamera}
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
              >
                Stop Camera
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg shadow-sm ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
          )}

          {/* Chat Input & Camera Button */}
          {!isCameraActive && (
            <div className="p-3 border-t bg-white flex gap-2">
              <button
                onClick={startCamera}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                🎥 Camera
              </button>
              <form onSubmit={handleSubmit} className="flex-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  rows={2}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all"
                >
                  {loading ? "Thinking..." : "Send"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
