package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.RecipeReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeReportRepository extends JpaRepository<RecipeReport, Long> {

    /**
     * 특정 레시피에 대한 모든 신고 조회
     * @param recipeId 레시피 ID
     * @return List<RecipeReport> - 해당 레시피의 신고 목록
     */
    List<RecipeReport> findByRecipeId(Long recipeId);

    /**
     * 특정 회원이 신고한 모든 레시피 신고 조회
     * @param reporterId 회원 ID
     * @return List<RecipeReport> - 해당 회원이 신고한 목록
     */
    List<RecipeReport> findByReporterId(Long reporterId);
}
