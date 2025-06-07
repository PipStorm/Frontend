import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Plan {
  title: string;
  price?: string;
  features?: string[];
}

type Tab = 'courses' | 'signals' | 'account';

const signalPlans: Record<string, Plan> = {
  'BI - Weekly (2weeks) currency': {
    title: 'BI - Weekly (2 weeks) Currency',
    price: '$20/week',
    features: [
      'Precise entry and exit points for trades',
      'Recommended stop-loss levels to minimize risks',
      'Comprehensive risk management advice',
      'Basic market analysis for informed decisions',
    ],
  },
  'Currency and synthetics and crypto': {
    title: 'Currency, Synthetics, and Crypto',
    price: '$90/month',
    features: [
      'All-inclusive signals for currency, synthetics, and crypto markets',
      'High-priority alerts for timely trading opportunities',
      'Exclusive access to weekly webinars hosted by experts',
    ],
  },
  'BI Weekly synthetics': {
    title: 'BI Weekly Synthetics',
    price: '$25/week',
    features: [
      'Tailored signals for synthetic markets',
      'Advanced risk management guidance for synthetic assets',
      'Round-the-clock market coverage to ensure no missed trades',
    ],
  },
  'Currency Monthly - $50': {
    title: 'Currency Monthly',
    price: '$50/month',
    features: ['Real-time updates on currency market movements and trends'],
  },
  'Synthetics monthly': {
    title: 'Synthetics Monthly',
    price: '$70/month',
    features: [
      'API access for seamless automated trading',
      'Integration with popular trading bots for enhanced efficiency',
      'Custom webhook notifications for instant updates',
      'Automated entry and exit signals for precise trades',
      'Comprehensive risk management parameters',
      'Detailed performance tracking for informed strategy adjustments',
      'Dedicated technical support for quick issue resolution',
      'Advanced tools for backtesting trading strategies',
    ],
  },
  '1 year': {
    title: '1 Year Plan',
    price: 'N500k/month',
    features: [
      'Reliable signals for major currency pairs',
      'Insights from an updated economic calendar',
      'In-depth fundamental analysis reports',
      'Technical analysis setups for strategic trades',
      'Optimized entry and exit strategies',
      'Accurate risk/reward calculations for every trade',
      'Insights into market correlations and their impact',
      'Weekly forex market outlook for better planning',
    ],
  },
  'Life time': {
    title: 'Lifetime Plan',
    price: '$500',
    features: [
      'Comprehensive options trading strategies',
      'Detailed Greeks analysis for advanced traders',
      'Insights into market volatility and its effects',
      'Recommendations for optimal strike prices',
      'Guidance on selecting the best expiration dates',
      'Effective risk management strategies for options',
      'Thorough options chain analysis for informed trading',
      'Weekly market outlooks to stay ahead of trends',
    ],
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('courses');
  const [modalPlan, setModalPlan] = useState<Plan | null>(null);

  const redirectToPayment = (priceText: string) => {
    const amount = priceText.replace(/[^0-9.]/g, '');
    const currency = priceText.includes('$') ? 'USD' : 'NGN';
    let finalAmount;
    if (/500k/i.test(priceText) || /150k/i.test(priceText)) {
      finalAmount = parseFloat(amount) * 1000;
    } else {
      finalAmount = amount;
    }
    window.location.href = `payment?amount=${finalAmount}&currency=${currency}`;
  };

  return (
    <>
      <Head>
        <title>Trading Academy Pro</title>
        <link rel="icon" href="/media/logo.jpeg" />
      </Head>
      <nav className="navbar">
        <div className="nav-brand">PipStorm Academy</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section id="home" className="hero">
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Master The Markets
          </motion.h1>
          <p>Professional Trading Education &amp; Live Signals</p>
          <div className="cta-buttons">
            <a href="#courses" className="btn primary">View Courses</a>
          </div>
        </div>
      </section>
      <section id="about" className="about">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Expert Mentorship</h3>
              <p>Learn from professional traders with years of market experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Live Signals</h3>
              <p>Get real-time trading signals with detailed analysis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive Learning</h3>
              <p>From basics to advanced strategies, we cover it all</p>
            </div>
          </div>
        </div>
      </section>
      <section id="courses" className="courses">
        <div className="container">
          <h2>Our Programs</h2>
          <div className="toggle-container">
            <button
              id="show-courses"
              className={`toggle-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button
              id="show-signals"
              className={`toggle-btn ${activeTab === 'signals' ? 'active' : ''}`}
              onClick={() => setActiveTab('signals')}
            >
              Signals
            </button>
            <button
              id="show-account"
              className={`toggle-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account Management
            </button>
          </div>
          <div id="courses-content" className={`content-section ${activeTab !== 'courses' ? 'hidden' : ''}`}>
            <div className="courses-grid">
              {[
                { title: 'Beginner Trading', price: '$100', desc: 'Learn the foundational principles of trading, understand the financial market structure, and start your journey to becoming a trader.' },
                { title: 'Intermediate Trading', price: '$200', desc: 'Build on your basic knowledge with deeper insights into advanced market structures and trading strategies.' },
                { title: 'Advanced Strategies', price: '$400', desc: 'Master proper technical and fundamental analysis, explore advanced trading setups, and gain exclusive access to personal strategies.' },
                { title: 'Skill Refinement', price: '150k NGN', desc: 'Refine your trading skills at our academy. ONLY FOR INDIVIDUALS WITH TRADING KNOWLEDGE', extraStyle: true },
                { title: 'Private Mentorship', price: '$500', desc: 'Receive one-on-one mentorship to develop professional trading techniques, psychology, and custom strategies tailored to you.' },
              ].map((c) => (
                <div className="course-card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>
                    {c.desc}
                    {c.extraStyle && <br />}
                  </p>
                  <p className="price">{c.price}</p>
                  <button className="btn secondary" onClick={() => redirectToPayment(c.price)}>Make Payment</button>
                </div>
              ))}
            </div>
          </div>
          <div id="signals-content" className={`content-section ${activeTab !== 'signals' ? 'hidden' : ''}`}>
            <div className="signals-grid">
              {[
                { title: 'BI - Weekly (2weeks) currency', icon: '📈', desc: 'Get Trading signals for 2 weeks' },
                { title: 'Currency and synthetics and crypto', icon: '👑', desc: 'Premium signals with direct mentor support', featured: true },
                { title: 'BI Weekly synthetics', icon: '💎', desc: 'Specialized signals for cryptocurrency markets' },
                { title: 'Currency Monthly - $50', icon: '📱', desc: 'Instant mobile notifications for time-sensitive trades' },
                { title: 'Synthetics monthly', icon: '🤖', desc: 'Automated trading signals with bot compatibility' },
                { title: '1 year', icon: '🌎', desc: 'Currency pair analysis and trading opportunities' },
                { title: 'Life time', icon: '📗', desc: 'Options trading strategies and recommendations' },
              ].map((s) => (
                <div className={`signal-card ${s.featured ? 'featured' : ''}`} key={s.title}>
                  <div className="signal-icon">{s.icon}</div>
                  {s.featured && <div className="featured-tag">Most Popular</div>}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a
                    href="#"
                    className="btn secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalPlan(signalPlans[s.title]);
                    }}
                  >
                    Subscribe
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div id="account-content" className={`content-section ${activeTab !== 'account' ? 'hidden' : ''}`}>
            <div className="management-grid">
              {[
                { title: 'Account Flipping', desc: 'Flip your accounts for mass profit, accounts must contain minimum of $200' },
                { title: 'Account risk management', desc: 'Set your own terms on how you want your account to be traded' },
              ].map((m) => (
                <div className="management-card" key={m.title}>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <button
                    className="btn secondary"
                    onClick={() =>
                      setModalPlan({ title: m.title, price: '', features: ['For this section you would need to contact our trader at this address: pipstormfxacademy@gmail.com'] })
                    }
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="container">
          <h2>Connect With Us</h2>
          <div className="social-container">
            <div className="social-card">
              <a
                href="https://www.instagram.com/pipstorm_academy77?igsh=MTA5YnBjdmxjeDR2ZA%3D%3D&utm_source=qr"
                className="social-link"
              >
                <div className="social-icon">📸</div>
                <h3>Instagram</h3>
                <p>Follow our trading journey</p>
                <span className="username">@pipstorm_academy</span>
              </a>
            </div>
            <div className="social-card">
              <a href="mailto:pipstormacademy2.0@gmail.com" className="social-link">
                <div className="social-icon">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail logo" />
                </div>
                <h3>Gmail</h3>
                <p>Contact us for any queries</p>
                <span className="username">pipstormacademy2.0@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalPlan && (
          <motion.div
            id="pricing-modal"
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="modal-container" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <button className="close-modal" onClick={() => setModalPlan(null)}>
                ×
              </button>
              <div className="modal-content">
                <h2>{modalPlan.title}</h2>
                {modalPlan.price && <div className="price">{modalPlan.price}</div>}
                {modalPlan.features && (
                  <div className="features-list">
                    <h3>What's Included:</h3>
                    <ul>
                      {modalPlan.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalPlan.price && (
                  <div className="modal-buttons">
                    <button className="btn primary" onClick={() => redirectToPayment(modalPlan.price!)}>
                      Subscribe Now
                    </button>
                    <button className="btn secondary" onClick={() => setModalPlan(null)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
