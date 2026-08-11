package com.audio.transcribe;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {

    private final ChatClient chatClient;

    public TranscriptionController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping
    public ResponseEntity<String> transcribeAudio(@RequestParam("file") MultipartFile file)throws IOException {

        File tempFile = File.createTempFile("audio", ".wav");
        file.transferTo(tempFile);

        try {
            String transcription = chatClient.prompt()
                    .user(u -> u.text("Transcribe this audio exactly as spoken. Return only the transcript.")
                    .media(
                        MimeTypeUtils.parseMimeType("audio/wav"),
                        new FileSystemResource(tempFile)))
                    .call()
                    .content();

            return ResponseEntity.ok(transcription);
        } finally {
            tempFile.delete();
        }
    }
}