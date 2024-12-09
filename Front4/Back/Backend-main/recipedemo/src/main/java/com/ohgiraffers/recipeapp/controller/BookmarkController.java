package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.entity.Bookmark;
import com.ohgiraffers.recipeapp.service.BookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    /**
     * 특정 회원의 북마크 목록 조회
     *
     * @param memberId 회원 ID (Query Parameter)
     * @return ResponseEntity<List<Bookmark>> - 해당 회원의 북마크 목록과 HTTP 상태 코드
     */
    @GetMapping
    public ResponseEntity<List<Bookmark>> getBookmarksByMember(@RequestParam Long memberId) {
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByMember(memberId);
        return ResponseEntity.ok(bookmarks);
    }

    /**
     * 새로운 북마크 추가
     *
     * @param bookmark 저장할 북마크 데이터 (Request Body)
     * @return ResponseEntity<Bookmark> - 저장된 북마크 데이터와 HTTP 상태 코드
     */
    @PostMapping
    public ResponseEntity<Bookmark> createBookmark(@RequestBody Bookmark bookmark) {
        Bookmark savedBookmark = bookmarkService.saveBookmark(bookmark);
        return ResponseEntity.status(201).body(savedBookmark); // 201 Created
    }

    /**
     * 특정 회원이 특정 레시피를 북마크했는지 확인
     *
     * @param memberId 회원 ID (Query Parameter)
     * @param recipeId 레시피 ID (Query Parameter)
     * @return ResponseEntity<Boolean> - 북마크 여부와 HTTP 상태 코드
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> isRecipeBookmarked(
            @RequestParam Long memberId,
            @RequestParam Long recipeId
    ) {
        boolean isBookmarked = bookmarkService.isRecipeBookmarked(memberId, recipeId);
        return ResponseEntity.ok(isBookmarked);
    }

    /**
     * 북마크 삭제
     *
     * @param id 삭제할 북마크 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long id) {
        bookmarkService.deleteBookmark(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
