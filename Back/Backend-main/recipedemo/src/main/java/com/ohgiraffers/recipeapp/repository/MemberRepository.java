package com.ohgiraffers.recipeapp.repository;

import com.ohgiraffers.recipeapp.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    /**
     * 이메일로 회원 조회
     * @param email 회원 이메일
     * @return Optional<Member> - 조회된 회원 데이터
     */
    Optional<Member> findByEmail(String email);

    /**
     * 닉네임으로 회원 조회
     * @param nickname 닉네임
     * @return Optional<Member> - 조회된 회원 데이터
     */
    Optional<Member> findByNickname(String nickname);
}


