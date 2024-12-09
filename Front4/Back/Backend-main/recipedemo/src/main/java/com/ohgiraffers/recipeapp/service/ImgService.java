package com.ohgiraffers.recipeapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ImgService {

    private final WebClient webClient;

    public ImgService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://127.0.0.1:8000").build();
    }

    public String getGptImg(String imgurl) {
        String url = "/gptimg/" + imgurl;
        try {
            // WebClient 사용: GET 요청
            return webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // 동기식으로 처리 (필요시 비동기로 변경 가능)
        } catch (Exception e) {
            e.printStackTrace();
            return "API 호출 실패: " + e.getMessage();
        }
    }

    public String getClovaImg(String imgurl) {
        String url = "/gptimg/" + imgurl;
        try {
            // WebClient 사용: GET 요청
            return webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // 동기식으로 처리 (필요시 비동기로 변경 가능)
        } catch (Exception e) {
            e.printStackTrace();
            return "API 호출 실패: " + e.getMessage();
        }
    }
}
