import React, { useState } from 'react';
import '../components/css/Notice.css'; // 폴더 구조에 맞게 경로 수정

const Notice = () => {
  const [isRegisterMode, setRegisterMode] = useState(false); // 등록/목록 전환
  const [notices, setNotices] = useState([
    { id: 1, title: '공지 1', author: '운영자', date: '2024.11.23' },
    { id: 2, title: '공지 2', author: '운영자', date: '2024.11.23' },
    { id: 3, title: '공지 3', author: '운영자', date: '2024.11.23' },
    { id: 4, title: '공지 4', author: '운영자', date: '2024.11.23' },
    { id: 5, title: '공지 5', author: '운영자', date: '2024.11.23' },
    { id: 6, title: '공지 6', author: '운영자', date: '2024.11.23' },
    { id: 7, title: '공지 7', author: '운영자', date: '2024.11.23' },
    { id: 8, title: '공지 8', author: '운영자', date: '2024.11.23' },
    { id: 9, title: '공지 9', author: '운영자', date: '2024.11.23' },
    { id: 10, title: '공지 10', author: '운영자', date: '2024.11.23' },
  ]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    date: '',
    content: '',
    image: null,
  });

  const handleRegisterClick = () => {
    setRegisterMode(true); // 등록 화면으로 전환
  };

  const handleBackToList = () => {
    setRegisterMode(false); // 목록 화면으로 전환
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const handleImageUpload = (e) => {
    setNewNotice({ ...newNotice, image: e.target.files[0] });
  };

  const handleNoticeSubmit = () => {
    const newId = notices.length + 1;
    const newEntry = {
      id: newId,
      title: newNotice.title || `공지 ${newId}`,
      author: '운영자',
      date: newNotice.date || '2024.11.23',
    };
    setNotices([...notices, newEntry]);
    setRegisterMode(false);
    setNewNotice({ title: '', date: '', content: '', image: null });
  };

  return (
    <div className="notice-container">
      {!isRegisterMode ? (
        <>
          {/* 공지 목록 */}
          <div className="notice-header">
            <h2>공지 목록</h2>
            <div className="search-section">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-input"
              />
              <button className="search-button">검색</button>
            </div>
          </div>
          <button className="register-button" onClick={handleRegisterClick}>
            등록하기
          </button>
          <div className="notice-list">
            {notices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <h3>{notice.title}</h3>
                <p>작성자: {notice.author}</p>
                <p>작성일: {notice.date}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: 5 }, (_, index) => (
              <button key={index} className="page-button">
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 공지 등록 */}
          <h2>공지 등록</h2>
          <button className="back-button" onClick={handleBackToList}>
            ← 공지 목록으로
          </button>
          <div className="form-group">
            <label>공지 이미지</label>
            <input
              type="file"
              className="file-input"
              onChange={handleImageUpload}
              accept="image/*"
            />
            {newNotice.image && <p>선택된 파일: {newNotice.image.name}</p>}
          </div>
          <div className="form-group">
            <label>공지 제목</label>
            <input
              type="text"
              name="title"
              placeholder="공지 제목을 입력하세요"
              value={newNotice.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>작성일</label>
            <input
              type="text"
              name="date"
              placeholder="YYYY.MM.DD"
              value={newNotice.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>공지 내용</label>
            <textarea
              name="content"
              placeholder="공지 내용을 입력하세요"
              value={newNotice.content}
              onChange={handleInputChange}
            />
          </div>
          <button className="submit-button" onClick={handleNoticeSubmit}>
            등록
          </button>
        </>
      )}
    </div>
  );
};

export default Notice;
