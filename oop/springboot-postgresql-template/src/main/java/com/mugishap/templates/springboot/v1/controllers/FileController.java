package com.mugishap.templates.springboot.v1.controllers;

import com.mugishap.templates.springboot.v1.fileHandling.File;
import com.mugishap.templates.springboot.v1.fileHandling.FileStorageService;
import com.mugishap.templates.springboot.v1.services.IFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;
    private final IFileService fileService;

    @Value("${uploads.directory.user_profiles}")
    private String profilesDirectory;

    @Value("${uploads.directory.docs}")
    private String docsDirectory;

    @GetMapping("/load-file/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadProfileImage(@PathVariable String filename) {
//GEt file type from filename
        String fileType = filename.substring(filename.lastIndexOf(".") + 1);
        String directory = fileType.equals("pdf") ? docsDirectory : profilesDirectory;
        Resource file = this.fileStorageService.load(directory, filename);
        File _file = this.fileService.getByName(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, _file.getType())
                .body(file);
    }

}
