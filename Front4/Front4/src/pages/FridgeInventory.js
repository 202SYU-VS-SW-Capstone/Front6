import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import
import '../components/css/FridgeInventory.css';

const FridgeInventory = () => {
  const [ingredients, setIngredients] = useState([
    { name: '감자', category: '채소류', expiry: '2023-10-01', status: '양호', weight: '500g', quantity: 3 },
    { name: '우유', category: '유제품', expiry: '2023-10-05', status: '임박', weight: '1L', quantity: 1 },
    { name: '당근', category: '채소류', expiry: '2023-10-08', status: '양호', weight: '300g', quantity: 2 },
    { name: '치즈', category: '유제품', expiry: '2023-10-10', status: '임박', weight: '200g', quantity: 5 },
    { name: '사과', category: '과일류', expiry: '2023-10-12', status: '양호', weight: '500g', quantity: 4 },
  ]);
  const [filterText, setFilterText] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 생성

  useEffect(() => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.includes(filterText)
    );
    setFilteredIngredients(filtered);
  }, [filterText, ingredients]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleAddIngredient = () => {
    navigate('/ingredient'); // 'Ingredient.js' 경로로 이동
  };

  const handleDeleteIngredient = (name) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.name !== name);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="fridge-inventory">
      <div className="inventory-header">
        <h2>나의 냉장고 현황</h2>
        <p>내 냉장고에 있는 재료들을 관리해보세요</p>
        <div className="button-group">
          <button className="add-button" onClick={handleAddIngredient}>재료추가</button>
          <button className="delete-button" onClick={() => handleDeleteIngredient('우유')}>삭제하기</button>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="냉장고 재료명으로 검색하세요"
          value={filterText}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <button className="filter-button">검색</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>식재료명</th>
            <th>카테고리</th>
            <th>유통기한</th>
            <th>상태</th>
            <th>무게</th>
            <th>수량</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {filteredIngredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.category}</td>
              <td>{ingredient.expiry}</td>
              <td className={`status ${ingredient.status === '임박' ? 'warning' : 'normal'}`}>{ingredient.status}</td>
              <td>{ingredient.weight}</td>
              <td>{ingredient.quantity}</td>
              <td><button className="edit-button">수정</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FridgeInventory;
