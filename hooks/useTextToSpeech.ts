
import { useState, useCallback, useEffect } from 'react';
import { generateSpeech, createWavBlob } from '../services/geminiService';

const availableVoices = [
  { id: 'Kore', name: 'Kore (Female, Korean-like)' },
  { id: 'Puck', name: 'Puck (Male, English-like)' },
  { id: 'Charon', name: 'Charon (Male, English-like)' },
  { id: 'Zephyr', name: 'Zephyr (Female, English-like)' },
  { id: 'Fenrir', name: 'Fenrir (Male, English-like)' },
];

const useTextToSpeech = () => {
  const [text, setText] = useState<string>('Hello! This is a demonstration of Text-to-Speech using the Gemini API.');
  const [voice, setVoice] = useState<string>(availableVoices[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function to revoke the object URL when the component unmounts or the URL changes
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const synthesizeSpeech = useCallback(async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    }

    try {
      const base64Audio = await generateSpeech(text, voice);
      
      // Decode Base64 to raw PCM data (Uint8Array)
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create a WAV blob from the raw PCM data
      const wavBlob = createWavBlob(bytes, { sampleRate: 24000, channels: 1 });
      const newAudioUrl = URL.createObjectURL(wavBlob);
      
      setAudioUrl(newAudioUrl);

    } catch (err) {
      console.error('TTS Synthesis failed:', err);
      setError('Failed to synthesize speech. The API may be unavailable or the request was invalid.');
    } finally {
      setIsLoading(false);
    }
  }, [text, voice, audioUrl]);

  return {
    text,
    setText,
    voice,
    setVoice,
    isLoading,
    error,
    audioUrl,
    synthesizeSpeech,
    voices: availableVoices,
  };
};

export default useTextToSpeech;
