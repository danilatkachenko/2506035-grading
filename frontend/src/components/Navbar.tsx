import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [name, setName] = useState(localStorage.getItem('name'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    setName(null);
    navigate('/login');
  };

  // 🔄 Следим за изменениями в localStorage после логина
  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem('token'));
      setName(localStorage.getItem('name'));
    }, 500); // можно заменить на context или событие позже

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <a className="header__logo logo" href="/products">
            <img
              className="logo__img"
              width="70"
              height="70"
              src="/img/svg/logo.svg"
              alt="Логотип"
            />
          </a>

          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="link main-nav__link" href="/products">Каталог</a>
              </li>
              <li className="main-nav__item">
                <a className="link main-nav__link" href="#">Список товаров</a>
              </li>
            </ul>
          </nav>

          <div className="header__container">
            {token && (
              <>
                <span className="header__user-name">
                  {name || 'Пользователь'}
                </span>
                <a
                  href="#"
                  className="header__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-account"></use>
                  </svg>
                  <span className="header__link-text">Выйти</span>
                </a>
              </>
            )}

            {!token && (
              <Link
                className="header__link"
                to="/login"
                aria-label="Перейти в личный кабинет"
              >
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
