import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container text-center py-20">
          <h1 className="title title--h1 mb-4">404</h1>
          <p className="text-lg mb-6">Страница не найдена 😢</p>
          <Link to="/products" className="button button--black-border">
            ← Вернуться в каталог
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
