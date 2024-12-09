package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.RecipeIngredient;
import com.ohgiraffers.recipeapp.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeIngredientService {

    private final RecipeIngredientRepository recipeIngredientRepository;

    // Repository 주입
    public RecipeIngredientService(RecipeIngredientRepository recipeIngredientRepository) {
        this.recipeIngredientRepository = recipeIngredientRepository;
    }

    /**
     * 특정 레시피의 재료 목록 조회
     *
     * @param recipeId 레시피 ID
     * @return List<RecipeIngredient> - 해당 레시피의 재료 목록
     */
    public List<RecipeIngredient> getIngredientsByRecipe(Long recipeId) {
        return recipeIngredientRepository.findByRecipeId(recipeId);
    }

    /**
     * 새로운 재료 추가
     *
     * @param recipeIngredient 저장할 재료 데이터
     * @return RecipeIngredient - 저장된 재료 데이터
     */
    public RecipeIngredient saveRecipeIngredient(RecipeIngredient recipeIngredient) {
        return recipeIngredientRepository.save(recipeIngredient);
    }

    /**
     * 특정 재료 삭제
     *
     * @param id 삭제할 재료 ID
     */
    public void deleteRecipeIngredient(Long id) {
        recipeIngredientRepository.deleteById(id);
    }
}
