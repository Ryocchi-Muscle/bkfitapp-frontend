import { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // サインアウトの処理を実装
    // 例: ローカルストレージやクッキーからユーザーデータを削除
    localStorage.removeItem('user_token');

    // ローカルの認証情報をクリア
    setIsSignedIn(false);
    setCurrentUser(null);

    // ログアウト後にリダイレクトする場合
    navigate('/signin');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
