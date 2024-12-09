package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.SubCategory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SubCategoryRepositoryTest {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Test
    public void testFindById() {
        // Arrange: 테스트용 데이터 준비
        Long testId = 1L; // 사전에 데이터베이스에 삽입한 ID
        Optional<SubCategory> result = subCategoryRepository.findById(testId);

        // Act & Assert: 테스트 실행 및 결과 검증
        assertTrue(result.isPresent(), "SubCategory should be found");
        SubCategory subCategory = result.get();
        assertEquals(testId, subCategory.getId(), "IDs should match");
        assertNotNull(subCategory.getName(), "Name should not be null");
    }
}

