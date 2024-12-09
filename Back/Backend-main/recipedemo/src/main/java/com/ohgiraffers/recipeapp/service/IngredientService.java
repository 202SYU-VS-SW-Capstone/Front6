package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.dto.IngredientDTO;
import com.ohgiraffers.recipeapp.entity.Ingredient;
import com.ohgiraffers.recipeapp.entity.SubCategory;
import com.ohgiraffers.recipeapp.repository.IngredientRepository;
import com.ohgiraffers.recipeapp.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final SubCategoryRepository subCategoryRepository;

    public IngredientService(IngredientRepository ingredientRepository, SubCategoryRepository subCategoryRepository) {
        this.ingredientRepository = ingredientRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    /**
     * 모든 재료 조회 (DTO 반환)
     */
    public List<IngredientDTO> getAllIngredients() {
        List<Ingredient> ingredients = ingredientRepository.findAll();
        return ingredients.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    /**
     * 특정 재료 조회 (DTO 반환)
     */
    public IngredientDTO getIngredientById(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found with id: " + id));
        return convertToDTO(ingredient);
    }

    /**
     * 소분류 ID로 재료 검색 (DTO 반환)
     */
    public List<IngredientDTO> getIngredientsBySubCategory(Long subCategoryId) {
        List<Ingredient> ingredients = ingredientRepository.findBySubCategoryId(subCategoryId);
        return ingredients.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    /**
     * 재료 이름으로 검색 (DTO 반환)
     */
    public List<IngredientDTO> searchIngredientsByName(String name) {
        List<Ingredient> ingredients = ingredientRepository.findByNameContainingIgnoreCase(name);
        return ingredients.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    /**
     * 새로운 재료 저장 (DTO로 저장)
     */
    public IngredientDTO saveIngredient(IngredientDTO ingredientDTO) {
        // SubCategory 조회
        SubCategory subCategory = subCategoryRepository.findById(ingredientDTO.getSubCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid subCategoryId: " + ingredientDTO.getSubCategoryId()));

        // DTO → 엔티티 변환
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientDTO.getName());
        ingredient.setSubCategory(subCategory);

        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        return convertToDTO(savedIngredient);
    }

    /**
     * 특정 재료 수정 (DTO로 업데이트)
     */
    public IngredientDTO updateIngredient(Long id, IngredientDTO ingredientDTO) {
        Ingredient existingIngredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found with id: " + id));

        SubCategory subCategory = subCategoryRepository.findById(ingredientDTO.getSubCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid subCategoryId: " + ingredientDTO.getSubCategoryId()));

        existingIngredient.setName(ingredientDTO.getName());
        existingIngredient.setSubCategory(subCategory);

        Ingredient updatedIngredient = ingredientRepository.save(existingIngredient);
        return convertToDTO(updatedIngredient);
    }

    /**
     * 특정 재료 삭제
     */
    public void deleteIngredient(Long id) {
        if (!ingredientRepository.existsById(id)) {
            throw new IllegalArgumentException("Ingredient not found with id: " + id);
        }
        ingredientRepository.deleteById(id);
    }

    /**
     * 엔티티 → DTO 변환
     */
    private IngredientDTO convertToDTO(Ingredient ingredient) {
        return new IngredientDTO(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getSubCategory() != null ? ingredient.getSubCategory().getName() : null,
                ingredient.getSubCategory() != null ? ingredient.getSubCategory().getId() : null, // subCategoryId 추가
                ingredient.getSubCategory() != null && ingredient.getSubCategory().getMajorCategory() != null
                        ? ingredient.getSubCategory().getMajorCategory().getName() : null,
                ingredient.getIngredientImage() != null ? ingredient.getIngredientImage().getUrl() : null
        );
    }
}
