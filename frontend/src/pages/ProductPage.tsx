import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../../public/css/style.css';
import Footer from "../components/Footer.tsx";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки товара');
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className="page-content">
        <div className="container text-center py-20">
          <h1 className="title title--h1 mb-4">404</h1>
          <p className="text-lg mb-6">Такой гитары не существует 🤷‍♂️</p>
          <Link to="/products" className="button button--black-border">
            ← Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return <p className="p-4">Загрузка...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">
          <button onClick={() => navigate(-1)} className="button button--small button--black-border mb-6">
            ← Назад
          </button>

          <div className="product-container">
            <div className="product__img">
              <img
                src={product.imageUrl.startsWith('/') ? product.imageUrl : '/' + product.imageUrl}
                width="260"
                height="300"
                alt={product.name}
              />
            </div>

            <div className="product__info-wrapper">
              <h1 className="title title--h3">{product.name}</h1>
              <div className="rate product__rate">★★★★☆</div>
              <p className="product__sku">Артикул: <span>{product.sku}</span></p>
              <p className="product__description">{product.description}</p>
              <p className="product__price">
                <span>Цена:</span> {product.price} ₽
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
