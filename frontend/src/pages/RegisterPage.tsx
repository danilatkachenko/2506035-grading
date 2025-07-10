import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/style.css';
import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar.tsx";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Ошибка регистрации');

      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    }
  };

  return (
    <>
      <Navbar/>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  id="name"
                  name="name"
                  autoComplete="off"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  id="email"
                  name="email"
                  autoComplete="off"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="password">Придумайте пароль</label><span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    id="password"
                    name="password"
                    autoComplete="off"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                <button
                  type="button"
                  className="input-login__button-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"/>
                  </svg>
                </button>
              </span>
                <p className="input-login__error">Заполните поле</p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
              <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
            </form>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
