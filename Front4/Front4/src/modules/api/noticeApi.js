import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/recipes'; // 백엔드 엔드포인트

// 회원가입 요청 함수
export const recipeApi = async (noticeData) => {
  try {
    const response = await axios.post(BASE_URL, noticeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('회원가입 중 오류가 발생했습니다.');
  }
};
