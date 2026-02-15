// BookSwap Application JavaScript

// Sample Data
const sampleBooks = [
    {
        "id": 1,
        "title": "Physics book class 12",
        "author": "Hamal Bahadur Rayemajhi",
        "price": 300,
        "condition": "good",
        "conditionLabel": "Good",
        "category": "fiction",
        "image": "phy.jpg",
        "description": "Classic novel in good condition with minor shelf wear.",
        "seller": "BookLover42",
        "rating": 4.8,
        "listedDate": "2024-01-15"
    },
    {
        "id": 2,
        "title": "Introduction to Algorithms",
        "author": "Thomas H. Cormen",
        "price": 500,
        "condition": "fair",
        "conditionLabel": "Fair",
        "category": "textbook",
        "image": "https://picsum.photos/300/400?random=3",
        "description": "Computer science textbook with some highlighting.",
        "seller": "CSStudent",
        "rating": 4.5,
        "listedDate": "2024-01-10"
    },
    {
        "id": 3,
        "title": "Becoming",
        "author": "Michelle Obama",
        "price": 800,
        "condition": "new",
        "conditionLabel": "Like New",
        "category": "biography",
        "image": "https://picsum.photos/300/400?random=4",
        "description": "Hardcover edition, read once, perfect condition.",
        "seller": "MemoirReader",
        "rating": 4.9,
        "listedDate": "2024-01-18"
    },
    {
        "id": 4,
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "price": 789,
        "condition": "good",
        "conditionLabel": "Good",
        "category": "fantasy",
        "image": "https://picsum.photos/300/400?random=5",
        "description": "First edition, well-loved but intact.",
        "seller": "PotterFan",
        "rating": 4.7,
        "listedDate": "2024-01-12"
    },
    {
        "id": 5,
        "title": "Sapiens: A Brief History of Humankind",
        "author": "Yuval Noah Harari",
        "price": 625,
        "condition": "good",
        "conditionLabel": "Good",
        "category": "non-fiction",
        "image": "https://picsum.photos/300/400?random=6",
        "description": "Paperback with minimal wear, no markings.",
        "seller": "HistoryBuff",
        "rating": 4.6,
        "listedDate": "2024-01-14"
    },
    {
        "id": 6,
        "title": "The Very Hungry Caterpillar",
        "author": "Eric Carle",
        "price": 569,
        "condition": "fair",
        "conditionLabel": "Fair",
        "category": "children",
        "image": "https://picsum.photos/300/400?random=7",
        "description": "Children's classic with some page wear.",
        "seller": "ParentReader",
        "rating": 4.4,
        "listedDate": "2024-01-16"
    },
    {
        "id": 7,
        "title": "Dune",
        "author": "Frank Herbert",
        "price": 450,
        "condition": "good",
        "conditionLabel": "Good",
        "category": "science-fiction",
        "image": "https://picsum.photos/300/400?random=8",
        "description": "Science fiction masterpiece in good condition.",
        "seller": "SciFiFan",
        "rating": 4.8,
        "listedDate": "2024-01-11"
    },
    {
        "id": 8,
        "title": "Educated",
        "author": "Tara Westover",
        "price": 699,
        "condition": "new",
        "conditionLabel": "Like New",
        "category": "memoir",
        "image": "https://picsum.photos/300/400?random=9",
        "description": "Bestselling memoir, pristine condition.",
        "seller": "BookClubHost",
        "rating": 4.9,
        "listedDate": "2024-01-17"
    }
];

const myBooks = [
    {
        "id": 101,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 199,
        "condition": "good",
        "conditionLabel": "Good",
        "category": "fiction",
        "status": "active",
        "views": 42,
        "listedDate": "2024-01-05"
    },
    {
        "id": 102,
        "title": "Calculus: Early Transcendentals",
        "author": "James Stewart",
        "price": 380,
        "condition": "fair",
        "conditionLabel": "Fair",
        "category": "textbook",
        "status": "sold",
        "views": 28,
        "listedDate": "2023-12-20"
    }
];

// State Management
let currentSection = "home";
let displayedBooks = 4;

// Initialize Application
document.addEventListener("DOMContentLoaded", function() {
    renderBooks();
    renderMyBooks();
    setupEventListeners();
    showSection("home");
});

// Setup Event Listeners
function setupEventListeners() {
    // Book image upload preview
    const bookImageInput = document.getElementById("bookImage");
    const imagePreview = document.getElementById("imagePreview");
    
    if (bookImageInput) {
        bookImageInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Book preview" class="w-full h-48 object-cover rounded-lg">
                        <p class="text-sm text-gray-600 mt-2">${file.name}</p>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Book upload form submission
    const bookUploadForm = document.getElementById("bookUploadForm");
    if (bookUploadForm) {
        bookUploadForm.addEventListener("submit", handleFormSubmit);
    }

    // Modal close on outside click
    const successModal = document.getElementById("successModal");
    if (successModal) {
        successModal.addEventListener("click", function(e) {
            if (e.target === this) {
                hideModal();
            }
        });
    }
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const imagePreview = document.getElementById("imagePreview");
    
    // Get form data
    const formData = {
        title: form.querySelector("input[type='text']").value,
        author: form.querySelectorAll("input[type='text']")[1].value,
        isbn: form.querySelectorAll("input[type='text'")[2]?.value || "",
        category: form.querySelector("select").value,
        condition: form.querySelector("input[name='condition']:checked").value,
        price: parseFloat(form.querySelector("input[type='number']").value),
        description: form.querySelector("textarea").value
    };

    // Add to my books
    const newBook = {
        id: Date.now(),
        title: formData.title,
        author: formData.author,
        price: formData.price,
        condition: formData.condition,
        conditionLabel: getConditionLabel(formData.condition),
        category: formData.category,
        status: "active",
        views: 0,
        listedDate: new Date().toISOString().split("T")[0]
    };
    
    myBooks.unshift(newBook);
    renderMyBooks();
    
    // Reset form
    form.reset();
    if (imagePreview) {
        imagePreview.innerHTML = `
            <i class="fas fa-book text-5xl text-gray-400 mb-4"></i>
            <p class="text-gray-600">No image selected</p>
        `;
    }
    
    // Show success modal
    showModal();
}

// Render Books Grid
function renderBooks() {
    const booksGrid = document.getElementById("booksGrid");
    if (!booksGrid) return;
    
    booksGrid.innerHTML = "";
    
    const booksToShow = sampleBooks.slice(0, displayedBooks);
    
    booksToShow.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

// Create Book Card Element
function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg";
    
    card.innerHTML = `
        <div class="relative">
            <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover" loading="lazy">
            <div class="absolute top-2 right-2">
                <span class="condition-badge condition-${book.condition}">${book.conditionLabel}</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-bold text-lg text-gray-900 mb-1 truncate">${book.title}</h3>
            <p class="text-gray-600 text-sm mb-2">by ${book.author}</p>
            <div class="flex items-center justify-between mb-3">
                <div class="text-2xl font-bold text-primary-700">Rs. ${book.price.toFixed(2)}</div>
                <div class="flex items-center">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span class="text-gray-700">${book.rating}</span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${book.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Seller: ${book.seller}</span>
                <button onclick="showBookDetails(${book.id})" class="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                    <i class="fas fa-shopping-cart mr-1"></i> Buy Now
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render My Books Table
function renderMyBooks() {
    const myBooksTable = document.getElementById("myBooksTable");
    const noBooksMessage = document.getElementById("noBooksMessage");
    
    if (!myBooksTable || !noBooksMessage) return;
    
    if (myBooks.length === 0) {
        myBooksTable.innerHTML = "";
        noBooksMessage.classList.remove("hidden");
        return;
    }
    
    noBooksMessage.classList.add("hidden");
    myBooksTable.innerHTML = "";
    
    myBooks.forEach(book => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            <i class="fas fa-book text-gray-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${book.title}</div>
                        <div class="text-sm text-gray-500">${book.author}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="condition-badge condition-${book.condition}">${book.conditionLabel}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">Rs. ${book.price.toFixed(2)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs rounded-full ${book.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                    ${book.status === 'active' ? 'Active' : 'Sold'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editBook(${book.id})" class="text-primary-600 hover:text-primary-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteBook(${book.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        myBooksTable.appendChild(row);
    });
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll("main > section").forEach(section => {
        section.classList.add("hidden");
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }
    currentSection = sectionId;
    
    // Update active navigation
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("text-primary-600");
        link.classList.add("text-gray-700");
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Load More Books
function loadMoreBooks() {
    displayedBooks = Math.min(displayedBooks + 4, sampleBooks.length);
    renderBooks();
    
    const loadMoreBtn = document.querySelector("#browse button");
    if (displayedBooks >= sampleBooks.length && loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = "All Books Loaded";
        loadMoreBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
}

// Show Book Details
function showBookDetails(bookId) {
    const book = sampleBooks.find(b => b.id === bookId);
    if (!book) return;
    
    alert(`Book Details:\n\nTitle: ${book.title}\nAuthor: ${book.author}\nPrice: Rs. ${book.price.toFixed(2)}\nCondition: ${book.conditionLabel}\n\nDescription: ${book.description}\n\nSeller: ${book.seller} (Rating: ${book.rating}/5)`);
}

// Edit Book
function editBook(bookId) {
    const book = myBooks.find(b => b.id === bookId);
    if (!book) return;
    
    alert(`Edit book: ${book.title}\n\nThis would open an edit form in a real application.`);
}

// Delete Book
function deleteBook(bookId) {
    if (confirm("Are you sure you want to remove this book listing?")) {
        const index = myBooks.findIndex(b => b.id === bookId);
        if (index !== -1) {
            myBooks.splice(index, 1);
            renderMyBooks();
        }
    }
}

// Modal Functions
function showModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function hideModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.add("hidden");
    }
    showSection("browse");
}

// Helper Functions
function getConditionLabel(condition) {
    const labels = {
        "new": "Like New",
        "good": "Good",
        "fair": "Fair",
        "poor": "Poor"
    };
    return labels[condition] || condition;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleBooks,
        myBooks,
        getConditionLabel,
        createBookCard
    };
}