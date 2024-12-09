package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.Notice;
import com.ohgiraffers.recipeapp.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    /**
     * 모든 공지사항 조회
     *
     * @return List<Notice> - 모든 공지사항 목록
     */
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    /**
     * ID로 특정 공지사항 조회
     *
     * @param id 공지사항 ID
     * @return Notice - 조회된 공지사항 데이터
     * @throws IllegalArgumentException - 해당 ID의 공지사항이 없을 경우 예외 발생
     */
    public Notice getNoticeById(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notice not found with id: " + id));
    }

    /**
     * 제목으로 공지사항 검색
     *
     * @param title 공지 제목
     * @return List<Notice> - 검색된 공지사항 목록
     */
    public List<Notice> searchNoticesByTitle(String title) {
        return noticeRepository.findByTitleContainingIgnoreCase(title);
    }

    /**
     * 새로운 공지사항 저장
     *
     * @param notice 저장할 공지사항 데이터
     * @return Notice - 저장된 공지사항 데이터
     */
    public Notice saveNotice(Notice notice) {
        notice.setCreatedAt(LocalDate.now()); // 생성 날짜 설정
        return noticeRepository.save(notice);
    }

    /**
     * 특정 공지사항 수정
     *
     * @param id 수정할 공지사항 ID
     * @param updatedNotice 수정할 공지사항 데이터
     * @return Notice - 수정된 공지사항 데이터
     */
    public Notice updateNotice(Long id, Notice updatedNotice) {
        Notice existingNotice = noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notice not found with id: " + id));
        existingNotice.setTitle(updatedNotice.getTitle());
        existingNotice.setContent(updatedNotice.getContent());
        existingNotice.setNoticeImage(updatedNotice.getNoticeImage());
        return noticeRepository.save(existingNotice);
    }

    /**
     * 특정 공지사항 삭제
     *
     * @param id 삭제할 공지사항 ID
     */
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}

