/* eslint-disable no-else-return */

import Vue from 'vue';
import axios, { AxiosStatic } from 'axios';
import store from '@/store';

const axi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

let isRefreshing = false;
function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

function getToken(): Token | null {
  const refreshToken = localStorage.getItem('refreshToken');
  const generated = localStorage.getItem('generated');
  if (!refreshToken || !generated) return null;

  return {
    refreshToken,
    generated,
  };
}

function setToken(token: SetToken | null): void {
  if (token) {
    localStorage.setItem('refreshToken', token.refreshToken);
    localStorage.setItem('generated', token.generated.toString());
  } else {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('generated');
  }
}

interface Token {
  refreshToken: string;
  generated: string;
}

interface SetToken {
  refreshToken: string;
  generated: Date;
}

axi.interceptors.request.use(
  async config => {
    if (config.url!.split('/')[1] !== 'auth') {
      const token = getToken();
      if (!token) {
        return config;
      }
      const generated = new Date(token.generated);
      if (Number.isNaN(generated.getTime())) {
        return Promise.reject(new Error('dimi'));
      }
      generated.setMinutes(generated.getMinutes() + 50);
      if (generated.getTime() <= new Date().getTime()) {
        if (isRefreshing) {
          while (isRefreshing) {
            // eslint-disable-next-line
            await sleep(1);
          }
          if (token) {
            return config;
          } else {
            return Promise.reject(new Error('dimi'));
          }
        } else {
          isRefreshing = true;
          try {
            const data: any = await axi.post('/auth/refresh', {
              refreshToken: token.refreshToken,
            });
            const { success, refreshToken } = data.data;
            if (success) {
              store.commit('token', new Date().getTime());
              setToken({
                refreshToken,
                generated: new Date(),
              });
              isRefreshing = false;
            } else {
              store.commit('me', null);
              store.commit('token', null);
              setToken(null);
              isRefreshing = false;
              return Promise.reject(new Error('dimi'));
            }
          } catch (err) {
            isRefreshing = false;
            return Promise.reject(new Error('dimi'));
          }
        }
      }
    }
    return config;
  },
  error => Promise.reject(error),
);
axi.interceptors.response.use(
  res => {
    if (res.data.code === 401) {
      store.commit('me', null);
      store.commit('token', null);
      setToken(null);
      return Promise.reject(new Error());
    }
    return res;
  },
  err => {
    if (err.message !== 'dimi' && err.response.data.code === 401) {
      window.location.reload();
    }
    return Promise.reject(err);
  },
);

Vue.prototype.$axios = axi;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}

export default axi;
