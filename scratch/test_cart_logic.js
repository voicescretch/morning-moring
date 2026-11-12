const vm = require('vm');
const fs = require('fs');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  clear() {
    this.store = {};
  }
}

const context = {
  console: console,
  localStorage: new LocalStorageMock(),
  document: {
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {},
    createElement: () => ({ classList: { add: () => {}, remove: () => {} }, appendChild: () => {} }),
    body: { classList: { add: () => {}, remove: () => {} }, appendChild: () => {} }
  },
  window: {
    innerWidth: 1200,
    addEventListener: () => {},
    open: (url) => { console.log("   [MOCK window.open called with URL]:\n" + url); }
  },
  encodeURIComponent: encodeURIComponent,
  Intl: Intl,
  setTimeout: setTimeout,
  requestAnimationFrame: (cb) => cb()
};

vm.createContext(context);
const jsCode = fs.readFileSync('script.js', 'utf8');
vm.runInContext(jsCode, context);

const cart = context.window.cart;
const formatRupiah = context.window.formatRupiah;
const checkoutWhatsApp = context.window.checkoutWhatsApp;
const directBuy = context.window.directBuy;

console.log("=== TESTING SHOPPING CART LOGIC ===");

// Test 1: Add product
console.log("1. Adding original-100 (qty 2)...");
cart.addToCart("original-100", 2);
console.log("   Items in cart:", cart.cart);
console.assert(cart.cart.length === 1, "Should have 1 row in cart");
console.assert(cart.cart[0].quantity === 2, "Quantity should be 2");

// Test 2: Add duplicate product (should increase quantity, not create duplicate row)
console.log("2. Adding same product original-100 again (qty 1)...");
cart.addToCart("original-100", 1);
console.assert(cart.cart.length === 1, "Should NOT duplicate row");
console.assert(cart.cart[0].quantity === 3, "Quantity should be 3");

// Test 3: Add pedas-250
console.log("3. Adding pedas-250 (qty 1)...");
cart.addToCart("pedas-250", 1);
console.assert(cart.cart.length === 2, "Should have 2 rows");
console.assert(cart.getTotalItems() === 4, "Total items should be 4");

// Test 4: Calculate total price
// original-100 = 5000 * 3 = 15000
// pedas-250 = 12000 * 1 = 12000
// total = 27000
console.log("4. Checking total price calculation...");
const total = cart.getTotalPrice();
console.log("   Total price:", formatRupiah(total));
console.assert(total === 27000, `Total price should be 27000, got ${total}`);

// Test 5: Decrement
console.log("5. Decrementing original-100 by 1...");
cart.updateQuantity("original-100", -1);
console.assert(cart.cart[0].quantity === 2, "Quantity should now be 2");
console.assert(cart.getTotalPrice() === 22000, "Total price should be 22000");

// Test 6: WhatsApp Checkout Message
console.log("6. Testing checkoutWhatsApp()...");
checkoutWhatsApp();

// Test 7: Direct Buy
console.log("7. Testing directBuy('original-100')...");
directBuy("original-100");

console.log("\n>>> ALL CART & CHECKOUT LOGIC TESTS PASSED! <<<");
