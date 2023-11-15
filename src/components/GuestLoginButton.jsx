// import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // 通知用のtoastライブラリを使用する場合

const GuestLoginButton = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    // ゲストユーザーとしてログインするAPIリクエストを送信
    try {
      // ログインのAPIリクエストを実行
      const res = await axios.post('http://localhost:3001/auth/guest_sign_in');
      console.log(res?.data);
      // //サーバーからの応答に認証情報が含まれている場合
      // const authToken = res.data.authToken;
      // Cookieに認証情報を保存
      // document.cookie = `authToken=${authToken}; path=/`;

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);
        // ゲストユーザーとしてログイン成功した場合、ホームページに遷移
        console.log('ok');
        navigate('/');
      }
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
