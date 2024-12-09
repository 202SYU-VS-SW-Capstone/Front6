package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.RefrigeratorIngredient;
import com.ohgiraffers.recipeapp.keys.RefrigeratorIngredientId;
import com.ohgiraffers.recipeapp.repository.RefrigeratorIngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RefrigeratorIngredientService {

    private final RefrigeratorIngredientRepository refrigeratorIngredientRepository;

    public RefrigeratorIngredientService(RefrigeratorIngredientRepository repository) {
        this.refrigeratorIngredientRepository = repository;
    }

    /**
     * 특정 회원의 냉장고 재료 목록 조회
     *
     * @param memberId 회원 ID
     * @return List<RefrigeratorIngredient> - 해당 회원의 냉장고 재료 목록
     */
    public List<RefrigeratorIngredient> getIngredientsByMember(Long memberId) {
        return refrigeratorIngredientRepository.findByMemberId(memberId);
    }

    /**
     * 냉장고 재료 추가 또는 수정
     *
     * @param ingredient 저장할 냉장고 재료 데이터
     * @return RefrigeratorIngredient - 저장된 데이터
     */
    public RefrigeratorIngredient saveOrUpdateIngredient(RefrigeratorIngredient ingredient) {
        return refrigeratorIngredientRepository.save(ingredient);
    }

    /**
     * 특정 냉장고 재료 삭제
     *
     * @param id 복합 키 (ingredientId, memberId)
     */
    public void deleteIngredient(RefrigeratorIngredientId id) {
        refrigeratorIngredientRepository.deleteById(id);
    }
}
