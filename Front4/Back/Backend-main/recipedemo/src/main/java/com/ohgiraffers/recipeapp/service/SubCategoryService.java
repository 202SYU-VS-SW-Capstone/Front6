package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.SubCategory;
import com.ohgiraffers.recipeapp.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    /**
     * 모든 소분류 조회
     *
     * @return List<SubCategory> - 모든 소분류 목록
     */
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    /**
     * ID로 특정 소분류 조회
     *
     * @param id 소분류 ID
     * @return SubCategory - 조회된 소분류 데이터
     * @throws IllegalArgumentException - 해당 ID의 소분류가 없을 경우 예외 발생
     */
    public SubCategory getSubCategoryById(Long id) {
        return subCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SubCategory not found with id: " + id));
    }

    /**
     * 특정 대분류에 속한 소분류 조회
     *
     * @param majorCategoryId 대분류 ID
     * @return List<SubCategory> - 해당 대분류의 소분류 목록
     */
    public List<SubCategory> getSubCategoriesByMajorCategory(Long majorCategoryId) {
        return subCategoryRepository.findByMajorCategoryId(majorCategoryId);
    }

    /**
     * 이름으로 소분류 검색
     *
     * @param name 소분류 이름
     * @return List<SubCategory> - 검색된 소분류 목록
     */
    public List<SubCategory> searchSubCategoriesByName(String name) {
        return subCategoryRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * 새로운 소분류 저장
     *
     * @param subCategory 저장할 소분류 데이터
     * @return SubCategory - 저장된 소분류 데이터
     */
    public SubCategory saveSubCategory(SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    /**
     * 특정 소분류 수정
     *
     * @param id 수정할 소분류 ID
     * @param updatedSubCategory 수정할 소분류 데이터
     * @return SubCategory - 수정된 소분류 데이터
     */
    public SubCategory updateSubCategory(Long id, SubCategory updatedSubCategory) {
        SubCategory existingSubCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SubCategory not found with id: " + id));
        existingSubCategory.setName(updatedSubCategory.getName());
        existingSubCategory.setMajorCategory(updatedSubCategory.getMajorCategory());
        return subCategoryRepository.save(existingSubCategory);
    }

    /**
     * 특정 소분류 삭제
     *
     * @param id 삭제할 소분류 ID
     */
    public void deleteSubCategory(Long id) {
        subCategoryRepository.deleteById(id);
    }
}
