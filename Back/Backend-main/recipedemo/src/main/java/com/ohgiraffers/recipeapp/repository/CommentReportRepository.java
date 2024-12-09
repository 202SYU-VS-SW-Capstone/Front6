package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {

    /**
     * 특정 댓글에 대한 모든 신고 조회
     * @param commentId 댓글 ID
     * @return List<CommentReport> - 해당 댓글의 신고 목록
     */
    List<CommentReport> findByCommentId(Long commentId);

    /**
     * 특정 회원이 신고한 모든 댓글 신고 조회
     * @param reporterId 회원 ID
     * @return List<CommentReport> - 해당 회원이 신고한 목록
     */
    List<CommentReport> findByReporterId(Long reporterId);
}

