import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.10.182:3001',
})


