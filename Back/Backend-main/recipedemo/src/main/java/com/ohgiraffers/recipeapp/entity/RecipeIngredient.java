package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredient { // 레시피 포함 재료 테이블

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private String ingredientName;
    private String quantity;
}
