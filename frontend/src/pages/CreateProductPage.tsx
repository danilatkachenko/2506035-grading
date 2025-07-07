import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    type: 'electro',
    sku: '',
    stringsCount: 6,
    price: 1000,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stringsCount' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Не удалось создать товар');
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--h1">Добавить товар</h1>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="custom-form__wrapper">
              <label className="custom-form__label">
                <span className="custom-form__title">Название</span>
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
                <span className="custom-form__title">Описание</span>
                <textarea
                  name="description"
                  className="custom-form__input"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Ссылка на изображение</span>
                <input
                  type="text"
                  name="imageUrl"
                  className="custom-form__input"
                  value={form.imageUrl}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Тип</span>
                <select name="type" className="custom-form__select" value={form.type} onChange={handleChange}>
                  <option value="electro">Электро</option>
                  <option value="acoustic">Акустика</option>
                  <option value="ukulele">Укулеле</option>
                </select>
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">SKU</span>
                <input
                  type="text"
                  name="sku"
                  className="custom-form__input"
                  value={form.sku}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Кол-во струн</span>
                <select name="stringsCount" className="custom-form__select" value={form.stringsCount} onChange={handleChange}>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={12}>12</option>
                </select>
              </label>

              <label className="custom-form__label">
                <span className="custom-form__title">Цена</span>
                <input
                  type="number"
                  name="price"
                  className="custom-form__input"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}

            <div className="custom-form__buttons">
              <button type="submit" className="button button--add">
                Добавить товар
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
