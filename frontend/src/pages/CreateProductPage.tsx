import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('ru-RU');

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    sku: '',
    type: 'electro',
    stringsCount: 4,
    price: '',
  });

  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stringsCount' ? Number(value) : value,
    }));
  };

  const handleRadioChange = (name: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, imageUrl: `http://localhost:4000${data.url}` }));
        setImageFile(file);
      } else {
        throw new Error('Не удалось получить ссылку на изображение');
      }
    } catch (err) {
      alert('Ошибка загрузки изображения');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Ошибка при создании товара');
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Новый товар</a>
              </li>
            </ul>
            <form className="add-item__form" onSubmit={handleSubmit}>
              <div className="add-item__form-left">
                <div className="edit-item-image add-item__form-image">
                  <div className="edit-item-image__image-wrap">
                    {form.imageUrl ? (
                      <img
                        className="edit-item-image__image"
                        src={form.imageUrl}
                        width="133"
                        height="332"
                        alt="Превью"
                      />
                    ) : (
                      <span>Превью изображения</span>
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
                      onClick={() => {
                        setForm((prev) => ({...prev, imageUrl: ''}));
                        setImageFile(null);
                      }}
                    >
                      Удалить
                    </button>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="input-radio add-item__form-radio">
                  <span>Выберите тип товара</span>
                  {['acoustic', 'electro', 'ukulele'].map((type) => (
                    <span key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="type"
                        value={type}
                        checked={form.type === type}
                        onChange={() => handleRadioChange('type', type)}
                      />
                      <label htmlFor={type}>
                        {type === 'acoustic'
                          ? 'Акустическая гитара'
                          : type === 'electro'
                            ? 'Электрогитара'
                            : 'Укулеле'}
                      </label>
                    </span>
                  ))}
                </div>

                <div className="input-radio add-item__form-radio">
                  <span>Количество струн</span>
                  {[4, 6, 7, 12].map((num) => (
                    <span key={num}>
                      <input
                        type="radio"
                        id={`strings-${num}`}
                        name="stringsCount"
                        value={num}
                        checked={form.stringsCount === num}
                        onChange={() => handleRadioChange('stringsCount', num)}
                      />
                      <label htmlFor={`strings-${num}`}>{num}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="add-item__form-right">
                <div className="custom-input add-item__form-input">
                  <label>
                    <span>Дата добавления товара</span>
                    <input
                      type="text"
                      name="date"
                      value={today}
                      placeholder="Дата в формате 00.00.0000"
                      readOnly
                    />
                  </label>
                </div>

                <div className="custom-input add-item__form-input">
                  <label>
                    <span>Введите наименование товара</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Наименование"
                      required
                    />
                  </label>
                </div>

                <div className="custom-input add-item__form-input add-item__form-input--price">
                  <label>
                    <span>Введите цену товара</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="Цена в формате 00 000"
                      required
                    />
                  </label>
                </div>

                <div className="custom-input add-item__form-input">
                  <label>
                    <span>Введите артикул товара</span>
                    <input
                      type="text"
                      name="sku"
                      value={form.sku}
                      onChange={handleInputChange}
                      placeholder="Артикул товара"
                      required
                    />
                  </label>
                </div>

                <div className="custom-textarea add-item__form-textarea">
                  <label>
                    <span>Введите описание товара</span>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Описание"
                      required
                    />
                  </label>
                </div>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}

              <div className="add-item__form-buttons-wrap">
                <button className="button button--small add-item__form-button" type="submit">
                  Сохранить изменения
                </button>
                <button
                  className="button button--small add-item__form-button"
                  type="button"
                  onClick={() => navigate('/products')}
                >
                  Вернуться к списку товаров
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
