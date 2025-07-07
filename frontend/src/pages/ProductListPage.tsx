import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchWithParams = () => {
    const token = localStorage.getItem('token')!;
    const query = Object.fromEntries(searchParams.entries());
    const pageFromURL = query.page || '1';

    fetchProducts(token, { ...query, page: pageFromURL })
      .then(data => {
        setProducts(data.items);
        setPages(data.pages);
        setPage(data.page);
      })
      .catch(err => setError(err.message));
  };

  useEffect(fetchWithParams, [searchParams]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (value) params[key] = value.toString();
    });

    setSearchParams(params);
  };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--h1">Каталог гитар</h1>

          <form className="custom-form mb-6" onSubmit={handleFilter}>
            <div className="custom-form__wrapper">
              <label className="custom-form__label">
                <span className="custom-form__title">Поиск</span>
                <input
                  type="text"
                  name="q"
                  className="custom-form__input"
                  defaultValue={searchParams.get('q') || ''}
                />
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Тип</span>
                <select
                  name="type"
                  className="custom-form__select"
                  defaultValue={searchParams.get('type') || ''}
                >
                  <option value="">Все</option>
                  <option value="acoustic">Акустика</option>
                  <option value="electro">Электро</option>
                  <option value="ukulele">Укулеле</option>
                </select>
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Струны</span>
                <select
                  name="stringsCount"
                  className="custom-form__select"
                  defaultValue={searchParams.get('stringsCount') || ''}
                >
                  <option value="">Любое</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="12">12</option>
                </select>
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Сортировка по цене</span>
                <select
                  name="sort"
                  className="custom-form__select"
                  defaultValue={searchParams.get('sort') || ''}
                >
                  <option value="">Без сортировки</option>
                  <option value="asc">Сначала дешёвые</option>
                  <option value="desc">Сначала дорогие</option>
                </select>
              </label>
            </div>

            <div className="custom-form__buttons mt-4 flex gap-4">
              <button type="submit" className="button button--black-border">
                Применить фильтры
              </button>
              <button
                type="button"
                className="button button--mini button--red"
                onClick={() => setSearchParams({})}
              >
                Сбросить фильтры
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mb-4">Ошибка: {error}</p>}

          {products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="title title--h3 mb-2">Ничего не найдено 😢</h2>
              <p className="text-sm">Попробуйте изменить фильтры или сбросить их.</p>
            </div>
          ) : (
            <ul className="catalog__cards">
              {products.map((p) => (
                <li key={p._id} className="product-card">
                  <div className="product-card__img">
                    <img
                      src={p.imageUrl.startsWith('/') ? p.imageUrl : '/' + p.imageUrl}
                      alt={p.name}
                      width="75"
                      height="190"
                    />
                  </div>
                  <div className="product-card__info">
                    <p className="product-card__title">{p.name}</p>
                    <p className="product-card__price">{p.price} ₽</p>
                  </div>
                  <div className="product-card__buttons">
                    <Link to={`/products/${p._id}/view`} className="button button--mini button--black-border">
                      Подробнее
                    </Link>
                    <Link to={`/products/${p._id}/edit`} className="button button--mini button--black-border">
                      Редактировать
                    </Link>
                    <button
                      onClick={() => {
                        const confirmed = confirm('Удалить товар?');
                        if (!confirmed) return;
                        const token = localStorage.getItem('token');
                        fetch(`/api/products/${p._id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${token}` },
                        })
                          .then(() => {
                            setProducts(products.filter((item) => item._id !== p._id));
                          })
                          .catch(() => {
                            alert('Ошибка удаления товара');
                          });
                      }}
                      className="button button--mini button--red"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* 🔽 Пагинация */}
          {pages > 1 && (
            <div className="pagination mt-8 flex justify-center items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => {
                  const next = Math.max(1, page - 1);
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: next.toString(),
                  });
                }}
                className="button button--mini button--black-border"
              >
                ← Предыдущая
              </button>

              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => {
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      page: (i + 1).toString(),
                    });
                  }}
                  className={`button button--mini ${
                    page === i + 1 ? 'button--black' : 'button--black-border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page >= pages}
                onClick={() => {
                  const next = Math.min(pages, page + 1);
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: next.toString(),
                  });
                }}
                className="button button--mini button--black-border"
              >
                Следующая →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
