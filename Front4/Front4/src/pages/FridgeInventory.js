import React, { useState, useEffect } from 'react';
import { useAuth } from '../modules/contexts/AuthContext'; // 로그인한 사용자 정보 가져오기
import { getRefrigeratorIngredients } from '../modules/api/memberApi'; // API 함수 가져오기
import { useNavigate } from 'react-router-dom';
import '../components/css/FridgeInventory.css';

const FridgeInventory = () => {
  const { userInfo } = useAuth(); // 로그인된 사용자 정보 가져오기
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]); // 서버에서 불러온 식재료 상태
  const [filterText, setFilterText] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 백엔드에서 식재료 불러오기
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        if (!userInfo?.memberId) return; // 로그인 정보가 없으면 실행 중단
        const data = await getRefrigeratorIngredients(userInfo.memberId);

        // 수량과 무게 분리
        const parsedData = data.map((item) => {
          const [weight, quantity] = item.quantity.split(' x ');
          return {
            ...item,
            weight, // "500g" 형식의 무게
            quantity, // "3" 형식의 수량
          };
        });

        setIngredients(parsedData);
        setFilteredIngredients(parsedData);
      } catch (err) {
        console.error(err);
        setError('식재료를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [userInfo]);

  // 필터링 처리
  useEffect(() => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.ingredientName.includes(filterText)
    );
    setFilteredIngredients(filtered);
  }, [filterText, ingredients]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleAddIngredient = () => {
    navigate('/ingredient'); // 재료 추가 페이지로 이동
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="fridge-inventory">
      <div className="inventory-header">
        <h2>나의 냉장고 현황</h2>
        <p>내 냉장고에 있는 재료들을 관리해보세요</p>
        <div className="button-group">
          <button className="add-button" onClick={handleAddIngredient}>재료추가</button>
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
          {filteredIngredients.map((item, index) => (
            <tr key={index}>
              <td>{item.ingredientName}</td>
              <td>{item.subCategory}</td>
              <td>{item.expirationDate}</td>
              <td className={`status ${item.status === '임박' ? 'warning' : 'normal'}`}>
                {item.status}
              </td>
              <td>{item.weight}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="edit-button">수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FridgeInventory;
