package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

    /**
     * 특정 대분류에 속한 소분류 목록 조회
     * @param majorCategoryId 대분류 ID
     * @return List<SubCategory> - 해당 대분류에 속한 소분류 목록
     */
    List<SubCategory> findByMajorCategoryId(Long majorCategoryId);

    /**
     * 이름으로 소분류 검색 (부분 일치)
     * @param name 소분류 이름
     * @return List<SubCategory> - 이름에 해당 문자열이 포함된 소분류 목록
     */
    List<SubCategory> findByNameContainingIgnoreCase(String name);
}
