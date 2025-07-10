import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || 'desc';

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
      .catch(console.error);
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
      <Navbar/>
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="/login">Вход</a></li>
              <li className="breadcrumbs__item"><a className="link">Товары</a></li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter" onSubmit={handleFilter}>
                <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Тип гитар</legend>
                  {['acoustic', 'electric', 'ukulele'].map((type) => (
                    <div className="form-checkbox catalog-filter__block-item" key={type}>
                      <input
                        className="visually-hidden"
                        type="radio"
                        id={type}
                        name="type"
                        value={type}
                        defaultChecked={searchParams.get('type') === type}
                      />
                      <label htmlFor={type}>
                        {type === 'acoustic' ? 'Акустические гитары' : type === 'electric' ? 'Электрогитары' : 'Укулеле'}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Количество струн</legend>
                  {[4, 6, 7, 12].map((num) => (
                    <div className="form-checkbox catalog-filter__block-item" key={num}>
                      <input
                        className="visually-hidden"
                        type="radio"
                        id={`${num}-strings`}
                        name="stringsCount"
                        value={num}
                        defaultChecked={searchParams.get('stringsCount') === String(num)}
                        disabled={num === 12}
                      />
                      <label htmlFor={`${num}-strings`}>{num}</label>
                    </div>
                  ))}
                </fieldset>

                <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset"
                        onClick={() => setSearchParams({})}>
                  Очистить
                </button>

                <button className="button button--black-border button--medium mt-4" type="submit">
                  Применить фильтр
                </button>
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button
                    type="button"
                    className={`catalog-sort__type-button ${currentSort === 'createdAt' ? 'catalog-sort__type-button--active' : ''}`}
                    onClick={() => setSearchParams({
                      ...Object.fromEntries(searchParams),
                      sort: 'createdAt',
                      order: currentOrder || 'desc'
                    })}
                  >
                    по дате
                  </button>

                  <button
                    type="button"
                    className={`catalog-sort__type-button ${currentSort === 'price' ? 'catalog-sort__type-button--active' : ''}`}
                    onClick={() => setSearchParams({
                      ...Object.fromEntries(searchParams),
                      sort: 'price',
                      order: currentOrder || 'asc'
                    })}
                  >
                    по цене
                  </button>
                </div>
                <div className="catalog-sort__order">
                  <button
                    className={`catalog-sort__order-button catalog-sort__order-button--up ${currentOrder === 'asc' ? 'catalog-sort__order-button--active' : ''}`}
                    aria-label="По возрастанию"
                    onClick={() => setSearchParams({
                      ...Object.fromEntries(searchParams),
                      order: 'asc'
                    })}
                  ></button>
                  <button
                    className={`catalog-sort__order-button catalog-sort__order-button--down ${currentOrder === 'desc' ? 'catalog-sort__order-button--active' : ''}`}
                    aria-label="По убыванию"
                    onClick={() => setSearchParams({
                      ...Object.fromEntries(searchParams),
                      order: 'desc'
                    })}
                  ></button>
                </div>
              </div>
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {products.map((p) => (
                    <li key={p._id} className="catalog-item">
                      <div className="catalog-item__data">
                        <img
                          src={p.imageUrl}
                          width="36"
                          height="93"
                          alt={p.name}
                        />
                        <div className="catalog-item__data-wrapper">
                          <Link className="link" to={`/products/${p._id}/view`}>
                            <p className="catalog-item__data-title">{p.name}</p>
                          </Link>
                          <br/>
                          <p className="catalog-item__data-price">{p.price} ₽</p>
                        </div>
                      </div>
                      <div className="catalog-item__buttons">
                        <Link
                          className="button button--small button--black-border"
                          to={`/products/${p._id}/edit`}
                        >
                          Редактировать
                        </Link>
                        <button
                          className="button button--small button--black-border"
                          onClick={() => {
                            if (confirm('Удалить товар?')) {
                              const token = localStorage.getItem('token');
                              fetch(`/api/products/${p._id}`, {
                                method: 'DELETE',
                                headers: {Authorization: `Bearer ${token}`},
                              })
                                .then(() => {
                                  setProducts(products.filter((item) => item._id !== p._id));
                                })
                                .catch(() => alert('Ошибка удаления'));
                            }
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to="/create"
              className="button product-list__button button--red button--big"
            >
              Добавить новый товар
            </Link>
            {pages > 1 && (
              <div className="pagination product-list__pagination">
                <ul className="pagination__list">
                  {Array.from({ length: pages }, (_, i) => (
                    <li
                      key={i}
                      className={`pagination__page ${
                        page === i + 1 ? 'pagination__page--active' : ''
                      }`}
                    >
                      <a
                        className="link pagination__page-link"
                        onClick={() =>
                          setSearchParams({
                            ...Object.fromEntries(searchParams),
                            page: String(i + 1),
                          })
                        }
                      >
                        {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
