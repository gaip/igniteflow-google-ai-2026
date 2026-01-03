
import React from 'react';
import { Briefcase, LineChart, Mic2, Palette, BookOpen } from 'lucide-react';
import { AppView } from '../types';

interface ProjectsProps {
  setCurrentView: (view: AppView) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setCurrentView }) => {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-3">
        <Briefcase className="w-8 h-8 text-green-400" />
        <div>
          <h2 className="text-3xl font-bold">My Projects</h2>
          <p className="text-gray-400">A selection of my AI-powered projects.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="glass p-6 rounded-2xl border-t-2 border-blue-500 cursor-pointer hover:bg-blue-500/10 transition-all"
          onClick={() => setCurrentView(AppView.MARKET_INTEL)}
        >
          <div className="flex items-center gap-3 mb-4">
            <LineChart className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold">Market Intel</h3>
          </div>
          <p className="text-sm text-gray-400">
            An AI-powered market analysis tool that provides a validation score for startup ideas.
          </p>
        </div>

        <div
          className="glass p-6 rounded-2xl border-t-2 border-green-500 cursor-pointer hover:bg-green-500/10 transition-all"
          onClick={() => setCurrentView(AppView.PITCH_LAB)}
        >
          <div className="flex items-center gap-3 mb-4">
            <Mic2 className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold">Pitch Lab</h3>
          </div>
          <p className="text-sm text-gray-400">
            A virtual pitch coach that provides feedback on your presentation skills and content.
          </p>
        </div>

        <div
          className="glass p-6 rounded-2xl border-t-2 border-purple-500 cursor-pointer hover:bg-purple-500/10 transition-all"
          onClick={() => setCurrentView(AppView.BRAND_STUDIO)}
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">Brand Studio</h3>
          </div>
          <p className="text-sm text-gray-400">
            A creative suite for generating brand assets, including logos and color palettes.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Projects;
