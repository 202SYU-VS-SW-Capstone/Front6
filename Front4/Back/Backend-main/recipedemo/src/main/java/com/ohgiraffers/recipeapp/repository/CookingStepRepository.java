package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.CookingStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CookingStepRepository extends JpaRepository<CookingStep, Long> {

    /**
     * 특정 레시피의 모든 조리 단계 조회
     * @param recipeId 레시피 ID
     * @return List<CookingStep> - 해당 레시피의 조리 단계 목록
     */
    List<CookingStep> findByRecipeIdOrderByStepNumberAsc(Long recipeId);
}

