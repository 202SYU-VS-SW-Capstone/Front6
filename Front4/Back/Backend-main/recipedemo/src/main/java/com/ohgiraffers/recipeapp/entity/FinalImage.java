package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "final_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinalImage {   // 요리 완성 이미지 테이블

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;
    private String originalName;
    private String fileName;
    private String url;

    private LocalDate uploadDate;
}

