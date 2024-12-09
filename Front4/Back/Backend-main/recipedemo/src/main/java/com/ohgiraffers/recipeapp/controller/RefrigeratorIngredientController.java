package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.RefrigeratorIngredient;
import com.ohgiraffers.recipeapp.keys.RefrigeratorIngredientId;
import com.ohgiraffers.recipeapp.service.RefrigeratorIngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refrigerator-ingredients")
public class RefrigeratorIngredientController {

    private final RefrigeratorIngredientService service;

    public RefrigeratorIngredientController(RefrigeratorIngredientService service) {
        this.service = service;
    }

    /**
     * 특정 회원의 냉장고 재료 목록 조회
     *
     * @param memberId 회원 ID (Query Parameter)
     * @return ResponseEntity<List<RefrigeratorIngredient>> - 해당 회원의 냉장고 재료 목록
     */
    @GetMapping
    public ResponseEntity<List<RefrigeratorIngredient>> getIngredientsByMember(@RequestParam Long memberId) {
        List<RefrigeratorIngredient> ingredients = service.getIngredientsByMember(memberId);
        return ResponseEntity.ok(ingredients);
    }

    /**
     * 냉장고 재료 추가 또는 수정
     *
     * @param ingredient 저장할 냉장고 재료 데이터 (Request Body)
     * @return ResponseEntity<RefrigeratorIngredient> - 저장된 데이터
     */
    @PostMapping
    public ResponseEntity<RefrigeratorIngredient> saveOrUpdateIngredient(@RequestBody RefrigeratorIngredient ingredient) {
        RefrigeratorIngredient savedIngredient = service.saveOrUpdateIngredient(ingredient);
        return ResponseEntity.ok(savedIngredient);
    }

    /**
     * 특정 냉장고 재료 삭제
     *
     * @param ingredientId 재료 ID (Path Variable)
     * @param memberId 회원 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{ingredientId}/{memberId}")
    public ResponseEntity<Void> deleteIngredient(
            @PathVariable Long ingredientId,
            @PathVariable Long memberId
    ) {
        RefrigeratorIngredientId id = new RefrigeratorIngredientId(ingredientId, memberId);
        service.deleteIngredient(id);
        return ResponseEntity.noContent().build();
    }
}
