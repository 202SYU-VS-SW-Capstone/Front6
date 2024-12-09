package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.SubCategory;
import com.ohgiraffers.recipeapp.service.SubCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sub-categories")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    /**
     * 모든 소분류 조회
     *
     * @return ResponseEntity<List<SubCategory>> - 모든 소분류 목록
     */
    @GetMapping
    public ResponseEntity<List<SubCategory>> getAllSubCategories() {
        List<SubCategory> subCategories = subCategoryService.getAllSubCategories();
        return ResponseEntity.ok(subCategories);
    }

    /**
     * ID로 특정 소분류 조회
     *
     * @param id 소분류 ID (Path Variable)
     * @return ResponseEntity<SubCategory> - 조회된 소분류 데이터
     */
    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable("id") Long id) {
        SubCategory subCategory = subCategoryService.getSubCategoryById(id);
        return ResponseEntity.ok(subCategory);
    }

    /**
     * 특정 대분류에 속한 소분류 조회
     *
     * @param majorCategoryId 대분류 ID (Query Parameter)
     * @return ResponseEntity<List<SubCategory>> - 해당 대분류의 소분류 목록
     */
    @GetMapping("/major-category")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByMajorCategory(@RequestParam("majorCategoryId") Long majorCategoryId) {
        List<SubCategory> subCategories = subCategoryService.getSubCategoriesByMajorCategory(majorCategoryId);
        return ResponseEntity.ok(subCategories);
    }

    /**
     * 이름으로 소분류 검색
     *
     * @param name 소분류 이름 (Query Parameter)
     * @return ResponseEntity<List<SubCategory>> - 검색된 소분류 목록
     */
    @GetMapping("/search")
    public ResponseEntity<List<SubCategory>> searchSubCategoriesByName(@RequestParam("name") String name) {
        List<SubCategory> subCategories = subCategoryService.searchSubCategoriesByName(name);
        return ResponseEntity.ok(subCategories);
    }

    /**
     * 새로운 소분류 추가
     *
     * @param subCategory 저장할 소분류 데이터 (Request Body)
     * @return ResponseEntity<SubCategory> - 저장된 소분류 데이터
     */
    @PostMapping
    public ResponseEntity<SubCategory> createSubCategory(@RequestBody SubCategory subCategory) {
        SubCategory savedSubCategory = subCategoryService.saveSubCategory(subCategory);
        return ResponseEntity.status(201).body(savedSubCategory); // 201 Created
    }

    /**
     * 특정 소분류 수정
     *
     * @param id 수정할 소분류 ID (Path Variable)
     * @param updatedSubCategory 수정할 소분류 데이터 (Request Body)
     * @return ResponseEntity<SubCategory> - 수정된 소분류 데이터
     */
    @PutMapping("/{id}")
    public ResponseEntity<SubCategory> updateSubCategory(
            @PathVariable("id") Long id,
            @RequestBody SubCategory updatedSubCategory
    ) {
        SubCategory subCategory = subCategoryService.updateSubCategory(id, updatedSubCategory);
        return ResponseEntity.ok(subCategory);
    }

    /**
     * 특정 소분류 삭제
     *
     * @param id 삭제할 소분류 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubCategory(@PathVariable("id") Long id) {
        subCategoryService.deleteSubCategory(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}

