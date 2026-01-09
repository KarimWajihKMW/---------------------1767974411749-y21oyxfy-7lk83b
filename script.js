console.log('Akwadra Super Builder Initialized');

// Product Data
const products = [
    {
        id: 1,
        name: 'سماعات لاسلكية برو',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'إلكترونيات',
        rating: 5
    },
    {
        id: 2,
        name: 'ساعة ذكية رياضية',
        price: 129.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'إلكترونيات',
        rating: 4
    },
    {
        id: 3,
        name: 'حقيبة ظهر عصرية',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'أزياء',
        rating: 5
    },
    {
        id: 4,
        name: 'نظارة شمسية كلاسيك',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'أزياء',
        rating: 4
    },
    {
        id: 5,
        name: 'مصباح مكتب ذكي',
        price: 35.99,
        image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'ديكور',
        rating: 4
    },
    {
        id: 6,
        name: 'كاميرا احترافية',
        price: 899.00,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'إلكترونيات',
        rating: 5
    },
    {
        id: 7,
        name: 'حذاء رياضي مريح',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'أزياء',
        rating: 5
    },
    {
        id: 8,
        name: 'نبتة منزلية طبيعية',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'ديكور',
        rating: 4
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.getElementById('cartCount');

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Preserve original feature logic
    const originalCard = document.querySelector('.card');
    if(originalCard) {
        originalCard.addEventListener('click', () => {
            console.log('تم النقر على البطاقة الأصلية!');
            alert('هذه الميزة من النسخة السابقة لا تزال تعمل!');
        });
    }

    renderProducts();
    updateCartUI();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 product-card fade-in-up" style="animation-delay: ${index * 100}ms">
            <div class="relative product-image-container rounded-xl aspect-[4/3] bg-gray-100 mb-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-xl">
                <button onclick="addToCart(${product.id})" class="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                    <span>★</span> ${product.rating}
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-xs text-indigo-500 font-semibold">${product.category}</p>
                <h3 class="text-lg font-bold text-gray-900 leading-tight">${product.name}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-gray-900">${product.price} د.ك</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Visual Feedback
    openCart();
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update Count Badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalCount;
    
    if (totalCount > 0) {
        cartCountElement.classList.remove('scale-0');
        cartCountElement.classList.add('scale-100');
    } else {
        cartCountElement.classList.remove('scale-100');
        cartCountElement.classList.add('scale-0');
    }

    // Update List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
                <svg class="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <p class="text-lg">سلتك فارغة حالياً</p>
                <button onclick="toggleCart()" class="mt-4 text-indigo-600 font-semibold hover:underline">تابع التسوق</button>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex gap-4">
                <img src="${item.image}" class="w-20 h-20 object-cover rounded-xl bg-gray-100">
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="font-bold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-500">${item.category}</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all text-gray-600">-</button>
                            <span class="font-bold text-sm text-gray-800">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all text-gray-600">+</button>
                        </div>
                        <span class="font-bold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.innerText = total.toFixed(2) + ' د.ك';
}

// Cart Slide Logic
function openCart() {
    cartBackdrop.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        cartBackdrop.classList.remove('opacity-0');
        cartPanel.classList.remove('-translate-x-full');
    }, 10);
}

function closeCartFunc() {
    cartBackdrop.classList.add('opacity-0');
    cartPanel.classList.add('-translate-x-full');
    setTimeout(() => {
        cartBackdrop.classList.add('hidden');
    }, 300);
}

function toggleCart() {
    if (cartPanel.classList.contains('-translate-x-full')) {
        openCart();
    } else {
        closeCartFunc();
    }
}

cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', closeCartFunc);
cartBackdrop.addEventListener('click', closeCartFunc);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-md');
        nav.classList.add('bg-white/90');
        nav.classList.remove('h-20');
        nav.classList.add('h-16');
    } else {
        nav.classList.remove('shadow-md');
        nav.classList.remove('bg-white/90');
        nav.classList.add('h-20');
        nav.classList.remove('h-16');
    }
});
