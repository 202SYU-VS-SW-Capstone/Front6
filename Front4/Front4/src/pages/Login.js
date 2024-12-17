import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../modules/api/memberApi';
import { useAuth } from '../modules/contexts/AuthContext'; // AuthContext 사용
import '../components/css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // AuthContext의 login 함수 가져오기

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData); // 백엔드 API 호출
      if (response.success) {
        alert(response.message); // "로그인 성공!" 메시지
        console.log('로그인 성공:', response);

        // AuthContext를 통해 로그인 상태와 사용자 정보 업데이트
        authLogin({
          email: response.email,
          nickname: response.nickname,
          memberId: response.memberId,
        });

        navigate('/'); // 메인 페이지로 이동
      } else {
        alert(response.message); // 로그인 실패 메시지
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('Id 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
        <p className="login-link">
          계정이 없으신가요? <a href="./Signup">회원가입 하러 가기</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
