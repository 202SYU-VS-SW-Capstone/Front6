package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "major_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MajorCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "major_category_id") // 데이터베이스 컬럼 이름에 맞게 매핑
    private Long id; // 대분류 ID

    @Column(name = "name")
    private String name; // 대분류 이름
}


