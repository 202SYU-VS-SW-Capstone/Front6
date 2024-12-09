package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.MajorCategory;
import com.ohgiraffers.recipeapp.repository.MajorCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorCategoryService {

    private final MajorCategoryRepository majorCategoryRepository;

    public MajorCategoryService(MajorCategoryRepository majorCategoryRepository) {
        this.majorCategoryRepository = majorCategoryRepository;
    }

    /**
     * 모든 대분류 조회
     *
     * @return List<MajorCategory> - 모든 대분류 목록
     */
    public List<MajorCategory> getAllMajorCategories() {
        return majorCategoryRepository.findAll();
    }

    /**
     * ID로 특정 대분류 조회
     *
     * @param id 대분류 ID
     * @return MajorCategory - 조회된 대분류 데이터
     * @throws IllegalArgumentException - 해당 ID의 대분류가 없을 경우 예외 발생
     */
    public MajorCategory getMajorCategoryById(Long id) {
        return majorCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MajorCategory not found with id: " + id));
    }

    /**
     * 이름으로 대분류 검색
     *
     * @param name 대분류 이름
     * @return List<MajorCategory> - 검색된 대분류 목록
     */
    public List<MajorCategory> searchMajorCategoriesByName(String name) {
        return majorCategoryRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * 새로운 대분류 저장
     *
     * @param majorCategory 저장할 대분류 데이터
     * @return MajorCategory - 저장된 대분류 데이터
     */
    public MajorCategory saveMajorCategory(MajorCategory majorCategory) {
        return majorCategoryRepository.save(majorCategory);
    }

    /**
     * 특정 대분류 수정
     *
     * @param id 수정할 대분류 ID
     * @param updatedMajorCategory 수정할 대분류 데이터
     * @return MajorCategory - 수정된 대분류 데이터
     */
    public MajorCategory updateMajorCategory(Long id, MajorCategory updatedMajorCategory) {
        MajorCategory existingMajorCategory = majorCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MajorCategory not found with id: " + id));
        existingMajorCategory.setName(updatedMajorCategory.getName());
        return majorCategoryRepository.save(existingMajorCategory);
    }

    /**
     * 특정 대분류 삭제
     *
     * @param id 삭제할 대분류 ID
     */
    public void deleteMajorCategory(Long id) {
        majorCategoryRepository.deleteById(id);
    }
}
