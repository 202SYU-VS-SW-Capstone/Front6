package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.Recipe;
import com.ohgiraffers.recipeapp.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    /**
     * 모든 레시피 조회
     *
     * @return List<Recipe> - 모든 레시피 목록
     */
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    /**
     * ID로 특정 레시피 조회
     *
     * @param id 레시피 ID
     * @return Recipe - 조회된 레시피 데이터
     * @throws IllegalArgumentException - 해당 ID의 레시피가 없을 경우 예외 발생
     */
    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found with id: " + id));
    }

    /**
     * 특정 작성자의 모든 레시피 조회
     *
     * @param authorId 작성자 ID
     * @return List<Recipe> - 해당 작성자의 레시피 목록
     */
    public List<Recipe> getRecipesByAuthor(Long authorId) {
        return recipeRepository.findByAuthorId(authorId);
    }

    /**
     * 레시피 저장
     *
     * @param recipe 저장할 레시피 데이터
     * @return Recipe - 저장된 레시피 데이터
     */
    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    /**
     * 레시피 수정
     *
     * @param id 수정할 레시피 ID
     * @param updatedRecipe 수정할 레시피 데이터
     * @return Recipe - 수정된 레시피 데이터
     */
    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found with id: " + id));
        existingRecipe.setDescription(updatedRecipe.getDescription());
        existingRecipe.setCookingTime(updatedRecipe.getCookingTime());
        existingRecipe.setServings(updatedRecipe.getServings());
        existingRecipe.setFinalImage(updatedRecipe.getFinalImage());
        existingRecipe.setCookingProcessVideoLink(updatedRecipe.getCookingProcessVideoLink());
        return recipeRepository.save(existingRecipe);
    }

    /**
     * 특정 레시피 삭제
     *
     * @param id 삭제할 레시피 ID
     */
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    /**
     * 제목으로 레시피 검색
     *
     * @param title 레시피 제목
     * @return List<Recipe> - 제목에 해당 문자열이 포함된 레시피 목록
     */
    public List<Recipe> searchRecipesByTitle(String title) {
        return recipeRepository.findByDescriptionContainingIgnoreCase(title);
    }

    /**
     * 조회수 기준으로 레시피 정렬
     *
     * @return List<Recipe> - 조회수 순으로 정렬된 레시피 목록
     */
    public List<Recipe> getRecipesByPopularity() {
        return recipeRepository.findAllByOrderByViewsDesc();
    }
}
