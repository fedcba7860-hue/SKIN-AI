// ===============================
// SKIN DECODE - MAIN SCRIPT
// ===============================

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
].map(([origin,brand,name,type,c,note]) => ({
  origin,
  brand,
  name,
  type,
  c:c.split(" "),
  note
}));


// ===============================
// PRODUCT IMAGE / ILLUSTRATION
// ===============================

function slug(b){
  return (b.brand + " " + b.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");
}

function productThumb(b){

  const type = b.type || "Product";

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

  const id = slug(b);

  return `
    <div class="product-art product-illustration">

      <svg
        viewBox="0 0 260 260"
        class="product-svg"
        role="img"
        aria-label="${b.brand} ${b.name}"
      >

        <defs>

          <linearGradient
            id="pbg-${id}"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0"
              stop-color="#ffffff"
            />

            <stop
              offset="1"
              stop-color="#f4dce4"
            />
          </linearGradient>

        </defs>

        <!-- Shadow -->
        <ellipse
          cx="130"
          cy="220"
          rx="70"
          ry="12"
          fill="#ead2da"
        />

        <!-- Main bottle -->
        <rect
          x="88"
          y="68"
          width="84"
          height="145"
          rx="18"
          fill="url(#pbg-${id})"
          stroke="#7e2a45"
          stroke-width="3"
        />

        <!-- Cap -->
        <rect
          x="103"
          y="45"
          width="54"
          height="28"
          rx="7"
          fill="#ffffff"
          stroke="#7e2a45"
          stroke-width="3"
        />

        <!-- Pump -->
        <rect
          x="119"
          y="28"
          width="22"
          height="20"
          rx="5"
          fill="#7e2a45"
        />

        <!-- Label -->
        <rect
          x="103"
          y="108"
          width="54"
          height="55"
          rx="8"
          fill="#ffffff"
          opacity=".95"
        />

        <!-- Brand -->
        <text
          x="130"
          y="130"
          text-anchor="middle"
          font-size="12"
          font-weight="700"
          fill="#7e2a45"
        >
          ${b.brand}
        </text>

        <!-- Product type -->
        <text
          x="130"
          y="148"
          text-anchor="middle"
          font-size="9"
          fill="#7e2a45"
        >
          ${label}
        </text>

      </svg>

    </div>
  `;
}


// ===============================
// PRODUCT TYPE MATCHING
// ===============================

const TMATCH = [
  ["Cleanser", /cleanser|face ?wash|cleansing/],
  ["Toner", /toner|mist/],
  ["Serum", /serum|ampoule/],
  ["Essence", /essence/],
  ["Moisturiser", /moisturi[sz]er|cream|lotion/],
  ["Sunscreen", /sunscreen|sun ?block|spf/],
  ["Treatment", /treatment|exfoliant/]
];

const TYPE_ART = {
  Cleanser:"pump",
  Toner:"toner",
  Serum:"serum",
  Essence:"serum",
  Moisturiser:"jar",
  Sunscreen:"tube",
  Treatment:"serum"
};


// ===============================
// UTILITY
// ===============================

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}


// ===============================
// RENDER BRANDS
// ===============================

function renderBrands(){

  const grid = document.querySelector("#brandGrid");

  if(!grid){
    return;
  }

  grid.innerHTML = BRANDS.map((b,index) => {

    return `
      <article class="bcard">

        <div class="bart">
          ${productThumb(b)}
        </div>

        <div class="bbody">

          <div class="eyebrow">
            ${escapeHtml(b.origin)}
          </div>

          <h3>
            ${escapeHtml(b.brand)}
          </h3>

          <h4>
            ${escapeHtml(b.name)}
          </h4>

          <span class="pill">
            ${escapeHtml(b.type)}
          </span>

          <p>
            ${escapeHtml(b.note)}
          </p>

        </div>

      </article>
    `;

  }).join("");
}


// ===============================
// PRODUCT SEARCH
// ===============================

function searchProducts(query){

  const q = String(query || "")
    .toLowerCase()
    .trim();

  if(!q){
    return BRANDS;
  }

  return BRANDS.filter(b => {

    const text = [
      b.origin,
      b.brand,
      b.name,
      b.type,
      b.note,
      ...(b.c || [])
    ]
    .join(" ")
    .toLowerCase();

    return text.includes(q);
  });
}


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  renderBrands();

  const searchInput =
    document.querySelector("#brandSearch") ||
    document.querySelector("#searchInput");

  if(searchInput){

    searchInput.addEventListener("input", () => {

      const grid =
        document.querySelector("#brandGrid");

      if(!grid){
        return;
      }

      const results =
        searchProducts(searchInput.value);

      grid.innerHTML = results.map(b => {

        return `
          <article class="bcard">

            <div class="bart">
              ${productThumb(b)}
            </div>

            <div class="bbody">

              <div class="eyebrow">
                ${escapeHtml(b.origin)}
              </div>

              <h3>
                ${escapeHtml(b.brand)}
              </h3>

              <h4>
                ${escapeHtml(b.name)}
              </h4>

              <span class="pill">
                ${escapeHtml(b.type)}
              </span>

              <p>
                ${escapeHtml(b.note)}
              </p>

            </div>

          </article>
        `;

      }).join("");

    });

  }

});


// ===============================
// GLOBAL HELPERS
// ===============================

window.BRANDS = BRANDS;
window.productThumb = productThumb;
window.renderBrands = renderBrands;
window.searchProducts = searchProducts;
