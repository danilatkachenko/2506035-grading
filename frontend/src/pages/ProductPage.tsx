import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../../public/css/style.css';
import Footer from "../components/Footer.tsx";

export default function ProductPage() {
  const { id } = useParams();
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
      <Navbar/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="/products">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/products">Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товар</a>
            </li>
          </ul>
          <div className="product-container">
            <img
            className="product-container__img"
            src={product.imageUrl}
            width="260"
            height="300"
            alt={product.name}
          />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {product.name}
              </h2>
              <br/>
              <br/>
              <div className="tabs"><a className="button button--medium tabs__button"
                                       href={"#characteristics"}>Характеристики</a><a
                className="button button--black-border button--medium tabs__button" href={"#description"}>Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product.sku}</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">
                        {product.type === 'acoustic' ? 'Акустическая' :
                          product.type === 'electric' ? 'Электрогитара' :
                            product.type === 'ukulele' ? 'Укулеле' : product.type}
                      </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{product.stringsCount} струнная</td>
                    </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
