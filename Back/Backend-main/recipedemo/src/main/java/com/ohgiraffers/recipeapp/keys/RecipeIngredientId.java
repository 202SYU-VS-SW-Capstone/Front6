package com.ohgiraffers.recipeapp.keys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * RecipeIngredientId - 복합 키 클래스
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientId implements Serializable {
    private Long ingredient; // 재료 ID
    private Long recipe; // 레시피 ID
}
