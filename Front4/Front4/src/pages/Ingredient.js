import React, { Component } from 'react';
import '../components/css/Ingredient.css';

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: '',
      category: '',
      expiryDate: '',
      weight: 0,
      weightUnit: 'g',
      quantity: 1,
    };
  }

  handleImageChange = (e) => {
    this.setState({ image: URL.createObjectURL(e.target.files[0]) });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  incrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  decrementQuantity = () => {
    this.setState((prevState) => ({ quantity: Math.max(prevState.quantity - 1, 0) }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { image, name, category, expiryDate, weight, weightUnit, quantity } = this.state;

    return (
      <form className="ingredient-form" onSubmit={this.handleSubmit}>
        
        {/* 사진 업로드 */}
        <div className="form-group">
        
          <div className="image-upload">
            {image ? (
              <img src={image} alt="재료 사진" className="image-preview" />
            ) : (
              <label className="image-placeholder">사진등록</label>
            )}
            <input type="file" accept="image/*" onChange={this.handleImageChange} className="hidden-input" />
          </div>
        </div>

        {/* 식재료명 */}
        <div className="form-group">
          <label>식재료명:</label>
          <input
            type="text"
            name="name"
            placeholder="식재료명"
            value={name}
            onChange={this.handleInputChange}
            className="text-input"
          />
        </div>

        {/* 카테고리 */}
        <div className="form-group">
          <label>카테고리:</label>
          <select
            name="category"
            value={category}
            onChange={this.handleInputChange}
            className="dropdown"
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="육류">육류</option>
            <option value="야채">야채</option>
            <option value="과일">과일</option>
            <option value="수산물">수산물</option>
            <option value="유제품">유제품</option>
            <option value="곡류">곡류</option>
            <option value="음료">음료</option>
            <option value="냉동식품">냉동식품</option>
            <option value="즉석식품">즉석식품</option>
            <option value="반찬류">반찬류</option>
          </select>
        </div>

        {/* 유통기한 */}
        <div className="form-group">
          <label>유통기한:</label>
          <input
            type="date"
            name="expiryDate"
            value={expiryDate}
            onChange={this.handleInputChange}
            className="date-input"
          />
        </div>

        {/* 무게 */}
        <div className="form-group">
          <label>무게:</label>
          <div className="weight-input-container">
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={this.handleInputChange}
              className="weight-input"
            />
            <select
              name="weightUnit"
              value={weightUnit}
              onChange={this.handleInputChange}
              className="weight-unit-dropdown"
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="lb">lb</option>
              <option value="cup">cup</option>
              <option value="tsp">tsp</option>
            </select>
          </div>
        </div>

        {/* 수량 */}
        <div className="form-group">
          <label>수량:</label>
          <div className="quantity-input-container">
            <button type="button" onClick={this.decrementQuantity} className="quantity-button">-</button>
            <span className="quantity-display">{quantity}</span>
            <button type="button" onClick={this.incrementQuantity} className="quantity-button">+</button>
          </div>
        </div>

        {/* 등록 버튼 */}
        <button type="submit" className="submit-button">등록하기</button>
      </form>
    );
  }
}

export default Ingredient;
