import React, { useState } from "react";
import "../components/css/ReportForm.css";

const ReportForm = () => {
  const [username, setUsername] = useState("");
  const [reportContent, setReportContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`신고 접수됨\n유저: ${username}\n내용: ${reportContent}`);
    setUsername("");
    setReportContent("");
  };

  return (
    <div className="report-form">
      <h1>신고 하기</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="@닉네임"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-username"
        />
        <textarea
          placeholder="신고 내용을 입력하세요."
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="input-content"
        ></textarea>
        <button type="submit" className="submit-button">
          신고 하기
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
