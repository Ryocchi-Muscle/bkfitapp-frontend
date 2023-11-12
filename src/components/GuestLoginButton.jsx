// import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // 通知用のtoastライブラリを使用する場合

const GuestLoginButton = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    // ゲストユーザーとしてログインするAPIリクエストを送信
    try {
      // ログインのAPIリクエストを実行
      const response = await axios.post('http://localhost:3001/auth/guest_sign_in');
      //サーバーからの応答に認証情報が含まれている場合
      const authToken = response.data.authToken;
      // Cookieに認証情報を保存
      document.cookie = `authToken=${authToken}; path=/`;
      // ゲストユーザーとしてログイン成功した場合、ホームページに遷移
      navigate('/');
      console.log('ok');
    } catch (error) {
      // エラーハンドリングを行う
      console.error('ゲストログインエラー:', error);
      // メッセージ
      toast.error('ゲストログインできませんでした');
    }
  };

  return <button onClick={handleGuestLogin}>ゲストログイン</button>;
};

export default GuestLoginButton;
