
import React, { useState } from 'react';
import { User, Sparkles, Loader2 } from 'lucide-react';
import { generateBio } from '../services/portfolioService';

const Portfolio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateBio = async () => {
    if (!prompt) return;
    setLoading(true);
    setBio('');
    try {
      const generatedBio = await generateBio(prompt);
      setBio(generatedBio);
    } catch (error) {
      console.error("Failed to generate bio:", error);
      setBio("There was an error generating your bio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-3">
        <User className="w-8 h-8 text-purple-400" />
        <div>
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-gray-400">A brief introduction to who I am and what I do.</p>
        </div>
      </header>

      <div className="glass p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          AI Bio Generator
        </h3>
        <p className="text-gray-400 mb-4 text-sm">
          Enter some key points about your skills, experience, and passions. The AI will craft a professional bio for you.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., - 5 years of experience in React and Node.js\n- Passionate about building scalable web applications\n- Contributor to open-source projects..."
          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none mb-4"
        />
        <button
          onClick={handleGenerateBio}
          disabled={loading || !prompt}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Bio'
          )}
        </button>
      </div>

      {bio && (
        <div className="glass p-6 rounded-2xl border border-green-500/20">
          <h3 className="text-xl font-bold mb-4">Generated Bio</h3>
          <p className="text-gray-300 whitespace-pre-line">{bio}</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
