import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../assets/logo.png";

function Landing() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* RED GLOW BACKGROUND */}

      <div className="absolute w-[700px] h-[700px] bg-red-700 opacity-20 blur-[180px] rounded-full top-10 z-0"></div>

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col items-center">

        {/* LOGO */}

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={logo}
          alt="OttoGPT"
          className="w-40 mb-6 rounded-3xl shadow-2xl border border-red-900"
        />

        {/* TITLE */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-black mb-4 tracking-tight"
        >
          OttoGPT
        </motion.h1>

        {/* SUBTITLE */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 text-xl mb-10 text-center max-w-2xl leading-relaxed"
        >
          AI-powered intelligent customer support assistant using
          PDF RAG, semantic search, Gemini AI, and ChromaDB.
        </motion.p>

        {/* BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(255,0,0,0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chat")}
          className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl text-xl font-semibold transition duration-300 shadow-lg shadow-red-900/40 cursor-pointer"
        >
          Try OttoGPT
        </motion.button>

        {/* FEATURES */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 max-w-5xl"
        >

          <div className="bg-zinc-900/90 backdrop-blur-md border border-red-900 p-6 rounded-2xl hover:border-red-500 transition duration-300">
            <h2 className="text-2xl mb-2 font-semibold">
              PDF RAG
            </h2>

            <p className="text-zinc-400">
              Upload company support PDFs and instantly ask questions.
            </p>
          </div>

          <div className="bg-zinc-900/90 backdrop-blur-md border border-red-900 p-6 rounded-2xl hover:border-red-500 transition duration-300">
            <h2 className="text-2xl mb-2 font-semibold">
              Semantic Search
            </h2>

            <p className="text-zinc-400">
              Uses embeddings and vector search for accurate answers.
            </p>
          </div>

          <div className="bg-zinc-900/90 backdrop-blur-md border border-red-900 p-6 rounded-2xl hover:border-red-500 transition duration-300">
            <h2 className="text-2xl mb-2 font-semibold">
              Gemini AI
            </h2>

            <p className="text-zinc-400">
              Generates intelligent responses from retrieved context.
            </p>
          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Landing;