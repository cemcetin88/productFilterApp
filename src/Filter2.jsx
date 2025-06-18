import React, { useState } from 'react';

const Filter2 = () => {
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
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Önceden tanımlanmış fiyat aralıkları
  const priceRanges = [
    { label: 'Tüm Fiyatlar', min: 0, max: 20000 },
    { label: '0 - 200 TL', min: 0, max: 200 },
    { label: '200 - 500 TL', min: 200, max: 500 },
    { label: '500 - 1000 TL', min: 500, max: 1000 },
    { label: '1000 TL ve üzeri', min: 1000, max: 20000 },
  ];

  // Tüm kategorileri al
  const allCategories = [...new Set(products.map(product => product.category))];

  // Fiyat aralığını seçme
  const handlePriceRangeSelect = (range) => {
    setSelectedPriceRange(range);
    applyFilters(range, selectedCategories);
  };

  // Kategori seçimini değiştirme
  const handleCategorySelect = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    applyFilters(selectedPriceRange, newSelectedCategories);
  };

  // Tüm filtreleri temizle
  const clearAllFilters = () => {
    setSelectedPriceRange(null);
    setSelectedCategories([]);
    setFilteredProducts(initialProducts);
  };

  // Filtreleri uygula
  const applyFilters = (priceRange, categories) => {
    let filtered = [...products];

    // Fiyat filtresi
    if (priceRange) {
      filtered = filtered.filter(
        product => product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    // Kategori filtresi (eğer en az bir kategori seçiliyse)
    if (categories.length > 0) {
      filtered = filtered.filter(product => 
        categories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-filter-app" style={{ 
      padding: '20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Ürün Filtreleme</h1>
      
      <div style={{ 
        display: 'flex',
        gap: '30px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {/* Fiyat Aralığı Bölümü */}
        <div style={{ 
          flex: '1',
          minWidth: '250px',
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: '0', color: '#444' }}>Fiyat Aralığı</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handlePriceRangeSelect(range)}
                style={{
                  padding: '10px',
                  backgroundColor: selectedPriceRange?.label === range.label ? '#4CAF50' : '#e0e0e0',
                  color: selectedPriceRange?.label === range.label ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.3s',
                  fontWeight: selectedPriceRange?.label === range.label ? 'bold' : 'normal'
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kategoriler Bölümü */}
        <div style={{ 
          flex: '1',
          minWidth: '250px',
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: '0', color: '#444' }}>Kategoriler</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                style={{
                  padding: '10px',
                  backgroundColor: selectedCategories.includes(category) ? '#4CAF50' : '#e0e0e0',
                  color: selectedCategories.includes(category) ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.3s',
                  fontWeight: selectedCategories.includes(category) ? 'bold' : 'normal'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtre Temizleme Butonu */}
      {(selectedPriceRange || selectedCategories.length > 0) && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={clearAllFilters}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Sonuçlar Bölümü */}
      <div>
        <h2 style={{ color: '#333' }}>
          {filteredProducts.length} Ürün Bulundu
          {(selectedPriceRange || selectedCategories.length > 0) && (
            <span style={{ fontSize: '14px', fontWeight: 'normal', marginLeft: '10px' }}>
              (Filtreler: 
              {selectedPriceRange && ` ${selectedPriceRange.label}`}
              {selectedCategories.length > 0 && `, ${selectedCategories.join(', ')}`})
            </span>
          )}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px' }}>Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
            <button
              onClick={clearAllFilters}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <h3 style={{ marginTop: '0', color: '#222' }}>{product.name}</h3>
                <p style={{ color: '#666', margin: '5px 0' }}>
                  <strong>Kategori:</strong> {product.category}
                </p>
                <p style={{ color: '#2196F3', fontWeight: 'bold', fontSize: '18px', margin: '5px 0' }}>
                  {product.price.toLocaleString()} TL
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter2;