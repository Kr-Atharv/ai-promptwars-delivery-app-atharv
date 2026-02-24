const foods = [
    { name: "Cheese Burger", price: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
    { name: "Pepperoni Pizza", price: 299, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
    { name: "Chicken Biryani", price: 249, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
    { name: "French Fries", price: 99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop" },
    { name: "Chocolate Cake", price: 179, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
    { name: "Sandwich", price: 129, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop" },
    { name: "Tacos", price: 189, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop" },
    { name: "Ice Cream", price: 89, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop" },
    { name: "Momos", price: 119, image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=300&fit=crop" },
    { name: "Sushi", price: 349, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
    { name: "Pancakes", price: 159, image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop" }
];

// Initialize UI
function init() {
    displayFoods();
    updateNavBadge();
}

// Display Food Cards
function displayFoods() {
    const container = document.getElementById("foodContainer");
    if (!container) return;

    container.innerHTML = foods.map((food, index) => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}" loading="lazy">
            <div class="content">
                <h3>${food.name}</h3>
                <div class="price">₹${food.price}</div>
                <button onclick="orderFood(event, ${index})">Add to Order</button>
            </div>
        </div>
    `).join('');
}

// Order Logic
function orderFood(event, index) {
    // 1. Get current data from Storage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // 2. Add item
    orders.push(foods[index]);
    
    // 3. Save back to Storage
    localStorage.setItem("orders", JSON.stringify(orders));
    
    // 4. Update Navigation Badge
    updateNavBadge();

    // 5. Attentive Button Feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added! ✨";
    btn.style.background = "#00d2ff";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
    }, 1000);
}

// Update Nav Badge Count
function updateNavBadge() {
    const badge = document.getElementById("orderBadge");
    if (!badge) return;
    
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    badge.innerText = orders.length;

    // Trigger a small "pop" animation
    badge.style.transform = "scale(1.4)";
    setTimeout(() => badge.style.transform = "scale(1)", 200);
}

// Run the script
document.addEventListener("DOMContentLoaded", init);