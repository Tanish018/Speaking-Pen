# Speaking-Pen (Audio -> Text)

Speaking-Pen is a small demo application that converts spoken audio into text. The project
combines a Spring Boot backend that accepts audio uploads and returns transcriptions with a
lightweight Vite + React frontend that lets users upload audio files and view the resulting transcribed text. The backend leverages the GEMINI API for speech-to-text transcription.

> Simple demo: Spring Boot backend + Vite React frontend for audio transcription.

## Project layout

- `audio-transcribe/` — Spring Boot service that handles audio uploads and returns transcriptions.
  - Main app: `src/main/java/com/audio/transcribe/AudioTranscribeApplication.java`
  - Controller: `src/main/java/com/audio/transcribe/TranscriptionController.java`
  - Config / resources: `src/main/resources/application.properties`
- `frontend/` — Vite + React UI for uploading audio and showing results.

## Prerequisites

- Java 17+ and Maven (or use the provided `mvnw` wrapper)
- Node.js 16+ and npm/yarn for the frontend

## Run backend

From the `audio-transcribe` folder:

```bash
./mvnw spring-boot:run    # Unix/macOS
mvnw.cmd spring-boot:run  # Windows
```

The backend runs on port 8080 by default. See `src/main/resources/application.properties` to change settings.

## Run frontend

From the `frontend` folder:

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173) and use the UI to upload audio files.
