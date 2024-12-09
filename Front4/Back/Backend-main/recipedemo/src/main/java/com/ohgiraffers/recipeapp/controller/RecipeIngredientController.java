package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.RecipeIngredient;
import com.ohgiraffers.recipeapp.service.RecipeIngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe-ingredients")
public class RecipeIngredientController {

    private final RecipeIngredientService recipeIngredientService;

    // RecipeIngredientService 를 생성자로 주입
    public RecipeIngredientController(RecipeIngredientService recipeIngredientService) {
        this.recipeIngredientService = recipeIngredientService;
    }

    /**
     * 특정 레시피의 재료 목록 조회
     *
     * @param recipeId 레시피 ID (Query Parameter)
     * @return ResponseEntity<List<RecipeIngredient>> - 해당 레시피의 재료 목록과 HTTP 상태 코드
     */
    @GetMapping
    public ResponseEntity<List<RecipeIngredient>> getIngredientsByRecipe(@RequestParam Long recipeId) {
        List<RecipeIngredient> ingredients = recipeIngredientService.getIngredientsByRecipe(recipeId);
        return ResponseEntity.ok(ingredients);
    }

    /**
     * 새로운 재료 추가
     *
     * @param recipeIngredient 저장할 재료 데이터 (Request Body)
     * @return ResponseEntity<RecipeIngredient> - 저장된 재료 데이터와 HTTP 상태 코드
     */
    @PostMapping
    public ResponseEntity<RecipeIngredient> createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        RecipeIngredient savedIngredient = recipeIngredientService.saveRecipeIngredient(recipeIngredient);
        return ResponseEntity.status(201).body(savedIngredient); // 201 Created
    }

    /**
     * 특정 재료 삭제
     *
     * @param id 삭제할 재료 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipeIngredient(@PathVariable Long id) {
        recipeIngredientService.deleteRecipeIngredient(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
