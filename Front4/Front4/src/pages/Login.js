import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../modules/api/memberApi';
import '../components/css/Login.css';

const Login = () => {
  const navigate = useNavigate();

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
      const response = await login(formData);
      alert(response); // 로그인 성공 메시지
      console.log('로그인 성공:', response);

      // 로그인 상태를 localStorage에 저장
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert(error || 'ID 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.');
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
