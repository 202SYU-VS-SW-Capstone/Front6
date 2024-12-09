package com.ohgiraffers.recipeapp;

import org.springframework.boot.SpringApplication;

public class TestRecipedemoApplication {

    public static void main(String[] args) {
        SpringApplication.from(RecipeappApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
