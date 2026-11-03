/**
 * @file App.tsx
 * @description Catálogo Comercial de Panetones Artesanales y Saludables
 * Incluye sistema de ventas con carrito, pedidos directos por WhatsApp,
 * buscador instantáneo, filtros por categoría y diseño moderno y responsivo para móviles.
 */

import React, { useState, useMemo, useEffect } from "react";
import rawProductos from "./data/productos.json";
import {
  ShoppingBag,
  Search,
  X,
  Phone,
  Sparkles,
  Leaf,
  Dumbbell,
  Wheat,
  Download,
  Info,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Moon,
  Sun,
  ShieldCheck,
  Truck,
  CreditCard
} from "lucide-react";

// ==========================================
// 1. TIPOS E INTERFACES DE DATOS
// ==========================================
interface Producto {
  m: string; // Marca
  n: string; // Nombre del panetón
  p: string; // Precio (ej. "S/ 39.90")
  b: string[]; // Beneficios nutricionales
  i: string; // Imagen en formato base64
}

interface CartItem {
  productIndex: number;
  qty: number;
}

// Número oficial de WhatsApp para recibir los pedidos (Configurable)
const WHATSAPP_PHONE = "51924428088";

export default function App() {
  // ==========================================
  // 2. ESTADOS REACTIVOS PRINCIPALES
  // ==========================================
  const productos: Producto[] = rawProductos as Producto[];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  
  // Carrito de compras
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("panetones_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null);

  // Formulario del cliente en carrito
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  // Notificación Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Tema claro/oscuro
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem("panetones_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error al guardar carrito", e);
    }
  }, [cart]);

  // Manejador del Toast
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Alternar tema claro / oscuro
  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("panetones_theme", nextTheme);
    setIsDark(!isDark);
  };

  // ==========================================
  // 3. FUNCIONES AUXILIARES DE CÁLCULO Y FILTRO
  // ==========================================
  const parsePrice = (priceStr: string): number | null => {
    if (!priceStr) return null;
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  // Lista única de marcas para el selector
  const marcasDisponibles = useMemo(() => {
    return Array.from(new Set(productos.map((p) => p.m))).sort();
  }, [productos]);

  // Generación de etiquetas / badges para cada panetón
  const getProductTags = (p: Producto) => {
    const tags: string[] = [];
    const text = (p.n + " " + p.b.join(" ")).toLowerCase();
    if (text.includes("berries") || text.includes("arándano")) tags.push("Con Berries 🫐");
    if (text.includes("chocoton") || text.includes("chocolate") || text.includes("cacao")) tags.push("Chocochips 🍫");
    if (text.includes("sacha") || text.includes("sancha")) tags.push("Sacha Inchi 🌰");
    if (text.includes("omega")) tags.push("Omegas 3-6-9 🥑");
    if (text.includes("vegano")) tags.push("Vegano 🌱");
    if (text.includes("proteic") || text.includes("proteína")) tags.push("Proteico 💪");
    if (text.includes("stevia")) tags.push("Con Stevia 🍃");
    if (text.includes("octógono")) tags.push("Sin Octógonos 🌿");
    if (text.includes("integral")) tags.push("Integral 🌾");
    if (text.includes("quinua")) tags.push("Superfood 🌟");
    if (text.includes("hongos")) tags.push("Hongos Silvestres 🍄");
    if (text.includes("artesanal") || text.includes("biopan") || text.includes("masa madre")) tags.push("Artesanal 🍞");
    return tags.slice(0, 3);
  };

  // Comprobar si cumple con la categoría activa
  const matchesCategory = (p: Producto, cat: string) => {
    if (cat === "all") return true;
    const text = (p.n + " " + p.b.join(" ") + " " + p.m).toLowerCase();
    if (cat === "vegano") return text.includes("vegano");
    if (cat === "stevia") return text.includes("stevia") || text.includes("sin azúcar") || text.includes("0%");
    if (cat === "proteico") return text.includes("proteic") || text.includes("proteína") || text.includes("tarwi") || text.includes("omega");
    if (cat === "integral") return text.includes("integral") || text.includes("quinua") || text.includes("semillas") || text.includes("omega") || text.includes("fibra");
    if (cat === "artesanal") return text.includes("artesanal") || text.includes("biopan") || text.includes("masa madre") || text.includes("omega");
    return true;
  };

  // Filtrado y ordenamiento de productos
  const productosFiltrados = useMemo(() => {
    let result = productos.map((p, idx) => ({ ...p, originalIndex: idx }));

    // Filtro por categoría
    result = result.filter((p) => matchesCategory(p, selectedCategory));

    // Filtro por marca
    if (selectedBrand !== "all") {
      result = result.filter((p) => p.m === selectedBrand);
    }

    // Filtro por término de búsqueda
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const corpus = (p.m + " " + p.n + " " + p.b.join(" ")).toLowerCase();
        return corpus.includes(q);
      });
    }

    // Ordenamiento
    if (sortBy === "price-asc") {
      result.sort((a, b) => (parsePrice(a.p) || 9999) - (parsePrice(b.p) || 9999));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (parsePrice(b.p) || -1) - (parsePrice(a.p) || -1));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.n.localeCompare(b.n));
    }

    return result;
  }, [productos, selectedCategory, selectedBrand, search, sortBy]);

  // ==========================================
  // 4. LÓGICA DE NEGOCIO DEL CARRITO
  // ==========================================
  const addToCart = (productIndex: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productIndex === productIndex);
      if (existing) {
        return prev.map((item) =>
          item.productIndex === productIndex ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { productIndex, qty: 1 }];
    });
    showToast(`✅ ${productos[productIndex].n} agregado al pedido`);
  };

  const updateCartQty = (productIndex: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productIndex === productIndex) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeCartItem = (productIndex: number) => {
    setCart((prev) => prev.filter((item) => item.productIndex !== productIndex));
    showToast("🗑️ Producto retirado del pedido");
  };

  // Totales financieros del carrito
  const cartTotals = useMemo(() => {
    let totalSoles = 0;
    let totalUnits = 0;
    let hasConsultarPrice = false;

    cart.forEach((item) => {
      const p = productos[item.productIndex];
      const priceNum = parsePrice(p.p);
      totalUnits += item.qty;
      if (priceNum !== null) {
        totalSoles += priceNum * item.qty;
      } else {
        hasConsultarPrice = true;
      }
    });

    return { totalSoles, totalUnits, hasConsultarPrice };
  }, [cart, productos]);

  // Mensaje estructurado de WhatsApp para finalizar el pedido
  const whatsappCheckoutUrl = useMemo(() => {
    if (cart.length === 0) return "#";

    let msg = `🎄 *¡HOLA! DESEO REALIZAR UN PEDIDO DE PANETONES* 🎄\n\n`;
    if (customerName.trim()) msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerAddress.trim()) msg += `📍 *Dirección/Distrito:* ${customerAddress.trim()}\n`;
    msg += `--------------------------------------\n`;
    msg += `*DETALLE DEL PEDIDO (${cartTotals.totalUnits} unidades):*\n\n`;

    cart.forEach((item, idx) => {
      const p = productos[item.productIndex];
      const priceNum = parsePrice(p.p);
      const subTotal = priceNum ? ` -> S/ ${(priceNum * item.qty).toFixed(2)}` : " -> (Consultar precio)";
      msg += `${idx + 1}. *${p.n}*\n`;
      msg += `   Cantidad: ${item.qty} unid.${subTotal}\n\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*TOTAL ESTIMADO: S/ ${cartTotals.totalSoles.toFixed(2)}*\n`;
    if (cartTotals.hasConsultarPrice) {
      msg += `*(Nota: Incluye producto con precio a confirmar)*\n`;
    }
    msg += `\n¿Me confirman disponibilidad y datos para la transferencia o Yape/Plin?`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }, [cart, cartTotals, customerName, customerAddress, productos]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================== */}
      {/* 5. BARRA DE ANUNCIO SUPERIOR               */}
      {/* ========================================== */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600 text-white text-xs md:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-3 flex-wrap shadow-sm">
        <span className="flex items-center gap-1.5">
          <span>🎄</span> ¡Campaña Navideña Abierta!
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5">
          <span>🍞</span> {productos.length} Variedades Gourmet, Veganas y Saludables
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5">
          <span>⚡</span> Pedidos directos vía WhatsApp
        </span>
      </div>

      {/* ========================================== */}
      {/* 6. HEADER PRINCIPAL STICKY                 */}
      {/* ========================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo y Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center text-2xl shadow-xs">
              ✨
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-serif leading-none">
                Catálogo de Panetones
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Organicos & Especiales · {productos.length} Opciones Saludables & Artesanales
              </p>
            </div>
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2.5">       

            {/* Botón de Carrito / Lista de Pedidos */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2 px-4 rounded-full flex items-center gap-2.5 shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Pedido</span>
              <span className="bg-white text-emerald-800 text-xs font-black px-2 py-0.5 rounded-full">
                {cartTotals.totalUnits}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 7. HERO BANNER COMERCIAL                   */}
      {/* ========================================== */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-amber-50/20 to-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Selección Gourmet & Saludable
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif mb-2.5">
              Panetones con Propósito: Salud, Tradición y Sabor
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed mb-5">
              Celebra con opciones libres de culpas: fórmulas veganas, masa madre, harinas integrales, stevia natural y ricas en proteínas. Selecciona tus favoritos y haz tu pedido directo a WhatsApp.
            </p>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <Leaf className="w-4 h-4 text-emerald-600" /> 100% Ingredientes Seleccionados
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <Wheat className="w-4 h-4 text-amber-600" /> Alternativas Integrales y con Stevia
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <Phone className="w-4 h-4 text-emerald-600" /> Atención Inmediata en WhatsApp
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. CONTROLES: BUSCADOR, FILTROS Y CHIPS    */}
      {/* ========================================== */}
      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3.5">
          {/* Fila: Buscador, Marca y Orden */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Buscador de texto */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, ingrediente (tarwi, stevia, quinua, hongos)..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all shadow-2xs"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Selector de Marca */}
            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all shadow-2xs cursor-pointer"
              >
                <option value="all">Todas las Marcas ({marcasDisponibles.length})</option>
                {marcasDisponibles.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Orden */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all shadow-2xs cursor-pointer"
              >
                <option value="default">Orden por Defecto</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
            </div>
          </div>

          {/* Chips de Categorías Rápidas */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: `✨ Todos (${productos.length})` },
              { id: "vegano", label: "🌱 Veganos & Sin Lactosa" },
              { id: "stevia", label: "🍃 Con Stevia / Sin Azúcar" },
              { id: "proteico", label: "💪 Proteicos" },
              { id: "integral", label: "🌾 Integrales & Semillas" },
              { id: "artesanal", label: "🍞 Artesanales" }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === chip.id
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Barra de Conteo y Estado */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
            <span>
              Mostrando <strong className="text-slate-800">{productosFiltrados.length}</strong> de{" "}
              {productos.length} panetones
            </span>
            <span>Precios expresados en Soles (S/)</span>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 9. GRILLA PRINCIPAL DE PRODUCTOS           */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full pb-28 md:pb-16">
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No se encontraron panetones con estos filtros
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Intenta cambiar los términos de búsqueda o restablecer la categoría.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedBrand("all");
              }}
              className="bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-lg cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((p) => {
              const tags = getProductTags(p);
              const waPriceText = p.p ? ` (${p.p})` : "";
              const directMsg = `¡Hola! Deseo pedir el *${p.n}*${waPriceText}. ¿Tienen disponibilidad?`;
              const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(directMsg)}`;

              return (
                <article
                  key={p.originalIndex}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:border-emerald-600 transition-all group"
                >
                  {/* Contenedor Superior: Imagen y Datos Básicos */}
                  <div>
                    <div className="flex gap-4 items-start mb-4">
                      {/* Imagen con zoom y clic para ver detalles */}
                      <div
                        onClick={() => setQuickViewProduct(p.originalIndex)}
                        className="w-32 h-36 shrink-0 bg-white border border-slate-100 rounded-xl p-2 flex items-center justify-center overflow-hidden cursor-pointer relative group-hover:border-emerald-200"
                        title="Haz clic para ver imagen y beneficios en grande"
                      >
                        <img
                          src={p.i}
                          alt={p.n}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 bg-slate-900/70 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver +
                        </span>
                      </div>

                      {/* Información de Marca y Nombre */}
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1.5">
                          {p.m}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-3 mb-2">
                          {p.n}
                        </h3>

                        {/* Badges de características */}
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {tags.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-semibold bg-slate-100 border border-slate-200/60 text-slate-700 px-2 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Beneficios Destacados */}
                    <div className="border-t border-dashed border-slate-200 pt-3 mb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Beneficios Destacados:
                      </div>
                      {p.b.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">
                          Ficha de ingredientes naturales estándar.
                        </p>
                      ) : (
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {p.b.slice(0, 3).map((bText, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                              <span className="line-clamp-2">{bText}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Pie de Tarjeta: Precio y Botones de Compra */}
                  <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-600 block leading-tight">
                        Precio
                      </span>
                      {p.p ? (
                        <span className="text-xl font-black text-slate-900 tracking-tight">
                          {p.p}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Consultar precio
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Botón Agregar al Carrito */}
                      <button
                        onClick={() => addToCart(p.originalIndex)}
                        className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 text-slate-800 text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Agregar a mi pedido"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>

                      {/* Botón WhatsApp directo */}
                      <a
                        href={directWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                        title="Pedir directamente por WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Pedir</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* 10. BARRA FLOTANTE MÓVIL INFERIOR          */}
      {/* ========================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-30 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-500 block leading-none">
            Total estimado ({cartTotals.totalUnits} unids):
          </span>
          <span className="text-lg font-black text-slate-900">
            S/ {cartTotals.totalSoles.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2.5 px-5 rounded-full flex items-center gap-2 shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ver Pedido</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* 11. MODAL DE CARRITO Y WHATSAPP            */}
      {/* ========================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Cabecera del Modal */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-700" /> Mi Pedido de Panetones
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del Carrito */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <h4 className="font-bold text-slate-700 mb-1">Tu lista de pedido está vacía</h4>
                  <p className="text-xs text-slate-500">Agrega panetones del catálogo para coordinar tu envío.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const p = productos[item.productIndex];
                      return (
                        <div
                          key={item.productIndex}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50"
                        >
                          <img
                            src={p.i}
                            alt={p.n}
                            className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{p.n}</h4>
                            <span className="text-xs font-black text-emerald-700">
                              {p.p || "A consultar"}
                            </span>
                          </div>

                          {/* Control de cantidad */}
                          <div className="flex items-center border border-slate-200 rounded-full bg-white overflow-hidden">
                            <button
                              onClick={() => updateCartQty(item.productIndex, -1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold min-w-6 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateCartQty(item.productIndex, 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Botón eliminar */}
                          <button
                            onClick={() => removeCartItem(item.productIndex)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Formulario de Datos Opcionales */}
                  <div className="border-t border-dashed border-slate-200 pt-3 space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Tu Nombre Completo:
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Distrito o Dirección de Entrega:
                      </label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                        placeholder="Ej. Miraflores, Lima"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Telefono:
                      </label>
                      <input
                        type="text"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                        required
                        placeholder="Ej.999999999"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Pie del Modal con Total y Botón de WhatsApp */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Total del Pedido:</span>
                  <span className="text-xl font-black text-emerald-800">
                    S/ {cartTotals.totalSoles.toFixed(2)}
                  </span>
                </div>
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enviar Pedido a WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 12. MODAL DE VISTA RÁPIDA (QUICK VIEW)     */}
      {/* ========================================== */}
      {quickViewProduct !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" /> Detalle del Panetón
              </h3>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="w-full h-52 bg-white rounded-xl border border-slate-100 p-3 flex items-center justify-center">
                <img
                  src={productos[quickViewProduct].i}
                  alt={productos[quickViewProduct].n}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {productos[quickViewProduct].m}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1 mb-2 font-serif">
                  {productos[quickViewProduct].n}
                </h2>
                <div className="text-xl font-black text-emerald-700 mb-3">
                  {productos[quickViewProduct].p || "Consultar precio"}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Beneficios Completos:
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {productos[quickViewProduct].b.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer"
              >
                Agregar al Carrito
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  `¡Hola! Deseo pedir el *${productos[quickViewProduct].n}* (${
                    productos[quickViewProduct].p || "precio a consultar"
                  }).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Pedir Directo</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 13. NOTIFICACIÓN TOAST                     */}
      {/* ========================================== */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )} 
      
    </div>
  );
}
