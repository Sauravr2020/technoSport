import React, { useEffect, useState, useCallback } from "react";


function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}


const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f0ede8; --surface: #fff; --ink: #1a1a1a; --muted: #999;
    --danger: #e53e3e; --green: #2f855a; --star: #f5a623;
    --radius: 16px;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-md: 0 12px 28px rgba(0,0,0,0.10);
    --shadow-lg: 0 20px 48px rgba(0,0,0,0.16);
    --t: 0.25s ease;
  }
  html, body { font-family: 'DM Sans', sans-serif; background: var(--bg); overflow-x: hidden; }

  .app { display: flex; min-height: 100vh; overflow-x: hidden; }
  .main { flex: 1; padding: 40px 32px; transition: margin-right var(--t); min-width: 0; overflow-x: hidden; }
  .main--shifted { margin-right: 360px; }

  /* Header */
  .header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
  .header__title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--ink); letter-spacing: -0.03em; line-height: 1; }

  /* Cart button */
  .cart-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--ink); color: #fff; border: none; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: opacity var(--t), transform var(--t); white-space: nowrap; flex-shrink: 0; }
  .cart-btn:hover { opacity: 0.82; transform: translateY(-1px); }
  .cart-btn:active { transform: scale(0.97); }
  .cart-btn__badge { background: var(--danger); color: #fff; border-radius: 100px; font-size: 0.7rem; font-weight: 700; padding: 1px 7px; min-width: 20px; text-align: center; animation: pop 0.2s ease; }
  @keyframes pop { 0% { transform: scale(0.5); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }

  /* Search */
  .search-wrap { position: relative; margin-bottom: 20px; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
  .search-input { width: 100%; padding: 12px 40px; background: var(--surface); border: 2px solid transparent; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--ink); box-shadow: var(--shadow-sm); transition: border-color var(--t), box-shadow var(--t); outline: none; }
  .search-input:focus { border-color: var(--ink); box-shadow: var(--shadow-md); }
  .search-input::placeholder { color: var(--muted); }
  .search-clear { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: #eee; border: none; border-radius: 50%; width: 22px; height: 22px; font-size: 0.65rem; cursor: pointer; color: var(--muted); display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .search-clear:hover { background: #ddd; color: var(--ink); }

  /* Grid */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 18px; }

  /* Card */
  .card { background: var(--surface); border-radius: var(--radius); padding: 14px; border: 2px solid transparent; transform: translateY(0) scale(1); transition: transform var(--t), border-color var(--t), box-shadow var(--t); box-shadow: var(--shadow-sm); user-select: none; display: flex; flex-direction: column; }
  .card:hover:not(.card--active) { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .card--active { transform: scale(1.04); border-color: var(--ink); box-shadow: var(--shadow-lg); }
  .card__img-wrap { background: #f7f7f5; border-radius: 10px; height: 145px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 12px; cursor: pointer; }
  .card__img { width: 100%; height: 100%; object-fit: contain; padding: 8px; opacity: 0; transition: opacity 0.3s; }
  .card__img--loaded { opacity: 1; }
  .card__cat { font-size: 0.63rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; cursor: pointer; }
  .card__title { font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px; cursor: pointer; }
  .card__footer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .card__price { font-size: 1rem; font-weight: 700; color: var(--ink); }
  .card__rating { font-size: 0.75rem; color: var(--muted); display: flex; align-items: center; gap: 2px; }
  .card__star { color: var(--star); }
  .add-btn { width: 100%; margin-top: 12px; padding: 9px 0; background: var(--ink); color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: background var(--t), transform 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .add-btn:hover { background: #333; }
  .add-btn:active { transform: scale(0.97); }
  .add-btn--added { background: var(--green); }
  .add-btn--added:hover { background: #276749; }

  /* Pagination */
  .pagination { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 36px; flex-wrap: wrap; }
  .page-btn { min-width: 36px; height: 36px; padding: 0 10px; border: 1.5px solid #ddd; border-radius: 8px; background: var(--surface); color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .page-btn:hover:not(:disabled):not(.page-btn--active) { border-color: var(--ink); background: #f7f5f2; }
  .page-btn--active { background: var(--ink); color: #fff; border-color: var(--ink); }
  .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .page-btn--dots { border-color: transparent; background: none; cursor: default; color: var(--muted); pointer-events: none; }
  .page-info { font-size: 0.8rem; color: var(--muted); margin-left: 8px; white-space: nowrap; align-self: center; }

  /* Cart Sidebar */
  .cart-sidebar { position: fixed; top: 0; right: 0; width: 360px; height: 100vh; background: var(--surface); box-shadow: -4px 0 32px rgba(0,0,0,0.1); display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); z-index: 100; }
  .cart-sidebar--open { transform: translateX(0); }
  .cart-sidebar__header { padding: 28px 24px 18px; border-bottom: 1px solid #f0ede8; display: flex; align-items: center; justify-content: space-between; }
  .cart-sidebar__title { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--ink); }
  .cart-sidebar__count { font-size: 0.8rem; color: var(--muted); margin-top: 2px; }
  .close-btn { background: #f0ede8; border: none; border-radius: 50%; width: 32px; height: 32px; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: var(--ink); flex-shrink: 0; }
  .close-btn:hover { background: #e2ddd7; }
  .cart-sidebar__body { flex: 1; overflow-y: auto; padding: 16px 24px; }
  .cart-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 10px; color: var(--muted); font-size: 0.9rem; }
  .cart-empty__icon { font-size: 2.5rem; }
  .cart-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #f5f3f0; }
  .cart-item__img { width: 56px; height: 56px; object-fit: contain; background: #f7f7f5; border-radius: 8px; padding: 4px; flex-shrink: 0; }
  .cart-item__info { flex: 1; min-width: 0; }
  .cart-item__name { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cart-item__price { font-size: 0.8rem; color: var(--muted); margin-top: 2px; }
  .cart-item__controls { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
  .qty-btn { width: 26px; height: 26px; border: 1.5px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s, background 0.2s; color: var(--ink); flex-shrink: 0; }
  .qty-btn:hover { border-color: var(--ink); background: #f0ede8; }
  .qty-val { font-size: 0.85rem; font-weight: 600; color: var(--ink); min-width: 18px; text-align: center; }
  .remove-btn { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 1rem; padding: 2px; transition: color 0.2s; flex-shrink: 0; }
  .remove-btn:hover { color: var(--danger); }
  .cart-sidebar__footer { padding: 20px 24px; border-top: 1px solid #f0ede8; }
  .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .cart-total-label { font-size: 0.85rem; color: var(--muted); }
  .cart-total-value { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--ink); }
  .checkout-btn { width: 100%; padding: 14px; background: var(--ink); color: #fff; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s, transform 0.15s; }
  .checkout-btn:hover { opacity: 0.82; }
  .checkout-btn:active { transform: scale(0.98); }
  .clear-btn { width: 100%; margin-top: 10px; padding: 10px; background: none; border: 1.5px solid #ddd; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--muted); cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .clear-btn:hover { border-color: var(--danger); color: var(--danger); }

  /* Status */
  .status-box { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; gap: 14px; color: var(--muted); font-size: 0.95rem; }
  .spinner { width: 36px; height: 36px; border: 3px solid #e0dbd3; border-top-color: var(--ink); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .retry-btn { padding: 9px 22px; background: var(--ink); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; }
  .retry-btn:hover { opacity: 0.75; }
`;

const PAGE_SIZE = 10;
const STATUS    = { LOADING: "loading", SUCCESS: "success", ERROR: "error" };


function Pagination({ current, total, filtered, search, onChange }) {
  if (total <= 1 && filtered <= 10) return null;

  
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("…");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("…");
    pages.push(total);
  }

  const info = search
    ? `${filtered} result${filtered !== 1 ? "s" : ""} for "${search}"`
    : `Page ${current} of ${total}`;

  return (
    <div className="pagination">
      <button className="page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>← Prev</button>
      {pages.map((p, i) =>
        p === "…"
          ? <button key={`dots-${i}`} className="page-btn page-btn--dots">…</button>
          : <button
              key={p}
              className={`page-btn${p === current ? " page-btn--active" : ""}`}
              onClick={() => onChange(p)}
            >{p}</button>
      )}
      <button className="page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>Next →</button>
      <span className="page-info">{info}</span>
    </div>
  );
}


function CartSidebar({ cart, isOpen, onClose, onAdd, onRemove, onClear }) {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <aside className={`cart-sidebar${isOpen ? " cart-sidebar--open" : ""}`}>
      <div className="cart-sidebar__header">
        <div>
          <div className="cart-sidebar__title">Your Cart</div>
          <div className="cart-sidebar__count">{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="cart-sidebar__body">
        {cart.length === 0
          ? <div className="cart-empty"><span className="cart-empty__icon">🛒</span><span>Your cart is empty</span></div>
          : cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item__img" src={item.thumbnail} alt={item.title}
                onError={(e) => { e.currentTarget.src = "https://placehold.co/56x56?text=N/A"; }} />
              <div className="cart-item__info">
                <div className="cart-item__name" title={item.title}>{item.title}</div>
                <div className="cart-item__price">₹{item.price.toLocaleString("en-IN")} each</div>
                <div className="cart-item__controls">
                  <button className="qty-btn" onClick={() => onRemove(item.id, 1)}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onAdd(item)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => onRemove(item.id, item.qty)}>🗑</button>
            </div>
          ))
        }
      </div>
      {cart.length > 0 && (
        <div className="cart-sidebar__footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-value">₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout →</button>
          <button className="clear-btn" onClick={onClear}>Clear cart</button>
        </div>
      )}
    </aside>
  );
}


function ProductCard({ item, isActive, isInCart, onToggle, onAddToCart }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={`card${isActive ? " card--active" : ""}`}>
      <div className="card__img-wrap" onClick={() => onToggle(item.id)}>
        <img src={item.thumbnail} alt={item.title}
          className={`card__img${imgLoaded ? " card__img--loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/200x145?text=No+Image"; setImgLoaded(true); }}
        />
      </div>
      <p className="card__cat" onClick={() => onToggle(item.id)}>{item.category}</p>
      <h3 className="card__title" title={item.title} onClick={() => onToggle(item.id)}>{item.title}</h3>
      <div className="card__footer">
        <span className="card__price">₹{item.price.toLocaleString("en-IN")}</span>
        <span className="card__rating"><span className="card__star">★</span>{item.rating?.toFixed(1) ?? "—"}</span>
      </div>
      <button className={`add-btn${isInCart ? " add-btn--added" : ""}`} onClick={() => onAddToCart(item)}>
        {isInCart ? "✓ Added" : "+ Add to Cart"}
      </button>
    </div>
  );
}


export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus]     = useState(STATUS.LOADING);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  const debouncedSearch = useDebounce(searchInput, 400);

  
  const fetchProducts = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setErrorMsg("");
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      if (!res.ok) throw new Error(`Server responded with ${res.status} ${res.statusText}`);
      const data = await res.json();
      if (!Array.isArray(data.products)) throw new Error("Unexpected response format from API.");
      setProducts(data.products);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus(STATUS.ERROR);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);

  
  const filtered = products.filter((p) => {
    const q = debouncedSearch.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart  = (currentPage - 1) * PAGE_SIZE;
  const paginated  = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id);
      if (!item) return prev;
      if (item.qty - qty <= 0) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - qty } : c);
    });
  }, []);

  const totalInCart = cart.reduce((s, i) => s + i.qty, 0);
  const cartIds     = new Set(cart.map((c) => c.id));

  const goToPage = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className={`main${cartOpen ? " main--shifted" : ""}`}>

          
          <header className="header">
            <div>
              <h1 className="header__title">Product Catalogue</h1>
            </div>
            <button className="cart-btn" onClick={() => setCartOpen((o) => !o)}>
              🛒 Cart
              {totalInCart > 0 && <span key={totalInCart} className="cart-btn__badge">{totalInCart}</span>}
            </button>
          </header>

          
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name or category…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button className="search-clear" onClick={() => setSearchInput("")}>✕</button>
            )}
          </div>

          
          {status === STATUS.LOADING && (
            <div className="status-box"><div className="spinner" /><span>Loading products…</span></div>
          )}

          
          {status === STATUS.ERROR && (
            <div className="status-box">
              <span style={{ fontSize: "2rem" }}>⚠️</span>
              <span>{errorMsg}</span>
              <button className="retry-btn" onClick={fetchProducts}>Retry</button>
            </div>
          )}

          
          {status === STATUS.SUCCESS && filtered.length === 0 && (
            <div className="status-box">
              <span style={{ fontSize: "2rem" }}>🔎</span>
              <span>No products match "<strong>{debouncedSearch}</strong>"</span>
            </div>
          )}

          {status === STATUS.SUCCESS && filtered.length > 0 && (
            <>
              <div className="grid">
                {paginated.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    isInCart={cartIds.has(item.id)}
                    onToggle={(id) => setActiveId((prev) => (prev === id ? null : id))}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
              <Pagination current={currentPage} total={totalPages} filtered={filtered.length} search={debouncedSearch} onChange={goToPage} />
            </>
          )}
        </div>

       
        <CartSidebar
          cart={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={() => setCart([])}
        />
      </div>
    </>
  );
}
