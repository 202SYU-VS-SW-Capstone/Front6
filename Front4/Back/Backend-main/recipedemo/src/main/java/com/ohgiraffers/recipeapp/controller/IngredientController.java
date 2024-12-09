package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.dto.IngredientDTO;
import com.ohgiraffers.recipeapp.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    // 모든 재료 조회
    @GetMapping
    public ResponseEntity<List<IngredientDTO>> getAllIngredients() {
        List<IngredientDTO> ingredients = ingredientService.getAllIngredients();
        return ResponseEntity.ok(ingredients);
    }

    // 특정 재료 조회
    @GetMapping("/{id}")
    public ResponseEntity<IngredientDTO> getIngredientById(@PathVariable("id") Long id) {
        IngredientDTO ingredient = ingredientService.getIngredientById(id);
        return ResponseEntity.ok(ingredient);
    }

    // 재료 추가
    @PostMapping
    public ResponseEntity<IngredientDTO> createIngredient(@RequestBody IngredientDTO ingredientDTO) {
        IngredientDTO savedIngredient = ingredientService.saveIngredient(ingredientDTO);
        return ResponseEntity.status(201).body(savedIngredient); // 201 Created
    }

    // 재료 수정
    @PutMapping("/{id}")
    public ResponseEntity<IngredientDTO> updateIngredient(
            @PathVariable("id") Long id,
            @RequestBody IngredientDTO ingredientDTO) {
        IngredientDTO updatedIngredient = ingredientService.updateIngredient(id, ingredientDTO);
        return ResponseEntity.ok(updatedIngredient); // 200 OK
    }

    // 재료 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable("id") Long id) {
        ingredientService.deleteIngredient(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    // 소분류 ID로 재료 검색
    @GetMapping("/subcategory")
    public ResponseEntity<List<IngredientDTO>> getIngredientsBySubCategory(@RequestParam("subCategoryId") Long subCategoryId) {
        List<IngredientDTO> ingredients = ingredientService.getIngredientsBySubCategory(subCategoryId);
        return ResponseEntity.ok(ingredients);
    }

    // 이름으로 재료 검색
    @GetMapping("/search")
    public ResponseEntity<List<IngredientDTO>> searchIngredientsByName(@RequestParam("name") String name) {
        List<IngredientDTO> ingredients = ingredientService.searchIngredientsByName(name);
        return ResponseEntity.ok(ingredients);
    }
}
