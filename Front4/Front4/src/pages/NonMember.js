import React from "react";
import "../components/css/NonMember.css";

function NonMember() {
  return (
    <div className="non-member-content">
      <div className="non-member-left">
        <h1 className="non-member-title">회원 전용 기능</h1>
        <form className="login-form">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인하고 입장하기
          </button>
        </form>
        <div className="non-member-links">
          <a href="/signup" className="non-member-link">
            계정이 없으신가요?
          </a>
          <a href="/recipe" className="non-member-link">
            레시피 구경하러 가기
          </a>
          <a href="/manager" className="non-member-link">
            관리자 로그인 하기
          </a>
        </div>
      </div>
      <div className="non-member-right">
      <img
          src={`${process.env.PUBLIC_URL}/img/6.jpg`}
          alt="비회원 페이지 이미지"
          className="non-member-image"
        />
        <p className="non-member-text">회원가입 후 이용 가능합니다.</p>
      </div>
    </div>
  );
}

export default NonMember;
