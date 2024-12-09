// src/store.js
import { createStore, combineReducers } from 'redux';
import write from './modules/write'; // 추가된 write 모듈

const rootReducer = combineReducers({
  write, // 리듀서 추가
});

const store = createStore(rootReducer);

export default store;
