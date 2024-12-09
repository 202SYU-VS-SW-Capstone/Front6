package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    /**
     * 특정 작성자(Member)의 모든 레시피 조회
     * @param authorId 작성자 ID
     * @return List<Recipe> - 해당 작성자의 레시피 목록
     */
    List<Recipe> findByAuthorId(Long authorId);

    /**
     * 제목으로 레시피 검색
     * @param description 레시피 설명 부분
     * @return List<Recipe> - 설명에 해당 문자열이 포함된 레시피 목록
     */
    List<Recipe> findByDescriptionContainingIgnoreCase(String description);

    /**
     * 조회수 기준으로 레시피 정렬
     * @return List<Recipe> - 조회수 순으로 정렬된 레시피 목록
     */
    List<Recipe> findAllByOrderByViewsDesc();
}



