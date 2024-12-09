package com.ohgiraffers.recipeapp.service;

import com.ohgiraffers.recipeapp.entity.Bookmark;
import com.ohgiraffers.recipeapp.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    /**
     * 특정 회원의 북마크 목록 조회
     *
     * @param memberId 회원 ID
     * @return List<Bookmark> - 해당 회원의 북마크 목록
     */
    public List<Bookmark> getBookmarksByMember(Long memberId) {
        return bookmarkRepository.findByMemberId(memberId);
    }

    /**
     * 새로운 북마크 추가
     *
     * @param bookmark 저장할 북마크 데이터
     * @return Bookmark - 저장된 북마크 데이터
     */
    public Bookmark saveBookmark(Bookmark bookmark) {
        bookmark.setSavedAt(LocalDate.now()); // 저장 시 현재 날짜 설정
        return bookmarkRepository.save(bookmark);
    }

    /**
     * 특정 회원이 특정 레시피를 북마크했는지 확인
     *
     * @param memberId 회원 ID
     * @param recipeId 레시피 ID
     * @return boolean - 북마크 여부
     */
    public boolean isRecipeBookmarked(Long memberId, Long recipeId) {
        return bookmarkRepository.existsByMemberIdAndRecipeId(memberId, recipeId);
    }

    /**
     * 북마크 삭제
     *
     * @param id 삭제할 북마크 ID
     */
    public void deleteBookmark(Long id) {
        bookmarkRepository.deleteById(id);
    }
}
