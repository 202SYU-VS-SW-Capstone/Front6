package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.CookingStep;
import com.ohgiraffers.recipeapp.repository.CookingStepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CookingStepService {

    private final CookingStepRepository cookingStepRepository;

    public CookingStepService(CookingStepRepository cookingStepRepository) {
        this.cookingStepRepository = cookingStepRepository;
    }

    /**
     * 특정 레시피의 모든 조리 단계 조회
     *
     * @param recipeId 레시피 ID
     * @return List<CookingStep> - 해당 레시피의 조리 단계 목록
     */
    public List<CookingStep> getCookingStepsByRecipe(Long recipeId) {
        return cookingStepRepository.findByRecipeIdOrderByStepNumberAsc(recipeId);
    }

    /**
     * 새로운 조리 단계 추가
     *
     * @param cookingStep 저장할 조리 단계 데이터
     * @return CookingStep - 저장된 조리 단계 데이터
     */
    public CookingStep saveCookingStep(CookingStep cookingStep) {
        return cookingStepRepository.save(cookingStep);
    }

    /**
     * 특정 조리 단계 수정
     *
     * @param id 수정할 조리 단계 ID
     * @param updatedStep 수정할 조리 단계 데이터
     * @return CookingStep - 수정된 조리 단계 데이터
     */
    public CookingStep updateCookingStep(Long id, CookingStep updatedStep) {
        CookingStep existingStep = cookingStepRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("CookingStep not found with id: " + id));
        existingStep.setDescription(updatedStep.getDescription());
        existingStep.setStepNumber(updatedStep.getStepNumber());
        existingStep.setStepImage(updatedStep.getStepImage());
        return cookingStepRepository.save(existingStep);
    }

    /**
     * 특정 조리 단계 삭제
     *
     * @param id 삭제할 조리 단계 ID
     */
    public void deleteCookingStep(Long id) {
        cookingStepRepository.deleteById(id);
    }
}
