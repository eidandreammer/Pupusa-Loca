import { useEffect, useMemo, useState, useRef } from "react";
import "./App.css";
import AnimatedText from "./components/AnimatedText";
import { deliveryLinks, menuCategories } from "./menuData";

const instagramHandle = "@lapupusaloca_wny";
const instagramLink = "https://www.instagram.com/lapupusaloca_wny/";
const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=5910%20Bergenline%20Ave%20West%20New%20York%20NJ%2007093";
const mapEmbedUrl =
  "https://www.google.com/maps?q=5910%20Bergenline%20Ave%2C%20West%20New%20York%2C%20NJ%2007093&output=embed";
const restaurantAddress = "5910 Bergenline Ave, West New York, NJ 07093";
const restaurantPhone = "+12016629140";
const restaurantPhoneDisplay = "201-662-9140 | 201-662-3263";
const publicPath = (path = "") => `${import.meta.env.BASE_URL}${path}`;
const homeHref = publicPath();
const menuPageHref = publicPath("menu.html");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

function formatPrice(value) {
  return currencyFormatter.format(value);
}

const navItems = [
  { labelKey: "nav.home", href: homeHref },
  { labelKey: "nav.order", href: `${homeHref}#order` },
  { labelKey: "nav.gallery", href: `${homeHref}#gallery` },
  { labelKey: "nav.menu", href: menuPageHref },
  { labelKey: "nav.contact", href: `${homeHref}#contact` },
];

const galleryImages = [
  "4th-of-july-pancakes.jpg_202606110118.jpeg",
  "Trocitos de Pollo Con Papitas.jpeg",
  "atol-de-elote.jpg_202606110117.jpeg",
  "baleadas-con-todo.jpg_202606110118.jpeg",
  "bandeja-paisa.jpg_202606110118.jpeg",
  "batido-mango.jpg_202606110117.jpeg",
  "big-breakfast.jpg_202606110118.jpeg",
  "bistec-de-palomilla.jpg_202606110117.jpeg",
  "camarones-asados.jpg_202606110117.jpeg",
  "chocolate-caliente.jpg_202606110117.jpeg",
  "chuletas-de-cerdo.jpg_202606110117.jpeg",
  "chuncky-monkey-pancakes.jpg_202606110117.jpeg",
  "churrasco.jpg_202606110117.jpeg",
  "desayuno-con-tamal.jpg_202606110117.jpeg",
  "desayuno-salvadoreno.jpg_202606110117.jpeg",
  "desayuno-tipico-con-carne.jpg_202606110117.jpeg",
  "empanada-de-platano-3.jpg_202606110117.jpeg",
  "ensalada-mar-y-tierra.jpg_202606110117.jpeg",
  "fried-sweet-plantains.jpg_202606110117.jpeg",
  "fruity-pebbles-waffles.jpg_202606110117.jpeg",
  "guacamole-con-tajadas.jpg_202606110117.jpeg",
  "jugo-natural-horchata.jpg_202606110116.jpeg",
  "langosta-rellena-con-camarones.jpg_202606110116.jpeg",
  "mar-y-tierra.jpg_202606110116.jpeg",
  "oreo-cheesecake.jpg_202606110117.jpeg",
  "pancake-lovers-dream.jpg_202606110116.jpeg",
  "panes-rellenos.jpg_202606110116.jpeg",
  "pastelitos-de-pollo-3.jpg_202606110116.jpeg",
  "pechuga-a-la-hawaiana.jpg_202606110116.jpeg",
  "pechuga-a-la-plancha.jpg_202606110116.jpeg",
  "pechuga-con-champinones.jpg_202606110116.jpeg",
  "picadera-mixta-sm.jpg_202606110116.jpeg",
  "platanos-con-crema.jpg_202606110116.jpeg",
  "plato-tipico-salvadoreno.jpg_202606110116.jpeg",
  "pollo-con-tajadas.jpg_202606110116.jpeg",
  "pupusa-revuelta.jpg_202606110116.jpeg",
  "sopa-de-pollo.jpg_202606110115.jpeg",
  "sopa-de-res.jpg_202606110115.jpeg",
  "strawberry-shortcake-waffles.jpg_202606110115.jpeg",
  "tiramisu.jpg_202606110116.jpeg",
  "tres-leches.jpg_202606110116.jpeg",
];

const dishes = galleryImages.map((filename, index) => {
  const photoNumber = String(index + 1).padStart(2, "0");

  return {
    ariaLabel: `View menu for Pupusa Loca gallery dish ${index + 1}`,
    id: `gallery-dish-${photoNumber}`,
    img: publicPath(`Pupusa Loca Menu Images/${filename}`).replace(/ /g, "%20"),
    url: menuPageHref,
  };
});

const dishCarouselRows = [
  {
    direction: "left",
    duration: "92s",
    id: "dish-carousel-row-1",
    items: dishes.filter((_, index) => index % 3 === 0),
  },
  {
    direction: "right",
    duration: "104s",
    id: "dish-carousel-row-2",
    items: dishes.filter((_, index) => index % 3 === 1),
  },
  {
    direction: "left",
    duration: "88s",
    id: "dish-carousel-row-3",
    items: dishes.filter((_, index) => index % 3 === 2),
  },
];

const businessHours = [
  { daysKey: "days.weekday", hoursKey: "hours.weekday" },
  { daysKey: "days.weekend", hoursKey: "hours.weekend" },
];

const pickupOptions = [
  { key: "pickup.asap", value: "ASAP" },
  { key: "pickup.30m", value: "30 minutes" },
  { key: "pickup.45m", value: "45 minutes" },
  { key: "pickup.1h", value: "1 hour" },
];

const translations = {
  es: {
    "nav.home": "Inicio",
    "nav.order": "Ordenar en Línea",
    "nav.gallery": "Galería",
    "nav.menu": "Nuestro Menú",
    "nav.contact": "Contacto",

    "hero.topline": "Auténtica comida salvadoreña",
    "hero.headline": "Auténtico Sabor Salvadoreño en West New York",
    "hero.description": "La Casa de las Pupusas desde 1989. Ven a disfrutar pupusas, sopas, carnes, mariscos, bebidas, happy hour y el ambiente familiar que nos representa.",
    "hero.btn.menu": "Ver Menú",
    "hero.btn.call": "Llamar Ahora",
    "hero.btn.takeout": "Ordenar Take-Out",
    "hero.btn.directions": "Cómo Llegar",

    "story.title": "Nuestra Historia",
    "story.lead": "¡Bienvenidos a La Casa de las Pupusas!",
    "story.p1": "La Pupusa Loca nació hace más de 35 años con el firme propósito de compartir el auténtico sabor y la calidez de la comida salvadoreña con nuestra querida comunidad de West New York.",
    "story.p2": "Con más de 35 años sirviendo sabor, nos enorgullece preparar cada plato con ingredientes frescos y recetas tradicionales transmitidas por generaciones. Nuestras famosas pupusas, moldeadas a mano y cocinadas al instante en el comal encendido, son un tributo a la tradición y el cariño con el que cocinamos.",
    "story.p3": "Explora nuestro menú y descubre un viaje culinario por El Salvador. Desde nuestros desayunos típicos completos y sopas tradicionales que reconfortan el alma, hasta sabrosas carnes, mariscos frescos y bebidas naturales refrescantes. Además, nuestro restaurant y bar ofrece el ambiente perfecto para celebrar con familia y amigos.",
    "story.p4": "Gracias por ser parte de nuestra familia. ¡Te esperamos con el comal encendido para consentir tu paladar!",

    "happy.title": "Happy Hour & Karaoke",
    "happy.subtitle": "Buen ambiente en nuestro Restaurant & Bar",
    "happy.text": "Ven a disfrutar de música en vivo, karaoke y celebraciones especiales los fines de semana.",

    "order.title": "Ordenar en Línea",
    "order.subtitle": "Take-Out & Delivery - Recién hecho para ti",
    "order.btn.here": "Ordenar Aquí",

    "gallery.title": "Nuestros Platos",
    "gallery.btn.menu": "Ver Menú",

    "contact.headline": "Te esperamos con el comal encendido",
    "contact.instagram": "¡Síguenos en Instagram!",
    "contact.kicker": "Visítanos",
    "contact.addressTitle": "Dirección",
    "contact.btn.directions": "Cómo Llegar",
    "contact.btn.call": "Llamar Ahora",
    "contact.available": "Disponible para dine-in, take-out y delivery.",

    "footer.tagline": "La Pupusa Loca | Restaurant & Bar en West New York, NJ",
    "footer.navTitle": "Navegación",
    "footer.contactTitle": "Contacto",
    "footer.address": "Dirección",
    "footer.phone": "Teléfono",
    "footer.hours": "Horario",
    "footer.hoursVal": "Lun-Jue 10am-9pm; Vie-Dom 10am-10pm",
    "footer.actionsTitle": "Acciones Rápidas",
    "footer.privacy": "No se compartirá información móvil con terceros o afiliados para fines de mercadeo. Los datos de consentimiento y suscripción de mensajería de texto no serán compartidos.",

    "menu.title": "Menú en Línea",
    "menu.headline": "Arma tu pedido en La Pupusa Loca",
    "menu.subtitle": "Los pedidos de Take-Out se envían por llamada o texto. Delivery abre en tu aplicación preferida.",
    "menu.searchLabel": "Buscar en el menú",
    "menu.searchPlaceholder": "Buscar pupusas, sopas, bebidas...",
    "menu.clearSearch": "Limpiar búsqueda",
    "menu.all": "Todo",
    "menu.itemsCount": "artículo",
    "menu.itemsCountPlural": "artículos",
    "menu.noResults": "No se encontraron platos que coincidan con la búsqueda.",

    "cart.kicker": "Native Take-Out",
    "cart.title": "Tu Pedido",
    "cart.empty": "Agrega deliciosos platos del menú para iniciar tu pedido.",
    "cart.subtotal": "Subtotal Estimado",
    "cart.form.name": "Nombre",
    "cart.form.phone": "Teléfono",
    "cart.form.pickup": "Hora de Entrega",
    "cart.form.notes": "Notas / Indicaciones",
    "cart.btn.text": "Enviar por Texto",
    "cart.btn.call": "Llamar",
    "cart.btn.copy": "Copiar Pedido",
    "cart.note": "No se cobra en línea. El restaurante confirmará los precios finales y la hora de entrega al recibir el pedido.",
    "cart.copied": "¡Pedido copiado al portapapeles!",
    "cart.copyError": "Copia no disponible. Llama al 201-662-9140 para ordenar.",
    "cart.orderTextKicker": "Pedido para recoger en La Pupusa Loca",
    "cart.orderTextConfirm": "Por favor confirmar disponibilidad, total y hora de recogida.",

    "pickup.asap": "Lo antes posible",
    "pickup.30m": "30 minutos",
    "pickup.45m": "45 minutos",
    "pickup.1h": "1 hora",

    "cat.acompanantes": "Acompañantes",
    "cat.aperitivos": "Aperitivos",
    "cat.batidos": "Batidos",
    "cat.bebidas-calientes": "Bebidas Calientes",
    "cat.bebidas-frias": "Bebidas Frías",
    "cat.camarones": "Especialidades de Camarón",
    "cat.carnes": "Platos de Carne",
    "cat.combinaciones": "Combinaciones Diarias",
    "cat.desayunos": "Desayunos Típicos",
    "cat.ensaladas": "Ensaladas Frescas",
    "cat.jugos-naturales": "Jugos Naturales",
    "cat.mariscos": "Mariscos y Pescados",
    "cat.ninos": "Menú Infantil",
    "cat.pollo": "Especialidades de Pollo",
    "cat.puerco": "Especialidades de Cerdo",
    "cat.postres": "Postres Deliciosos",
    "cat.sandwiches": "Sándwiches Calientes",
    "cat.sopas": "Sopas Tradicionales",

    "note.acompanantes": "Acompañamientos tradicionales.",
    "note.aperitivos": "Aperitivos y para compartir.",
    "note.batidos": "Batidos de fruta fresca.",
    "note.bebidas-calientes": "Bebidas calientes tradicionales.",
    "note.bebidas-frias": "Bebidas frías y refrescos.",
    "note.camarones": "Especialidades de camarón recién cocinado.",
    "note.carnes": "Carnes preparadas al gusto.",
    "note.combinaciones": "Combinaciones y especiales del día.",
    "note.desayunos": "Desayunos típicos salvadoreños con frijol, huevo y crema.",
    "note.ensaladas": "Ensaladas frescas y saludables.",
    "note.jugos-naturales": "Jugos y bebidas tradicionales refrescantes.",
    "note.mariscos": "Mariscos y platos del mar preparados al instante.",
    "note.ninos": "Platos para los más pequeños.",
    "note.pollo": "Platillos y guisados de pollo jugoso.",
    "note.puerco": "Deliciosas especialidades de puerco.",
    "note.postres": "Dulces tradicionales y postres.",
    "note.sandwiches": "Sándwiches calientes con papas fritas.",
    "note.sopas": "Sopas caseras tradicionales servidas con tortillas o arroz.",
  },
  en: {
    "nav.home": "Home",
    "nav.order": "Order Online",
    "nav.gallery": "Gallery",
    "nav.menu": "Our Menu",
    "nav.contact": "Contact Us",

    "hero.topline": "Authentic Salvadoran / Latin American",
    "hero.headline": "Authentic Salvadoran Flavor in West New York",
    "hero.description": "La Casa de las Pupusas since 1989. Over 35 years serving the community. Come enjoy our fresh pupusas, soups, meats, seafood, traditional drinks, happy hour, and live family events.",
    "hero.btn.menu": "View Menu",
    "hero.btn.call": "Call Now",
    "hero.btn.takeout": "Order Take-Out",
    "hero.btn.directions": "Get Directions",

    "story.title": "Our Story",
    "story.lead": "Welcome to La Casa de las Pupusas!",
    "story.p1": "La Pupusa Loca was born over 35 years ago with the mission of sharing the authentic flavors and warmth of Salvadoran cuisine with our beloved West New York community.",
    "story.p2": "With over 35 years serving flavor, we take immense pride in crafting each dish with the freshest ingredients and time-honored recipes passed down through generations. Our signature pupusas, handmade and cooked to order on a hot griddle, represent our commitment to quality, authenticity, and love.",
    "story.p3": "Explore our menu and discover El Salvador's rich culinary heritage. From hearty traditional breakfasts and warm, comforting soups to flavorful steak, fresh seafood, and natural fruit drinks. Our welcoming restaurant and bar atmosphere is perfect for any day of the week.",
    "story.p4": "Thank you for choosing us. We look forward to welcoming you with a hot griddle and sharing delicious moments together!",

    "happy.title": "Happy Hour & Karaoke",
    "happy.subtitle": "Great vibes at our Restaurant & Bar",
    "happy.text": "Join us for live music, karaoke, and weekend celebrations with the community.",

    "order.title": "Order Online",
    "order.subtitle": "Take-Out & Delivery - Freshly made for you",
    "order.btn.here": "Order Here",

    "gallery.title": "Our Dishes",
    "gallery.btn.menu": "View Menu",

    "contact.headline": "We wait for you with the griddle hot",
    "contact.instagram": "Follow us on Instagram!",
    "contact.kicker": "Visit Us",
    "contact.addressTitle": "Location",
    "contact.btn.directions": "Get Directions",
    "contact.btn.call": "Call Now",
    "contact.available": "Available for dine-in, take-out, and delivery.",

    "footer.tagline": "La Pupusa Loca | Restaurant & Bar in West New York, NJ",
    "footer.navTitle": "Navigation",
    "footer.contactTitle": "Contact",
    "footer.address": "Address",
    "footer.phone": "Phone",
    "footer.hours": "Hours",
    "footer.hoursVal": "Mon-Thu 10am-9pm; Fri-Sun 10am-10pm",
    "footer.actionsTitle": "Quick Actions",
    "footer.privacy": "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.",

    "menu.title": "Online Menu",
    "menu.headline": "Build your La Pupusa Loca order",
    "menu.subtitle": "Take-out orders are placed via call or text. Delivery options open in your preferred app.",
    "menu.searchLabel": "Search menu",
    "menu.searchPlaceholder": "Search pupusas, soups, drinks...",
    "menu.clearSearch": "Clear Search",
    "menu.all": "All",
    "menu.itemsCount": "item",
    "menu.itemsCountPlural": "items",
    "menu.noResults": "No menu items match that search.",

    "cart.kicker": "Native Take-Out",
    "cart.title": "Your Order",
    "cart.empty": "Add delicious menu items to start your order.",
    "cart.subtotal": "Estimated Subtotal",
    "cart.form.name": "Name",
    "cart.form.phone": "Phone",
    "cart.form.pickup": "Pickup Time",
    "cart.form.notes": "Notes / Special Requests",
    "cart.btn.text": "Text Order",
    "cart.btn.call": "Call",
    "cart.btn.copy": "Copy Order",
    "cart.note": "No payment is collected online. The restaurant confirms final pricing and pickup time upon receipt.",
    "cart.copied": "Order copied to clipboard!",
    "cart.copyError": "Copy failed. Please call 201-662-9140 to place this order.",
    "cart.orderTextKicker": "Pupusa Loca pickup order",
    "cart.orderTextConfirm": "Please confirm availability, final total, and pickup time.",

    "pickup.asap": "ASAP",
    "pickup.30m": "30 minutes",
    "pickup.45m": "45 minutes",
    "pickup.1h": "1 hour",

    "cat.acompanantes": "Sides",
    "cat.aperitivos": "Appetizers",
    "cat.batidos": "Shakes",
    "cat.bebidas-calientes": "Hot Drinks",
    "cat.bebidas-frias": "Cold Drinks",
    "cat.camarones": "Shrimp Specials",
    "cat.carnes": "Steak & Meat Dishes",
    "cat.combinaciones": "Daily Combos",
    "cat.desayunos": "Traditional Breakfasts",
    "cat.ensaladas": "Fresh Salads",
    "cat.jugos-naturales": "Natural Juices",
    "cat.mariscos": "Seafood Dishes",
    "cat.ninos": "Kids Menu",
    "cat.pollo": "Chicken Specialties",
    "cat.puerco": "Pork Specialties",
    "cat.postres": "Desserts",
    "cat.sandwiches": "Hot Sandwiches",
    "cat.sopas": "Traditional Soups",

    "note.acompanantes": "Traditional side dishes.",
    "note.aperitivos": "Appetizers and shareables.",
    "note.batidos": "Shakes made with fresh fruits.",
    "note.bebidas-calientes": "Traditional warm beverages.",
    "note.bebidas-frias": "Cold soft drinks and sodas.",
    "note.camarones": "Shrimp entrees cooked to perfection.",
    "note.carnes": "Savory beef plates prepared your way.",
    "note.combinaciones": "Combination plates and daily specials.",
    "note.desayunos": "Classic Salvadoran breakfast platters with beans, eggs, and cream.",
    "note.ensaladas": "Fresh and healthy salads.",
    "note.jugos-naturales": "Refreshing traditional and fresh juices.",
    "note.mariscos": "Seafood dishes cooked to order.",
    "note.ninos": "Kid-friendly plates.",
    "note.pollo": "Juicy chicken entrees and stews.",
    "note.puerco": "Savory pork specialties.",
    "note.postres": "Sweet traditional treats.",
    "note.sandwiches": "Toasted sandwiches served with french fries.",
    "note.sopas": "Homemade comforting soups served with tortillas or rice.",
  }
};

const createTranslate = (lang) => (key) => {
  const dict = translations[lang] || translations.es;
  return dict[key] || key;
};

function buildOrderText(cartLines, subtotal, customer, t) {
  const itemLines = cartLines.map(
    (line) =>
      `${line.quantity} x ${line.name} - ${formatPrice(line.price * line.quantity)}`,
  );

  return [
    t("cart.orderTextKicker"),
    customer.name ? `${t("cart.form.name")}: ${customer.name}` : null,
    customer.phone ? `${t("cart.form.phone")}: ${customer.phone}` : null,
    `${t("cart.form.pickup")}: ${customer.pickupTime}`,
    "",
    "Items:",
    ...itemLines,
    "",
    `${t("cart.subtotal")}: ${formatPrice(subtotal)}`,
    customer.notes ? `${t("cart.form.notes")}: ${customer.notes}` : null,
    t("cart.orderTextConfirm"),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function App() {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [language, setLanguage] = useState(
    () => localStorage.getItem("preferred-language") || "es"
  );
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("preferred-language", next);
      return next;
    });
  };

  const t = useMemo(() => createTranslate(language), [language]);

  const shellStyle = {
    "--hero-background-image": `url("${publicPath("images/hero-desktop.png")}")`,
    "--hero-background-image-mobile": `url("${publicPath("images/hero-mobile.png")}")`,
    "--happy-hour-background-image": `url("${publicPath("images/flow.jpeg")}")`,
    "--paper-background-image": `url("${publicPath("images/paper-background.jpg")}")`,
    "--schedule-background-image": `url("${publicPath("images/schedule background.png")}")`,
    "--wood-background-image": `url("${publicPath("images/Dark wood.png")}")`,
  };
  const happyHourStyle = {
    backgroundImage: `url("${publicPath("images/flow.jpeg")}")`,
  };
  const normalizedPath = window.location.pathname
    .toLowerCase()
    .replace(/\/$/, "");
  const isMenuPage =
    normalizedPath.endsWith("/menu") || normalizedPath.endsWith("/menu.html");

  useEffect(() => {
    if (isMenuPage) {
      document.title = language === "es"
        ? "Menú | La Pupusa Loca - Comida Salvadoreña en West New York, NJ"
        : "La Pupusa Loca Menu | Authentic Salvadoran Restaurant in West New York, NJ";
    } else {
      document.title = language === "es"
        ? "La Pupusa Loca | Auténtico Sabor Salvadoreño en West New York, NJ"
        : "La Pupusa Loca | Authentic Salvadoran Restaurant in West New York, NJ";
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        language === "es"
          ? "Visite La Pupusa Loca Restaurant & Bar en West New York, NJ. Auténticas pupusas salvadoreñas, platos tradicionales, servicio para llevar, a domicilio, happy hour, karaoke y ambiente familiar."
          : "Visit La Pupusa Loca Restaurant & Bar in West New York, NJ for authentic Salvadoran pupusas, traditional plates, take-out, delivery, happy hour, karaoke, and a warm local atmosphere."
      );
    }
  }, [language, isMenuPage]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId = 0;
    const footerVisibilityThreshold = 0.3;
    const scrollThreshold = 6;

    let targetProgress = 0;
    let currentProgress = 0;
    let animFrameId = 0;

    function getVisibleRatio(element) {
      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      if (rect.height <= 0) {
        return 0;
      }

      const visibleHeight = Math.min(rect.bottom, window.innerHeight) -
        Math.max(rect.top, 0);

      return Math.max(0, visibleHeight) / rect.height;
    }

    function updateNavVisibility() {
      frameId = 0;

      const currentScrollY = window.scrollY;
      const hero = document.querySelector(".hero-photo");

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const heroHeight = rect.height;
        targetProgress = heroHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / heroHeight)) : 0;
        hero.style.setProperty("--scroll-progress", targetProgress.toString());
      }

      const footer = document.querySelector(".site-footer");
      const footerIsBlocking =
        getVisibleRatio(footer) >= footerVisibilityThreshold;
      const isPastHero = hero
        ? hero.getBoundingClientRect().bottom <= 0
        : currentScrollY > 0;
      const scrollDelta = currentScrollY - lastScrollY;

      setIsNavHidden((currentlyHidden) => {
        if (footerIsBlocking) {
          return true;
        }

        if (!isPastHero) {
          return false;
        }

        if (scrollDelta > scrollThreshold) {
          return true;
        }

        if (scrollDelta < -scrollThreshold) {
          return false;
        }

        return currentlyHidden;
      });

      if (
        Math.abs(scrollDelta) > scrollThreshold ||
        footerIsBlocking ||
        !isPastHero
      ) {
        lastScrollY = currentScrollY;
      }
    }

    function requestNavUpdate() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateNavVisibility);
    }

    function tick() {
      if (Math.abs(targetProgress - currentProgress) > 0.0001) {
        currentProgress += (targetProgress - currentProgress) * 0.15;
        if (Math.abs(targetProgress - currentProgress) < 0.0005) {
          currentProgress = targetProgress;
        }
        if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
          videoRef.current.currentTime = currentProgress * videoRef.current.duration;
        }
      }
      animFrameId = window.requestAnimationFrame(tick);
    }

    updateNavVisibility();
    window.addEventListener("scroll", requestNavUpdate, { passive: true });
    window.addEventListener("resize", requestNavUpdate);
    animFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", requestNavUpdate);
      window.removeEventListener("resize", requestNavUpdate);
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(animFrameId);
    };
  }, [isMenuPage]);

  return (
    <div className="site-shell" style={shellStyle}>
      <header className="site-header" id="top">
        <section
          className={`hero-photo${isMenuPage ? " page-hero" : ""}`}
          id="home"
          aria-label="Pupusa Loca restaurant hero"
        >
          <video
            ref={videoRef}
            className={`hero-video${isVideoLoaded ? " is-loaded" : ""}`}
            src={publicPath("Hero Section.mp4")}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
          />
          <div className="hero-content">
            <p className="topline">
              <AnimatedText text={t("hero.topline")} />
            </p>

            <nav
              className={`main-nav${isNavHidden ? " is-hidden" : ""}`}
              aria-hidden={isNavHidden}
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={isNavHidden ? -1 : undefined}
                  aria-current={
                    isMenuPage && item.href === menuPageHref
                      ? "page"
                      : undefined
                  }
                >
                  <AnimatedText text={t(item.labelKey)} />
                </a>
              ))}
              <button
                type="button"
                className="lang-toggle-btn"
                tabIndex={isNavHidden ? -1 : undefined}
                onClick={toggleLanguage}
                aria-label={language === "es" ? "Cambiar a Inglés" : "Switch to Spanish"}
              >
                <span className={language === "es" ? "active" : ""}>ES</span>
                <span className="divider">|</span>
                <span className={language === "en" ? "active" : ""}>EN</span>
              </button>
            </nav>

            <div className="brand-banner">
              <a href={homeHref} className="logo-link" aria-label="Pupusa Loca home">
                <img src={publicPath("images/Pupusa loca logo white.png")} alt="Pupusa Loca" />
              </a>
            </div>

            {!isMenuPage && (
              <div className="hero-text-block">
                <h1 className="hero-headline">
                  <AnimatedText text={t("hero.headline")} />
                </h1>
                <p className="hero-description">
                  <AnimatedText text={t("hero.description")} />
                </p>
                <div className="hero-buttons">
                  <a className="hero-btn primary" href={menuPageHref}>
                    <AnimatedText text={t("hero.btn.menu")} />
                  </a>
                  <a className="hero-btn secondary" href={`tel:${restaurantPhone}`}>
                    <AnimatedText text={t("hero.btn.call")} />
                  </a>
                  <a className="hero-btn secondary" href={`${homeHref}#order`}>
                    <AnimatedText text={t("hero.btn.takeout")} />
                  </a>
                  <a className="hero-btn secondary" href={mapsLink} target="_blank" rel="noreferrer">
                    <AnimatedText text={t("hero.btn.directions")} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </header>

      <main>
        {isMenuPage ? (
          <section
            className="paper-section menu-section menu-page-section"
            id="menu"
            aria-labelledby="menu-title"
          >
            <OnlineMenu t={t} language={language} />
          </section>
        ) : (
          <>
            <section
              className="paper-section story-section"
              aria-labelledby="story-title"
            >
              <div className="story-grid">
                <div className="story-copy">
                  <AnimatedText
                    as="p"
                    className="script-title"
                    id="story-title"
                    text={t("story.title")}
                  />
                  <AnimatedText
                    as="p"
                    className="lead"
                    text={t("story.lead")}
                  />
                  <AnimatedText
                    as="p"
                    text={t("story.p1")}
                  />
                  <AnimatedText
                    as="p"
                    text={t("story.p2")}
                  />
                  <AnimatedText
                    as="p"
                    text={t("story.p3")}
                  />
                  <AnimatedText
                    as="p"
                    text={t("story.p4")}
                  />
                </div>

                <div className="story-art" aria-hidden="true">
                  <img src={publicPath("images/story-stack.png")} alt="" />
                </div>
              </div>
            </section>

            <section
              className="happy-hour"
              style={happyHourStyle}
              aria-labelledby="happy-hour-title"
            >
              <h2 className="happy-hour-title" id="happy-hour-title">
                <span>
                  <AnimatedText text={t("happy.title")} />
                </span>
              </h2>
              <p>
                <AnimatedText text={t("happy.subtitle")} />
              </p>
              <p style={{ fontSize: '1.2rem', marginTop: '4px', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
                <AnimatedText text={t("happy.text")} />
              </p>
            </section>

            <section
              className="paper-section order-section"
              id="order"
              aria-labelledby="order-title"
            >
              <div className="section-center order-hub">
                <h2 className="block-title" id="order-title">
                  <AnimatedText text={t("order.title")} />
                </h2>
                <AnimatedText
                  as="p"
                  className="script-title"
                  text={t("order.subtitle")}
                />
                <div className="order-platforms" aria-label="Order options">
                  <a className="platform-link native" href={menuPageHref}>
                    <AnimatedText text={t("order.btn.here")} />
                  </a>
                  <a
                    className="platform-link"
                    href={deliveryLinks.uberEats}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AnimatedText text="Uber Eats" />
                  </a>
                  <a
                    className="platform-link"
                    href={deliveryLinks.doorDash}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AnimatedText text="DoorDash" />
                  </a>
                  <a
                    className="platform-link"
                    href={deliveryLinks.grubhub}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AnimatedText text="Grubhub" />
                  </a>
                </div>
                <div className="order-showcase">
                  <img
                    src={publicPath("images/1.png")}
                    alt="Pupusa Loca grilled steak and cocktail"
                  />
                  <img
                    src={publicPath("images/2.png")}
                    alt="Pupusa Loca seafood cocktail, shrimp rice, and pork chops"
                  />
                  <img
                    src={publicPath("images/3.png")}
                    alt="Pupusa Loca breakfast plate and grilled steak"
                  />
                  <img
                    src={publicPath("images/4.png")}
                    alt="Pupusa Loca specialty dishes"
                  />
                </div>
              </div>
            </section>

            <section
              className="paper-section gallery-section"
              id="gallery"
              aria-labelledby="gallery-title"
            >
              <div className="gallery-wrap">
                <AnimatedText
                  as="p"
                  className="script-title"
                  id="gallery-title"
                  text={t("gallery.title")}
                />
                <div className="dish-carousel-stack" aria-label="Featured dishes">
                  {dishCarouselRows.map((row) => (
                    <div
                      className={`dish-carousel-row moves-${row.direction}`}
                      key={row.id}
                      style={{ "--carousel-duration": row.duration }}
                    >
                      <div className="dish-carousel-track">
                        {[0, 1].map((copyIndex) => (
                          <div
                            className="dish-carousel-group"
                            key={`${row.id}-${copyIndex}`}
                            aria-hidden={copyIndex === 1 ? "true" : undefined}
                          >
                            {row.items.map((dish) => (
                              <a
                                className="dish-carousel-card"
                                href={dish.url}
                                key={`${row.id}-${copyIndex}-${dish.id}`}
                                aria-label={dish.ariaLabel}
                                tabIndex={copyIndex === 1 ? -1 : undefined}
                              >
                                <img
                                  src={dish.img}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                />
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <a className="pill-link" href={menuPageHref}>
                  <AnimatedText text={t("gallery.btn.menu")} />
                </a>
              </div>
            </section>

            <LocationSchedule t={t} language={language} />
          </>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

function OnlineMenu({ t, language }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    notes: "",
    phone: "",
    pickupTime: "ASAP",
  });

  const [bouncingItems, setBouncingItems] = useState({});
  const [glowingCards, setGlowingCards] = useState({});
  const [cartBouncing, setCartBouncing] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredMenuCategories = useMemo(() => {
    return menuCategories
      .map((category) => {
        const items = category.items.filter((item) => {
          if (item.image) {
            return true;
          }
          const isPupusa =
            item.id.toLowerCase().includes("pupusa") ||
            item.name.toLowerCase().includes("pupusa") ||
            item.description.toLowerCase().includes("pupusa");
          return isPupusa;
        });
        return {
          ...category,
          items,
        };
      })
      .filter((category) => category.items.length > 0);
  }, []);

  const allItems = useMemo(
    () =>
      filteredMenuCategories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryTitle: category.title,
        })),
      ),
    [filteredMenuCategories],
  );

  const itemLookup = useMemo(
    () => new Map(allItems.map((item) => [item.id, item])),
    [allItems],
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(
    () =>
      filteredMenuCategories
        .filter(
          (category) =>
            activeCategory === "all" || category.id === activeCategory,
        )
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            if (!normalizedSearch) {
              return true;
            }

            return `${item.name} ${item.description}`
              .toLowerCase()
              .includes(normalizedSearch);
          }),
        }))
        .filter((category) => category.items.length > 0),
    [activeCategory, normalizedSearch, filteredMenuCategories],
  );

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const item = itemLookup.get(line.id);

          if (!item) {
            return null;
          }

          return {
            ...item,
            quantity: line.quantity,
          };
        })
        .filter(Boolean),
    [cart, itemLookup],
  );

  const subtotal = useMemo(
    () =>
      cartLines.reduce((total, line) => total + line.price * line.quantity, 0),
    [cartLines],
  );

  const menuCount = filteredCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const orderText = useMemo(
    () => buildOrderText(cartLines, subtotal, customer, t),
    [cartLines, customer, subtotal, t],
  );
  const smsLink = `sms:${restaurantPhone}?body=${encodeURIComponent(orderText)}`;
  const canPlaceOrder = cartLines.length > 0;

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  function triggerImageBounce(itemId) {
    setBouncingItems((current) => ({
      ...current,
      [itemId]: true,
    }));
    setTimeout(() => {
      setBouncingItems((current) => ({
        ...current,
        [itemId]: false,
      }));
    }, 400);
  }

  function triggerCardGlow(itemId) {
    setGlowingCards((current) => ({
      ...current,
      [itemId]: true,
    }));
    setTimeout(() => {
      setGlowingCards((current) => ({
        ...current,
        [itemId]: false,
      }));
    }, 500);
  }

  function triggerCartBounce() {
    setCartBouncing(true);
    setTimeout(() => setCartBouncing(false), 300);
  }

  function getQuantity(itemId) {
    return cart.find((line) => line.id === itemId)?.quantity || 0;
  }

  function addItem(item) {
    setOrderStatus("");
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id);

      if (existing) {
        return current.map((line) =>
          line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }

      return [...current, { id: item.id, quantity: 1 }];
    });
    triggerImageBounce(item.id);
    triggerCardGlow(item.id);
    triggerCartBounce();
  }

  function updateQuantity(itemId, amount) {
    setOrderStatus("");
    setCart((current) =>
      current
        .map((line) =>
          line.id === itemId
            ? { ...line, quantity: line.quantity + amount }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
    triggerCartBounce();
  }

  function removeItem(itemId) {
    setOrderStatus("");
    setCart((current) => current.filter((line) => line.id !== itemId));
    triggerCartBounce();
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;
    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function copyOrder() {
    if (!canPlaceOrder) {
      return;
    }

    try {
      await navigator.clipboard.writeText(orderText);
      setOrderStatus("Order copied.");
    } catch {
      setOrderStatus(
        `Copy unavailable. Call ${restaurantPhoneDisplay} to place this order.`,
      );
    }
  }

  return (
    <div className="online-menu">
      <div className="online-menu-header">
        <AnimatedText as="p" className="script-title" text={t("menu.title")} />
        <h2 className="block-title" id="menu-title">
          <AnimatedText text={t("menu.headline")} />
        </h2>
        <AnimatedText
          as="p"
          className="menu-subtitle"
          text={t("menu.subtitle")}
        />
      </div>

      <div className="delivery-strip" aria-label="Delivery app links">
        <a href={deliveryLinks.uberEats} target="_blank" rel="noreferrer">
          <AnimatedText text="Uber Eats" />
        </a>
        <a href={deliveryLinks.doorDash} target="_blank" rel="noreferrer">
          <AnimatedText text="DoorDash" />
        </a>
        <a href={deliveryLinks.grubhub} target="_blank" rel="noreferrer">
          <AnimatedText text="Grubhub" />
        </a>
      </div>

      <div className="menu-toolbar">
        <label className="menu-search">
          <AnimatedText text={t("menu.searchLabel")} />
          {!searchQuery ? (
            <span className="search-placeholder" aria-hidden="true">
              <AnimatedText text={t("menu.searchPlaceholder")} />
            </span>
          ) : null}
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <div className="category-tabs" aria-label="Menu categories">
          <button
            type="button"
            className={activeCategory === "all" ? "active" : ""}
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            <AnimatedText text={t("menu.all")} />
          </button>
          {filteredMenuCategories.map((category) => (
            <button
              type="button"
              className={activeCategory === category.id ? "active" : ""}
              aria-pressed={activeCategory === category.id}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              <AnimatedText text={t(`cat.${category.id}`)} />
            </button>
          ))}
        </div>
      </div>

      <div className="online-menu-layout">
        <div className="menu-results" aria-live="polite">
          <AnimatedText
            as="p"
            className="menu-result-count"
            text={`${menuCount} ${menuCount === 1 ? t("menu.itemsCount") : t("menu.itemsCountPlural")}`}
          />

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <section
                className="menu-category"
                key={category.id}
                aria-labelledby={`${category.id}-title`}
              >
                <div className="menu-category-heading">
                  <div>
                    <h3 id={`${category.id}-title`}>
                      <AnimatedText text={t(`cat.${category.id}`)} />
                    </h3>
                    <AnimatedText as="p" text={t(`note.${category.id}`)} />
                  </div>
                </div>

                <div className="menu-items-grid">
                  {category.items.map((item) => {
                    const quantity = getQuantity(item.id);

                    return (
                      <article
                        className={`menu-item-card${item.image ? " has-image" : ""}${glowingCards[item.id] ? " glow" : ""}`}
                        key={item.id}
                      >
                        <div className="menu-item-main">
                          <div className="menu-item-copy">
                            <div className="menu-item-title">
                              <h4>
                                <AnimatedText text={item.name} />
                              </h4>
                              <strong>
                                <AnimatedText text={formatPrice(item.price)} />
                              </strong>
                            </div>
                            <AnimatedText as="p" text={item.description} />
                          </div>

                          {item.image && (
                            <button
                              type="button"
                              className="menu-item-image-link"
                              onClick={() => addItem(item)}
                              aria-label={`Add ${item.name} to order`}
                            >
                              <img
                                src={publicPath(item.image)}
                                alt={item.name}
                                className={`menu-item-image ${bouncingItems[item.id] ? "bounce" : ""}`}
                              />
                            </button>
                          )}
                        </div>

                        <div className="menu-item-actions">
                          {quantity > 0 ? (
                            <div
                              className="quantity-control"
                              aria-label={`${item.name} quantity`}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <AnimatedText text="-" />
                              </button>
                              <span>
                                <AnimatedText text={quantity} />
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <AnimatedText text="+" />
                              </button>
                            </div>
                          ) : null}
                          <button
                            className="menu-add-button"
                            type="button"
                            onClick={() => addItem(item)}
                          >
                            <AnimatedText text={language === "es" ? "Añadir" : "Add"} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="empty-menu-state">
              <AnimatedText as="p" text={t("menu.noResults")} />
              <button type="button" onClick={() => setSearchQuery("")}>
                <AnimatedText text={t("menu.clearSearch")} />
              </button>
            </div>
          )}
        </div>

        <aside className={`cart-panel${isCartOpen ? " is-open" : ""}`} aria-labelledby="cart-title">
          <button
            type="button"
            className="mobile-cart-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="cart-heading">
            <div>
              <AnimatedText
                as="p"
                className="cart-kicker"
                text={t("cart.kicker")}
              />
              <h3 id="cart-title">
                <AnimatedText text={t("cart.title")} />
              </h3>
            </div>
            <span className={cartBouncing ? "bounce" : ""}>
              <AnimatedText text={itemCount} />
            </span>
          </div>

          {cartLines.length > 0 ? (
            <div className="cart-lines">
              {cartLines.map((line) => (
                <div className="cart-line" key={line.id}>
                  <div>
                    <strong>
                      <AnimatedText text={line.name} />
                    </strong>
                    <span>
                      <AnimatedText
                        text={`${line.quantity} x ${formatPrice(line.price)}`}
                      />
                    </span>
                  </div>
                  <div className="cart-line-actions">
                    <div
                      className="quantity-control small"
                      aria-label={`${line.name} quantity in cart`}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.id, -1)}
                      >
                        <AnimatedText text="-" />
                      </button>
                      <span>
                        <AnimatedText text={line.quantity} />
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.id, 1)}
                      >
                        <AnimatedText text="+" />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(line.id)}>
                      <AnimatedText text={language === "es" ? "Quitar" : "Remove"} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatedText
              as="p"
              className="empty-cart"
              text={t("cart.empty")}
            />
          )}

          <div className="cart-total">
            <span>
              <AnimatedText text={t("cart.subtotal")} />
            </span>
            <strong>
              <AnimatedText text={formatPrice(subtotal)} />
            </strong>
          </div>

          <form
            className="native-order-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              <AnimatedText text={t("cart.form.name")} />
              <input
                name="name"
                type="text"
                value={customer.name}
                onChange={handleCustomerChange}
              />
            </label>
            <label>
              <AnimatedText text={t("cart.form.phone")} />
              <input
                name="phone"
                type="tel"
                value={customer.phone}
                onChange={handleCustomerChange}
              />
            </label>
            <label>
              <AnimatedText text={t("cart.form.pickup")} />
              <div
                className="pickup-options"
                role="group"
                aria-label="Pickup time"
              >
                {pickupOptions.map((option) => (
                  <button
                    type="button"
                    className={customer.pickupTime === option.value ? "active" : ""}
                    aria-pressed={customer.pickupTime === option.value}
                    key={option.value}
                    onClick={() =>
                      setCustomer((current) => ({
                        ...current,
                        pickupTime: option.value,
                      }))
                    }
                  >
                    <AnimatedText text={t(option.key)} />
                  </button>
                ))}
              </div>
            </label>
            <label>
              <AnimatedText text={t("cart.form.notes")} />
              <textarea
                name="notes"
                rows="3"
                value={customer.notes}
                onChange={handleCustomerChange}
              />
            </label>
          </form>

          <div className="order-actions">
            <a
              className={!canPlaceOrder ? "is-disabled" : ""}
              href={canPlaceOrder ? smsLink : undefined}
              aria-disabled={!canPlaceOrder}
            >
              <AnimatedText text={t("cart.btn.text")} />
            </a>
            <a href={`tel:${restaurantPhone}`}>
              <AnimatedText text={t("cart.btn.call")} />
            </a>
            <button type="button" disabled={!canPlaceOrder} onClick={copyOrder}>
              <AnimatedText text={t("cart.btn.copy")} />
            </button>
          </div>

          <AnimatedText
            as="p"
            className="cart-note"
            text={t("cart.note")}
          />
          {orderStatus ? (
            <AnimatedText
              as="p"
              className="order-status"
              aria-live="polite"
              text={orderStatus === "Order copied." ? t("cart.copied") : (orderStatus.startsWith("Copy unavailable") ? t("cart.copyError") : orderStatus)}
            />
          ) : null}
        </aside>
      </div>

      {isCartOpen && (
        <div
          className="cart-drawer-backdrop"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {itemCount > 0 && (
        <button
          type="button"
          className={`mobile-cart-toggle ${cartBouncing ? "bounce" : ""}`}
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart. ${itemCount} items in cart.`}
        >
          <div className="mobile-cart-toggle-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <span className="mobile-cart-toggle-count">{itemCount}</span>
        </button>
      )}
    </div>
  );
}

function LocationSchedule({ t }) {
  return (
    <section
      className="location-section"
      id="contact"
      aria-labelledby="location-title"
    >
      <div className="location-headline">
        <h2 id="location-title">
          <AnimatedText text={t("contact.headline")} />
        </h2>
      </div>
      <div className="location-wrap">
        <div className="schedule-panel">
          <div className="social-callout">
            <AnimatedText as="p" text={t("contact.instagram")} />
            <a href={instagramLink} target="_blank" rel="noreferrer">
              <AnimatedText text={instagramHandle} />
            </a>
          </div>

          <div>
            <AnimatedText as="p" className="section-kicker" text={t("contact.kicker")} />
          </div>

          <address>
            <span>
              <AnimatedText text={t("contact.addressTitle")} />
            </span>
            <a href={mapsLink} target="_blank" rel="noreferrer">
              <AnimatedText text={restaurantAddress} />
            </a>
          </address>

          <div className="schedule-card" aria-label="Business hours">
            {businessHours.map((item) => (
              <div className="schedule-row" key={item.daysKey}>
                <span>
                  <AnimatedText text={t(item.daysKey)} />
                </span>
                <strong>
                  <AnimatedText text={t(item.hoursKey)} />
                </strong>
              </div>
            ))}
          </div>

          <div className="location-actions">
            <a
              className="pill-link dark"
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              <AnimatedText text={t("contact.btn.directions")} />
            </a>
            <a className="pill-link light" href={`tel:${restaurantPhone}`}>
              <AnimatedText text={t("contact.btn.call")} />
            </a>
          </div>

          <div className="location-available" style={{ marginTop: '14px', fontSize: '0.92rem', opacity: 0.85 }}>
            <AnimatedText text={t("contact.available")} />
          </div>
        </div>

        <div className="map-panel">
          <iframe
            title="Google map showing Pupusa Loca at 5910 Bergenline Ave, West New York, New Jersey"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="Back to top">
              <img src={publicPath("images/Pupusa loca logo white.png")} alt="Pupusa Loca" />
            </a>
            <AnimatedText
              as="p"
              text={t("footer.tagline")}
            />
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h2 className="footer-title">
              <AnimatedText text={t("footer.navTitle")} />
            </h2>
            <div>
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  <AnimatedText text={t(item.labelKey)} />
                </a>
              ))}
            </div>
          </nav>

          <div className="footer-contact">
            <h2 className="footer-title">
              <AnimatedText text={t("footer.contactTitle")} />
            </h2>
            <div className="footer-contact-group">
              <span>
                <AnimatedText text={t("footer.address")} />
              </span>
              <a href={mapsLink} target="_blank" rel="noreferrer">
                <AnimatedText text={restaurantAddress} />
              </a>
            </div>
            <div className="footer-contact-group">
              <span>
                <AnimatedText text={t("footer.phone")} />
              </span>
              <a className="footer-phone" href={`tel:${restaurantPhone}`}>
                <AnimatedText text={restaurantPhoneDisplay} />
              </a>
            </div>
            <div className="footer-contact-group">
              <span>
                <AnimatedText text={t("footer.hours")} />
              </span>
              <AnimatedText as="p" text={t("footer.hoursVal")} />
            </div>
          </div>

          <div className="footer-actions">
            <h2 className="footer-title">
              <AnimatedText text={t("footer.actionsTitle")} />
            </h2>
            <a
              className="footer-action primary"
              href={`tel:${restaurantPhone}`}
            >
              <AnimatedText text={t("contact.btn.call")} />
            </a>
            <a
              className="footer-action secondary"
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              <AnimatedText text={t("contact.btn.directions")} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <AnimatedText
            as="p"
            className="footer-privacy"
            text={t("footer.privacy")}
          />

          <div className="footer-social-wrap">
            <a
              className="footer-social"
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.6 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default App;
