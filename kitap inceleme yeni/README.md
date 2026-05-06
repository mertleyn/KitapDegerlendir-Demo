# Kitap Değerlendirme Platformu

Kitap Değerlendirme Platformu, kullanıcıların kitap ekleyebileceği, değerlendirebileceği ve incelemelerini paylaşabileceği modern bir web uygulamasıdır. Bu proje tamamen istemci tarafında çalışır ve verileri tarayıcının localStorage'ında saklar.

## 📁 Proje Yapısı

```
kitap inceleme yeni/
├── index.html          # Ana HTML sayfası
├── script.js           # JavaScript uygulama mantığı
├── style.css           # CSS stil dosyası
├── server.js           # Node.js sunucu dosyası
└── README.md           # Bu dosya
```

## 🚀 Özellikler

### Ana Sayfa
- **Hero Bölümü**: Platform tanıtımı ve arama çubuğu
- **Öne Çıkan Kitaplar**: Son eklenen 6 kitabın görsel sunumu
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz

### Kitap Kütüphanesi
- **Kitap Listeleme**: Tüm kitapların listelenmesi
- **Tür Filtreleme**: Roman, Bilim, Tarih gibi kategorilere göre filtreleme
- **Arama Özelliği**: Kitap adı veya yazar adına göre arama
- **Görsel Kartlar**: Kitap kapak görselleri ile zenginleştirilmiş görünüm

### İncelemeler
- **Değerlendirme Listesi**: Tüm kitap incelemelerinin kronolojik sıralanması
- **Sıralama Seçenekleri**: En yeni, en yüksek/lowest puan göre sıralama
- **Silme Fonksiyonu**: İncelemeleri silme yeteneği

### Kitap Ekleme
- **Form Girişi**: Kitap bilgilerini girme (başlık, yazar, tür, puan, inceleme)
- **Otomatik Görsel**: Her kitap için rastgele kapak görseli oluşturma
- **Form Validasyonu**: Zorunlu alanların kontrolü

## 💻 Teknolojiler

### Frontend
- **HTML5**: Modern HTML yapısı ve semantic elements
- **CSS3**: Flexbox, Grid, animasyonlar ve responsive tasarım
- **Vanilla JavaScript**: ES6+ özellikleri, DOM manipülasyonu
- **Font Awesome**: İkon kütüphanesi
- **Picsum Photos**: Rastgele kitap kapak görselleri

### Backend (İsteğe Bağlı)
- **Node.js**: Basit HTTP sunucusu
- **File System**: Statik dosya sunma

## 📋 Dosya Açıklamaları

### `index.html`
Ana uygulama sayfası. İçerdiği bölümler:
- **Header**: Navigasyon menüsü ve logo
- **Hero Section**: Ana arama ve tanıtım
- **Featured Books**: Öne çıkan kitaplar grid'i
- **Page Sections**: Kütüphane, incelemeler, kitap ekleme sayfaları
- **Modal**: Kitap detayları için popup pencere

### `script.js` (384 satır)
Uygulamanın ana mantığı. Ana fonksiyonlar:

#### Veri Yönetimi
- `loadBooks()`: localStorage'dan kitapları yükle
- `saveBooks()`: Kitapları localStorage'a kaydet
- `books[]`: Ana veri dizisi

#### Sayfa Yönetimi
- `showPage(pageName)`: Sayfalar arası geçiş
- `renderFeaturedBooks()`: Ana sayfa kitaplarını render et
- `renderLibrary()`: Kütüphane sayfasını render et
- `renderReviews()`: İncelemeler sayfasını render et

#### Kitap İşlemleri
- `addBook()`: Yeni kitap ekle
- `deleteBook(id)`: Kitap sil
- `showBookDetails(id)`: Kitap detay modalını göster

#### Arama ve Filtreleme
- `searchBooks()`: Kütüphane içinde arama
- `searchBooksHero()`: Ana sayfa araması
- `filterBooks(genre)`: Tür filtreleme
- `sortReviews()`: İncelemeleri sıralama

#### Yardımcı Fonksiyonlar
- `getGenreName(genre)`: Tür adını Türkçe'ye çevir
- `getStars(rating)`: Yıldız puanlaması oluştur
- `closeModal()`: Modal pencereyi kapat
- `goHome()`: Ana sayfaya dön

### `style.css` (653 satır)
Modern ve responsive CSS tasarımı. Ana özellikler:

#### Layout ve Grid
- Flexbox ve Grid sistemleri
- Responsive breakpoints
- Container max-width: 1200px

#### Bileşen Stilleri
- **Header**: Sticky navigation, hover efektleri
- **Hero Section**: Gradient arka plan, büyük tipografi
- **Book Cards**: Shadow, hover animasyonları, grid layout
- **Modal**: Overlay, center positioning, animasyon
- **Forms**: Modern input styling, validasyon görselleri

#### Renk Paleti
- Ana renk: #667eea (mor tonu)
- Arka plan: #f8f9fa (açık gri)
- Beyaz kartlar ve soft gölgeler

#### Animasyonlar
- Hover efektleri
- Transition animasyonları
- Transform efektleri

### `server.js` (40 satır)
Basit Node.js HTTP sunucusu:
- Statik dosya sunma
- Content-Type yönetimi
- 404 ve 500 hata yönetimi
- Port 3000'de çalışır

## 🔧 Kurulum ve Çalıştırma

### Geliştirme Ortamı
1. Dosyaları projenize kopyalayın
2. Tarayıcıda `index.html` dosyasını açın (doğrudan çalışır)

### Sunucu ile Çalıştırma
```bash
# Node.js yüklü olmalı
node server.js
# http://localhost:3000 adresinde açın
```

## 📊 Veri Yapısı

Her kitap objesi şu yapıya sahiptir:
```javascript
{
    id: 1234567890,                    // Unique timestamp
    title: "Kitap Adı",                // String
    author: "Yazar Adı",               // String  
    genre: "roman",                    // String (roman, bilim, tarih, felsefe, siyaset)
    rating: 5,                         // Number (1-5)
    review: "İnceleme metni...",       // String
    date: "7.5.2026",                  // String (tr-TR format)
    image: "https://picsum.photos/..." // String (random cover)
}
```

## 🎨 Tasarım Kararları

### Responsive Yaklaşım
- Mobile-first tasarım
- Breakpoint: 768px (tablet ve üstü)
- Esnek grid sistemleri

### Kullanıcı Deneyimi
- Intuitive navigasyon
- Modal detay sayfaları
- Empty state mesajları
- Loading ve feedback animasyonları

### Performans
- localStorage kullanımı (hızlı erişim)
- Minimal external dependencies
- Optimized image loading (Picsum)

## 🔮 Gelecek Geliştirmeler

Potansiyel özellikler:
- Kullanıcı profilleri ve auth
- API entegrasyonu (Google Books, Open Library)
- Sosyal özellikler (beğeni, yorum)
- İstatistikler ve raporlama
- Export/import özellikleri
- PWA desteği

## 📝 Lisans

Bu proje eğitim amaçlıdır ve açık kaynak olarak kullanılabilir.

---

**Geliştirici Notları:**
- Proje vanilla JavaScript ile geliştirildi, framework bağımlılığı yok
- Tüm veriler localStorage'da saklanır (sayfa yenilemede kalıcı)
- Responsive tasarım modern tarayıcılarla tam uyumlu
- Kod yapısı modüler ve genişletilebilir tasarlandı
