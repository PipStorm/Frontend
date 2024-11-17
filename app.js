document.addEventListener("DOMContentLoaded", function () {
  const showCoursesBtn = document.getElementById("show-courses");
  const showSignalsBtn = document.getElementById("show-signals");
  const coursesContent = document.getElementById("courses-content");
  const signalsContent = document.getElementById("signals-content");

  showCoursesBtn.addEventListener("click", () => {
    coursesContent.classList.remove("hidden");
    signalsContent.classList.add("hidden");
    showCoursesBtn.classList.add("active");
    showSignalsBtn.classList.remove("active");
  });

  showSignalsBtn.addEventListener("click", () => {
    signalsContent.classList.remove("hidden");
    coursesContent.classList.add("hidden");
    showSignalsBtn.classList.add("active");
    showCoursesBtn.classList.remove("active");
  });

  const modal = document.getElementById("pricing-modal");
  const closeModal = document.getElementById("close-modal");
  const subscribeButtons = document.querySelectorAll(".signal-card .btn");
  const modalContent = document.querySelector(".modal-content");

  const signalPlans = {
    daily: {
      title: "Daily Signals Package",
      price: "$99/month",
      features: [
        "3-5 trading signals per day",
        "Entry and exit points",
        "Stop loss levels",
        "Risk management guidelines",
        "Basic market analysis",
        "Email notifications",
      ],
    },
    weekly: {
      title: "Weekly Analysis Package",
      price: "$199/month",
      features: [
        "Weekly market overview",
        "Major market opportunities",
        "2-3 high-probability setups per week",
        "Detailed technical analysis",
        "Educational content",
        "Email and SMS notifications",
        "Weekly live Q&A session",
      ],
    },
    vip: {
      title: "VIP Signals Package",
      price: "$499/month",
      features: [
        "All features from Daily and Weekly packages",
        "Priority signal alerts",
        "Direct mentor support via WhatsApp",
        "Custom risk management strategy",
        "Portfolio review",
        "One-on-one monthly strategy session",
        "24/7 support access",
        "Exclusive weekly webinars",
      ],
    },
    crypto: {
      title: "Crypto Signals Package",
      price: "$299/month",
      features: [
        "Cryptocurrency-specific signals",
        "DeFi opportunities",
        "Altcoin analysis",
        "Market sentiment indicators",
        "Blockchain metrics analysis",
        "Technical and fundamental analysis",
        "Risk management for crypto",
        "24/7 crypto market coverage",
      ],
    },
    mobile: {
      title: "Mobile Alerts Package",
      price: "$149/month",
      features: [
        "Instant mobile notifications",
        "Push alerts for signals",
        "Real-time market updates",
        "Custom alert settings",
        "Multiple device support",
        "Priority signal delivery",
        "Mobile app access",
        "Desktop notifications backup",
      ],
    },
    bot: {
      title: "Bot Integration Package",
      price: "$399/month",
      features: [
        "API access for automated trading",
        "Compatible with major trading bots",
        "Custom webhook support",
        "Automated entry/exit signals",
        "Risk management parameters",
        "Performance tracking",
        "Technical support",
        "Strategy backtesting tools",
      ],
    },
    forex: {
      title: "Forex Signals Package",
      price: "$199/month",
      features: [
        "Major currency pair signals",
        "Economic calendar analysis",
        "Fundamental analysis reports",
        "Technical analysis setup",
        "Entry/exit strategies",
        "Risk/reward calculations",
        "Market correlation insights",
        "Weekly forex outlook",
      ],
    },
    options: {
      title: "Options Signals Package",
      price: "$349/month",
      features: [
        "Options trading strategies",
        "Greeks analysis",
        "Volatility insights",
        "Strike price recommendations",
        "Expiration date guidance",
        "Risk management strategies",
        "Options chain analysis",
        "Weekly market outlook",
      ],
    },
  };

  subscribeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const planType = button
        .closest(".signal-card")
        .querySelector("h3")
        .textContent.toLowerCase()
        .split(" ")[0];
      const plan = signalPlans[planType];

      modalContent.innerHTML = `
                <h2>${plan.title}</h2>
                <div class="price">${plan.price}</div>
                <div class="features-list">
                    <h3>What's Included:</h3>
                    <ul>
                        ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                <div class="modal-buttons">
                    <button class="btn primary subscribe-now">Subscribe Now</button>
                    <button class="btn secondary" onclick="document.getElementById('pricing-modal').classList.add('hidden')">Cancel</button>
                </div>
            `;

      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  globalThis.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("subscribe-now")) {
      alert("Redirecting to payment processor...");
    }
  });
});
