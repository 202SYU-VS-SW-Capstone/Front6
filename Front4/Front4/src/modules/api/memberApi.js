import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/members'; // 백엔드 엔드포인트

// 회원가입 요청 함수
export const signup = async (signupData) => {
  try {
    const response = await axios.post(BASE_URL, signupData, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('회원가입 중 오류가 발생했습니다.');
  }
};

// 로그인 요청 함수
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('로그인 중 오류가 발생했습니다.');
  }
};

// 비밀번호 변경 요청 함수
export const changePassword = async ({ memberId, newPassword }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${memberId}/password-change`,
      { newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // 성공 여부 반환
  } catch (error) {
    console.error("비밀번호 변경 요청 실패:", error);
    throw error.response?.data || new Error("비밀번호 변경 실패");
  }
};

// 특정 회원의 냉장고 식재료 조회 함수
export const getRefrigeratorIngredients = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${memberId}/refrigerator-ingredients`, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data; // 성공 시 식재료 목록 반환
  } catch (error) {
    console.error("식재료 조회 실패:", error);
    throw error.response?.data || new Error("식재료 조회에 실패했습니다.");
  }
};

// 재료 추가 요청 함수
export const addRefrigeratorIngredient = async (ingredientData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/refrigerator-ingredients', ingredientData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('재료 추가 실패:', error);
    throw error.response?.data || new Error('재료 추가에 실패했습니다.');
  }
};
