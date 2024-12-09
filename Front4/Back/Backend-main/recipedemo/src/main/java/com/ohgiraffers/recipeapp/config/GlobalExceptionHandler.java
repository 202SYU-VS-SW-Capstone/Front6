package com.ohgiraffers.recipeapp.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 잘못된 URL 요청 처리
     *
     * @param ex NoHandlerFoundException
     * @return ResponseEntity<String> - 404 오류 메시지와 HTTP 상태 코드
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<String> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("The requested endpoint was not found. Please check the URL and try again.");
    }

    /**
     * IllegalArgumentException 처리
     *
     * @param ex IllegalArgumentException
     * @return ResponseEntity<String> - 404 오류 메시지와 HTTP 상태 코드
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    /**
     * 기타 모든 예외 처리
     *
     * @param ex Exception
     * @return ResponseEntity<String> - 500 오류 메시지와 HTTP 상태 코드
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + ex.getMessage());
    }
}



