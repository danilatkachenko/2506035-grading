import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/style.css';
import Footer from '../components/Footer.tsx';
import Navbar from '../components/Navbar.tsx';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('danila@example.com');
  const [password, setPassword] = useState('12345');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Неверный логин или пароль');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <>
      <Navbar/>
      <main className="page-content">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь? <a className="login__link" href="/register">Зарегистрируйтесь</a> прямо сейчас
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="input-login__error">Заполните поле</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label><span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="• • • • • • • • • • • •"
                    id="passwordLogin"
                    name="password"
                    autoComplete="off"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              <button
                className="input-login__button-eye"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"/>
                </svg>
              </button>
            </span>
              <p className="input-login__error">Заполните поле</p>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button className="button login__button button--medium" type="submit">Войти</button>
          </form>
        </section>
      </main>
      <Footer/>
    </>
  );
}
