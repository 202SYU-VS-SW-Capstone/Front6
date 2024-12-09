import React, { Component } from 'react';
import '../components/css/ImageAnalysis.css';

class ImageAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        image: URL.createObjectURL(file),
      });
    }
  };

  handleAnalyze = () => {
    alert("이미지 분석을 시작합니다.");
  };

  render() {
    const { image } = this.state;

    return (
      <div className="image-analysis">
        {/* 주의 사항 */}
        <div className="warning-box">
          <h3>⚠️ 이미지 분석 주의 사항</h3>
          <ul>
            <li>1. 포장된 제품: 포장지에 가려진 식재료는 인식이 어려울 수 있습니다. 포장을 제거하고 촬영해 주세요.</li>
            <li>2. 한 가지 재료씩 촬영: 여러 재료가 겹쳐 있으면 인식률이 낮아질 수 있습니다. 하나씩 촬영해 주세요.</li>
            <li>3. 빛과 각도: 너무 어둡거나 밝은 환경, 특정 각도에서는 재료가 잘 보이지 않을 수 있습니다. 고르게 빛이 드는 곳에서 촬영해 주세요.</li>
            <li>4. 사진 품질: 흐릿하거나 저화질 사진은 정확한 인식에 어려움이 있습니다. 가능한 선명한 사진을 사용해 주세요.</li>
          </ul>
        </div>

        {/* 이미지 업로드 */}
        <div className="image-upload-box">
          <div className="image-upload">
            {image ? (
              <img src={image} alt="Uploaded" className="image-preview" />
            ) : (
              <label className="image-placeholder">사진등록</label>
            )}
            <input type="file" accept="image/*" onChange={this.handleImageUpload} className="hidden-input" />
          </div>
        </div>

        {/* 분석 버튼 */}
        <button className="analyze-button" onClick={this.handleAnalyze}>재료 분석하기</button>
      </div>
    );
  }
}

export default ImageAnalysis;
