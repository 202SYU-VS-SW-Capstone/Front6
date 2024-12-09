import React from 'react';
import '../components/css/MemberList.css';

const MemberList = () => {
  return (
    <div className="memberlist-container">
      <h2>회원 목록</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>닉네임</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, index) => (
            <tr key={index}>
              <td>0000</td>
              <td>닉네임{index + 1}</td>
              <td>00/00/00</td>
              <td>
                <button className="manage-button">수정</button>
                <button className="delete-button">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>◀</button>
        <span>1 2 3 4 5</span>
        <button>▶</button>
      </div>
    </div>
  );
};

export default MemberList;
