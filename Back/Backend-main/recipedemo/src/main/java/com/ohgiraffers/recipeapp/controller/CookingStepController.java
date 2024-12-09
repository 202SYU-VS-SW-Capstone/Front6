package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.CookingStep;
import com.ohgiraffers.recipeapp.service.CookingStepService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cooking-steps")
public class CookingStepController {

    private final CookingStepService cookingStepService;

    public CookingStepController(CookingStepService cookingStepService) {
        this.cookingStepService = cookingStepService;
    }

    /**
     * 특정 레시피의 모든 조리 단계 조회
     *
     * @param recipeId 레시피 ID (Query Parameter)
     * @return ResponseEntity<List<CookingStep>> - 해당 레시피의 조리 단계 목록과 HTTP 상태 코드
     */
    @GetMapping
    public ResponseEntity<List<CookingStep>> getCookingStepsByRecipe(@RequestParam Long recipeId) {
        List<CookingStep> steps = cookingStepService.getCookingStepsByRecipe(recipeId);
        return ResponseEntity.ok(steps);
    }

    /**
     * 새로운 조리 단계 추가
     *
     * @param cookingStep 저장할 조리 단계 데이터 (Request Body)
     * @return ResponseEntity<CookingStep> - 저장된 조리 단계 데이터와 HTTP 상태 코드
     */
    @PostMapping
    public ResponseEntity<CookingStep> createCookingStep(@RequestBody CookingStep cookingStep) {
        CookingStep savedStep = cookingStepService.saveCookingStep(cookingStep);
        return ResponseEntity.status(201).body(savedStep); // 201 Created
    }

    /**
     * 특정 조리 단계 수정
     *
     * @param id 수정할 조리 단계 ID (Path Variable)
     * @param updatedStep 수정할 조리 단계 데이터 (Request Body)
     * @return ResponseEntity<CookingStep> - 수정된 조리 단계 데이터와 HTTP 상태 코드
     */
    @PutMapping("/{id}")
    public ResponseEntity<CookingStep> updateCookingStep(
            @PathVariable Long id,
            @RequestBody CookingStep updatedStep
    ) {
        CookingStep step = cookingStepService.updateCookingStep(id, updatedStep);
        return ResponseEntity.ok(step);
    }

    /**
     * 특정 조리 단계 삭제
     *
     * @param id 삭제할 조리 단계 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCookingStep(@PathVariable Long id) {
        cookingStepService.deleteCookingStep(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
