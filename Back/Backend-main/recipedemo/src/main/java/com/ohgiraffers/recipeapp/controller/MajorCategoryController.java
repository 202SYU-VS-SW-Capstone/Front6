package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.MajorCategory;
import com.ohgiraffers.recipeapp.service.MajorCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/major-categories")
public class MajorCategoryController {

    private final MajorCategoryService majorCategoryService;

    public MajorCategoryController(MajorCategoryService majorCategoryService) {
        this.majorCategoryService = majorCategoryService;
    }

    /**
     * 모든 대분류 조회
     *
     * @return ResponseEntity<List<MajorCategory>> - 모든 대분류 목록
     */
    @GetMapping
    public ResponseEntity<List<MajorCategory>> getAllMajorCategories() {
        List<MajorCategory> majorCategories = majorCategoryService.getAllMajorCategories();
        return ResponseEntity.ok(majorCategories);
    }

    /**
     * ID로 특정 대분류 조회
     *
     * @param id 대분류 ID (Path Variable)
     * @return ResponseEntity<MajorCategory> - 조회된 대분류 데이터
     */
    @GetMapping("/{id}")
    public ResponseEntity<MajorCategory> getMajorCategoryById(@PathVariable("id") Long id) {
        MajorCategory majorCategory = majorCategoryService.getMajorCategoryById(id);
        return ResponseEntity.ok(majorCategory);
    }

    /**
     * 이름으로 대분류 검색
     *
     * @param name 대분류 이름 (Query Parameter)
     * @return ResponseEntity<List<MajorCategory>> - 검색된 대분류 목록
     */
    @GetMapping("/search")
    public ResponseEntity<List<MajorCategory>> searchMajorCategoriesByName(@RequestParam("name") String name) {
        List<MajorCategory> majorCategories = majorCategoryService.searchMajorCategoriesByName(name);
        return ResponseEntity.ok(majorCategories);
    }

    /**
     * 새로운 대분류 추가
     *
     * @param majorCategory 저장할 대분류 데이터 (Request Body)
     * @return ResponseEntity<MajorCategory> - 저장된 대분류 데이터
     */
    @PostMapping
    public ResponseEntity<MajorCategory> createMajorCategory(@RequestBody MajorCategory majorCategory) {
        MajorCategory savedMajorCategory = majorCategoryService.saveMajorCategory(majorCategory);
        return ResponseEntity.status(201).body(savedMajorCategory); // 201 Created
    }

    /**
     * 특정 대분류 수정
     *
     * @param id 수정할 대분류 ID (Path Variable)
     * @param updatedMajorCategory 수정할 대분류 데이터 (Request Body)
     * @return ResponseEntity<MajorCategory> - 수정된 대분류 데이터
     */
    @PutMapping("/{id}")
    public ResponseEntity<MajorCategory> updateMajorCategory(
            @PathVariable("id") Long id,
            @RequestBody MajorCategory updatedMajorCategory
    ) {
        MajorCategory majorCategory = majorCategoryService.updateMajorCategory(id, updatedMajorCategory);
        return ResponseEntity.ok(majorCategory);
    }

    /**
     * 특정 대분류 삭제
     *
     * @param id 삭제할 대분류 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMajorCategory(@PathVariable("id") Long id) {
        majorCategoryService.deleteMajorCategory(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
