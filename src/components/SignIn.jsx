import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';
import { AuthContext } from '../App';
// import React from 'react';

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(''); //emailの状態管理
  const [password, setPassword] = useState(''); //passwordの状態管理

  const navigate = useNavigate();

  //emailとpasswordを１つのオブジェクトにまとめて返す関数
  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };
//
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate('/');
      }
    } catch (e) {
      console.log(e);
      alert('メールアドレスまたは、パスワードに誤りがあります。');
    }
  };
  return (
    <>
      <p>サインインページです</p>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={(e) => handleSignInSubmit(e)}>
          Submit
        </button>
      </form>
      <Link to="/signup">サインアップへ</Link>
    </>
  );
};

export default SignIn;
