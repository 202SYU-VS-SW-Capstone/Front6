package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.dto.LoginRequestDTO;
import com.ohgiraffers.recipeapp.dto.RefrigeratorIngredientDTO;
import com.ohgiraffers.recipeapp.entity.Member;
import com.ohgiraffers.recipeapp.service.MemberService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * 모든 회원 조회
     *
     * @return ResponseEntity<List<Member>> - 모든 회원 목록과 HTTP 상태 코드
     */
    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    /**
     * ID로 특정 회원 조회
     *
     * @param id 회원 ID (Path Variable)
     * @return ResponseEntity<Member> - 조회된 회원 데이터와 HTTP 상태 코드
     */
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable("id") Long id) {
        Member member = memberService.getMemberById(id);
        return ResponseEntity.ok(member);
    }

    /**
     * 새로운 회원 추가
     *
     * @param member 저장할 회원 데이터 (Request Body)
     * @return ResponseEntity<Member> - 저장된 회원 데이터와 HTTP 상태 코드
     */
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member savedMember = memberService.saveMember(member);
        return ResponseEntity.status(201).body(savedMember); // 201 Created
    }

    /**
     * 특정 회원 정보 수정
     *
     * @param id 수정할 회원 ID (Path Variable)
     * @param updatedMember 수정할 회원 데이터 (Request Body)
     * @return ResponseEntity<Member> - 수정된 회원 데이터와 HTTP 상태 코드
     */
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(
            @PathVariable("id") Long id,
            @RequestBody Member updatedMember
    ) {
        Member member = memberService.updateMember(id, updatedMember);
        return ResponseEntity.ok(member);
    }

    // 로그인 API 추가
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDTO loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            Member member = memberService.getMemberByEmail(loginRequest.getEmail());

            if (!member.getPassword().equals(loginRequest.getPassword())) {
                response.put("success", false);
                response.put("message", "ID 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // 로그인 성공 시 회원 정보를 반환
            response.put("success", true);
            response.put("message", "로그인 성공!");
            response.put("memberId", member.getId());
            response.put("email", member.getEmail());
            response.put("nickname", member.getNickname());
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", "ID 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    /**
     * 비밀번호 변경 API
     *
     * @param id 사용자 ID (Path Variable)
     * @param requestBody 새 비밀번호 정보 (Request Body)
     * @return ResponseEntity<Map<String, Object>> - 성공 여부와 메시지 반환
     */
    @PutMapping("/{id}/password-change")
    public ResponseEntity<Map<String, Object>> changePassword(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> requestBody) {

        Map<String, Object> response = new HashMap<>();

        try {
            String newPassword = requestBody.get("newPassword");
            if (newPassword == null || newPassword.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "새 비밀번호를 입력해야 합니다.");
                return ResponseEntity.badRequest().body(response);
            }

            // 비밀번호 변경 처리
            memberService.changePassword(id, newPassword);

            response.put("success", true);
            response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "비밀번호 변경에 실패했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 특정 회원 삭제
     *
     * @param id 삭제할 회원 ID (Path Variable)
     * @return ResponseEntity<Void> - 본문 없이 HTTP 상태 코드만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("id") Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    /**
     * 닉네임으로 회원 조회
     *
     * @param nickname 닉네임 (Query Parameter)
     * @return ResponseEntity<Member> - 조회된 회원 데이터와 HTTP 상태 코드
     */
    @GetMapping("/search")
    public ResponseEntity<Member> getMemberByNickname(@RequestParam(name = "nickname") String nickname) {
        Member member = memberService.getMemberByNickname(nickname);
        return ResponseEntity.ok(member);
    }

    /**
     * 특정 회원의 냉장고 식재료 조회
     *
     * @param memberId 회원 ID (Query Parameter)
     * @return ResponseEntity<List<RefrigeratorIngredientDTO>> - 회원의 식재료 목록 반환
     */
    @GetMapping("/{memberId}/refrigerator-ingredients")
    public ResponseEntity<List<RefrigeratorIngredientDTO>> getRefrigeratorIngredients(@PathVariable Long memberId) {
        List<RefrigeratorIngredientDTO> ingredients = memberService.getRefrigeratorIngredientsByMemberId(memberId);
        return ResponseEntity.ok(ingredients);
    }
}
