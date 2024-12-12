package com.ohgiraffers.recipeapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sub_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_category_id") // 데이터베이스 컬럼 이름에 맞게 매핑
    private Long id; // 소분류 ID

    @ManyToOne
    @JoinColumn(name = "major_category_id", nullable = false)
    private MajorCategory majorCategory; // 대분류와 연관 관계

    @Column(name = "name")
    private String name; // 소분류 이름
}

