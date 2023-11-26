// import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // 通知用のtoastライブラリを使用する場合
import { useContext } from 'react';
import { AuthContext } from '../App';

const GuestLoginButton = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const handleGuestLogin = async () => {
    // ゲストユーザーとしてログインするAPIリクエストを送信
    try {
      // ログインのAPIリクエストを実行
      const res = await axios.post('http://localhost:3001/auth/guest_sign_in');
      console.log(res?.data);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        // ゲストユーザーとしてログイン成功した場合、ホームページに遷移
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
