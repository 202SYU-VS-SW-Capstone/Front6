package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.MajorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorCategoryRepository extends JpaRepository<MajorCategory, Long> {

    /**
     * 이름으로 대분류 검색 (부분 일치)
     * @param name 대분류 이름
     * @return List<MajorCategory> - 이름에 해당 문자열이 포함된 대분류 목록
     */
    List<MajorCategory> findByNameContainingIgnoreCase(String name);
}

