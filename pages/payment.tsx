import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Payment() {
  const router = useRouter();
  const { amount, currency } = router.query;
  const [displayAmount, setDisplayAmount] = useState('');
  const [activeMethod, setActiveMethod] = useState<'bank' | 'usdt' | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!amount) return;
    const fetchRate = async () => {
      const amt = Array.isArray(amount) ? amount[0] : amount;
      if (currency === 'USD') {
        try {
          const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const data = await res.json();
          const rate = data.rates.NGN;
          const nairaAmount = Math.ceil(parseFloat(amt!) * rate);
          setDisplayAmount(`$${amt} (₦${nairaAmount.toLocaleString()})`);
        } catch (e) {
          setDisplayAmount(`$${amt}`);
        }
      } else {
        setDisplayAmount(`₦${parseFloat(amt!).toLocaleString()}`);
      }
    };
    fetchRate();
  }, [amount, currency]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Payment - PipStorm Academy</title>
      </Head>
      <nav className="navbar">
        <a href="/" className="nav-brand">PipStorm Academy</a>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div className="payment-container">
        <div className="amount-display">
          <h3>Amount to Pay</h3>
          {displayAmount ? <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{displayAmount}</motion.h2> : <div className="loader" />}
        </div>
        <div className="payment-options">
          <div className={`payment-card ${activeMethod === 'bank' ? 'active' : ''}`} onClick={() => setActiveMethod('bank')}>
            <h3>Local Bank Transfer</h3>
            <div className="payment-details" id="bank-details">
              <p>
                <strong>Bank:</strong> Moniepoint
              </p>
              <div className="account-number" onClick={() => copyToClipboard('8107061926')}>8107061926</div>
              {copied && <div className="copy-message">Account number copied!</div>}
            </div>
          </div>
          <div className={`payment-card ${activeMethod === 'usdt' ? 'active' : ''}`} onClick={() => setActiveMethod('usdt')}>
            <h3>USDT Payment</h3>
            <div className="payment-details" id="usdt-details">
              <div className="qr-container">
                <div className="qr-placeholder">USDT QR Code</div>
                <img src="/media/USDT.jpeg" alt="USDT" className="usdt-image" />
                <p>Scan QR code to pay with USDT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
