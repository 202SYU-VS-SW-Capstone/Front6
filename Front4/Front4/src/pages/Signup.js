import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../modules/api/memberApi'; // API 함수 import
import '../components/css/Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    securityQuestion: '',
    securityAnswer: '',
  });

  const [termsAccepted, setTermsAccepted] = useState({
    privacyPolicy: false,
    dataSharing: false,
    marketing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTermsAccepted({
      ...termsAccepted,
      [name]: checked,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const signupData = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
      memberType: 'Regular',
      joinDate: new Date().toISOString().split('T')[0],
    };

    try {
      await signup(signupData);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert(error.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSignup}>
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

        <div className="form-group">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="securityQuestion">비밀번호 찾기 질문</label>
          <select
            id="securityQuestion"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>선택하세요</option>
            <option value="pet">반려동물 이름은?</option>
            <option value="school">초등학교 이름은?</option>
            <option value="movie">가장 좋아하는 영화 제목은?</option>
            <option value="trip">처음으로 다녀온 여행지는 어디인가요?</option>
            <option value="book">가장 좋아하는 책 제목은 무엇인가요?</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="securityAnswer">답변</label>
          <input
            type="text"
            id="securityAnswer"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleInputChange}
            placeholder="답변을 입력하세요"
            required
          />
        </div>

        <fieldset className="terms-container">
          <legend>이용약관</legend>
          <label>
            개인정보 수집에 동의합니다. (필수)
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={termsAccepted.privacyPolicy}
              onChange={handleCheckboxChange}
              required
            />
          </label>
          <label>
            개인정보 제공에 동의합니다. (필수)
            <input
              type="checkbox"
              name="dataSharing"
              checked={termsAccepted.dataSharing}
              onChange={handleCheckboxChange}
              required
            />
          </label>
          <label>
            마케팅 정보 수신에 동의합니다. (선택)
            <input
              type="checkbox"
              name="marketing"
              checked={termsAccepted.marketing}
              onChange={handleCheckboxChange}
            />
          </label>
        </fieldset>

        <button type="submit" className="submit-button">회원가입 하기</button>
        <p className="login-link">
          이미 계정이 있으신가요? <a href="./Login">로그인 하러 가기</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
