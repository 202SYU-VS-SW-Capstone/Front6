package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    /**
     * 소분류 ID로 재료 검색
     * @param subCategoryId 소분류 ID
     * @return List<Ingredient> - 해당 소분류에 속하는 재료 목록
     */
    List<Ingredient> findBySubCategoryId(Long subCategoryId);

    /**
     * 재료 이름으로 검색
     * @param name 검색할 재료 이름
     * @return List<Ingredient> - 해당 이름을 포함하는 재료 목록
     */
    List<Ingredient> findByNameContainingIgnoreCase(String name);
}
