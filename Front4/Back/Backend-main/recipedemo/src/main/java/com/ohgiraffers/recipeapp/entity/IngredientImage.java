package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "ingredient_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_image_id")
    private Long id; // 이미지 ID

    @Column(name = "uuid", nullable = false)
    private String uuid;

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "upload_date", nullable = false)
    private LocalDate uploadDate;

    @OneToOne(mappedBy = "ingredientImage", fetch = FetchType.LAZY)
    private Ingredient ingredient; // 재료와 연결
}

