import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__wrapper">
        <Link className="footer__logo logo" to="/products">
          <img
            className="logo__img"
            src="/../../public/img/svg/logo.svg"
            width="70"
            height="70"
            alt="Guitar Shop"
          />
        </Link>

        <ul className="footer__nav">
          <li className="footer__nav-item">
            <Link className="link" to="/products">
              Каталог
            </Link>
          </li>
          <li className="footer__nav-item">
            <Link className="link" to="/create">
              Добавить товар
            </Link>
          </li>
        </ul>

        <p className="footer__copyright">
          © Guitar Shop, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
