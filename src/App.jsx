import { useState } from 'react';

// ═══════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════
const G   = '#D4AF37';   // gold
const BG  = '#0D0D0D';   // deep black
const CARD = '#1A1A1A';  // dark card
const GRAY = '#888888';  // muted text
const BORDER = '#2A2A2A';
const FONT_SERIF = "'Cormorant Garamond', Georgia, serif";
const FONT_SANS  = "'Montserrat', system-ui, sans-serif";

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const CATEGORIES = ['Småretter', 'Hovedretter', 'Snacks', 'Dessert'];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Molde Fjordstuer',
    distance: '250m unna',
    cuisine: 'Norsk Fine Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    menu: {
      Småretter: [
        { id: 101, name: 'Kamskjell med ertepuré', price: 185,
          image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
          ingredients: 'Kamskjell, ertepuré, bacon, lime, microgreens.',
          allergens: 'Bløtdyr, Gluten', reviews: 14 },
        { id: 102, name: 'Ceviche av kveite', price: 165,
          image: 'https://images.unsplash.com/photo-1535400255456-984e3c1138f3?w=400&q=80',
          ingredients: 'Kveite, limejuice, rød løk, koriander, avokado.',
          allergens: 'Fisk', reviews: 9 },
        { id: 103, name: 'Gratinert blåskjell', price: 145,
          image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
          ingredients: 'Blåskjell, hvitvin, hvitløk, persille, smør.',
          allergens: 'Bløtdyr, Melk, Gluten', reviews: 21 },
      ],
      Hovedretter: [
        { id: 201, name: 'Laks med spinat', price: 295,
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
          ingredients: 'Atlanterhavslaks, smørdampet spinat, mandelpotetstappe, ferske erter, dillsaus.',
          allergens: 'Fisk, Melk', reviews: 18 },
        { id: 202, name: 'Fjordørret sous vide', price: 315,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
          ingredients: 'Fjordørret, jordskokk, sprøstekt kapers, smørsaus.',
          allergens: 'Fisk, Melk', reviews: 12 },
        { id: 203, name: 'Viltbiff med trøffel', price: 425,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
          ingredients: 'Hjortebiff, trøffelsaus, sellerirotpuré, rødvinssjy.',
          allergens: 'Melk, Gluten', reviews: 7 },
      ],
      Snacks: [
        { id: 301, name: 'Trøffel-fries', price: 95,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
          ingredients: 'Pommes frites, trøffelolje, parmesan, rosmarin.',
          allergens: 'Melk, Gluten', reviews: 31 },
        { id: 302, name: 'Ostebrett deluxe', price: 175,
          image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80',
          ingredients: 'Tre norske oster, druer, valnøtter, honning, kjeks.',
          allergens: 'Melk, Gluten, Nøtter', reviews: 16 },
      ],
      Dessert: [
        { id: 401, name: 'Sjokolademousse med gull', price: 145,
          image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&q=80',
          ingredients: 'Mørk sjokolade 72%, krem, egg, gullflak.',
          allergens: 'Egg, Melk', reviews: 24 },
        { id: 402, name: 'Crème Brûlée', price: 125,
          image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80',
          ingredients: 'Vaniljekrem, brent sukker, friske bær.',
          allergens: 'Egg, Melk', reviews: 19 },
      ],
    },
  },
  {
    id: 2,
    name: 'Glass Restaurant & Bar',
    distance: '400m unna',
    cuisine: 'Moderne Skandinavisk',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    menu: {
      Småretter: [
        { id: 501, name: 'Reker med aioli', price: 155,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80',
          ingredients: 'Fjordreker, hjemmelaget aioli, sitron, dill.',
          allergens: 'Skalldyr, Egg', reviews: 22 },
        { id: 502, name: 'Tartare av okse', price: 175,
          image: 'https://images.unsplash.com/photo-1544025162-d76538069c75?w=400&q=80',
          ingredients: 'Oksemørbrad, kapers, sjalottløk, eggeplomme, sennep.',
          allergens: 'Egg, Gluten', reviews: 15 },
      ],
      Hovedretter: [
        { id: 601, name: 'Torsk i hvitvin', price: 265,
          image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80',
          ingredients: 'Norsk torsk, hvitvin, oliven, tomat, kapers.',
          allergens: 'Fisk', reviews: 11 },
        { id: 602, name: 'Entrecôte 200g', price: 395,
          image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
          ingredients: 'Dry-aged entrecôte, bearnaisesaus, håndskårne fries.',
          allergens: 'Melk, Egg, Gluten', reviews: 28 },
      ],
      Snacks: [
        { id: 701, name: 'Nachos med guacamole', price: 115,
          image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80',
          ingredients: 'Tortillachips, guacamole, pico de gallo, jalapeños.',
          allergens: 'Gluten', reviews: 34 },
      ],
      Dessert: [
        { id: 801, name: 'Karamell-iskrem', price: 95,
          image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80',
          ingredients: 'Vaniljeis, hjemmelaget karamellsaus, saltflak.',
          allergens: 'Melk, Egg', reviews: 42 },
      ],
    },
  },
  {
    id: 3,
    name: 'Derby Gastrobar',
    distance: '600m unna',
    cuisine: 'Gastrobar & Cocktails',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    menu: {
      Småretter: [
        { id: 901, name: 'Geitost-crostini', price: 95,
          image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80',
          ingredients: 'Norsk geitost, crostini, valnøtter, honning.',
          allergens: 'Melk, Gluten, Nøtter', reviews: 17 },
      ],
      Hovedretter: [
        { id: 1001, name: 'Derby Signature Burger', price: 225,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
          ingredients: 'Håndformet storfekjøttdeig, briochebolle, cheddar, smørsalat, Derby-saus.',
          allergens: 'Gluten, Melk, Egg', reviews: 56 },
        { id: 1002, name: 'Bakt potet med reker', price: 185,
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
          ingredients: 'Stor bakt potet, reker, rømme, rødløk, dill.',
          allergens: 'Skalldyr, Melk', reviews: 23 },
      ],
      Snacks: [
        { id: 1101, name: 'Chicken wings BBQ', price: 135,
          image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80',
          ingredients: 'Kyllingvinger, BBQ-saus, blåmuggostsaus.',
          allergens: 'Melk, Gluten', reviews: 45 },
      ],
      Dessert: [
        { id: 1201, name: 'Sticky toffee pudding', price: 115,
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80',
          ingredients: 'Daddelpudding, toffee-saus, vaniljeis.',
          allergens: 'Gluten, Melk, Egg', reviews: 29 },
      ],
    },
  },
  {
    id: 4,
    name: 'Bølgen & Moi Molde',
    distance: '850m unna',
    cuisine: 'Nordisk Gourmet',
    image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
    menu: {
      Småretter: [
        { id: 1301, name: 'Østers med yuzu', price: 215,
          image: 'https://images.unsplash.com/photo-1606731219412-3bfdf52b7523?w=400&q=80',
          ingredients: 'Ferske østers, yuzukrem, ristede sesamfrø, microgreens.',
          allergens: 'Bløtdyr, Sesamfrø', reviews: 8 },
      ],
      Hovedretter: [
        { id: 1401, name: 'Piggvar med hummer', price: 525,
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80',
          ingredients: 'Vill piggvar, hummerbuljong, asparges, kaviar.',
          allergens: 'Fisk, Skalldyr, Melk', reviews: 6 },
      ],
      Snacks: [
        { id: 1501, name: 'Sourdough med smør', price: 75,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
          ingredients: 'Surdeigsbaguette, nøttesmør, flaksalt.',
          allergens: 'Gluten, Melk, Nøtter', reviews: 33 },
      ],
      Dessert: [
        { id: 1601, name: 'Kvann-sorbet', price: 135,
          image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&q=80',
          ingredients: 'Kvannsorbet, rips, nordisk urtegelé.',
          allergens: 'Ingen', reviews: 11 },
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// GLOBAL STYLES (injected once)
// ═══════════════════════════════════════════════════════════
const GLOBAL_CSS = `
  @keyframes spin      { to { transform: rotate(360deg); } }
  @keyframes slideUp   { from { transform: translateX(-50%) translateY(100%); } to { transform: translateX(-50%) translateY(0); } }
  @keyframes fadeScale { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  @keyframes shimmer   { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
  @keyframes pulse     { 0%,100% { box-shadow: 0 0 20px rgba(212,175,55,0.3); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); } }
  ::-webkit-scrollbar  { display: none; }
  *                    { scrollbar-width: none; -webkit-tap-highlight-color: transparent; }
`;

// ═══════════════════════════════════════════════════════════
// SMALL ATOMS
// ═══════════════════════════════════════════════════════════
function Stars({ count = 5, size = 16 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[...Array(count)].map((_, i) => (
        <span key={i} style={{ color: G, fontSize: size, lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

function GoldDivider({ style = {} }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(to right, transparent, ${G}, transparent)`,
      ...style,
    }} />
  );
}

function GoldSpinner({ label = 'LASTER OPP...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 28, height: 28, flexShrink: 0,
        border: `2px solid ${BORDER}`,
        borderTop: `2px solid ${G}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: G, fontSize: 12, letterSpacing: 2, fontFamily: FONT_SANS }}>{label}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 1 — DISCOVER
// ═══════════════════════════════════════════════════════════
function DiscoverScreen({ restaurants, points, onSelect }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: BG }}>

      {/* ── Sticky Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        backgroundColor: 'rgba(13,13,13,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${BORDER}`,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              color: G, fontSize: 24, fontWeight: 700,
              letterSpacing: 5, textTransform: 'uppercase',
              fontFamily: FONT_SERIF,
            }}>DISHY</span>
            <span style={{ color: '#333', fontSize: 8 }}>◆</span>
          </div>
          <p style={{
            color: '#444', fontSize: 8, letterSpacing: 4,
            textTransform: 'uppercase', marginTop: 1,
            fontFamily: FONT_SANS,
          }}>Luxury Food Discovery</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {points > 0 && (
            <div style={{
              background: 'linear-gradient(135deg,#2A2000,#1A1500)',
              border: `1px solid ${G}`,
              borderRadius: 20, padding: '4px 12px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ color: G, fontSize: 13, fontWeight: 700, fontFamily: FONT_SANS }}>⭐</span>
              <span style={{ color: G, fontSize: 13, fontWeight: 700, fontFamily: FONT_SANS }}>{points}</span>
              <span style={{ color: '#9A7B1C', fontSize: 9, fontFamily: FONT_SANS }}>pts</span>
            </div>
          )}
          <button style={{
            width: 38, height: 38, borderRadius: '50%',
            border: `1px solid ${BORDER}`,
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Hero Intro ── */}
      <div style={{ padding: '28px 20px 20px' }}>
        <p style={{
          color: '#555', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', marginBottom: 8,
          fontFamily: FONT_SANS,
        }}>📍 Molde sentrum</p>
        <h1 style={{
          color: '#FFF', fontSize: 28, fontWeight: 300,
          lineHeight: 1.25, fontFamily: FONT_SERIF,
        }}>
          Eksklusive menyer<br />
          <em style={{ color: G, fontStyle: 'italic' }}>i nærheten av deg</em>
        </h1>
        <div style={{ width: 44, height: 1, backgroundColor: G, marginTop: 14 }} />
      </div>

      {/* ── Restaurant Cards ── */}
      <div style={{ padding: '4px 20px 60px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant, onSelect }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      role="button"
      onClick={() => onSelect(restaurant)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        position: 'relative', borderRadius: 18,
        overflow: 'hidden', height: 210,
        cursor: 'pointer',
        border: `1px solid ${pressed ? G : BORDER}`,
        transform: pressed ? 'scale(0.975)' : 'scale(1)',
        transition: 'transform 0.15s ease, border-color 0.15s ease',
        boxShadow: pressed ? `0 0 24px rgba(212,175,55,0.15)` : 'none',
      }}
    >
      <img
        src={restaurant.image} alt={restaurant.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)',
      }} />

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        background: 'rgba(212,175,55,0.12)',
        border: `1px solid rgba(212,175,55,0.5)`,
        borderRadius: 30, padding: '5px 12px',
        backdropFilter: 'blur(6px)',
      }}>
        <span style={{ color: G, fontSize: 10, letterSpacing: 0.5, fontFamily: FONT_SANS }}>✨ Bildemeny tilgjengelig</span>
      </div>

      {/* Info bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 18px 16px' }}>
        <p style={{
          color: '#888', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 5,
          fontFamily: FONT_SANS,
        }}>{restaurant.cuisine}</p>
        <h2 style={{
          color: G, fontSize: 22, fontWeight: 600,
          letterSpacing: 0.3, marginBottom: 8,
          fontFamily: FONT_SERIF,
        }}>{restaurant.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={GRAY}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span style={{ color: GRAY, fontSize: 12, fontFamily: FONT_SANS }}>{restaurant.distance}</span>
          </div>
          <Stars count={5} size={12} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 2 — RESTAURANT PROFILE
// ═══════════════════════════════════════════════════════════
function RestaurantScreen({ restaurant, category, onCategoryChange, onBack, onDishSelect }) {
  const dishes = restaurant.menu[category] || [];
  return (
    <div style={{ minHeight: '100vh', backgroundColor: BG }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: 240 }}>
        <img
          src={restaurant.image} alt={restaurant.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(13,13,13,1) 100%)',
        }} />

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: 16, left: 16,
            background: 'rgba(0,0,0,0.55)', border: `1px solid ${G}`,
            borderRadius: 24, padding: '7px 16px',
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', backdropFilter: 'blur(6px)',
          }}
        >
          <span style={{ color: G, fontSize: 16, lineHeight: 1 }}>←</span>
          <span style={{ color: G, fontSize: 11, letterSpacing: 1, fontFamily: FONT_SANS }}>Tilbake</span>
        </button>

        {/* Reservation */}
        <button style={{
          position: 'absolute', top: 16, right: 16,
          background: `linear-gradient(135deg, ${G}, #C5A030)`,
          border: 'none', borderRadius: 24, padding: '8px 16px',
          cursor: 'pointer',
        }}>
          <span style={{ color: '#000', fontSize: 11, fontWeight: 700, letterSpacing: 1, fontFamily: FONT_SANS }}>Bordbestilling</span>
        </button>

        {/* Name block */}
        <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
          <p style={{ color: '#666', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4, fontFamily: FONT_SANS }}>
            {restaurant.cuisine}
          </p>
          <h1 style={{ color: '#FFF', fontSize: 28, fontWeight: 300, letterSpacing: 0.3, fontFamily: FONT_SERIF }}>
            {restaurant.name}
          </h1>
          <p style={{ color: GRAY, fontSize: 12, marginTop: 4, fontFamily: FONT_SANS }}>📍 {restaurant.distance}</p>
        </div>
      </div>

      <GoldDivider />

      {/* ── Sticky Category Tabs ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        backgroundColor: 'rgba(13,13,13,0.97)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 16px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={{
                flexShrink: 0, padding: '16px 18px',
                background: 'none', border: 'none',
                color: category === cat ? G : '#555',
                fontSize: 13,
                fontWeight: category === cat ? 700 : 400,
                letterSpacing: 0.5,
                cursor: 'pointer',
                borderBottom: category === cat ? `2px solid ${G}` : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: FONT_SANS,
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* ── Dish List ── */}
      <div style={{ padding: '6px 20px 60px' }}>
        <p style={{
          color: '#3A3A3A', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', padding: '10px 0 6px',
          fontFamily: FONT_SANS,
        }}>{dishes.length} retter · {category}</p>

        {dishes.map((dish) => <DishRow key={dish.id} dish={dish} onSelect={onDishSelect} />)}
      </div>
    </div>
  );
}

function DishRow({ dish, onSelect }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      role="button"
      onClick={() => onSelect(dish)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 6px',
        borderBottom: `1px solid ${BORDER}`,
        cursor: 'pointer',
        backgroundColor: pressed ? 'rgba(212,175,55,0.04)' : 'transparent',
        borderRadius: 4,
        transition: 'background-color 0.12s',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: 70, height: 70, borderRadius: 10,
        overflow: 'hidden', flexShrink: 0,
        border: `1px solid ${BORDER}`,
      }}>
        <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: '#FFF', fontSize: 15, fontWeight: 500,
          marginBottom: 5, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
          fontFamily: FONT_SERIF,
        }}>{dish.name}</p>
        <p style={{
          color: '#555', fontSize: 11, lineHeight: 1.4,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          fontFamily: FONT_SANS,
        }}>{dish.ingredients.split(',').slice(0, 3).join(', ')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <Stars count={5} size={10} />
          <span style={{ color: '#444', fontSize: 10, fontFamily: FONT_SANS }}>({dish.reviews})</span>
        </div>
      </div>

      {/* Price */}
      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        <p style={{ color: G, fontSize: 17, fontWeight: 700, fontFamily: FONT_SANS }}>{dish.price},-</p>
        <p style={{ color: '#444', fontSize: 9, marginTop: 2, fontFamily: FONT_SANS }}>NOK</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 3 — DISH DETAIL MODAL
// ═══════════════════════════════════════════════════════════
function DishModal({ dish, uploadState, onClose, onUpload, onUseCoupon, onConfirmCoupon }) {
  const locked = uploadState === 'coupon' || uploadState === 'confirm' || uploadState === 'used';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={locked ? undefined : onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* Gold Coupon Overlay */}
      {locked && (
        <GoldCoupon
          dish={dish}
          uploadState={uploadState}
          onUseCoupon={onUseCoupon}
          onConfirmCoupon={onConfirmCoupon}
        />
      )}

      {/* Bottom Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430, zIndex: 101,
        backgroundColor: CARD,
        borderRadius: '22px 22px 0 0',
        border: `1px solid ${BORDER}`,
        borderBottom: 'none',
        maxHeight: '92vh',
        overflowY: 'auto',
        animation: 'slideUp 0.32s cubic-bezier(0.32,0.72,0,1)',
      }}>

        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 38, height: 4, backgroundColor: '#333', borderRadius: 2 }} />
        </div>

        {/* Close × */}
        <button
          onClick={locked ? undefined : onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 5,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)', border: `1px solid #333`,
            color: GRAY, fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT_SANS,
          }}
        >✕</button>

        {/* Image */}
        <div style={{ position: 'relative', height: 290, overflow: 'hidden' }}>
          <img
            src={dish.image} alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, rgba(26,26,26,1) 100%)',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '4px 24px 130px' }}>

          {/* Title + price */}
          <h2 style={{
            color: G, fontSize: 28, fontWeight: 600,
            lineHeight: 1.2, marginBottom: 6,
            fontFamily: FONT_SERIF,
          }}>{dish.name}</h2>
          <p style={{ marginBottom: 18 }}>
            <span style={{ color: '#FFF', fontSize: 20, fontFamily: FONT_SANS, fontWeight: 300 }}>{dish.price},-</span>
            <span style={{ color: GRAY, fontSize: 13, marginLeft: 4, fontFamily: FONT_SANS }}>NOK</span>
          </p>

          <GoldDivider style={{ marginBottom: 20 }} />

          {/* Ingredients */}
          <p style={{
            color: '#4A4A4A', fontSize: 9, letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 10,
            fontFamily: FONT_SANS,
          }}>Ingredienser</p>
          <p style={{
            color: GRAY, fontSize: 14, lineHeight: 1.8,
            marginBottom: 20, fontFamily: FONT_SANS,
          }}>{dish.ingredients}</p>

          {/* Allergens box */}
          <div style={{
            backgroundColor: '#111',
            border: `1px solid ${BORDER}`,
            borderRadius: 12, padding: '12px 16px',
            marginBottom: 22,
          }}>
            <p style={{
              color: '#4A4A4A', fontSize: 9, letterSpacing: 3,
              textTransform: 'uppercase', marginBottom: 5,
              fontFamily: FONT_SANS,
            }}>Allergener</p>
            <p style={{ color: '#AAA', fontSize: 13, fontFamily: FONT_SANS }}>⚠ {dish.allergens}</p>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Stars count={5} size={22} />
            <p style={{ color: GRAY, fontSize: 13, fontFamily: FONT_SANS }}>Vurdert av {dish.reviews} gjester</p>
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div style={{
          position: 'sticky', bottom: 0,
          backgroundColor: CARD,
          borderTop: `1px solid ${BORDER}`,
          padding: '14px 24px 18px',
        }}>
          {uploadState === 'uploading' ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
              <GoldSpinner label="LASTER OPP DITT BILDE..." />
            </div>
          ) : (
            <button
              onClick={locked ? undefined : onUpload}
              style={{
                width: '100%',
                background: locked
                  ? '#2A2A2A'
                  : `linear-gradient(135deg, ${G} 0%, #C5A030 100%)`,
                border: 'none', borderRadius: 16,
                padding: '16px 0',
                color: locked ? '#555' : '#000',
                fontSize: 16, fontWeight: 700,
                letterSpacing: 1, cursor: locked ? 'default' : 'pointer',
                boxShadow: locked ? 'none' : `0 4px 24px rgba(212,175,55,0.35)`,
                transition: 'all 0.2s',
                fontFamily: FONT_SANS,
              }}
            >
              📸 Legg til ditt bilde
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// GOLD COUPON
// ═══════════════════════════════════════════════════════════
function GoldCoupon({ dish, uploadState, onUseCoupon, onConfirmCoupon }) {
  const isConfirm = uploadState === 'confirm';
  const isUsed    = uploadState === 'used';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      backgroundColor: 'rgba(0,0,0,0.88)',
      animation: 'fadeScale 0.35s ease',
    }}>
      <div style={{
        width: '100%', maxWidth: 370,
        background: 'linear-gradient(145deg,#1C1500,#0E0D00,#1C1500)',
        border: `2px solid ${G}`,
        borderRadius: 24,
        padding: '36px 28px',
        textAlign: 'center',
        boxShadow: `0 0 80px rgba(212,175,55,0.2), inset 0 0 60px rgba(212,175,55,0.03)`,
        position: 'relative',
        overflow: 'hidden',
        animation: isUsed ? 'none' : 'pulse 2.5s ease infinite',
      }}>

        {/* Corner flourishes */}
        {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: 18, height: 18,
            border: `1px solid rgba(212,175,55,0.4)`,
            borderRadius: 3,
          }} />
        ))}

        {isUsed ? (
          <>
            <div style={{ fontSize: 64, marginBottom: 20, lineHeight: 1 }}>✅</div>
            <h2 style={{
              color: G, fontSize: 22, fontWeight: 700,
              letterSpacing: 3, marginBottom: 12,
              fontFamily: FONT_SERIF,
            }}>KUPONG BRUKT</h2>
            <p style={{ color: '#AAA', fontSize: 14, lineHeight: 1.7, fontFamily: FONT_SANS }}>
              God fornøyelse! Nyt din gratis drikke.<br />
              <span style={{ color: G, fontWeight: 700 }}>+100 poeng</span> er lagt til din konto.
            </p>
          </>
        ) : isConfirm ? (
          <>
            <div style={{ fontSize: 52, marginBottom: 16, lineHeight: 1 }}>⚠️</div>
            <h3 style={{
              color: '#FFF', fontSize: 18, fontWeight: 700,
              marginBottom: 14, letterSpacing: 1,
              fontFamily: FONT_SERIF,
            }}>BEKREFT KUPONG</h3>
            <p style={{
              color: GRAY, fontSize: 13, lineHeight: 1.7,
              marginBottom: 28, fontFamily: FONT_SANS,
            }}>
              Vis denne skjermen til servitøren og bekreft at du bruker din gratis drikke.<br />
              <span style={{ color: '#CC3333', fontSize: 12 }}>Denne handlingen kan ikke angres.</span>
            </p>
            <button
              onClick={onConfirmCoupon}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${G}, #C5A030)`,
                border: 'none', borderRadius: 14,
                padding: '16px 0',
                color: '#000', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', letterSpacing: 1,
                fontFamily: FONT_SANS,
              }}
            >✓ JA, BRUK KUPONG NÅ</button>
          </>
        ) : (
          <>
            {/* Crown icon */}
            <div style={{ fontSize: 56, marginBottom: 16, lineHeight: 1, animation: 'shimmer 2s ease infinite' }}>👑</div>

            {/* Header band */}
            <div style={{
              borderTop: `1px solid rgba(212,175,55,0.6)`,
              borderBottom: `1px solid rgba(212,175,55,0.6)`,
              padding: '14px 0', marginBottom: 24,
            }}>
              <p style={{
                color: '#666', fontSize: 9, letterSpacing: 5,
                textTransform: 'uppercase', marginBottom: 6,
                fontFamily: FONT_SANS,
              }}>Eksklusiv belønning</p>
              <p style={{
                color: G, fontSize: 20, fontWeight: 700,
                letterSpacing: 3, fontFamily: FONT_SERIF,
              }}>GULLSTATUS OPPNÅDD!</p>
            </div>

            {/* Message */}
            <p style={{ color: '#CCC', fontSize: 14, lineHeight: 1.75, marginBottom: 6, fontFamily: FONT_SANS }}>
              Du var den <span style={{ color: G, fontWeight: 700 }}>første</span> til å dokumentere
            </p>
            <p style={{
              color: G, fontSize: 17, fontWeight: 600,
              fontFamily: FONT_SERIF, fontStyle: 'italic',
              marginBottom: 8,
            }}>&ldquo;{dish.name}&rdquo;</p>
            <p style={{ color: '#CCC', fontSize: 13, lineHeight: 1.75, marginBottom: 28, fontFamily: FONT_SANS }}>
              Vis denne skjermen i baren for en<br />
              <span style={{ color: G, fontWeight: 700 }}>gratis valgfri mineralvann/brus</span><br />
              fra restauranten.
            </p>

            {/* Barcode decoration */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 28, opacity: 0.35 }}>
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i} style={{
                  width: i % 4 === 0 ? 3 : 1,
                  height: 28, backgroundColor: G,
                  borderRadius: 1,
                }} />
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onUseCoupon}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${G} 0%, #C5A030 100%)`,
                border: 'none', borderRadius: 16,
                padding: '17px 0',
                color: '#000', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', letterSpacing: 1,
                boxShadow: `0 6px 28px rgba(212,175,55,0.45)`,
                fontFamily: FONT_SANS,
              }}
            >Bruk kupong &mdash; Fri drikke 🥤</button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [screen,      setScreen]      = useState('discover');
  const [restaurant,  setRestaurant]  = useState(null);
  const [category,    setCategory]    = useState('Småretter');
  const [dish,        setDish]        = useState(null);
  const [uploadState, setUploadState] = useState('idle');
  const [points,      setPoints]      = useState(0);

  const handleRestaurantSelect = (r) => {
    setRestaurant(r);
    setCategory('Småretter');
    setScreen('restaurant');
  };

  const handleBack = () => {
    setScreen('discover');
    setRestaurant(null);
    setDish(null);
    setUploadState('idle');
  };

  const handleDishSelect = (d) => {
    setDish(d);
    setUploadState('idle');
  };

  const handleCloseDish = () => {
    const locked = uploadState === 'coupon' || uploadState === 'confirm';
    if (locked) return;
    setDish(null);
    setUploadState('idle');
  };

  const handleUpload = () => {
    setUploadState('uploading');
    setTimeout(() => setUploadState('coupon'), 1500);
  };

  const handleUseCoupon    = () => setUploadState('confirm');

  const handleConfirmCoupon = () => {
    setPoints((p) => p + 100);
    setUploadState('used');
    setTimeout(() => {
      setDish(null);
      setUploadState('idle');
    }, 2400);
  };

  return (
    <div style={{
      backgroundColor: BG,
      fontFamily: FONT_SANS,
      maxWidth: 430,
      margin: '0 auto',
      minHeight: '100vh',
      position: 'relative',
    }}>
      <style>{GLOBAL_CSS}</style>

      {screen === 'discover' && (
        <DiscoverScreen
          restaurants={RESTAURANTS}
          points={points}
          onSelect={handleRestaurantSelect}
        />
      )}

      {screen === 'restaurant' && restaurant && (
        <RestaurantScreen
          restaurant={restaurant}
          category={category}
          onCategoryChange={setCategory}
          onBack={handleBack}
          onDishSelect={handleDishSelect}
        />
      )}

      {dish && (
        <DishModal
          dish={dish}
          uploadState={uploadState}
          onClose={handleCloseDish}
          onUpload={handleUpload}
          onUseCoupon={handleUseCoupon}
          onConfirmCoupon={handleConfirmCoupon}
        />
      )}
    </div>
  );
}
