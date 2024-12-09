package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "cooking_step_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CookingStepImage { // 조리단계 이미지 테이블

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;
    private String originalName;
    private String fileName;
    private String url;

    private LocalDate uploadDate;
}

