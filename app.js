document.addEventListener("DOMContentLoaded", function () {
  const showCoursesBtn = document.getElementById("show-courses");
  const showSignalsBtn = document.getElementById("show-signals");
  const showAccountBtn = document.getElementById("show-account");

  const coursesContent = document.getElementById("courses-content");
  const signalsContent = document.getElementById("signals-content");
  const accountContent = document.getElementById("account-content");

  showCoursesBtn.addEventListener("click", function () {
    coursesContent.classList.remove("hidden");
    signalsContent.classList.add("hidden");
    accountContent.classList.add("hidden");
    showCoursesBtn.classList.add("active");
    showSignalsBtn.classList.remove("active");
    showAccountBtn.classList.remove("active");
  });

  showSignalsBtn.addEventListener("click", function () {
    signalsContent.classList.remove("hidden");
    coursesContent.classList.add("hidden");
    accountContent.classList.add("hidden");
    showSignalsBtn.classList.add("active");
    showCoursesBtn.classList.remove("active");
    showAccountBtn.classList.remove("active");
  });

  showAccountBtn.addEventListener("click", function () {
    accountContent.classList.remove("hidden");
    coursesContent.classList.add("hidden");
    signalsContent.classList.add("hidden");
    showAccountBtn.classList.add("active");
    showCoursesBtn.classList.remove("active");
    showSignalsBtn.classList.remove("active");
  });

  const modal = document.getElementById("pricing-modal");
  const closeModal = document.getElementById("close-modal");
  const subscribeButtons = document.querySelectorAll(".signal-card .btn");
  const modalContent = document.querySelector(".modal-content");
  const makePaymentButtons = document.querySelectorAll(".course-card .btn");

  const signalPlans = {
    "BI - Weekly (2weeks) currency": {
      title: "BI - Weekly (2 weeks) Currency",
      price: "$20/week",
      features: [
        "Precise entry and exit points for trades",
        "Recommended stop-loss levels to minimize risks",
        "Comprehensive risk management advice",
        "Basic market analysis for informed decisions",
      ],
    },
    "Currency and synthetics and crypto": {
      title: "Currency, Synthetics, and Crypto",
      price: "$90/month",
      features: [
        "All-inclusive signals for currency, synthetics, and crypto markets",
        "High-priority alerts for timely trading opportunities",
        "Exclusive access to weekly webinars hosted by experts",
      ],
    },
    "BI Weekly synthetics": {
      title: "BI Weekly Synthetics",
      price: "$25/week",
      features: [
        "Tailored signals for synthetic markets",
        "Advanced risk management guidance for synthetic assets",
        "Round-the-clock market coverage to ensure no missed trades",
      ],
    },
    "Currency Monthly - $50": {
      title: "Currency Monthly",
      price: "$50/month",
      features: ["Real-time updates on currency market movements and trends"],
    },
    "Synthetics monthly": {
      title: "Synthetics Monthly",
      price: "$70/month",
      features: [
        "API access for seamless automated trading",
        "Integration with popular trading bots for enhanced efficiency",
        "Custom webhook notifications for instant updates",
        "Automated entry and exit signals for precise trades",
        "Comprehensive risk management parameters",
        "Detailed performance tracking for informed strategy adjustments",
        "Dedicated technical support for quick issue resolution",
        "Advanced tools for backtesting trading strategies",
      ],
    },
    "1 year": {
      title: "1 Year Plan",
      price: "N500 thousand/month",
      features: [
        "Reliable signals for major currency pairs",
        "Insights from an updated economic calendar",
        "In-depth fundamental analysis reports",
        "Technical analysis setups for strategic trades",
        "Optimized entry and exit strategies",
        "Accurate risk/reward calculations for every trade",
        "Insights into market correlations and their impact",
        "Weekly forex market outlook for better planning",
      ],
    },
    "Life time": {
      title: "Lifetime Plan",
      price: "$500",
      features: [
        "Comprehensive options trading strategies",
        "Detailed Greeks analysis for advanced traders",
        "Insights into market volatility and its effects",
        "Recommendations for optimal strike prices",
        "Guidance on selecting the best expiration dates",
        "Effective risk management strategies for options",
        "Thorough options chain analysis for informed trading",
        "Weekly market outlooks to stay ahead of trends",
      ],
    },
  };

  subscribeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const planTitle = button
        .closest(".signal-card")
        .querySelector("h3").textContent;
      const plan = signalPlans[planTitle];

      if (plan) {
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
      }
    });
  });

  makePaymentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const price = button
        .closest(".course-card")
        .querySelector(".price").textContent;
      redirectToPayment(price);
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("subscribe-now")) {
      const price = e.target
        .closest(".modal-content")
        .querySelector(".price").textContent;
      redirectToPayment(price);
    }
  });

  function redirectToPayment(priceText) {
    const amount = priceText.replace(/[^0-9.]/g, "");
    const currency = priceText.includes("$") ? "USD" : "NGN";

    const finalAmount = priceText.toLowerCase().includes("thousand")
      ? parseFloat(amount) * 1000
      : amount;

    window.location.href = `payment.html?amount=${finalAmount}&currency=${currency}`;
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message. We will get back to you soon!");
      contactForm.reset();
    });
  }

  const learnMoreButtons = document.querySelectorAll("#account-content .btn");

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const card = button.closest(".management-card");
      const title = card.querySelector("h3").textContent;

      modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>For this section you would need to contact our trader at this address: Senetorcrypt@gmail.com</p>
        <div class="modal-buttons">
          <button class="btn secondary" onclick="document.getElementById('pricing-modal').classList.add('hidden')">Close</button>
        </div>
      `;

      modal.classList.remove("hidden");
    });
  });
});
