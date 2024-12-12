package com.ohgiraffers.recipeapp.keys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefrigeratorIngredientId implements Serializable {
    private Long ingredient; // 재료 ID
    private Long member; // 회원 ID
}
