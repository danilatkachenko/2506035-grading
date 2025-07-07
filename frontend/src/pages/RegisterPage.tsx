import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/style.css';
import Footer from "../components/Footer.tsx";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    <main className="page-content">
      <div className="container">
        <h1 className="title title--h1">Регистрация</h1>

        <form className="custom-form" onSubmit={handleSubmit}>
          <div className="custom-form__wrapper">
            <label className="custom-form__label">
              <span className="custom-form__title">Имя</span>
              <input
                type="text"
                name="name"
                className="custom-form__input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="custom-form__label">
              <span className="custom-form__title">E-mail</span>
              <input
                type="email"
                name="email"
                className="custom-form__input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="custom-form__label">
              <span className="custom-form__title">Пароль</span>
              <input
                type="password"
                name="password"
                className="custom-form__input"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="custom-form__buttons">
            <button type="submit" className="button button--register">
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </main>
      <Footer />
    </>
  );
}
