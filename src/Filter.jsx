import React, { useState } from 'react';

const ProductFilterApp = () => {
  // Örnek ürün verileri
  const initialProducts = [
    { id: 1, name: 'Bilgisayar', category: 'Elektronik', price: 12000 },
    { id: 2, name: 'Telefon', category: 'Elektronik', price: 8000 },
    { id: 3, name: 'Tişört', category: 'Giyim', price: 150 },
    { id: 4, name: 'Pantolon', category: 'Giyim', price: 300 },
    { id: 5, name: 'Kitap', category: 'Kırtasiye', price: 50 },
    { id: 6, name: 'Defter', category: 'Kırtasiye', price: 30 },
    { id: 7, name: 'Kulaklık', category: 'Elektronik', price: 500 },
    { id: 8, name: 'Ayakkabı', category: 'Giyim', price: 600 },
  ];

  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Tüm kategorileri al
  const allCategories = [...new Set(products.map(product => product.category))];

  // Kategori seçimini değiştirme
  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    applyFilters(priceRange, newSelectedCategories);
  };

  // Fiyat aralığını değiştirme
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    applyFilters(newPriceRange, selectedCategories);
  };

  // Filtreleri uygula
  const applyFilters = (priceRange, categories) => {
    let filtered = [...products];

    // Fiyat filtresi
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Kategori filtresi (eğer en az bir kategori seçiliyse)
    if (categories.length > 0) {
      filtered = filtered.filter(product => 
        categories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-filter-app" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Ürün Filtreleme</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Fiyat Aralığı</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{priceRange[0]} TL</span>
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            style={{ flex: 1 }}
          />
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            style={{ flex: 1 }}
          />
          <span>{priceRange[1]} TL</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5px' }}>
          {priceRange[0]} TL - {priceRange[1]} TL
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Kategoriler</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: '5px 10px',
                backgroundColor: selectedCategories.includes(category) ? '#4CAF50' : '#e0e0e0',
                color: selectedCategories.includes(category) ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2>Filtrelenmiş Ürünler ({filteredProducts.length})</h2>
        {filteredProducts.length === 0 ? (
          <p>Filtre kriterlerinize uygun ürün bulunamadı.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                <h3>{product.name}</h3>
                <p>Kategori: {product.category}</p>
                <p>Fiyat: {product.price} TL</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilterApp;
