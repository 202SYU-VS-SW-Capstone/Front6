package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.FinalImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinalImageRepository extends JpaRepository<FinalImage, Long> {
    // UUID로 이미지 찾기
    FinalImage findByUuid(String uuid);
}
