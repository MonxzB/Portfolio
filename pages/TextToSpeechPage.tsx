
import React from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';
import { SoundWaveIcon } from '../components/icons';

const TextToSpeechPage: React.FC = () => {
  const {
    text,
    setText,
    voice,
    setVoice,
    isLoading,
    error,
    audioUrl,
    synthesizeSpeech,
    voices,
  } = useTextToSpeech();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      synthesizeSpeech();
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">AI Text-to-Speech</h1>
        <p className="text-lg text-gray-300">
          Powered by Gemini. Type something below and choose a voice to hear it read aloud.
        </p>
      </section>

      <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg shadow-purple-500/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
              Text to Synthesize
            </label>
            <textarea
              id="text-input"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">
              Select Voice
            </label>
            <select
              id="voice-select"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            >
              {voices.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/40 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Synthesizing...
              </>
            ) : (
              <>
                <SoundWaveIcon className="w-5 h-5 mr-2" />
                Synthesize Speech
              </>
            )}
          </button>
        </form>

        {(error || audioUrl) && (
           <div className="mt-6 p-4 bg-gray-700/50 rounded-md">
           {error && <p className="text-red-400 text-center">{error}</p>}
           {audioUrl && (
             <div className="flex flex-col items-center">
                <p className="text-sm text-gray-300 mb-2">Synthesis complete. Press play to listen.</p>
                <audio controls src={audioUrl} className="w-full" onEnded={() => {}}>
                  Your browser does not support the audio element.
                </audio>
             </div>
           )}
         </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeechPage;
