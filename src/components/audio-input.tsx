"use client";
import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Loader, X } from "lucide-react";
import axios from "axios";
import { TranscriptionData } from "@/types";
import AudioData from "./audio-data";
const AudioInput = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<TranscriptionData>();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const handleAudioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      if (selectedFile && selectedFile.type.startsWith("audio/")) {
        setAudioFile(selectedFile);
      } else {
        setAudioFile(null);
        if (selectedFile) {
          alert("Please select a audio file");
        }
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (audioFile) {
        try {
          setIsProcessing(true);
          const formData = new FormData();
          formData.append("file", audioFile);

          await axios.post(
            "https://speechai-aidwise.azurewebsites.net/upload-audio",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { data: audio } = await axios.get(
            "https://speechai-aidwise.azurewebsites.net/get-audio",
            { responseType: "blob" }
          );
          const audioBlob = new Blob([audio], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);

          const { data } = await axios.get(
            "https://speechai-aidwise.azurewebsites.net/get-data"
          );
          setAudioData(data);
          setAudioFile(null);
        } catch (error) {
          console.error("Error uploading file", error);
        } finally {
          setIsProcessing(false);
        }
      } else {
        alert("No audio file selected");
      }
    },
    [audioFile]
  );
  return (
    <div className="bg-white max-w-5xl px-28 py-20 rounded-md">
      <form className=" flex flex-col space-y-7" onSubmit={handleSubmit}>
        {audioFile ? (
          <div className="border-2 relative rounded-md border-dashed px-36 py-24 font-semibold">
            <X className="w-4 h-4 cursor-pointer text-rose-500 top-1 right-1 absolute" />
            {audioFile.name}
          </div>
        ) : (
          <label
            htmlFor="file"
            className="border-2 rounded-md border-dashed px-36 py-24"
          >
            <span className="text-blue-500 text-2xl font-semibold capitalize">
              Select audio files
            </span>
            <input
              id="file"
              type="file"
              className="w-0 h-0"
              accept="audio/*"
              onChange={handleAudioChange}
            />
          </label>
        )}
        <Button type="submit" className="flex items-center justify-center">
          {isProcessing ? (
            <Loader className="w-5 h-5 animate-spin ease-in-out duration-300" />
          ) : (
            "Upload and Process"
          )}
        </Button>
      </form>
      {audioData && <AudioData audioData={audioData} />}
      {audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioInput;
