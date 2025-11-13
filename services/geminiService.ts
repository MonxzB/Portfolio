
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSpeech = async (text: string, voiceName: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash-preview-tts";
    
    // The prompt needs to indicate the cheerful tone as requested by the original user prompt for Gemini TTS
    const prompt = `Say cheerfully: ${text}`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received from API.");
    }

    return base64Audio;
  } catch (error) {
    console.error("Error generating speech with Gemini API:", error);
    throw error;
  }
};

/**
 * Creates a WAV file Blob from raw PCM data.
 * The Gemini TTS API returns audio at 24000 Hz, 16-bit, mono.
 */
export const createWavBlob = (
  pcmData: Uint8Array,
  options: { channels: number; sampleRate: number }
): Blob => {
  const { channels, sampleRate } = options;
  const bitDepth = 16;
  const format = 1; // PCM
  const numFrames = pcmData.byteLength / (channels * (bitDepth / 8));

  const dataSize = numFrames * channels * (bitDepth / 8);
  const fileSize = 36 + dataSize;

  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF header
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, fileSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // "fmt " sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Sub-chunk size
  view.setUint16(20, format, true); // Audio format
  view.setUint16(22, channels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, sampleRate * channels * (bitDepth / 8), true); // Byte rate
  view.setUint16(32, channels * (bitDepth / 8), true); // Block align
  view.setUint16(34, bitDepth, true); // Bits per sample

  // "data" sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true); // Sub-chunk size

  return new Blob([view, pcmData], { type: "audio/wav" });
};
