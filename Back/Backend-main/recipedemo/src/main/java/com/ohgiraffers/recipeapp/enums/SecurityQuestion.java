package com.ohgiraffers.recipeapp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

public enum SecurityQuestion {
    PET("pet", "반려동물 이름은?"),
    SCHOOL("school", "초등학교 이름은?"),
    MOVIE("movie", "가장 좋아하는 영화 제목은 무엇인가요?"),
    TRIP("trip", "처음으로 다녀온 여행지는 어디인가요?"),
    BOOK("book", "가장 좋아하는 책 제목은 무엇인가요?");

    private final String value;       // JSON으로 받을 문자열 값
    @Getter
    private final String description; // 보안 질문 설명

    SecurityQuestion(String value, String description) {
        this.value = value;
        this.description = description;
    }

    @JsonValue // 직렬화 시 JSON으로 변환할 값
    public String getValue() {
        return value;
    }

    // 역직렬화 시 String 값을 Enum으로 변환
    @JsonCreator
    public static SecurityQuestion fromValue(String value) {
        for (SecurityQuestion question : SecurityQuestion.values()) {
            if (question.value.equalsIgnoreCase(value)) {
                return question;
            }
        }
        throw new IllegalArgumentException("Invalid SecurityQuestion value: " + value);
    }
}
