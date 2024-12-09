// src/modules/write.js

// 초기 상태
const initialState = {
  content: '',
};

// 액션 타입 정의
const CHANGE_FIELD = 'write/CHANGE_FIELD';

// 액션 생성자
export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: { key, value },
});

// 리듀서
const write = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export default write;
