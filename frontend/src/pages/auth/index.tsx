import React from 'react';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <main className={styles.auth}>
      <h1 className={styles.title}>Авторизация</h1>
      <p className={styles.subtitle}>Введите номер телефона, чтобы завершить бронирование</p>
      <PhoneInput />
    </main>
  );
};

export default Auth;