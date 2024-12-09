package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    /**
     * 제목으로 공지사항 검색 (부분 일치)
     * @param title 공지 제목
     * @return List<Notice> - 제목에 해당 문자열이 포함된 공지 목록
     */
    List<Notice> findByTitleContainingIgnoreCase(String title);
}

