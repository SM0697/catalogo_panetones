// =========================================================================
// Script constructor del Catálogo HTML Moderno para Venta de Panetones
// =========================================================================
const fs = require('fs');
const path = require('path');

// 1. Cargar productos originales con todas sus imágenes en base64 intactas
const productosPath = path.join(__dirname, '..', 'src', 'data', 'productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf8'));

// 2. Estructura HTML con comentarios paso a paso, diseño responsivo y UX comercial
const html = `<!DOCTYPE html>
<html lang="es">

<head>
    <!-- ========================================== -->
    <!-- 1. META, TÍTULO Y TIPOGRAFÍAS              -->
    <!-- ========================================== -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>Catálogo Oficial de Panetones Artesanales & Saludables · Pedidos Online</title>
    <meta name="description" content="Descubre nuestra exclusiva selección de 17 panetones artesanales, veganos, integrales y proteicos. Haz tu pedido directo por WhatsApp con entrega rápida.">
    
    <!-- Fuentes Google: Outfit para texto moderno y Playfair Display para toques de panadería artesanal -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">

    <!-- ========================================== -->
    <!-- 2. ESTILOS CSS MODERNOS Y RESPONSIVOS       -->
    <!-- ========================================== -->
    <style>
        /* Variables de diseño y paleta de colores gourmet/artesanal */
        :root {
            --bg-body: #f8faf7;
            --bg-card: #ffffff;
            --bg-card-subtle: #f1f5f2;
            --primary: #15803d;
            --primary-dark: #0f582a;
            --primary-light: #dcfce7;
            --primary-glow: rgba(21, 128, 61, 0.15);
            --gold: #d97706;
            --gold-light: #fef3c7;
            --gold-border: #fde68a;
            --accent-red: #dc2626;
            --text-heading: #0f1f15;
            --text-body: #334155;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --whatsapp: #25d366;
            --whatsapp-dark: #1ea952;
            --whatsapp-glow: rgba(37, 211, 102, 0.25);
            --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 25px -4px rgba(0, 0, 0, 0.08);
            --shadow-xl: 0 20px 35px -5px rgba(0, 0, 0, 0.12);
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 18px;
            --radius-full: 9999px;
            --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-sizing: border-box;
            padding-top: env(safe-area-inset-top, 0px);
            padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        /* Modo Oscuro suave */
        :root[data-theme="dark"],
        @media (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
                --bg-body: #0d1410;
                --bg-card: #141e18;
                --bg-card-subtle: #1c2a22;
                --primary: #22c55e;
                --primary-dark: #16a34a;
                --primary-light: #172d1f;
                --primary-glow: rgba(34, 197, 94, 0.2);
                --gold: #f59e0b;
                --gold-light: #2d2410;
                --gold-border: #523e10;
                --accent-red: #ef4444;
                --text-heading: #f0fdf4;
                --text-body: #cbd5e1;
                --text-muted: #94a3b8;
                --border-color: #233529;
                --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
                --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.4);
                --shadow-lg: 0 10px 25px -4px rgba(0, 0, 0, 0.5);
                --shadow-xl: 0 20px 35px -5px rgba(0, 0, 0, 0.6);
            }
        }

        *, *::before, *::after { box-sizing: inherit; }
        body {
            margin: 0;
            background-color: var(--bg-body);
            color: var(--text-body);
            font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .font-serif { font-family: "Playfair Display", Georgia, serif; }

        .container {
            width: 100%;
            max-width: 1240px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px;
        }

        /* Banner de anuncio superior */
        .announcement-bar {
            background: linear-gradient(90deg, var(--primary-dark), var(--primary), var(--gold));
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            text-align: center;
            padding: 9px 16px;
            letter-spacing: 0.2px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        /* Encabezado fijo con carrito */
        header.site-header {
            background-color: var(--bg-card);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 50;
            box-shadow: var(--shadow-sm);
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 0;
            gap: 16px;
        }

        .brand-logo-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: inherit;
        }

        .brand-icon {
            width: 44px;
            height: 44px;
            background: var(--primary-light);
            color: var(--primary);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 2px 8px var(--primary-glow);
        }

        .brand-titles h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            color: var(--text-heading);
            letter-spacing: -0.4px;
            line-height: 1.1;
        }

        .brand-titles p {
            margin: 2px 0 0 0;
            font-size: 12px;
            color: var(--text-muted);
            font-weight: 500;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .theme-toggle-btn {
            background: var(--bg-card-subtle);
            border: 1px solid var(--border-color);
            color: var(--text-heading);
            width: 40px;
            height: 40px;
            border-radius: var(--radius-md);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: var(--transition);
        }

        .cart-btn-header {
            background: var(--primary);
            color: #ffffff;
            border: none;
            padding: 10px 18px;
            border-radius: var(--radius-full);
            font-family: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: var(--transition);
            box-shadow: 0 4px 12px var(--primary-glow);
        }

        .cart-btn-header:hover {
            background: var(--primary-dark);
            transform: translateY(-1px);
        }

        .cart-count-badge {
            background: #ffffff;
            color: var(--primary);
            font-size: 12px;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: var(--radius-full);
            min-width: 20px;
            text-align: center;
        }

        /* Hero Comercial */
        .hero-banner {
            padding: 32px 0 20px;
            background: radial-gradient(circle at 80% 20%, var(--primary-light) 0%, transparent 60%);
        }

        .hero-card {
            background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-subtle) 100%);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 28px 24px;
            box-shadow: var(--shadow-md);
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: var(--gold-light);
            color: var(--gold);
            border: 1px solid var(--gold-border);
            font-size: 12px;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: var(--radius-full);
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-bottom: 12px;
        }

        .hero-title {
            font-size: clamp(26px, 4vw, 38px);
            font-weight: 800;
            color: var(--text-heading);
            margin: 0 0 10px;
            line-height: 1.15;
            letter-spacing: -0.5px;
        }

        .hero-subtitle {
            font-size: 15px;
            color: var(--text-muted);
            max-width: 680px;
            margin: 0 0 16px;
            line-height: 1.6;
        }

        .hero-features {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-body);
        }

        /* Sección de Filtros y Búsqueda */
        .controls-section {
            padding: 16px 0 20px;
        }

        .search-and-sort-row {
            display: grid;
            grid-template-columns: 1fr auto auto;
            gap: 12px;
            margin-bottom: 14px;
        }

        @media (max-width: 768px) {
            .search-and-sort-row {
                grid-template-columns: 1fr;
            }
        }

        .search-box {
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-box input {
            width: 100%;
            height: 46px;
            padding: 0 16px 0 44px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 14px;
            color: var(--text-heading);
            outline: none;
            transition: var(--transition);
        }

        .search-box input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .search-icon {
            position: absolute;
            left: 14px;
            color: var(--text-muted);
            font-size: 18px;
            pointer-events: none;
        }

        .clear-search-btn {
            position: absolute;
            right: 12px;
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 16px;
            display: none;
            padding: 4px;
        }

        .select-filter {
            height: 46px;
            padding: 0 16px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 14px;
            color: var(--text-heading);
            cursor: pointer;
            outline: none;
            transition: var(--transition);
        }

        .select-filter:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .category-chips-scroll {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }
        .category-chips-scroll::-webkit-scrollbar { display: none; }

        .chip-btn {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 8px 16px;
            border-radius: var(--radius-full);
            font-family: inherit;
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
            cursor: pointer;
            transition: var(--transition);
        }

        .chip-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: #ffffff;
            box-shadow: 0 2px 8px var(--primary-glow);
        }

        .status-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            font-size: 13px;
            color: var(--text-muted);
            font-weight: 500;
        }

        /* Cuadrícula de Tarjetas de Producto */
        main#grid {
            display: grid;
            gap: 22px;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
            padding-bottom: 70px;
        }

        .card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: var(--shadow-sm);
            transition: var(--transition);
        }

        .card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-lg);
            transform: translateY(-3px);
        }

        .card-main-content {
            display: flex;
            gap: 18px;
            align-items: flex-start;
        }

        .pic-wrapper {
            flex: 0 0 135px;
            width: 135px;
            height: 145px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
            cursor: pointer;
        }

        .pic-wrapper img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.4s ease;
        }

        .card:hover .pic-wrapper img { transform: scale(1.06); }

        .pic-zoom-hint {
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: rgba(15, 23, 42, 0.7);
            color: #ffffff;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: var(--radius-sm);
            opacity: 0;
            transition: var(--transition);
        }
        .pic-wrapper:hover .pic-zoom-hint { opacity: 1; }

        .card-details {
            flex: 1 1 auto;
            min-width: 0;
            display: flex;
            flex-direction: column;
        }

        .brand-badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: var(--primary);
            background: var(--primary-light);
            padding: 3px 8px;
            border-radius: var(--radius-full);
            align-self: flex-start;
            margin-bottom: 6px;
        }

        .product-name {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-heading);
            margin: 0 0 8px;
            line-height: 1.3;
        }

        .tag-pills-row {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
            margin-bottom: 8px;
        }

        .tag-pill {
            font-size: 11px;
            font-weight: 600;
            padding: 2px 7px;
            border-radius: var(--radius-sm);
            background: var(--bg-card-subtle);
            color: var(--text-body);
            border: 1px solid var(--border-color);
        }

        .benefits-section {
            border-top: 1px dashed var(--border-color);
            padding-top: 12px;
            margin-top: auto;
        }

        .benefits-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
            margin: 0 0 8px;
        }

        ul.benefits-list {
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 1.45;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        ul.benefits-list li {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            color: var(--text-body);
        }

        ul.benefits-list li .bullet-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--primary);
            margin-top: 7px;
            flex-shrink: 0;
        }

        .card-footer-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding-top: 14px;
            border-top: 1px solid var(--border-color);
            margin-top: auto;
        }

        .price-box {
            display: flex;
            flex-direction: column;
        }

        .price-label {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: 600;
            text-transform: uppercase;
        }

        .price-value {
            font-size: 22px;
            font-weight: 800;
            color: var(--text-heading);
            letter-spacing: -0.5px;
        }

        .price-value.na {
            font-size: 14px;
            font-weight: 600;
            color: var(--gold);
        }

        .card-buttons-group {
            display: flex;
            gap: 8px;
        }

        .btn-add-cart {
            background: var(--bg-card-subtle);
            border: 1px solid var(--border-color);
            color: var(--text-heading);
            padding: 9px 14px;
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition);
        }

        .btn-add-cart:hover {
            border-color: var(--primary);
            background: var(--primary-light);
            color: var(--primary);
        }

        .btn-whatsapp-direct {
            background: var(--whatsapp);
            color: #ffffff;
            border: none;
            padding: 9px 14px;
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition);
            box-shadow: 0 2px 8px var(--whatsapp-glow);
        }

        .btn-whatsapp-direct:hover {
            background: var(--whatsapp-dark);
            transform: translateY(-1px);
        }

        @media (max-width: 540px) {
            .card { padding: 16px; gap: 14px; }
            .card-main-content { flex-direction: column-reverse; gap: 12px; }
            .pic-wrapper { width: 100%; flex: none; height: 180px; }
            .card-footer-action { flex-direction: column; align-items: stretch; gap: 12px; }
            .price-box { flex-direction: row; align-items: baseline; justify-content: space-between; }
            .card-buttons-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
            .btn-add-cart, .btn-whatsapp-direct { justify-content: center; padding: 12px 10px; }
        }

        /* Barra flotante para móviles */
        .mobile-floating-bar {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--bg-card);
            border-top: 1px solid var(--border-color);
            padding: 12px 16px;
            z-index: 60;
            box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
            .mobile-floating-bar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
        }

        .mobile-bar-summary { font-size: 12px; color: var(--text-muted); }
        .mobile-bar-total { font-size: 18px; font-weight: 800; color: var(--text-heading); }
        .mobile-bar-btn {
            background: var(--primary);
            color: #ffffff;
            border: none;
            padding: 12px 20px;
            border-radius: var(--radius-full);
            font-family: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Modales */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(4px);
            z-index: 100;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 16px;
        }

        .modal-overlay.open { display: flex; }

        .modal-container {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 520px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
        }

        .modal-header {
            padding: 18px 22px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .modal-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 800;
            color: var(--text-heading);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .close-modal-btn {
            background: none;
            border: none;
            font-size: 22px;
            color: var(--text-muted);
            cursor: pointer;
            padding: 4px;
        }

        .modal-body {
            padding: 20px 22px;
            overflow-y: auto;
            flex: 1 1 auto;
        }

        .cart-empty-state {
            text-align: center;
            padding: 40px 10px;
            color: var(--text-muted);
        }

        .cart-items-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .cart-item-row {
            display: flex;
            align-items: center;
            gap: 14px;
            padding-bottom: 14px;
            border-bottom: 1px solid var(--border-color);
        }

        .cart-item-thumb {
            width: 50px;
            height: 50px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: 3px;
            object-fit: contain;
            flex-shrink: 0;
        }

        .cart-item-info { flex: 1 1 auto; min-width: 0; }
        .cart-item-name {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-heading);
            margin: 0 0 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .cart-item-price { font-size: 13px; font-weight: 800; color: var(--primary); }

        .cart-item-qty-controls {
            display: flex;
            align-items: center;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-full);
            background: var(--bg-card-subtle);
            overflow: hidden;
        }

        .qty-btn {
            background: none;
            border: none;
            color: var(--text-heading);
            width: 28px;
            height: 28px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
        }

        .qty-display {
            padding: 0 8px;
            font-size: 13px;
            font-weight: 700;
            min-width: 24px;
            text-align: center;
        }

        .cart-item-remove-btn {
            background: none;
            border: none;
            color: var(--accent-red);
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
        }

        .cart-form-section {
            margin-top: 18px;
            padding-top: 16px;
            border-top: 1px dashed var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .cart-form-field label {
            display: block;
            font-size: 12px;
            font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 5px;
        }

        .cart-form-field input {
            width: 100%;
            padding: 10px 14px;
            background: var(--bg-body);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 14px;
            color: var(--text-heading);
            outline: none;
        }

        .modal-footer {
            padding: 16px 22px;
            border-top: 1px solid var(--border-color);
            background: var(--bg-card-subtle);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .cart-total-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .cart-total-label { font-size: 14px; font-weight: 700; color: var(--text-muted); }
        .cart-total-amount { font-size: 24px; font-weight: 800; color: var(--primary); }

        .btn-checkout-whatsapp {
            background: var(--whatsapp);
            color: #ffffff;
            border: none;
            padding: 14px 20px;
            border-radius: var(--radius-md);
            font-family: inherit;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            box-shadow: 0 4px 14px var(--whatsapp-glow);
        }

        /* Quick View Modal */
        .quickview-body { display: flex; gap: 20px; flex-direction: column; }
        .quickview-img-wrap {
            width: 100%;
            height: 240px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .quickview-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }

        /* Toast */
        .toast-notification {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: var(--primary-dark);
            color: #ffffff;
            padding: 12px 20px;
            border-radius: var(--radius-md);
            font-size: 14px;
            font-weight: 600;
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 200;
            opacity: 0;
            transform: translateY(20px);
            transition: var(--transition);
            pointer-events: none;
        }
        .toast-notification.show { opacity: 1; transform: translateY(0); }

        /* Footer */
        footer.site-footer {
            margin-top: auto;
            background: var(--bg-card);
            border-top: 1px solid var(--border-color);
            padding: 40px 0 30px;
            color: var(--text-muted);
            font-size: 13px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 28px;
        }

        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr; gap: 20px; }
        }

        .footer-col h4 {
            color: var(--text-heading);
            font-size: 15px;
            margin: 0 0 10px;
            font-weight: 700;
        }

        .footer-col p { margin: 0 0 8px; line-height: 1.6; }
        .footer-bottom {
            border-top: 1px solid var(--border-color);
            padding-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
    </style>
</head>

<body>
    <!-- Barra de Anuncio Superior -->
    <div class="announcement-bar">
        <span>🎄 ¡Campaña Navideña Abierta!</span>
        <span>•</span>
        <span>🍞 Panetones Artesanales, Veganos y Saludables</span>
        <span>•</span>
        <span>⚡ Envíos Rápidos & Pedidos por WhatsApp</span>
    </div>

    <!-- Encabezado Principal -->
    <header class="site-header">
        <div class="container header-content">
            <div class="brand-logo-wrap">
                <div class="brand-icon">✨</div>
                <div class="brand-titles">
                    <h1 class="font-serif">Catálogo de Panetones</h1>
                    <p>Organa & Especiales · \${productos.length} Variedades Gourmet & Saludables</p>
                </div>
            </div>

            <div class="header-actions">
                <button type="button" class="theme-toggle-btn" id="themeToggleBtn" title="Cambiar tema">🌙</button>
                <button type="button" class="cart-btn-header" id="headerCartBtn">
                    <span>🛒</span>
                    <span class="cart-btn-text">Ver Pedido</span>
                    <span class="cart-count-badge" id="cartCountBadge">0</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Hero / Presentación Comercial -->
    <section class="hero-banner">
        <div class="container">
            <div class="hero-card">
                <span class="hero-badge">⭐ Calidad Premium Seleccionada</span>
                <h2 class="hero-title font-serif">Panetones con Propósito: Salud, Tradición y Sabor</h2>
                <p class="hero-subtitle">
                    Disfruta de la mejor época del año sin culpas. Opciones veganas, con masa madre, harinas integrales, endulzadas con stevia y ricas en proteínas y nutrientes naturales.
                </p>
                <div class="hero-features">
                    <div><span>🌱</span> 100% Ingredientes Seleccionados</div>
                    <div><span>🍯</span> Sin Azúcares Refinados Excesivos</div>
                    <div><span>📲</span> Atención Inmediata por WhatsApp</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Barra de Búsqueda, Filtros y Ordenamiento -->
    <section class="controls-section">
        <div class="container">
            <div class="search-and-sort-row">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="searchInput" placeholder="Buscar por nombre, marca o ingrediente (ej. tarwi, stevia, quinua, hongos)..." autocomplete="off">
                    <button type="button" class="clear-search-btn" id="clearSearchBtn">✕</button>
                </div>

                <select class="select-filter" id="brandSelect">
                    <option value="all">Todas las Marcas (\${[...new Set(productos.map(p => p.m))].length})</option>
                </select>

                <select class="select-filter" id="sortSelect">
                    <option value="default">Ordenar por Defecto</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre: A - Z</option>
                </select>
            </div>

            <div class="category-chips-scroll" id="categoryChips">
                <button type="button" class="chip-btn active" data-category="all">✨ Todos los Panetones (\${productos.length})</button>
                <button type="button" class="chip-btn" data-category="vegano">🌱 Veganos & Sin Lactosa</button>
                <button type="button" class="chip-btn" data-category="stevia">🍃 Con Stevia / Sin Azúcar</button>
                <button type="button" class="chip-btn" data-category="proteico">💪 Proteicos</button>
                <button type="button" class="chip-btn" data-category="integral">🌾 Integrales & Semillas</button>
                <button type="button" class="chip-btn" data-category="artesanal">🍞 Artesanales</button>
            </div>

            <div class="status-bar">
                <span id="resultsCount">Mostrando 17 panetones</span>
                <span style="font-size: 12px;">Precios en Soles peruanos (S/)</span>
            </div>
        </div>
    </section>

    <!-- Cuadrícula Principal de Productos -->
    <div class="container">
        <main id="grid"></main>
    </div>

    <!-- Barra Flotante Móvil -->
    <div class="mobile-floating-bar" id="mobileFloatingBar">
        <div class="mobile-bar-summary">
            <div>Total (<span id="mobileCount">0</span> unids):</div>
            <div class="mobile-bar-total" id="mobileTotal">S/ 0.00</div>
        </div>
        <button type="button" class="mobile-bar-btn" id="mobileCartOpenBtn">
            <span>🛒</span> Ver Pedido
        </button>
    </div>

    <!-- Modal de Carrito / WhatsApp -->
    <div class="modal-overlay" id="cartModal">
        <div class="modal-container">
            <div class="modal-header">
                <h3><span>🛒</span> Mi Pedido de Panetones</h3>
                <button type="button" class="close-modal-btn" id="closeCartBtn">&times;</button>
            </div>

            <div class="modal-body">
                <div id="cartContent"></div>

                <div class="cart-form-section" id="cartFormSection" style="display: none;">
                    <div class="cart-form-field">
                        <label for="customerName">Tu Nombre Completo (Opcional):</label>
                        <input type="text" id="customerName" placeholder="Ej. Carlos Mendoza">
                    </div>
                    <div class="cart-form-field">
                        <label for="customerAddress">Distrito o Dirección de Entrega (Opcional):</label>
                        <input type="text" id="customerAddress" placeholder="Ej. Miraflores, Lima">
                    </div>
                </div>
            </div>

            <div class="modal-footer" id="cartFooter" style="display: none;">
                <div class="cart-total-row">
                    <span class="cart-total-label">Total del Pedido:</span>
                    <span class="cart-total-amount" id="cartTotalAmount">S/ 0.00</span>
                </div>
                <a href="#" target="_blank" class="btn-checkout-whatsapp" id="checkoutWhatsappBtn">
                    <span>📲</span> Enviar Pedido a WhatsApp
                </a>
            </div>
        </div>
    </div>

    <!-- Modal Detalle Rápido (Quick View) -->
    <div class="modal-overlay" id="quickViewModal">
        <div class="modal-container" style="max-width: 560px;">
            <div class="modal-header">
                <h3><span>🔍</span> Detalle del Panetón</h3>
                <button type="button" class="close-modal-btn" id="closeQvBtn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quickview-body">
                    <div class="quickview-img-wrap">
                        <img id="qvImage" src="" alt="">
                    </div>
                    <div>
                        <span class="brand-badge" id="qvBrand">MARCA</span>
                        <h2 class="product-name font-serif" id="qvName" style="font-size: 20px; margin-top: 6px;">Nombre</h2>
                        <div class="price-value" id="qvPrice" style="color: var(--primary); margin-bottom: 14px;">S/ 00.00</div>
                        <div class="benefits-title">Beneficios Destacados:</div>
                        <ul class="benefits-list" id="qvBenefits"></ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="flex-direction: row; justify-content: flex-end;">
                <button type="button" class="btn-add-cart" id="qvAddToCartBtn" style="padding: 12px 18px;">
                    <span>🛒</span> Agregar
                </button>
                <a href="#" target="_blank" class="btn-whatsapp-direct" id="qvWhatsappBtn" style="padding: 12px 18px;">
                    <span>📲</span> Pedir por WhatsApp
                </a>
            </div>
        </div>
    </div>

    <!-- Toast de Notificación -->
    <div class="toast-notification" id="toastNotification">
        <span id="toastIcon">✅</span>
        <span id="toastMsg">Panetón agregado</span>
    </div>

    <!-- Pie de Página -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4 class="font-serif">Catálogo de Panetones Saludables</h4>
                    <p>Variedades seleccionadas con masa madre, harinas nutritivas y alternativas conscientes sin conservantes artificiales.</p>
                    <p>Precios e información según la ficha técnica de cada producto en <strong>organa.com.pe</strong>.</p>
                </div>
                <div class="footer-col">
                    <h4>Atención & Pedidos</h4>
                    <p>📱 Pedidos directos vía WhatsApp</p>
                    <p>🚚 Entregas locales y envíos corporativos</p>
                    <p>💳 Aceptamos Yape, Plin y Transferencias</p>
                </div>
                <div class="footer-col">
                    <h4>Variedades</h4>
                    <p>• Panetones Veganos</p>
                    <p>• Panetones con Stevia</p>
                    <p>• Panetones Proteicos</p>
                </div>
            </div>

            <div class="footer-bottom">
                <div>© 2026 Catálogo de Panetones · Todos los derechos reservados.</div>
                <div>Formato optimizado para ventas digitales y navegación en móviles.</div>
            </div>
        </div>
    </footer>

    <!-- ========================================== -->
    <!-- 8. LÓGICA JAVASCRIPT Y PRODUCTOS           -->
    <!-- ========================================== -->
    <script>
        // Número oficial de WhatsApp para pedidos (Configurable)
        const WHATSAPP_PHONE = "51924428088";

        // Panetones con sus datos e imágenes completas
        const productos = ${JSON.stringify(productos, null, 2)};

        // Estado reactivo
        const state = {
            search: "",
            category: "all",
            brand: "all",
            sort: "default",
            cart: [],
            selectedProduct: null
        };

        document.addEventListener("DOMContentLoaded", () => {
            initBrandSelect();
            initThemeToggle();
            initEventListeners();
            loadCartFromStorage();
            renderCatalog();
            updateCartUI();
        });

        // Parsear precio numérico seguro
        function parsePrice(priceStr) {
            if (!priceStr || typeof priceStr !== "string") return null;
            const cleaned = priceStr.replace(/[^0-9.]/g, "");
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
        }

        // Tags automáticos
        function getProductTags(p) {
            const tags = [];
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
            if (text.includes("hongos")) tags.push("Hongos 🍄");
            if (text.includes("artesanal") || text.includes("biopan") || text.includes("masa madre")) tags.push("Artesanal 🍞");
            return tags.slice(0, 3);
        }

        function matchesCategory(p, cat) {
            if (cat === "all") return true;
            const text = (p.n + " " + p.b.join(" ") + " " + p.m).toLowerCase();
            if (cat === "vegano") return text.includes("vegano");
            if (cat === "stevia") return text.includes("stevia") || text.includes("sin azúcar") || text.includes("0%");
            if (cat === "proteico") return text.includes("proteic") || text.includes("proteína") || text.includes("tarwi") || text.includes("omega");
            if (cat === "integral") return text.includes("integral") || text.includes("quinua") || text.includes("semillas") || text.includes("omega") || text.includes("fibra");
            if (cat === "artesanal") return text.includes("artesanal") || text.includes("biopan") || text.includes("masa madre") || text.includes("omega");
            return true;
        }

        function initBrandSelect() {
            const select = document.getElementById("brandSelect");
            const brands = [...new Set(productos.map(p => p.m))].sort();
            brands.forEach(brand => {
                const opt = document.createElement("option");
                opt.value = brand;
                opt.textContent = brand;
                select.appendChild(opt);
            });
        }

        function initThemeToggle() {
            const btn = document.getElementById("themeToggleBtn");
            const saved = localStorage.getItem("panetones_theme");
            if (saved) {
                document.documentElement.setAttribute("data-theme", saved);
                btn.textContent = saved === "dark" ? "☀️" : "🌙";
            }
            btn.addEventListener("click", () => {
                const curr = document.documentElement.getAttribute("data-theme");
                const next = curr === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", next);
                localStorage.setItem("panetones_theme", next);
                btn.textContent = next === "dark" ? "☀️" : "🌙";
            });
        }

        function initEventListeners() {
            const searchInput = document.getElementById("searchInput");
            const clearBtn = document.getElementById("clearSearchBtn");

            searchInput.addEventListener("input", (e) => {
                state.search = e.target.value.trim().toLowerCase();
                clearBtn.style.display = state.search ? "block" : "none";
                renderCatalog();
            });

            clearBtn.addEventListener("click", () => {
                searchInput.value = "";
                state.search = "";
                clearBtn.style.display = "none";
                renderCatalog();
                searchInput.focus();
            });

            document.getElementById("brandSelect").addEventListener("change", (e) => {
                state.brand = e.target.value;
                renderCatalog();
            });

            document.getElementById("sortSelect").addEventListener("change", (e) => {
                state.sort = e.target.value;
                renderCatalog();
            });

            document.querySelectorAll("#categoryChips .chip-btn").forEach(chip => {
                chip.addEventListener("click", () => {
                    document.querySelectorAll("#categoryChips .chip-btn").forEach(c => c.classList.remove("active"));
                    chip.classList.add("active");
                    state.category = chip.getAttribute("data-category");
                    renderCatalog();
                });
            });

            document.getElementById("headerCartBtn").addEventListener("click", openCartModal);
            document.getElementById("mobileCartOpenBtn").addEventListener("click", openCartModal);
            document.getElementById("closeCartBtn").addEventListener("click", closeCartModal);
            document.getElementById("cartModal").addEventListener("click", (e) => {
                if (e.target.id === "cartModal") closeCartModal();
            });

            document.getElementById("closeQvBtn").addEventListener("click", closeQuickViewModal);
            document.getElementById("quickViewModal").addEventListener("click", (e) => {
                if (e.target.id === "quickViewModal") closeQuickViewModal();
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    closeCartModal();
                    closeQuickViewModal();
                }
            });

            document.getElementById("qvAddToCartBtn").addEventListener("click", () => {
                if (state.selectedProduct !== null) {
                    addToCart(state.selectedProduct);
                    closeQuickViewModal();
                }
            });

            document.getElementById("customerName").addEventListener("input", updateWhatsappCheckoutLink);
            document.getElementById("customerAddress").addEventListener("input", updateWhatsappCheckoutLink);
        }

        // Renderizado seguro del catálogo
        function renderCatalog() {
            const grid = document.getElementById("grid");
            grid.innerHTML = "";

            let filtered = productos.map((p, idx) => ({ ...p, originalIndex: idx })).filter(p => {
                if (!matchesCategory(p, state.category)) return false;
                if (state.brand !== "all" && p.m !== state.brand) return false;
                if (state.search) {
                    const str = (p.m + " " + p.n + " " + p.b.join(" ")).toLowerCase();
                    if (!str.includes(state.search)) return false;
                }
                return true;
            });

            if (state.sort === "price-asc") {
                filtered.sort((a, b) => (parsePrice(a.p) || 9999) - (parsePrice(b.p) || 9999));
            } else if (state.sort === "price-desc") {
                filtered.sort((a, b) => (parsePrice(b.p) || -1) - (parsePrice(a.p) || -1));
            } else if (state.sort === "name-asc") {
                filtered.sort((a, b) => a.n.localeCompare(b.n));
            }

            document.getElementById("resultsCount").textContent = "Mostrando " + filtered.length + " de " + productos.length + " panetones";

            if (filtered.length === 0) {
                const empty = document.createElement("div");
                empty.style.gridColumn = "1 / -1";
                empty.style.textAlign = "center";
                empty.style.padding = "50px 20px";
                empty.style.color = "var(--text-muted)";
                empty.innerHTML = "<h3>No se encontraron panetones</h3><p>Intenta con otros filtros o términos de búsqueda.</p>";
                grid.appendChild(empty);
                return;
            }

            filtered.forEach(p => {
                const card = document.createElement("article");
                card.className = "card";

                // Contenido superior
                const mainContent = document.createElement("div");
                mainContent.className = "card-main-content";

                const picWrap = document.createElement("div");
                picWrap.className = "pic-wrapper";
                picWrap.title = "Haz clic para ver imagen y beneficios";
                picWrap.addEventListener("click", () => openQuickView(p.originalIndex));

                const img = document.createElement("img");
                img.src = p.i;
                img.alt = p.n;
                img.loading = "lazy";

                const zoomHint = document.createElement("span");
                zoomHint.className = "pic-zoom-hint";
                zoomHint.textContent = "Ver +";

                picWrap.appendChild(img);
                picWrap.appendChild(zoomHint);

                const details = document.createElement("div");
                details.className = "card-details";

                const brandBadge = document.createElement("span");
                brandBadge.className = "brand-badge";
                brandBadge.textContent = p.m;

                const name = document.createElement("h2");
                name.className = "product-name";
                name.textContent = p.n;

                const tagRow = document.createElement("div");
                tagRow.className = "tag-pills-row";
                const tags = getProductTags(p);
                tags.forEach(t => {
                    const pill = document.createElement("span");
                    pill.className = "tag-pill";
                    pill.textContent = t;
                    tagRow.appendChild(pill);
                });

                details.appendChild(brandBadge);
                details.appendChild(name);
                if (tags.length > 0) details.appendChild(tagRow);

                mainContent.appendChild(picWrap);
                mainContent.appendChild(details);
                card.appendChild(mainContent);

                // Sección beneficios
                const bSec = document.createElement("div");
                bSec.className = "benefits-section";

                const bTitle = document.createElement("div");
                bTitle.className = "benefits-title";
                bTitle.textContent = "Beneficios Destacados:";
                bSec.appendChild(bTitle);

                if (!p.b || p.b.length === 0) {
                    const noB = document.createElement("p");
                    noB.style.color = "var(--text-muted)";
                    noB.style.fontSize = "12px";
                    noB.style.fontStyle = "italic";
                    noB.textContent = "Ficha de ingredientes naturales estándar.";
                    bSec.appendChild(noB);
                } else {
                    const ul = document.createElement("ul");
                    ul.className = "benefits-list";
                    p.b.slice(0, 3).forEach(bText => {
                        const li = document.createElement("li");
                        const dot = document.createElement("span");
                        dot.className = "bullet-dot";
                        const span = document.createElement("span");
                        span.textContent = bText;
                        li.appendChild(dot);
                        li.appendChild(span);
                        ul.appendChild(li);
                    });
                    bSec.appendChild(ul);
                }
                card.appendChild(bSec);

                // Footer de tarjeta (Precio + Botones)
                const footer = document.createElement("div");
                footer.className = "card-footer-action";

                const priceBox = document.createElement("div");
                priceBox.className = "price-box";
                const priceLbl = document.createElement("span");
                priceLbl.className = "price-label";
                priceLbl.textContent = "Precio";
                const priceVal = document.createElement("div");
                priceVal.className = "price-value";
                if (p.p && p.p.trim() !== "") {
                    priceVal.textContent = p.p;
                } else {
                    priceVal.textContent = "Consultar precio";
                    priceVal.classList.add("na");
                }
                priceBox.appendChild(priceLbl);
                priceBox.appendChild(priceVal);

                const btnGroup = document.createElement("div");
                btnGroup.className = "card-buttons-group";

                const addBtn = document.createElement("button");
                addBtn.type = "button";
                addBtn.className = "btn-add-cart";
                addBtn.innerHTML = "<span>🛒</span> Agregar";
                addBtn.title = "Añadir al pedido";
                addBtn.addEventListener("click", () => addToCart(p.originalIndex));

                const waBtn = document.createElement("a");
                waBtn.className = "btn-whatsapp-direct";
                waBtn.target = "_blank";
                waBtn.rel = "noopener noreferrer";
                const directMsg = "¡Hola! Estoy interesado en pedir el *" + p.n + "* (" + (p.p || "precio a consultar") + "). ¿Tienen disponibilidad?";
                waBtn.href = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(directMsg);
                waBtn.innerHTML = "<span>📲</span> Pedir";
                waBtn.title = "Pedir directo por WhatsApp";

                btnGroup.appendChild(addBtn);
                btnGroup.appendChild(waBtn);

                footer.appendChild(priceBox);
                footer.appendChild(btnGroup);
                card.appendChild(footer);

                grid.appendChild(card);
            });
        }

        // Lógica de Carrito
        function loadCartFromStorage() {
            try {
                const s = localStorage.getItem("panetones_cart");
                if (s) state.cart = JSON.parse(s);
            } catch (e) { state.cart = []; }
        }

        function saveCartToStorage() {
            try { localStorage.setItem("panetones_cart", JSON.stringify(state.cart)); } catch (e) {}
        }

        function addToCart(index) {
            const ex = state.cart.find(i => i.productIndex === index);
            if (ex) ex.qty += 1;
            else state.cart.push({ productIndex: index, qty: 1 });
            saveCartToStorage();
            updateCartUI();
            showToast("✅ " + productos[index].n + " agregado al pedido");
        }

        function updateCartQty(index, delta) {
            const item = state.cart.find(i => i.productIndex === index);
            if (!item) return;
            item.qty += delta;
            if (item.qty <= 0) state.cart = state.cart.filter(i => i.productIndex !== index);
            saveCartToStorage();
            updateCartUI();
            renderCartModalContent();
        }

        function removeCartItem(index) {
            state.cart = state.cart.filter(i => i.productIndex !== index);
            saveCartToStorage();
            updateCartUI();
            renderCartModalContent();
            showToast("🗑️ Producto retirado del pedido");
        }

        function calculateCartTotals() {
            let totalSoles = 0;
            let totalItems = 0;
            let hasConsultar = false;

            state.cart.forEach(item => {
                const p = productos[item.productIndex];
                const priceNum = parsePrice(p.p);
                totalItems += item.qty;
                if (priceNum !== null) totalSoles += priceNum * item.qty;
                else hasConsultar = true;
            });

            return { totalSoles, totalItems, hasConsultar };
        }

        function updateCartUI() {
            const { totalSoles, totalItems } = calculateCartTotals();
            document.getElementById("cartCountBadge").textContent = totalItems;
            document.getElementById("mobileCount").textContent = totalItems;
            document.getElementById("mobileTotal").textContent = "S/ " + totalSoles.toFixed(2);
            document.getElementById("cartTotalAmount").textContent = "S/ " + totalSoles.toFixed(2);
            updateWhatsappCheckoutLink();
        }

        function updateWhatsappCheckoutLink() {
            const { totalSoles, totalItems, hasConsultar } = calculateCartTotals();
            const btn = document.getElementById("checkoutWhatsappBtn");

            if (state.cart.length === 0) {
                btn.href = "#";
                return;
            }

            const name = document.getElementById("customerName").value.trim();
            const addr = document.getElementById("customerAddress").value.trim();

            let msg = "🎄 *¡HOLA! DESEO REALIZAR UN PEDIDO DE PANETONES* 🎄\\n\\n";
            if (name) msg += "👤 *Cliente:* " + name + "\\n";
            if (addr) msg += "📍 *Dirección/Distrito:* " + addr + "\\n";
            msg += "--------------------------------------\\n";
            msg += "*DETALLE DEL PEDIDO (" + totalItems + " unidades):*\\n\\n";

            state.cart.forEach((item, idx) => {
                const p = productos[item.productIndex];
                const priceNum = parsePrice(p.p);
                const subText = priceNum ? (" -> S/ " + (priceNum * item.qty).toFixed(2)) : " -> (Consultar precio)";
                msg += (idx + 1) + ". *" + p.n + "*\\n";
                msg += "   Cantidad: " + item.qty + " unid." + subText + "\\n\\n";
            });

            msg += "--------------------------------------\\n";
            msg += "*TOTAL ESTIMADO: S/ " + totalSoles.toFixed(2) + "*\\n";
            if (hasConsultar) msg += "*(Nota: Incluye producto con precio a confirmar)*\\n";
            msg += "\\n¿Me confirman disponibilidad y datos de pago por favor?";

            btn.href = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(msg);
        }

        function openCartModal() {
            renderCartModalContent();
            updateWhatsappCheckoutLink();
            document.getElementById("cartModal").classList.add("open");
        }

        function closeCartModal() {
            document.getElementById("cartModal").classList.remove("open");
        }

        function renderCartModalContent() {
            const container = document.getElementById("cartContent");
            const formSec = document.getElementById("cartFormSection");
            const footer = document.getElementById("cartFooter");

            container.innerHTML = "";

            if (state.cart.length === 0) {
                formSec.style.display = "none";
                footer.style.display = "none";
                container.innerHTML = \`
                    <div class="cart-empty-state">
                        <span style="font-size: 42px; display: block; margin-bottom: 8px;">🛒</span>
                        <h4 style="margin: 0 0 6px; color: var(--text-heading);">Tu lista de pedido está vacía</h4>
                        <p style="margin: 0; font-size: 13px;">Explora el catálogo y agrega tus panetones favoritos.</p>
                    </div>
                \`;
                return;
            }

            formSec.style.display = "flex";
            footer.style.display = "flex";

            const list = document.createElement("div");
            list.className = "cart-items-list";

            state.cart.forEach(item => {
                const p = productos[item.productIndex];
                const row = document.createElement("div");
                row.className = "cart-item-row";

                const thumb = document.createElement("img");
                thumb.className = "cart-item-thumb";
                thumb.src = p.i;
                thumb.alt = p.n;

                const info = document.createElement("div");
                info.className = "cart-item-info";
                const name = document.createElement("div");
                name.className = "cart-item-name";
                name.textContent = p.n;
                const price = document.createElement("div");
                price.className = "cart-item-price";
                price.textContent = p.p || "A consultar";

                info.appendChild(name);
                info.appendChild(price);

                const qtyControls = document.createElement("div");
                qtyControls.className = "cart-item-qty-controls";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.className = "qty-btn";
                minus.textContent = "-";
                minus.addEventListener("click", () => updateCartQty(item.productIndex, -1));

                const val = document.createElement("span");
                val.className = "qty-display";
                val.textContent = item.qty;

                const plus = document.createElement("button");
                plus.type = "button";
                plus.className = "qty-btn";
                plus.textContent = "+";
                plus.addEventListener("click", () => updateCartQty(item.productIndex, 1));

                qtyControls.appendChild(minus);
                qtyControls.appendChild(val);
                qtyControls.appendChild(plus);

                const removeBtn = document.createElement("button");
                removeBtn.type = "button";
                removeBtn.className = "cart-item-remove-btn";
                removeBtn.innerHTML = "&times;";
                removeBtn.title = "Eliminar";
                removeBtn.addEventListener("click", () => removeCartItem(item.productIndex));

                row.appendChild(thumb);
                row.appendChild(info);
                row.appendChild(qtyControls);
                row.appendChild(removeBtn);
                list.appendChild(row);
            });

            container.appendChild(list);
        }

        function openQuickView(index) {
            const p = productos[index];
            state.selectedProduct = index;

            document.getElementById("qvBrand").textContent = p.m;
            document.getElementById("qvName").textContent = p.n;
            document.getElementById("qvPrice").textContent = p.p || "Consultar precio";
            document.getElementById("qvImage").src = p.i;
            document.getElementById("qvImage").alt = p.n;

            const qvB = document.getElementById("qvBenefits");
            qvB.innerHTML = "";
            if (!p.b || p.b.length === 0) {
                const li = document.createElement("li");
                li.textContent = "Ficha de ingredientes naturales estándar.";
                qvB.appendChild(li);
            } else {
                p.b.forEach(b => {
                    const li = document.createElement("li");
                    const dot = document.createElement("span");
                    dot.className = "bullet-dot";
                    const span = document.createElement("span");
                    span.textContent = b;
                    li.appendChild(dot);
                    li.appendChild(span);
                    qvB.appendChild(li);
                });
            }

            const directMsg = "¡Hola! Deseo comprar el *" + p.n + "* (" + (p.p || "precio a consultar") + ").";
            document.getElementById("qvWhatsappBtn").href = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(directMsg);

            document.getElementById("quickViewModal").classList.add("open");
        }

        function closeQuickViewModal() {
            document.getElementById("quickViewModal").classList.remove("open");
            state.selectedProduct = null;
        }

        let toastTimer = null;
        function showToast(msg) {
            const toast = document.getElementById("toastNotification");
            document.getElementById("toastMsg").textContent = msg;
            toast.classList.add("show");
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
        }
    </script>
</body>

</html>
`;

// Guardar archivo HTML listo para vender
const outputPath1 = path.join(__dirname, '..', 'catalogo_panetones.html');
const outputPath2 = path.join(__dirname, '..', 'public', 'catalogo_panetones.html');

fs.writeFileSync(outputPath1, html, 'utf8');
fs.writeFileSync(outputPath2, html, 'utf8');
console.log('Archivos generados exitosamente en:');
console.log(' - ' + outputPath1);
console.log(' - ' + outputPath2);
console.log('Tamaño:', (fs.statSync(outputPath1).size / 1024).toFixed(1), 'KB');
