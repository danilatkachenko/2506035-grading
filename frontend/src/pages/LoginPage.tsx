import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/style.css';
import Footer from "../components/Footer.tsx";

export default function LoginPage() {
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
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--h1">Вход в аккаунт</h1>

          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="custom-form__wrapper">
              <label className="custom-form__label">
                <span className="custom-form__title">E-mail</span>
                <input
                  type="email"
                  name="email"
                  className="custom-form__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Пароль</span>
                <input
                  type="password"
                  name="password"
                  className="custom-form__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="custom-form__buttons">
              <button type="submit" className="button button--login">
                Войти
              </button>
              <p className="mt-4 text-sm">
                Нет аккаунта? <a href="/register" className="link">Зарегистрироваться</a>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
