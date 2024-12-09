package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {

    /**
     * 특정 회원이 생성한 배너 조회
     * @param memberId 회원 ID
     * @return List<Banner> - 해당 회원이 생성한 배너 목록
     */
    List<Banner> findByMemberId(Long memberId);

    /**
     * 특정 공지사항에 연결된 배너 조회
     * @param noticeId 공지사항 ID
     * @return List<Banner> - 해당 공지사항과 연결된 배너 목록
     */
    List<Banner> findByNoticeId(Long noticeId);
}

