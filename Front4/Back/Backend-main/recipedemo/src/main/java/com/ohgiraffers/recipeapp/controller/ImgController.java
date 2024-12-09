package com.ohgiraffers.recipeapp.controller;

import com.ohgiraffers.recipeapp.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/getImgdata")
public class ImgController {

    private final ImgService imgService;

    @Autowired
    public ImgController(ImgService imgService) {
        this.imgService = imgService;
    }

    @GetMapping("/gptimgurl")
    public String getImgData(@RequestParam("url") String url) {
        return imgService.getGptImg(url);
    }

    @GetMapping("/clovaurl")
    public String getClovaData(@RequestParam("url") String url) {
        return imgService.getClovaImg(url);
    }
}
