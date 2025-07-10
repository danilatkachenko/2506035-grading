import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    type: 'electric',
    sku: '',
    stringsCount: 6,
    price: 1000,
  });

  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then((data) => setForm(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'number' || name === 'price' || name === 'stringsCount'
          ? Number(value)
          : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) return alert('Ошибка загрузки файла');

    const data = await res.json();
    setForm((prev) => ({ ...prev, imageUrl: `http://localhost:4000${data.url}` }));
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{form.name || 'Редактировать товар'}</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="/login">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="/products">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">{form.name}</a>
              </li>
            </ul>

            <form className="edit-item__form" onSubmit={handleSubmit}>
              <div className="edit-item__form-left">
                {/* 🔽 Превью изображения */}
                <div className="edit-item-image edit-item__form-image">
                  <div className="edit-item-image__image-wrap">
                    {form.imageUrl ? (
                      <img
                        className="edit-item-image__image"
                        src={form.imageUrl}
                        width="133"
                        height="332"
                        alt={form.name}
                      />
                    ) : (
                      <p className="text-gray-500">Изображение отсутствует</p>
                    )}
                  </div>
                  <div
                    className="edit-item-image__btn-wrap"
                    style={{display: 'flex', justifyContent: 'center', gap: '10px'}}
                  >
                    <button
                      type="button"
                      className="button button--small button--black-border edit-item-image__btn"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Загрузить
                    </button>
                    <button
                      type="button"
                      className="button button--small button--black-border edit-item-image__btn"
                      onClick={() => setForm((prev) => ({...prev, imageUrl: ''}))}
                    >
                      Удалить
                    </button>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* 🔽 Радиокнопки типа */}
                <div className="input-radio edit-item__form-radio">
                  <span>Тип товара</span>
                  {['acoustic', 'electric', 'ukulele'].map((type) => (
                    <span key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="type"
                        value={type}
                        checked={form.type === type}
                        onChange={handleChange}
                      />
                      <label htmlFor={type}>
                        {type === 'acoustic'
                          ? 'Акустическая гитара'
                          : type === 'electric'
                            ? 'Электрогитара'
                            : 'Укулеле'}
                      </label>
                    </span>
                  ))}
                </div>

                {/* 🔽 Кол-во струн */}
                <div className="input-radio edit-item__form-radio">
                  <span>Количество струн</span>
                  {[4, 6, 7, 12].map((n) => (
                    <span key={n}>
                      <input
                        type="radio"
                        id={`strings-${n}`}
                        name="stringsCount"
                        value={n}
                        checked={form.stringsCount === n}
                        onChange={handleChange}
                      />
                      <label htmlFor={`strings-${n}`}>{n}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="edit-item__form-right">
                <div className="custom-input edit-item__form-input">
                  <label>
                    <span>Наименование товара</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      placeholder="Наименование"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="custom-input edit-item__form-input edit-item__form-input--price">
                  <label>
                    <span>Цена товара</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      placeholder="Цена"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="custom-input edit-item__form-input">
                  <label>
                    <span>Артикул товара</span>
                    <input
                      type="text"
                      name="sku"
                      value={form.sku}
                      placeholder="Артикул"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="custom-textarea edit-item__form-textarea">
                  <label>
                    <span>Описание товара</span>
                    <textarea
                      name="description"
                      value={form.description}
                      placeholder="Описание"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="edit-item__form-buttons-wrap">
                <button className="button button--small edit-item__form-button" type="submit">
                  Сохранить изменения
                </button>
                <button
                  className="button button--small edit-item__form-button"
                  type="button"
                  onClick={() => navigate('/products')}
                >
                  Вернуться к списку товаров
                </button>
              </div>

              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
