import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/recipes'; // 백엔드 엔드포인트

// 회원가입 요청 함수
export const inquireApi = async (InquiryData) => {
  try {
    const response = await axios.post(BASE_URL, inquireData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('회원가입 중 오류가 발생했습니다.');
  }
};
