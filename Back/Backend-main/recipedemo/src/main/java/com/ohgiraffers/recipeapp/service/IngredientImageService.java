package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.IngredientImage;
import com.ohgiraffers.recipeapp.repository.IngredientImageRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

/**
 * IngredientImage 서비스 클래스
 *
 * - 이미지 업로드, 조회, 삭제를 처리합니다.
 */
@Service
public class IngredientImageService implements GenericImageService<IngredientImage> {

    private final IngredientImageRepository repository;

    // 이미지 저장 경로 설정
    private final Path uploadDir = Paths.get("uploads/ingredient_images");

    public IngredientImageService(IngredientImageRepository repository) {
        this.repository = repository;
    }

    /**
     * 이미지 파일 업로드
     *
     * @param file 업로드할 이미지 파일
     * @return 저장된 이미지 엔티티
     */
    @Override
    public IngredientImage uploadImage(MultipartFile file) {
        try {
            Files.createDirectories(uploadDir); // 저장 경로가 없으면 생성
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), uploadDir.resolve(fileName));

            IngredientImage image = new IngredientImage();
            image.setUuid(uuid);
            image.setFileName(fileName);
            image.setOriginalName(file.getOriginalFilename());
            image.setUrl("/uploads/ingredient_images/" + fileName);
            image.setUploadDate(LocalDate.now());

            return repository.save(image);
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패", e);
        }
    }

    /**
     * ID를 통해 이미지 파일 로드
     *
     * @param id 이미지 ID
     * @return 이미지 리소스
     */
    @Override
    public Resource loadImageById(Long id) {
        try {
            IngredientImage image = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("이미지를 찾을 수 없습니다."));
            return new UrlResource(uploadDir.resolve(image.getFileName()).toUri());
        } catch (IOException e) {
            throw new RuntimeException("이미지 로드 실패", e);
        }
    }

    /**
     * ID를 통해 이미지 삭제
     *
     * @param id 이미지 ID
     */
    @Override
    public void deleteImageById(Long id) {
        IngredientImage image = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("이미지를 찾을 수 없습니다."));
        try {
            Files.deleteIfExists(uploadDir.resolve(image.getFileName()));
            repository.deleteById(id);
        } catch (IOException e) {
            throw new RuntimeException("이미지 삭제 실패", e);
        }
    }

    /**
     * 이미지 파일 이름 반환
     *
     * @param id 이미지 ID
     * @return 파일 이름
     */
    public String getFileNameById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("이미지를 찾을 수 없습니다."))
                .getFileName();
    }
}