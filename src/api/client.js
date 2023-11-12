//バックエンドのAPIと通信するためのURLやリクエストの設定を行うファイル
import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeaders: true,
};

//Axiosインスタンスを作成
const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3001',
  }),
  options,
);

export default client;
