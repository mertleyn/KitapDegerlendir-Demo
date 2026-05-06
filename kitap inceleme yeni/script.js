let books = [];

document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    renderFeaturedBooks();
    renderLibrary();
    renderReviews();
    
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    });
    
    // Header navigation
    document.querySelectorAll('.main-header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                showPage('home');
            } else if (href.includes('library')) {
                showPage('library');
            } else if (href.includes('reviews')) {
                showPage('reviews');
            } else if (href.includes('add')) {
                showPage('add');
            }
        });
    });
});

function loadBooks() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    } else {
        books = [];
    }
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const genre = document.getElementById('bookGenre').value;
    const rating = document.getElementById('bookRating').value;
    const review = document.getElementById('bookReview').value.trim();
    
    if (!title || !author || !genre || !rating || !review) {
        alert('Lütfen zorunlu alanları doldurun!');
        return;
    }
    
    const book = {
        id: Date.now(),
        title, author, genre,
        rating: parseInt(rating),
        review,
        date: new Date().toLocaleDateString('tr-TR'),
        image: `https://picsum.photos/seed/${title.replace(/\s+/g, '-')}-${author.replace(/\s+/g, '-')}-book-cover-literature/220/320`
    };
    
    books.unshift(book);
    saveBooks();
    renderFeaturedBooks();
    renderLibrary();
    renderReviews();
    
    document.getElementById('bookForm').reset();
    showPage('reviews');
}

function deleteBook(id) {
    if (confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
        books = books.filter(book => book.id !== id);
        saveBooks();
        renderFeaturedBooks();
        renderLibrary();
        renderReviews();
    }
}

function showPage(pageName) {
    const pages = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.main-header nav a');
    
    pages.forEach(page => page.style.display = 'none');
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (pageName === 'home') {
        document.querySelector('.featured-books-section').style.display = 'block';
        document.querySelector('.hero-section').style.display = 'block';
    } else {
        document.querySelector('.featured-books-section').style.display = 'none';
        document.querySelector('.hero-section').style.display = 'none';
        document.getElementById(pageName + '-page').style.display = 'block';
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function renderFeaturedBooks() {
    const container = document.getElementById('featuredBooksGrid');
    const featuredBooks = books.slice(0, 6); // Sadece son 6 kitabı göster
    
    if (featuredBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>Henüz kitap eklenmemiş</h3>
                <p>İlk kitabınızı ekleyerek başlayın!</p>
                <button class="cta-button" onclick="showPage('add')">
                    <i class="fas fa-plus"></i> İlk Kitabı Ekle
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = featuredBooks.map(book => `
        <div class="featured-book-card" onclick="showBookDetails(${book.id})">
            <img src="${book.image}" alt="${book.title}" onerror="this.src='https://picsum.photos/seed/default${book.id}/220/320'">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="rating">${getStars(book.rating)}</div>
            </div>
        </div>
    `).join('');
}

function renderLibrary() {
    const container = document.getElementById('libraryContainer');
    const filteredBooks = currentFilter === 'all' 
        ? books.slice(0, 6) // Sadece son 6 kitabı göster
        : books.filter(book => book.genre === currentFilter).slice(0, 6); // Sadece son 6 kitabı göster
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Bu türde kitap bulunamadı</h3>
                <p>Yeni kitap ekleyerek kütüphanenizi genişletin!</p>
                <button class="cta-button" onclick="showPage('add')">
                    <i class="fas fa-plus"></i> Kitap Ekle
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredBooks.map(book => `
        <div class="book-item" onclick="showBookDetails(${book.id})">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <span class="genre">${getGenreName(book.genre)}</span>
            <div class="rating">${getStars(book.rating)}</div>
        </div>
    `).join('');
}

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    const sortedBooks = [...books].sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedBooks = sortedBooks.slice(0, 6); // Sadece son 6 incelemeyi göster
    
    if (limitedBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-star"></i>
                <h3>Henüz inceleme yapılmamış</h3>
                <p>Kitap ekleyerek ve puanlayarak topluluğa katkıda bulunun!</p>
                <button class="cta-button" onclick="showPage('add')">
                    <i class="fas fa-plus"></i> İlk İncelemeyi Yap
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = limitedBooks.map(book => `
        <div class="review-card">
            <h3 onclick="showBookDetails(${book.id})">${book.title}</h3>
            <p class="author">${book.author}</p>
            <div class="rating">${getStars(book.rating)}</div>
            <p class="review">${book.review || 'İnceleme yazılmamış.'}</p>
            <p class="date">${book.date}</p>
            <button class="delete-btn" onclick="deleteBook(${book.id})">Sil</button>
        </div>
    `).join('');
}

function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('libraryContainer');
    
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                            book.author.toLowerCase().includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || book.genre === currentFilter;
        return matchesSearch && matchesFilter;
    });
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Arama sonucu bulunamadı</h3>
                <p>"${document.getElementById('searchInput').value}" için sonuç yok</p>
                <button class="cta-button" onclick="showPage('add')">
                    <i class="fas fa-plus"></i> Yeni Kitap Ekle
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredBooks.map(book => `
        <div class="book-item" onclick="showBookDetails(${book.id})">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <span class="genre">${getGenreName(book.genre)}</span>
            <div class="rating">${getStars(book.rating)}</div>
        </div>
    `).join('');
}

function searchBooksHero() {
    const searchTerm = document.getElementById('searchInputHero').value.toLowerCase();
    const container = document.getElementById('featuredBooksGrid');
    
    if (searchTerm.trim() === '') {
        renderFeaturedBooks();
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Arama sonucu bulunamadı</h3>
                <p>"${searchTerm}" için sonuç yok</p>
                <button class="cta-button" onclick="showPage('add')">
                    <i class="fas fa-plus"></i> İlk Kitabı Ekle
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredBooks.map(book => `
        <div class="featured-book-card" onclick="showBookDetails(${book.id})">
            <img src="${book.image}" alt="${book.title}" onerror="this.src='https://picsum.photos/seed/default${book.id}/220/320'">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="rating">${getStars(book.rating)}</div>
            </div>
        </div>
    `).join('');
}

let currentFilter = 'all';

function filterBooks(genre) {
    currentFilter = genre;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderLibrary();
}

function sortReviews() {
    const sortType = document.getElementById('sortReviews').value;
    let sortedBooks = [...books];
    
    if (sortType === 'highest') {
        sortedBooks.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'lowest') {
        sortedBooks.sort((a, b) => a.rating - b.rating);
    } else {
        sortedBooks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = sortedBooks.map(book => `
        <div class="review-card">
            <h3 onclick="showBookDetails(${book.id})">${book.title}</h3>
            <p class="author">${book.author}</p>
            <div class="rating">${getStars(book.rating)}</div>
            <p class="review">${book.review || 'İnceleme yazılmamış.'}</p>
            <p class="date">${book.date}</p>
            <button class="delete-btn" onclick="deleteBook(${book.id})">Sil</button>
        </div>
    `).join('');
}

function showBookDetails(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    const modal = document.getElementById('bookModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-book-header">
            <h2>${book.title}</h2>
            <p class="author">${book.author}</p>
        </div>
        ${book.image ? `<img src="${book.image}" alt="${book.title}" style="width: 150px; height: 210px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">` : ''}
        <div class="modal-book-info">
            <div class="info-item"><strong>Tür</strong>${getGenreName(book.genre)}</div>
            <div class="info-item"><strong>Puan</strong>${getStars(book.rating)}</div>
        </div>
        ${book.review ? `
            <div class="modal-review">
                <h3>İnceleme</h3>
                <p class="review-text">${book.review}</p>
                <p style="color: #888; font-size: 0.9rem; margin-top: 10px;">Eklenme: ${book.date}</p>
            </div>
        ` : ''}
        <div style="margin-top: 20px; text-align: center;">
            <button class="delete-btn" onclick="deleteBook(${book.id}); closeModal();">Kitabı Sil</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
}

function goHome() {
    // Tüm sayfaları gizle
    document.querySelectorAll('.page-section').forEach(page => {
        page.style.display = 'none';
    });
    
    // Ana sayfa elemanlarını göster
    document.querySelector('.hero-section').style.display = 'block';
    document.querySelector('.featured-books-section').style.display = 'block';
    
    // Navigasyon aktif durumunu güncelle
    document.querySelectorAll('.main-header nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.main-header nav a[href="#"]').classList.add('active');
    
    // Sayfayı yenileme efekti - kısa bir fade out/in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        renderFeaturedBooks(); // Ana sayfa içeriğini yenile
    }, 100);
}

function getGenreName(genre) {
    const genres = {'roman': 'Roman', 'bilim': 'Bilim', 'tarih': 'Tarih', 'felsefe': 'Felsefe', 'siyaset': 'Siyaset'};
    return genres[genre] || genre;
}

function getStars(rating) {
    const stars = '⭐'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return stars + emptyStars + ` (${rating}/5)`;
}
