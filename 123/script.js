// ============================================
// SKIN DECODE - MAIN SCRIPT
// ============================================

// ============================================
// PRODUCT DATA
// ============================================

const BRANDS = [
  ["Korean","COSRX","Low pH Good Morning Gel Cleanser","Cleanser","acne oily blackhead","Gentle gel cleanser with tea tree oil and BHA.","images/cosrx-cleanser.jpg"],

  ["Korean","COSRX","BHA Blackhead Power Liquid","Treatment","blackhead acne oily","Leave-on exfoliant with betaine salicylate.","images/cosrx-bha.jpg"],

  ["Korean","COSRX","Advanced Snail 96 Mucin Power Essence","Essence","dry redness dull","Lightweight hydrating essence.","images/cosrx-snail.jpg"],

  ["Korean","Beauty of Joseon","Relief Sun: Rice + Probiotics SPF50+","Sunscreen","pigment dull aging dry redness","Comfortable daily sunscreen.","images/boj-sunscreen.jpg"],

  ["Korean","Beauty of Joseon","Glow Serum: Propolis + Niacinamide","Serum","acne oily dull","Soothing serum for uneven-looking skin.","images/boj-glow.jpg"],

  ["Korean","Beauty of Joseon","Revive Serum: Ginseng + Snail Mucin","Serum","aging dry","Hydrating serum for a smoother look.",""],

  ["Korean","Anua","Heartleaf 77% Soothing Toner","Toner","redness acne","Calming toner for reactive skin.","images/anua-toner.jpg"],

  ["Korean","Skin1004","Madagascar Centella Ampoule","Serum","redness acne dry","Centella ampoule for soothing hydration.","images/skin1004-ampoule.jpg"],

  ["Korean","Laneige","Water Bank Blue Hyaluronic Cream","Moisturiser","dry","Hyaluronic acid cream for dehydrated skin.",""],

  ["Korean","Isntree","Hyaluronic Acid Toner","Toner","dry dull","Light layered hydration for sensitive skin.",""],

  ["Korean","Some By Mi","AHA BHA PHA 30 Days Miracle Toner","Toner","blackhead acne dull","Mild exfoliating toner.",""],

  ["Korean","Round Lab","1025 Dokdo Toner","Toner","dry redness dull","Simple, gentle toner.",""],

  ["Indian","Minimalist","10% Niacinamide Serum","Serum","oily acne pigment blackhead","Targets oil, pores and uneven tone.",""],

  ["Indian","Minimalist","2% Salicylic Acid Serum","Serum","acne blackhead oily","Helps unclog pores.",""],

  ["Indian","Minimalist","10% Vitamin C Face Serum","Serum","pigment dull","Morning antioxidant for dull-looking skin.",""],

  ["Indian","Minimalist","0.3% Retinol Serum","Serum","aging acne","Beginner-friendly retinol serum.",""],

  ["Indian","Minimalist","Light Fluid SPF 50 Sunscreen","Sunscreen","oily acne pigment","Light sunscreen texture.",""],

  ["Indian","The Derma Co","2% Salicylic Acid Face Wash","Cleanser","acne blackhead oily","Face wash for breakout-prone skin.",""],

  ["Indian","The Derma Co","1% Hyaluronic Sunscreen Aqua Gel SPF 50","Sunscreen","dry dull oily","Hydrating gel sunscreen.",""],

  ["Indian","Dot & Key","Vitamin C + E Super Bright Moisturizer","Moisturiser","pigment dull","Brightening moisturiser.",""],

  ["Indian","Plum","Green Tea Pore Cleansing Face Wash","Cleanser","oily acne","Mild cleanser for oily skin.",""],

  ["Indian","Re'equil","Ceramide & Hyaluronic Acid Moisturizing Cream","Moisturiser","dry redness","Barrier-support moisturiser.",""],

  ["Indian","Dr. Sheth's","Ceramide & Vitamin C Oil-Free Moisturizer","Moisturiser","oily pigment","Oil-free hydration.",""],

  ["Indian","Aqualogica","Glow+ Dewy Sunscreen SPF 50","Sunscreen","dull dry","Dewy-finish sunscreen.",""]

].map(([origin, brand, name, type, concerns, note, image]) => ({
  origin,
  brand,
  name,
  type,
  c: concerns.split(" "),
  note,
  image
}));


// ============================================
// ESCAPE HTML
// ============================================

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ============================================
// PRODUCT IMAGE
// ============================================

function productThumb(product) {

  // If an actual image exists
  if (product.image) {

    return `
      <div class="product-art product-image">

        <img
          src="${product.image}"
          alt="${escapeHtml(product.brand + " " + product.name)}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.querySelector('.image-fallback').style.display='flex';"
        >

        <div class="image-fallback" style="display:none;">
          <div>
            <strong>${escapeHtml(product.brand)}</strong>
            <span>${escapeHtml(product.type)}</span>
          </div>
        </div>

      </div>
    `;

  }


  // Fallback when no image is available
  return `
    <div class="product-art product-placeholder">

      <div class="placeholder-bottle">

        <div class="placeholder-cap"></div>

        <div class="placeholder-body">

          <strong>
            ${escapeHtml(product.brand)}
          </strong>

          <span>
            ${escapeHtml(product.type)}
          </span>

        </div>

      </div>

    </div>
  `;
}


// ============================================
// CREATE BRAND CARD
// ============================================

function createBrandCard(product) {

  return `
    <article class="bcard brand-card">

      <div class="bart brand-image">

        ${productThumb(product)}

      </div>

      <div class="bbody brand-info">

        <div class="eyebrow">
          ${escapeHtml(product.origin)}
        </div>

        <h3>
          ${escapeHtml(product.brand)}
        </h3>

        <h4>
          ${escapeHtml(product.name)}
        </h4>

        <span class="pill">
          ${escapeHtml(product.type)}
        </span>

        <p>
          ${escapeHtml(product.note)}
        </p>

      </div>

    </article>
  `;
}


// ============================================
// FILTER PRODUCTS
// ============================================

function filterProducts() {

  const searchInput =
    document.querySelector("#brandSearch") ||
    document.querySelector("#searchInput");

  const originSelect =
    document.querySelector("#brandOrigin");

  const concernSelect =
    document.querySelector("#brandConcern");

  const search =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

  const origin =
    originSelect
      ? originSelect.value
      : "All";

  const concern =
    concernSelect
      ? concernSelect.value
      : "All";


  return BRANDS.filter(product => {

    const searchText = [
      product.origin,
      product.brand,
      product.name,
      product.type,
      product.note,
      ...(product.c || [])
    ]
      .join(" ")
      .toLowerCase();


    const matchesSearch =
      !search ||
      searchText.includes(search);


    const matchesOrigin =
      origin === "All" ||
      product.origin === origin;


    const matchesConcern =
      concern === "All" ||
      product.c.includes(concern);


    return (
      matchesSearch &&
      matchesOrigin &&
      matchesConcern
    );

  });

}


// ============================================
// RENDER BRANDS
// ============================================

function renderBrands() {

  const grid =
    document.querySelector("#brandGrid");

  if (!grid) {
    return;
  }


  const products =
    filterProducts();


  if (!products.length) {

    grid.innerHTML = `
      <div class="empty-result">

        <h2>
          No products found
        </h2>

        <p>
          Try changing your search or filters.
        </p>

      </div>
    `;

    return;
  }


  grid.innerHTML =
    products
      .map(createBrandCard)
      .join("");

}


// ============================================
// SEARCH
// ============================================

function searchProducts(query) {

  const q =
    String(query || "")
      .toLowerCase()
      .trim();


  if (!q) {
    return BRANDS;
  }


  return BRANDS.filter(product => {

    const text = [
      product.origin,
      product.brand,
      product.name,
      product.type,
      product.note,
      ...(product.c || [])
    ]
      .join(" ")
      .toLowerCase();


    return text.includes(q);

  });

}


// ============================================
// USER
// ============================================

async function loadUser() {

  const navName =
    document.querySelector("#navName");

  if (!navName) {
    return;
  }


  try {

    const response =
      await fetch("/api/me", {
        credentials: "include"
      });


    if (!response.ok) {
      return;
    }


    const data =
      await response.json();


    if (data.user) {

      navName.textContent =
        data.user.name || "";

    }

  } catch (error) {

    console.log(
      "User loading skipped"
    );

  }

}


// ============================================
// LOGOUT
// ============================================

async function logout() {

  try {

    await fetch(
      "/api/logout",
      {
        method: "POST",
        credentials: "include"
      }
    );

  } catch (error) {

    console.log(error);

  }


  window.location.href =
    "index.html";

}


// ============================================
// INITIALIZE
// ============================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Render products
    renderBrands();


    // Search
    const searchInput =
      document.querySelector("#brandSearch") ||
      document.querySelector("#searchInput");


    if (searchInput) {

      searchInput.addEventListener(
        "input",
        renderBrands
      );

    }


    // Origin filter
    const originSelect =
      document.querySelector("#brandOrigin");


    if (originSelect) {

      originSelect.addEventListener(
        "change",
        renderBrands
      );

    }


    // Concern filter
    const concernSelect =
      document.querySelector("#brandConcern");


    if (concernSelect) {

      concernSelect.addEventListener(
        "change",
        renderBrands
      );

    }


    // Load logged-in user
    loadUser();

  }
);


// ============================================
// GLOBAL EXPORTS
// ============================================

window.BRANDS = BRANDS;
window.productThumb = productThumb;
window.renderBrands = renderBrands;
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;
window.logout = logout;
