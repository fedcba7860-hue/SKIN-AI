// ============================================================
// SKIN DECODE - COMPLETE SCRIPT.JS
// ============================================================


// ============================================================
// PRODUCT DATABASE
// ============================================================

const BRANDS = [
  ["Korean","COSRX","Low pH Good Morning Gel Cleanser","Cleanser","acne oily blackhead","Gentle gel cleanser with tea tree oil and BHA."],
  ["Korean","COSRX","BHA Blackhead Power Liquid","Treatment","blackhead acne oily","Leave-on exfoliant with betaine salicylate for clogged pores."],
  ["Korean","COSRX","Advanced Snail 96 Mucin Power Essence","Essence","dry redness dull","Lightweight hydrating essence that leaves skin bouncy."],

  ["Korean","Beauty of Joseon","Relief Sun: Rice + Probiotics SPF50+","Sunscreen","pigment dull aging dry redness","Comfortable, non-greasy daily sunscreen."],
  ["Korean","Beauty of Joseon","Glow Serum: Propolis + Niacinamide","Serum","acne oily dull","Soothing and tone-evening, good for breakout-prone skin."],
  ["Korean","Beauty of Joseon","Revive Serum: Ginseng + Snail Mucin","Serum","aging dry","Hydrating serum for a firmer, smoother look."],

  ["Korean","Anua","Heartleaf 77% Soothing Toner","Toner","redness acne","Calming toner for irritated or reactive skin."],
  ["Korean","Skin1004","Madagascar Centella Ampoule","Serum","redness acne dry","Centella ampoule that soothes and supports the barrier."],
  ["Korean","Laneige","Water Bank Blue Hyaluronic Cream","Moisturiser","dry","Hyaluronic acid cream for dehydrated skin."],
  ["Korean","Isntree","Hyaluronic Acid Toner","Toner","dry dull","Light layered hydration, suits sensitive skin."],
  ["Korean","Some By Mi","AHA BHA PHA 30 Days Miracle Toner","Toner","blackhead acne dull","Mild exfoliating toner, use a few nights a week."],
  ["Korean","Round Lab","1025 Dokdo Toner","Toner","dry redness dull","Simple, gentle toner with mineral-rich water."],

  ["Indian","Minimalist","10% Niacinamide Serum","Serum","oily acne pigment blackhead","Targets oil, pores and uneven tone."],
  ["Indian","Minimalist","2% Salicylic Acid Serum","Serum","acne blackhead oily","Unclogs pores. Start a few nights a week."],
  ["Indian","Minimalist","10% Vitamin C Face Serum","Serum","pigment dull","Morning antioxidant for dark spots and dullness."],
  ["Indian","Minimalist","0.3% Retinol Serum","Serum","aging acne","Beginner-friendly retinol, night use only."],
  ["Indian","Minimalist","Light Fluid SPF 50 Sunscreen","Sunscreen","oily acne pigment","Light texture for oily skin."],

  ["Indian","The Derma Co","2% Salicylic Acid Face Wash","Cleanser","acne blackhead oily","Daily cleanser for breakouts and clogged pores."],
  ["Indian","The Derma Co","1% Hyaluronic Sunscreen Aqua Gel SPF 50","Sunscreen","dry dull oily","Hydrating gel sunscreen."],
  ["Indian","Dot & Key","Vitamin C + E Super Bright Moisturizer","Moisturiser","pigment dull","Brightening moisturiser for everyday glow."],
  ["Indian","Plum","Green Tea Pore Cleansing Face Wash","Cleanser","oily acne","Mild face wash for oily, acne-prone skin."],
  ["Indian","Re'equil","Ceramide & Hyaluronic Acid Moisturizing Cream","Moisturiser","dry redness","Barrier-support cream for dry or sensitive skin."],
  ["Indian","Dr. Sheth's","Ceramide & Vitamin C Oil-Free Moisturizer","Moisturiser","oily pigment","Oil-free hydration with brightening."],
  ["Indian","Aqualogica","Glow+ Dewy Sunscreen SPF 50","Sunscreen","dull dry","Dewy-finish sunscreen for normal to dry skin."]
].map(([origin, brand, name, type, concerns, note]) => ({
  origin,
  brand,
  name,
  type,
  c: concerns.split(" "),
  note
}));


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ============================================================
// CREATE SAFE ID
// ============================================================

function slug(product) {

  return (
    product.brand + "-" + product.name
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

}


// ============================================================
// PRODUCT ILLUSTRATION
// ============================================================

function productThumb(product) {

  const type = product.type || "Product";

  const labels = {

    Cleanser: "CLEANSER",
    Toner: "TONER",
    Serum: "SERUM",
    Essence: "ESSENCE",
    Moisturiser: "MOISTURISER",
    Sunscreen: "SPF 50",
    Treatment: "TREATMENT"

  };

  const label = labels[type] || "SKIN CARE";

  const id = slug(product);

  return `

    <div class="product-art product-illustration">

      <svg
        class="product-svg"
        viewBox="0 0 260 260"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="${escapeHtml(product.brand)} ${escapeHtml(product.name)}"
      >

        <defs>

          <linearGradient
            id="gradient-${id}"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >

            <stop
              offset="0%"
              stop-color="#ffffff"
            />

            <stop
              offset="100%"
              stop-color="#f2d5df"
            />

          </linearGradient>

        </defs>


        <!-- Background circle -->

        <circle
          cx="130"
          cy="130"
          r="112"
          fill="#fbf1f4"
        />


        <!-- Product shadow -->

        <ellipse
          cx="130"
          cy="221"
          rx="72"
          ry="11"
          fill="#dec4cc"
        />


        <!-- Main bottle -->

        <rect
          x="83"
          y="70"
          width="94"
          height="145"
          rx="19"
          fill="url(#gradient-${id})"
          stroke="#7d2945"
          stroke-width="3"
        />


        <!-- Bottle cap -->

        <rect
          x="99"
          y="47"
          width="62"
          height="28"
          rx="7"
          fill="#ffffff"
          stroke="#7d2945"
          stroke-width="3"
        />


        <!-- Pump -->

        <rect
          x="119"
          y="29"
          width="22"
          height="22"
          rx="5"
          fill="#7d2945"
        />


        <!-- Product label -->

        <rect
          x="98"
          y="105"
          width="64"
          height="65"
          rx="8"
          fill="#ffffff"
        />


        <!-- Brand name -->

        <text
          x="130"
          y="127"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="10"
          font-weight="700"
          fill="#7d2945"
        >
          ${escapeHtml(product.brand)}
        </text>


        <!-- Product type -->

        <text
          x="130"
          y="147"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="9"
          font-weight="600"
          fill="#7d2945"
        >
          ${escapeHtml(label)}
        </text>


        <!-- Decorative line -->

        <line
          x1="112"
          y1="156"
          x2="148"
          y2="156"
          stroke="#c98ca0"
          stroke-width="2"
        />

      </svg>

    </div>

  `;

}


// ============================================================
// PRODUCT CARD
// ============================================================

function createProductCard(product) {

  return `

    <article class="bcard">

      <div class="bart">

        ${productThumb(product)}

      </div>


      <div class="bbody">

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


// ============================================================
// FILTER PRODUCTS
// ============================================================

function getFilteredProducts() {

  const searchInput =
    document.querySelector("#brandSearch");

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

    const searchableText = [

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
      search === "" ||
      searchableText.includes(search);


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


// ============================================================
// RENDER BRANDS
// ============================================================

function renderBrands() {

  const grid =
    document.querySelector("#brandGrid");


  if (!grid) {
    return;
  }


  const products =
    getFilteredProducts();


  if (products.length === 0) {

    grid.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:60px 20px;
        "
      >

        <h3>No products found</h3>

        <p>
          Try another search or filter.
        </p>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    products
      .map(createProductCard)
      .join("");

}


// ============================================================
// TYPE CHIPS
// ============================================================

function renderTypeChips() {

  const container =
    document.querySelector("#typeChips");


  if (!container) {
    return;
  }


  const types = [
    "All",
    "Cleanser",
    "Toner",
    "Serum",
    "Essence",
    "Moisturiser",
    "Sunscreen",
    "Treatment"
  ];


  container.innerHTML =
    types.map(type => `

      <button
        type="button"
        class="type-chip"
        data-type="${type}"
      >
        ${type}
      </button>

    `).join("");


  const buttons =
    container.querySelectorAll(".type-chip");


  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn =>
        btn.classList.remove("active")
      );


      button.classList.add("active");


      const selected =
        button.dataset.type;


      const grid =
        document.querySelector("#brandGrid");


      if (!grid) {
        return;
      }


      let products =
        getFilteredProducts();


      if (selected !== "All") {

        products =
          products.filter(
            product =>
              product.type === selected
          );

      }


      grid.innerHTML =
        products.length
          ? products.map(createProductCard).join("")
          : `

            <div
              style="
                grid-column:1/-1;
                text-align:center;
                padding:60px 20px;
              "
            >

              <h3>No products found</h3>

              <p>
                Try another product type.
              </p>

            </div>

          `;

    });

  });


  const allButton =
    container.querySelector(
      '[data-type="All"]'
    );


  if (allButton) {
    allButton.classList.add("active");
  }

}


// ============================================================
// SEARCH
// ============================================================

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


// ============================================================
// NAV USER
// ============================================================

async function loadNavUser() {

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


    if (data && data.user) {

      navName.textContent =
        data.user.name || "";

    }

  } catch (error) {

    console.log(
      "Could not load user:",
      error
    );

  }

}


// ============================================================
// LOGOUT
// ============================================================

async function logout() {

  try {

    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });

  } catch (error) {

    console.log(error);

  }


  window.location.href =
    "index.html";

}


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderBrands();

    renderTypeChips();

    loadNavUser();


    const searchInput =
      document.querySelector("#brandSearch");


    if (searchInput) {

      searchInput.addEventListener(
        "input",
        () => {

          renderBrands();

          const chips =
            document.querySelectorAll(
              ".type-chip"
            );


          chips.forEach(chip =>
            chip.classList.remove("active")
          );


          const all =
            document.querySelector(
              '[data-type="All"]'
            );


          if (all) {
            all.classList.add("active");
          }

        }
      );

    }


    const originSelect =
      document.querySelector("#brandOrigin");


    if (originSelect) {

      originSelect.addEventListener(
        "change",
        () => {

          renderBrands();

          const chips =
            document.querySelectorAll(
              ".type-chip"
            );


          chips.forEach(chip =>
            chip.classList.remove("active")
          );


          const all =
            document.querySelector(
              '[data-type="All"]'
            );


          if (all) {
            all.classList.add("active");
          }

        }
      );

    }


    const concernSelect =
      document.querySelector("#brandConcern");


    if (concernSelect) {

      concernSelect.addEventListener(
        "change",
        () => {

          renderBrands();

          const chips =
            document.querySelectorAll(
              ".type-chip"
            );


          chips.forEach(chip =>
            chip.classList.remove("active")
          );


          const all =
            document.querySelector(
              '[data-type="All"]'
            );


          if (all) {
            all.classList.add("active");
          }

        }
      );

    }

  }
);


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.BRANDS =
  BRANDS;

window.productThumb =
  productThumb;

window.renderBrands =
  renderBrands;

window.searchProducts =
  searchProducts;

window.logout =
  logout;
