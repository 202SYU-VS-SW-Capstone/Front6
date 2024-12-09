import React from 'react';
import '../components/css/RecipeResults.css';

const RecipeResults = () => {
  const recipes = [
    {
      title: "채소 볶음",
      ingredients: "필요한 재료: 파프리카, 감자, 양파, 당근, 표고버섯, 시금치",
      instructions: [
        "1. 감자를 껍질 벗어 기름을 먼저 살짝 볶아주세요.",
        "2. 파프리카와 표고버섯을 넣고 같이 볶다가, 양파와 당근과 시금치를 추가하여 재료가 골고루 익도록 합니다.",
        "3. 간장을 조금 넣고 맛을 맞추세요."
      ],
      time: "조리 시간: 20분",
      difficulty: "난이도: 쉬움",
    },
    {
      title: "감자 채소 스프",
      ingredients: "필요한 재료: 감자, 파프리카, 양파, 당근, 표고버섯, 시금치",
      instructions: [
        "1. 감자와 채소에 물을 붓고 부드러워지면 양파와 표고버섯을 추가해 걸쭉하게 끓입니다.",
        "2. 믹서기에 갈아 부드럽게 만든 후 시금치를 넣고 가볍게 끓입니다.",
        "3. 소금과 후추로 간을 맞춰주세요."
      ],
      time: "조리 시간: 30분",
      difficulty: "난이도: 중간",
    },
    {
      title: "채소 오믈렛",
      ingredients: "필요한 재료: 파프리카, 감자, 양파, 당근, 표고버섯, 시금치, 달걀",
      instructions: [
        "1. 파프리카, 감자, 표고버섯을 잘게 썰어 기름에 볶아주세요.",
        "2. 달걀을 풀어 준비된 채소와 섞은 후, 팬을 달군 다음 재료를 팬에 부어 익힙니다.",
        "3. 소금과 후추로 간을 맞춰주세요."
      ],
      time: "조리 시간: 15분",
      difficulty: "난이도: 쉬움",
    },
  ];

  return (
    <div className="recipe-results">
      <p className="recommendation">파프리카, 감자, 양파, 당근, 표고버섯, 시금치로 만들 수 있는 레시피를 추천해드렸습니다.</p>
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <h2>{recipe.title}</h2>
          <p>{recipe.ingredients}</p>
          <div className="instructions">
            <strong>조리 방법:</strong>
            <ul>
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
          <p>{recipe.time}</p>
          <p>{recipe.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeResults;
