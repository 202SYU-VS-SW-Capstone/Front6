package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long id; // 재료 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_category_id", nullable = false)
    private SubCategory subCategory; // 소분류와 연결

    @Column(name = "name", nullable = false)
    private String name; // 재료 이름

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ingredient_image_id")
    private IngredientImage ingredientImage; // 재료 이미지와 연결
}

