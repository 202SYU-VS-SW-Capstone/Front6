import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/Home';     
import Header from './components/Header';   
import Footer from './components/Footer';   
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Recipe from './pages/Recipe';
import Ingredient from './pages/Ingredient';
import ImageAnalysis from './pages/ImageAnalysis';
import RecipeResults from './pages/RecipeResults';
import FridgeInventory from './pages/FridgeInventory';
import Withdraw from './pages/Withdraw';
import PasswordChange from './pages/PasswordChange';
import InquiryForm from './pages/InquiryForm';
import ReportForm from './pages/ReportForm';
import ManageLogin from './pages/ManageLogin.js';
import MMainLayout from './layouts/MMainLayout.js';

//yn
import Manager  from './pages/Manager';
import MemberList from './pages/MemberList';
import Notice from './pages/Notice';
import NonMember from './pages/NonMember.js';
import DataManagement from './pages/DataManagement.js';
import Inquiry from './pages/Inquiry.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/manageLogin" element={<MMainLayout><ManageLogin /></MMainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
        <Route path="/mypage" element={<MainLayout><Mypage /></MainLayout>} />
        <Route path="/recipe" element={<MainLayout><Recipe /></MainLayout>} />
        <Route path="/ingredient" element={<MainLayout><Ingredient /></MainLayout>} />
        <Route path="/imageAnalysis" element={<MainLayout><ImageAnalysis /></MainLayout>} />
        <Route path="/recipeResults" element={<MainLayout><RecipeResults /></MainLayout>} />
        <Route path="/fridgeInventory" element={<MainLayout><FridgeInventory /></MainLayout>} />
        <Route path="/withdraw" element={<MainLayout><Withdraw /></MainLayout>} />
        <Route path="/passwordChange" element={<MainLayout><PasswordChange /></MainLayout>} />
        <Route path="/inquiryForm" element={<MainLayout><InquiryForm/></MainLayout>} />
        <Route path="/reportForm" element={<MainLayout><ReportForm/></MainLayout>} />


        <Route path="/manager" element={<MMainLayout><Manager/></MMainLayout>} />
        <Route path="/memberList" element={<MMainLayout><MemberList/></MMainLayout>} />
        <Route path="/Notice" element={<MMainLayout><Notice/></MMainLayout>} />
        <Route path="/NonMember" element={<MMainLayout><NonMember/></MMainLayout>} />
        <Route path="/DataManagement" element={<MMainLayout><DataManagement/></MMainLayout>} />
        <Route path="Inquiry" element={<MMainLayout><Inquiry/></MMainLayout>} />

      </Routes>
    </Router>
  );
}

export default App;
