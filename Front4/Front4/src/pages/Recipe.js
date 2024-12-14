import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../components/css/Recipe.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useDispatch } from 'react-redux';
import { changeField } from '../modules/write'; // 리덕스 액션 가져오기

// 스타일링 컴포넌트
const MyBlock = styled.div`
  .wrapper-class {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .editor {
    height: 400px !important;
    border: 1px solid #ccc !important;
    padding: 10px !important;
    border-radius: 5px !important;
  }
`;

// 모달 스타일
const ModalWrapper = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 400px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;



const Recipe = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    time: '',
    servings: '',
    description: '',
    method: '',
    ingredients: [],
    optionalIngredients: [],
  });

  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // '필수' 또는 '선택'
  const [ingredientInput, setIngredientInput] = useState(''); // 모달에서 입력한 재료

  // 레시피 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // 에디터 상태 변화 처리
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentAsHtml = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    setNewRecipe({ ...newRecipe, method: contentAsHtml });
    dispatch(changeField({ key: 'content', value: contentAsHtml }));
  };

  // 새 레시피 추가
  const handleAddRecipe = () => {
    if (newRecipe.name.trim() !== '' && newRecipe.method.trim() !== '') {
      setRecipes([...recipes, newRecipe]);
      setNewRecipe({
        name: '',
        time: '',
        servings: '',
        description: '',
        method: '',
        ingredients: [],
        optionalIngredients: [],
      });
    }
  };

  // 레시피 수정 저장
  const handleSaveEdit = () => {
    if (newRecipe.name.trim() !== '' && newRecipe.method.trim() !== '') {
      const updatedRecipes = recipes.map((recipe, index) =>
        index === editIndex ? newRecipe : recipe
      );
      setRecipes(updatedRecipes);
      setEditIndex(null);
      setNewRecipe({
        name: '',
        time: '',
        servings: '',
        description: '',
        method: '',
        ingredients: [],
        optionalIngredients: [],
      });
    }
  };

  // 모달 열기
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setIngredientInput('');
  };

  // 재료 추가
  const addIngredient = () => {
    if (ingredientInput.trim() === '') return;

    if (modalType === '필수') {
      setNewRecipe({
        ...newRecipe,
        ingredients: [...newRecipe.ingredients, ingredientInput],
      });
    } else {
      setNewRecipe({
        ...newRecipe,
        optionalIngredients: [...newRecipe.optionalIngredients, ingredientInput],
      });
    }
    setIngredientInput('');
  };

  // 재료 삭제
  const removeIngredient = (type, index) => {
    if (type === '필수') {
      const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
      setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
    } else {
      const updatedOptionalIngredients = newRecipe.optionalIngredients.filter((_, i) => i !== index);
      setNewRecipe({ ...newRecipe, optionalIngredients: updatedOptionalIngredients });
    }
  };

  return (
    <div className="recipe-container">
      <h1>레시피 등록</h1>

      {/* 레시피 추가 및 수정 폼 */}
      <div className="add-recipe-form">
        <label>
          레시피 이름:
          <input
            type="text"
            placeholder="레시피 이름"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          />
        </label>
        <label>
          조리 시간(분):
          <input
            type="number"
            placeholder="조리 시간"
            value={newRecipe.time}
            onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
          />
        </label>
        <label>
          인원(인분):
          <input
            type="number"
            placeholder="인원 (인분)"
            value={newRecipe.servings}
            onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
          />
        </label>
        <label>
          필수 재료:
          <button onClick={() => openModal('필수')}>필수 재료 추가</button>
        </label>
        <ul>
          {newRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <button onClick={() => removeIngredient('필수', index)}>삭제</button>
            </li>
          ))}
        </ul>
        <label>
          선택 재료:
          <button onClick={() => openModal('선택')}>선택 재료 추가</button>
        </label>
        <ul>
          {newRecipe.optionalIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <button onClick={() => removeIngredient('선택', index)}>삭제</button>
            </li>
          ))}
        </ul>

        <MyBlock>
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
              inline: { inDropdown: false },
              list: { inDropdown: true },
              link: { inDropdown: true },
            }}
            localization={{ locale: 'ko' }}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
        </MyBlock>
        <button onClick={editIndex === null ? handleAddRecipe : handleSaveEdit}>
          {editIndex === null ? '등록하기' : '수정 완료'}
        </button>
      </div>

     {/* 모달 */}
<ModalWrapper show={isModalOpen}>
  <ModalContent>
    <h2>{modalType === '필수' ? '필수 재료 추가' : '선택 재료 추가'}</h2>
    <input
      type="text"
      value={ingredientInput}
      onChange={(e) => setIngredientInput(e.target.value)}
      placeholder="재료 입력"
      style={{
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className="modal-button" onClick={addIngredient}>
        +
      </button>
      <button className="modal-button delete" onClick={closeModal}>
        x
      </button>
    </div>
  </ModalContent>
</ModalWrapper>


    </div>
  );
};

export default Recipe;
