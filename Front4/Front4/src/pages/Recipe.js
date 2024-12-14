import '../components/css/Recipe.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../modules/write'; // 리덕스 액션 가져오기
import styled from 'styled-components';

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

const Recipe = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.write); // 리덕스 스토어에서 content 가져오기
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const rendered = useRef(false);
  const [recipes, setRecipes] = useState(() => {
    // localStorage에서 초기 데이터 로드
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    time: '',
    servings: '',
    description: '',
    method: '',
    ingredients: '',
    optionalIngredients: ''
  });

  const [editIndex, setEditIndex] = useState(null);

  // 레시피가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // 에디터 상태 변화 시 실행되는 함수
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentAsHtml = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    setNewRecipe({ ...newRecipe, method: contentAsHtml }); // 에디터 내용을 newRecipe에 반영
    dispatch(changeField({ key: 'content', value: contentAsHtml })); // 리덕스 액션 호출
  };

  // HTML 컨텐츠를 에디터 초기값으로 변환하여 설정
  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    if (content) {
      const blocksFromHtml = htmlToDraft(content);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const initialEditorState = EditorState.createWithContent(contentState);
        setEditorState(initialEditorState);
      }
    }
  }, [content]);





  // 새 레시피 추가 함수
  const handleAddRecipe = () => {
    if (newRecipe.name.trim() !== '' && newRecipe.method.trim() !== '') {
      setRecipes([...recipes, newRecipe]);
      setNewRecipe({ name: '', time: '', servings: '', description: '', method: '', ingredients: '', optionalIngredients: '' });
    }
  };

  // 레시피 삭제 함수
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  // 레시피 수정 시작 함수
  const handleEditRecipe = (index) => {
    setEditIndex(index);
    setNewRecipe(recipes[index]);
    const blocksFromHtml = htmlToDraft(recipes[index].method);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    }
  };

  // 수정된 레시피 저장 함수
  const handleSaveEdit = () => {
    if (newRecipe.name.trim() !== '' && newRecipe.method.trim() !== '') {
      const updatedRecipes = recipes.map((recipe, index) =>
        index === editIndex ? newRecipe : recipe
      );
      setRecipes(updatedRecipes);
      setEditIndex(null);
      setNewRecipe({ name: '', time: '', servings: '', description: '', method: '', ingredients: '', optionalIngredients: '' });
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
        <br/>
        <label>
          조리 시간(분):
          <input
            type="number"
            placeholder="조리 시간"
            value={newRecipe.time}
            onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
          />
        </label>
        <br/>
        <label>
          인원(인분):
          <input
            type="number"
            placeholder="인원 (인분)"
            value={newRecipe.servings}
            onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
          />
        </label>
        <br/>
        <label>
          필수 재료:
          <input type='button'/>
        </label>
        <br/>
        <label>
          선택 재료:
          <input type='button'/>
        </label>
        <label>
          간단한 설명:
        </label>
        <br/>
        
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

  
    </div>
  );
};

export default Recipe;