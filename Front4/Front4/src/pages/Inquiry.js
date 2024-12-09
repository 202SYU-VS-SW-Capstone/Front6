import React, { useState } from 'react';
import '../components/css/Inquiry.css';

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([
    { id: '00000', title: '문의글1', author: '회원1', status: '답변 대기' },
    { id: '00001', title: '문의글2', author: '회원2', status: '답변완료' },
    { id: '00002', title: '문의글3', author: '회원3', status: '답변 대기' },
    { id: '00003', title: '문의글4', author: '회원4', status: '답변 대기' },
    { id: '00004', title: '문의글5', author: '회원5', status: '답변완료' },
    { id: '00005', title: '문의글6', author: '회원6', status: '답변 대기' },
    { id: '00006', title: '문의글7', author: '회원7', status: '답변 대기' },
    { id: '00007', title: '문의글8', author: '회원8', status: '답변 대기' },
    { id: '00008', title: '문의글9', author: '회원9', status: '답변완료' },
    { id: '00009', title: '문의글10', author: '회원10', status: '답변 대기' },
  ]);

  const handleAnswerClick = (id) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: '답변완료' } : inquiry
    ));
  };

  return (
    <div className="inquiry-container">
      <h1 className="inquiry-title">문의 목록</h1>
      <table className="inquiry-table">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry.id}</td>
              <td>{inquiry.title}</td>
              <td>{inquiry.author}</td>
              <td>
                {inquiry.status === '답변 대기' ? (
                  <button
                    className="btn-answer"
                    onClick={() => handleAnswerClick(inquiry.id)}
                  >
                    답변
                  </button>
                ) : (
                  <span className="status-complete">답변완료</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 예시 */}
      <div className="pagination">
        <a href="#">1</a>
        <a href="#" className="active">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
      </div>
    </div>
  );
};

export default Inquiry;
