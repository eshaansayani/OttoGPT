import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import logo from "../assets/logo.png";

function Chat() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // -------------------------
  // AUTO SCROLL
  // -------------------------

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  // -------------------------
  // SEND MESSAGE
  // -------------------------

  const sendMessage = async () => {

    if (!message.trim()) return;

    const currentMessage = message;

    // CLEAR INPUT INSTANTLY
    setMessage("");

    const userMessage = {
      sender: "user",
      text: currentMessage
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: currentMessage
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply
      };

      setMessages(prev => [
        ...prev,
        botMessage
      ]);

    } catch (error) {

      console.log(error);

      alert("Error connecting to backend");

    }

    setLoading(false);
  };

  // -------------------------
  // UPLOAD PDF
  // -------------------------

  const uploadPDF = async () => {

    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      alert("PDF Uploaded Successfully!");

    } catch (error) {

      console.log(error);

      alert("Upload failed");

    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">

      {/* RED GLOW */}

      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-red-700 opacity-20 blur-[180px] rounded-full"></div>

      {/* SIDEBAR */}

      <div className="w-[280px] bg-black border-r border-zinc-900 flex flex-col justify-between p-6 z-10">

        <div>

          {/* LOGO */}

          <div className="flex items-center gap-3 mb-12">

            <img
              src={logo}
              alt="logo"
              className="w-12 rounded-xl"
            />

            <div>
              <h1 className="font-bold text-xl">
                OTTO GPT
              </h1>

              <p className="text-zinc-500 text-sm">
                Support Assistant
              </p>
            </div>

          </div>

          {/* MENU */}

          <div className="space-y-4">

            <div className="bg-gradient-to-r from-red-900 to-zinc-900 border border-red-800 rounded-xl p-4 cursor-pointer">
              Main Chat
            </div>

            <div className="text-zinc-500 p-4">
              Knowledge Base
            </div>

            <div className="text-zinc-500 p-4">
              Live Agent (Soon)
            </div>

          </div>

        </div>

        {/* POWERED */}

        <div className="border border-zinc-800 rounded-2xl p-4 bg-zinc-950">

          <p className="text-zinc-400 text-sm">
            Powered by Gemini AI
          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 flex flex-col p-8 z-10">

        {/* TITLE */}

        <div className="mb-6">

          <h1 className="text-4xl font-bold mb-2">
            Active Conversation
          </h1>

          <p className="text-zinc-500">
            Upload documents and ask support questions.
          </p>

        </div>

        {/* PDF UPLOAD */}

        <div className="bg-zinc-950/80 border border-red-900 rounded-3xl p-6 flex justify-between items-center mb-6 backdrop-blur-xl">

          {/* LEFT */}

          <div>

            <label className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl cursor-pointer font-semibold inline-block shadow-lg shadow-red-900/40">

              Choose PDF

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
                hidden
              />

            </label>

            <p className="text-zinc-500 mt-3 ml-1 text-sm">

              {file
                ? file.name
                : "No file selected"}

            </p>

          </div>

          {/* RIGHT */}

          <button
            onClick={uploadPDF}
            className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-red-900/40"
          >
            Upload PDF
          </button>

        </div>

        {/* CHAT BOX */}

        <div className="flex-1 bg-zinc-950/70 border border-red-900 rounded-3xl p-6 overflow-y-auto backdrop-blur-xl relative">

          {/* EMPTY */}

          {messages.length === 0 && !loading && (

            <div className="h-full flex items-center justify-center text-zinc-600 text-xl">
              Upload a support document and ask questions.
            </div>

          )}

          {/* MESSAGES */}

          <div className="space-y-8">

            {messages.map((msg, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[70%] px-6 py-4 rounded-2xl text-lg leading-relaxed border ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-red-700 to-red-500 border-red-400"
                      : "bg-black/70 border-red-700"
                  }`}
                >
                  {msg.text}
                </div>

              </motion.div>

            ))}

            {/* LOADING / TYPING */}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-black/70 border border-red-700 px-5 py-4 rounded-2xl flex items-center gap-3">

                  <div className="flex gap-1">

                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>

                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>

                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200"></div>

                  </div>

                  <span className="text-zinc-400">
                    OttoGPT is typing...
                  </span>

                </div>

              </div>

            )}

            <div ref={messagesEndRef}></div>

          </div>

        </div>

        {/* INPUT */}

        <div className="mt-6 flex gap-4">

          <input
            type="text"
            placeholder="Ask your question..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                sendMessage();
              }

            }}
            className="flex-1 bg-black/80 border border-red-900 focus:border-red-500 rounded-2xl px-6 py-5 outline-none text-lg"
          />

          <button
            onClick={sendMessage}
            className="bg-red-600 hover:bg-red-700 transition px-10 rounded-2xl font-bold text-lg shadow-lg shadow-red-900/40"
          >
            SEND
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;