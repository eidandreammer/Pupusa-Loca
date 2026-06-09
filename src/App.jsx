import { useMemo, useState } from 'react'
import './App.css'
import { deliveryLinks, menuCategories } from './menuData'

const instagramLink = 'https://www.instagram.com/pupusalocanj/'
const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=197%20Market%20St%20Paterson%20NJ%2007505'
const mapEmbedUrl =
  'https://www.google.com/maps?q=197%20Market%20St%20Paterson%2C%20NJ%2007505&output=embed'
const restaurantAddress = '197 Market St, Paterson, NJ 07505'
const restaurantPhone = '+19737426711'
const restaurantPhoneDisplay = '973-742-6711'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Order Online', href: '#order' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Contact us', href: '#contact' },
]

const dishes = [
  {
    title: 'Desayunos',
    image: '/images/breakfast-hero.jpg',
    size: 'wide',
  },
  {
    title: 'Pupusas',
    image: '/images/pupusas-hero.jpg',
    size: 'tall',
  },
  {
    title: 'Mariscos',
    image: '/images/story-stack.png',
    size: 'tall',
  },
  {
    title: 'Tamales',
    image: '/images/tamales.jpg',
  },
  {
    title: 'Platillos',
    image: '/images/platillo.jpg',
    size: 'wide',
  },
  {
    title: 'Pollo Frito',
    image: '/images/gallery-feature.jpg',
  },
  {
    title: 'Platanos y Horchata',
    image: '/images/plantains-horchata.jpg',
  },
  {
    title: 'Especialidades',
    image: '/images/story-stack.png',
    size: 'tall',
  },
]

const businessHours = [
  { days: 'Monday - Thursday', hours: '10:00 am - 9:00 pm' },
  { days: 'Friday - Sunday', hours: '10:00 am - 10:00 pm' },
]

const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
})

function formatPrice(value) {
  return currencyFormatter.format(value)
}

function buildOrderText(cartLines, subtotal, customer) {
  const itemLines = cartLines.map(
    (line) => `${line.quantity} x ${line.name} - ${formatPrice(line.price * line.quantity)}`,
  )

  return [
    'Pupusa Loca pickup order',
    customer.name ? `Name: ${customer.name}` : null,
    customer.phone ? `Phone: ${customer.phone}` : null,
    `Pickup time: ${customer.pickupTime}`,
    '',
    'Items:',
    ...itemLines,
    '',
    `Estimated subtotal: ${formatPrice(subtotal)}`,
    customer.notes ? `Notes: ${customer.notes}` : null,
    'Please confirm availability, final total, and pickup time.',
  ]
    .filter((line) => line !== null)
    .join('\n')
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header" id="top">
        <section className="hero-photo" id="home" aria-label="Pupusa Loca breakfast dishes">
          <img src="/images/breakfast-hero.jpg" alt="Salvadoran breakfast plates" />
          <div className="hero-content">
            <p className="topline">Authentic Salvadorean Food</p>

            <nav className="main-nav" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="brand-banner">
              <a href="#home" className="logo-link" aria-label="Pupusa Loca home">
                <img src="/images/pupusa-loca-logo.png" alt="Pupusa Loca" />
              </a>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="paper-section story-section" aria-labelledby="story-title">
          <div className="story-grid">
            <div className="story-copy">
              <p className="script-title" id="story-title">
                Our Story
              </p>
              <p className="lead">Welcome to Pupusa Loca!</p>
              <p>
                Pupusa Loca was born from a deep love for the rich and diverse
                flavors of El Salvador.
              </p>
              <p>
                At Pupusa Loca, we take immense pride in crafting each dish with
                the freshest ingredients and time-honored recipes passed down
                through generations. Our signature pupusas, made from scratch and
                filled with a variety of delicious ingredients, are a testament
                to our commitment to authenticity and quality.
              </p>
              <p>
                Explore our menu and you will discover a wide array of
                Salvadoran delights. From hearty breakfasts that start your day
                off right to flavorful soups that warm your soul, our menu is
                designed to satisfy every craving. We also offer a delightful
                selection of cocktails, perfect for unwinding after a long day or
                celebrating with friends and family.
              </p>
              <p>
                Thank you for choosing Pupusa Loca. We look forward to sharing
                our love for cuisine with you and creating many delicious
                memories together.
              </p>
            </div>

            <div className="story-art" aria-hidden="true">
              <img src="/images/story-stack.png" alt="" />
            </div>
          </div>
        </section>

        <section className="happy-hour" aria-labelledby="happy-hour-title">
          <h2 id="happy-hour-title">
            Happy <span>Hour</span>
          </h2>
          <p>50% Off</p>
        </section>

        <LocationSchedule />

        <section className="paper-section order-section" id="order" aria-labelledby="order-title">
          <div className="section-center order-hub">
            <h2 className="block-title" id="order-title">
              Order Online
            </h2>
            <p className="script-title">Fresh pickup and delivery</p>
            <div className="order-platforms" aria-label="Order options">
              <a className="platform-link native" href="#menu">
                Order Here
              </a>
              <a className="platform-link" href={deliveryLinks.uberEats} target="_blank" rel="noreferrer">
                Uber Eats
              </a>
              <a className="platform-link" href={deliveryLinks.doorDash} target="_blank" rel="noreferrer">
                DoorDash
              </a>
              <a className="platform-link" href={deliveryLinks.grubhub} target="_blank" rel="noreferrer">
                Grubhub
              </a>
            </div>
            <img src="/images/story-stack.png" alt="Pupusa Loca specialty dishes" />
          </div>
        </section>

        <section className="paper-section gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="gallery-wrap">
            <p className="script-title" id="gallery-title">
              Our Dishes
            </p>
            <div className="masonry-gallery">
              {dishes.map((dish) => (
                <figure className={dish.size || ''} key={dish.title}>
                  <img src={dish.image} alt={dish.title} loading="lazy" />
                  <figcaption>{dish.title}</figcaption>
                </figure>
              ))}
            </div>
            <a className="pill-link" href="#menu">
              View Menu
            </a>
          </div>
        </section>

        <section className="paper-section menu-section" id="menu" aria-labelledby="menu-title">
          <OnlineMenu />
        </section>

        <section className="paper-section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-wrap">
            <p className="script-title" id="contact-title">
              Contact Us
            </p>
            <p className="reservation-note">We do not accept reservation via this form.</p>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="4" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function OnlineMenu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState('')
  const [customer, setCustomer] = useState({
    name: '',
    notes: '',
    phone: '',
    pickupTime: 'ASAP',
  })

  const allItems = useMemo(
    () =>
      menuCategories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryTitle: category.title,
        })),
      ),
    [],
  )

  const itemLookup = useMemo(
    () => new Map(allItems.map((item) => [item.id, item])),
    [allItems],
  )

  const normalizedSearch = searchQuery.trim().toLowerCase()

  const filteredCategories = useMemo(
    () =>
      menuCategories
        .filter((category) => activeCategory === 'all' || category.id === activeCategory)
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            if (!normalizedSearch) {
              return true
            }

            return `${item.name} ${item.description}`.toLowerCase().includes(normalizedSearch)
          }),
        }))
        .filter((category) => category.items.length > 0),
    [activeCategory, normalizedSearch],
  )

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const item = itemLookup.get(line.id)

          if (!item) {
            return null
          }

          return {
            ...item,
            quantity: line.quantity,
          }
        })
        .filter(Boolean),
    [cart, itemLookup],
  )

  const subtotal = useMemo(
    () => cartLines.reduce((total, line) => total + line.price * line.quantity, 0),
    [cartLines],
  )

  const menuCount = filteredCategories.reduce((total, category) => total + category.items.length, 0)
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0)
  const orderText = useMemo(
    () => buildOrderText(cartLines, subtotal, customer),
    [cartLines, customer, subtotal],
  )
  const smsLink = `sms:${restaurantPhone}?body=${encodeURIComponent(orderText)}`
  const canPlaceOrder = cartLines.length > 0

  function getQuantity(itemId) {
    return cart.find((line) => line.id === itemId)?.quantity || 0
  }

  function addItem(item) {
    setOrderStatus('')
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id)

      if (existing) {
        return current.map((line) =>
          line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }

      return [...current, { id: item.id, quantity: 1 }]
    })
  }

  function updateQuantity(itemId, amount) {
    setOrderStatus('')
    setCart((current) =>
      current
        .map((line) =>
          line.id === itemId ? { ...line, quantity: line.quantity + amount } : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }

  function removeItem(itemId) {
    setOrderStatus('')
    setCart((current) => current.filter((line) => line.id !== itemId))
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target
    setCustomer((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function copyOrder() {
    if (!canPlaceOrder) {
      return
    }

    try {
      await navigator.clipboard.writeText(orderText)
      setOrderStatus('Order copied.')
    } catch {
      setOrderStatus(`Copy unavailable. Call ${restaurantPhoneDisplay} to place this order.`)
    }
  }

  return (
    <div className="online-menu">
      <div className="online-menu-header">
        <p className="script-title">Our Menu</p>
        <h2 className="block-title" id="menu-title">
          Build your Pupusa Loca order
        </h2>
        <p className="menu-subtitle">Pickup orders are sent by call or text. Delivery opens in your preferred app.</p>
      </div>

      <div className="delivery-strip" aria-label="Delivery app links">
        <a href={deliveryLinks.uberEats} target="_blank" rel="noreferrer">
          Uber Eats
        </a>
        <a href={deliveryLinks.doorDash} target="_blank" rel="noreferrer">
          DoorDash
        </a>
        <a href={deliveryLinks.grubhub} target="_blank" rel="noreferrer">
          Grubhub
        </a>
      </div>

      <div className="menu-toolbar">
        <label className="menu-search">
          <span>Search menu</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search pupusas, soups, drinks..."
          />
        </label>

        <div className="category-tabs" aria-label="Menu categories">
          <button
            type="button"
            className={activeCategory === 'all' ? 'active' : ''}
            aria-pressed={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {menuCategories.map((category) => (
            <button
              type="button"
              className={activeCategory === category.id ? 'active' : ''}
              aria-pressed={activeCategory === category.id}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="online-menu-layout">
        <div className="menu-results" aria-live="polite">
          <p className="menu-result-count">
            {menuCount} item{menuCount === 1 ? '' : 's'}
          </p>

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <section className="menu-category" key={category.id} aria-labelledby={`${category.id}-title`}>
                <div className="menu-category-heading">
                  <div>
                    <h3 id={`${category.id}-title`}>{category.title}</h3>
                    <p>{category.note}</p>
                  </div>
                </div>

                <div className="menu-items-grid">
                  {category.items.map((item) => {
                    const quantity = getQuantity(item.id)

                    return (
                      <article className="menu-item-card" key={item.id}>
                        <div className="menu-item-copy">
                          <div className="menu-item-title">
                            <h4>{item.name}</h4>
                            <strong>{formatPrice(item.price)}</strong>
                          </div>
                          <p>{item.description}</p>
                        </div>

                        <div className="menu-item-actions">
                          {quantity > 0 ? (
                            <div className="quantity-control" aria-label={`${item.name} quantity`}>
                              <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                                -
                              </button>
                              <span>{quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                                +
                              </button>
                            </div>
                          ) : null}
                          <button className="menu-add-button" type="button" onClick={() => addItem(item)}>
                            Add
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="empty-menu-state">
              <p>No menu items match that search.</p>
              <button type="button" onClick={() => setSearchQuery('')}>
                Clear Search
              </button>
            </div>
          )}
        </div>

        <aside className="cart-panel" aria-labelledby="cart-title">
          <div className="cart-heading">
            <div>
              <p className="cart-kicker">Native Pickup</p>
              <h3 id="cart-title">Your Order</h3>
            </div>
            <span>{itemCount}</span>
          </div>

          {cartLines.length > 0 ? (
            <div className="cart-lines">
              {cartLines.map((line) => (
                <div className="cart-line" key={line.id}>
                  <div>
                    <strong>{line.name}</strong>
                    <span>
                      {line.quantity} x {formatPrice(line.price)}
                    </span>
                  </div>
                  <div className="cart-line-actions">
                    <div className="quantity-control small" aria-label={`${line.name} quantity in cart`}>
                      <button type="button" onClick={() => updateQuantity(line.id, -1)}>
                        -
                      </button>
                      <span>{line.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(line.id, 1)}>
                        +
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(line.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-cart">Add items from the menu to start a pickup order.</p>
          )}

          <div className="cart-total">
            <span>Estimated Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <form className="native-order-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Name</span>
              <input name="name" type="text" value={customer.name} onChange={handleCustomerChange} />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" type="tel" value={customer.phone} onChange={handleCustomerChange} />
            </label>
            <label>
              <span>Pickup</span>
              <select name="pickupTime" value={customer.pickupTime} onChange={handleCustomerChange}>
                <option>ASAP</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>1 hour</option>
              </select>
            </label>
            <label>
              <span>Notes</span>
              <textarea name="notes" rows="3" value={customer.notes} onChange={handleCustomerChange} />
            </label>
          </form>

          <div className="order-actions">
            <a
              className={!canPlaceOrder ? 'is-disabled' : ''}
              href={canPlaceOrder ? smsLink : undefined}
              aria-disabled={!canPlaceOrder}
            >
              Text Order
            </a>
            <a href={`tel:${restaurantPhone}`}>Call</a>
            <button type="button" disabled={!canPlaceOrder} onClick={copyOrder}>
              Copy
            </button>
          </div>

          <p className="cart-note">No online payment is collected. The restaurant confirms final pricing and pickup.</p>
          {orderStatus ? <p className="order-status" aria-live="polite">{orderStatus}</p> : null}
        </aside>
      </div>
    </div>
  )
}

function LocationSchedule() {
  return (
    <section className="location-section" aria-labelledby="location-title">
      <div className="location-wrap">
        <div className="schedule-panel">
          <div className="social-callout">
            <p>Follow us on Instagram!</p>
            <a href={instagramLink} target="_blank" rel="noreferrer">
              @pupusalocanj
            </a>
          </div>

          <div>
            <p className="section-kicker">Visit Us</p>
          </div>

          <address>
            <span>Location</span>
            <a href={mapsLink} target="_blank" rel="noreferrer">
              {restaurantAddress}
            </a>
          </address>

          <div className="schedule-card" aria-label="Business hours">
            {businessHours.map((item) => (
              <div className="schedule-row" key={item.days}>
                <span>{item.days}</span>
                <strong>{item.hours}</strong>
              </div>
            ))}
          </div>

          <div className="location-actions">
            <a className="pill-link dark" href={mapsLink} target="_blank" rel="noreferrer">
              Get Directions
            </a>
            <a className="pill-link light" href="tel:+19737426711">
              Call Now
            </a>
          </div>
        </div>

        <div className="map-panel">
          <iframe
            title="Google map showing Pupusa Loca at 197 Market St, Paterson, New Jersey"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="location-headline">
          <h2 id="location-title">Fresh pupusas on Market Street</h2>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a href="#top" className="footer-logo" aria-label="Back to top">
          <img src="/images/pupusa-loca-logo.png" alt="Pupusa Loca" />
        </a>

        <div className="app-links" aria-label="App availability">
          <p>
            <span aria-hidden="true">android</span>
            Android App Coming Soon
          </p>
          <p>
            <span aria-hidden="true">ios</span>
            iOS App Coming Soon
          </p>
          <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
            Instagram
          </a>
        </div>

        <address>
          <a href="tel:+19737426711">973-742-6711</a>
          <a href={mapsLink} target="_blank" rel="noreferrer">
            197 Market St
            <br />
            Paterson, NJ 07505
          </a>
        </address>
      </div>
      <div className="footer-credit">
        Powered by <a href="https://www.skymarketing.us/" target="_blank" rel="noreferrer">Sky Marketing US</a>
      </div>
    </footer>
  )
}

export default App
