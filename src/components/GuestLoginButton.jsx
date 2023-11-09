// import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuestLoginButton = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    // ゲストユーザーとしてログインするAPIリクエストを送信
    try {
      // ログインのAPIリクエストを実行

      // ゲストユーザーとしてログイン成功した場合、ホームページに遷移
      navigate('/home');
    } catch (error) {
      // エラーハンドリングを行う
      console.error('ゲストログインエラー:', error);
    }
  };

  return (
    <button onClick={handleGuestLogin}>ゲストログイン</button>
  );
};

export default GuestLoginButton;
