interface AdvancedTranscriptionEntry {
  Time: string;
  Speaker: number;
  Text: string;
}

interface TypicalPotentFeature {
  Method: string;
  "Feature Name": string;
  "Feature Value": string | number;
}

export interface TranscriptionData {
  Transcription: string;
  Translation: string;
  "Advanced Transcription and Translation with Diarization": AdvancedTranscriptionEntry[];
  "Typical Potent Features": TypicalPotentFeature[];
}
