// frontend/src/MeetingRecorder.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function MeetingRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  async function startRecording() {
    setResult(null);
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      // keep blob in ref for upload
      mediaRecorderRef.current.blob = blob;
    };

    mediaRecorder.start();
    setRecording(true);
  }

  function stopRecording() {
    setRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      // stop all tracks
      mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop?.());
    }
  }

  async function endMeetingAndSend() {
    // Called when user ends the meeting
    if (!mediaRecorderRef.current?.blob) {
      alert("No recorded audio found. Start recording first.");
      return;
    }
    setProcessing(true);
    setResult(null);

    const form = new FormData();
    form.append('audio', mediaRecorderRef.current.blob, 'meeting.webm');

    try {
      const resp = await axios.post('/api/transcribe-summarize', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5 * 60 * 1000 // allow up to 5 minutes
      });

      setResult(resp.data);
    } catch (err) {
      console.error(err);
      alert("Error processing meeting: " + (err.response?.data?.error || err.message));
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-3">Meeting Recorder</h2>

      {!recording ? (
        <button onClick={startRecording} className="px-4 py-2 bg-green-600 text-white rounded">Start Recording</button>
      ) : (
        <button onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white rounded">Stop Recording</button>
      )}

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} />
        </div>
      )}

      <div className="mt-4">
        <button onClick={endMeetingAndSend} disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded">
          {processing ? 'Processing...' : 'End Meeting & Generate Summary'}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold">Generated Output</h3>

          <div className="mt-3">
            <strong>Transcript (short):</strong>
            <pre className="whitespace-pre-wrap max-h-48 overflow-auto bg-white p-2 rounded mt-1">{result.transcript || '—'}</pre>
          </div>

          <div className="mt-3">
            <strong>Parsed JSON (if available):</strong>
            <pre className="whitespace-pre-wrap max-h-72 overflow-auto bg-white p-2 rounded mt-1">{result.parsed ? JSON.stringify(result.parsed, null, 2) : result.raw}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
