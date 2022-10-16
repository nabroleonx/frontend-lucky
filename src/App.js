import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserInformation from "./components/UserInformation";
import VisionBoard from "./components/VisionBoard";
import BankInformation from "./components/BankInformation";
import ReceiptUpload from "./components/ReceiptUpload";
import Blog from "./components/Blog";
import Calendar from "./components/Calendar";
import Landing from "./components/Landing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/vision" element={<VisionBoard />} />
        <Route path="/bank-information" element={<BankInformation />} />
        <Route path="/user" element={<UserInformation />} />
        <Route path="/receipt-upload" element={<ReceiptUpload />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
