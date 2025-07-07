import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="/products">
          <img
            className="logo__img"
            src="../../public/img/svg/logo.svg"
            width="70"
            height="70"
            alt="Логотип Guitar Shop"
          />
        </Link>

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link" to="/products">
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to="/create">
                Добавить товар
              </Link>
            </li>
            <li className="main-nav__item">
              <button onClick={handleLogout} className="button button--red">
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
