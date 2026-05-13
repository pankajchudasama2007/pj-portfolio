// --- 1. Custom Cursor Logic ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 400, fill: "forwards" }); 
    });

    const clickables = document.querySelectorAll(".hover-link, .btn, .calc-btn");
    clickables.forEach(clickable => {
        clickable.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-hover"));
        clickable.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-hover"));
    });
}

// --- 2. Scroll Reveal Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// --- 3. Lightbox Modal Logic (Only runs if on index.html) ---
const modal = document.getElementById("imageModal");
if (modal) {
    const modalImg = document.getElementById("expandedImg");
    const images = document.querySelectorAll(".zoom-img");
    const closeBtn = document.querySelector(".close-btn");

    images.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// --- 4. SIP Dashboard Logic (Only runs if on dashboard.html) ---
const sipForm = document.getElementById('sip-form');
if (sipForm) {
    sipForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stops the page from refreshing
        
        // Get user inputs
        const P = parseFloat(document.getElementById('monthly-inv').value);
        const rate = parseFloat(document.getElementById('return-rate').value);
        const years = parseFloat(document.getElementById('years').value);
        
        // SIP Math Formula
        const i = (rate / 100) / 12; // monthly rate
        const n = years * 12; // total months
        
        const futureValue = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const totalInvested = P * n;
        const wealthGained = futureValue - totalInvested;
        
        // Format numbers to Indian Rupee style
        const formatter = new Intl.NumberFormat('en-IN');
        
        // Inject results into HTML
        document.getElementById('total-invested').innerText = `₹${formatter.format(totalInvested)}`;
        document.getElementById('wealth-gained').innerText = `₹${formatter.format(wealthGained)}`;
        document.getElementById('total-value').innerText = `₹${formatter.format(futureValue)}`;
        
        // Show the result box
        document.getElementById('result-box').classList.remove('hidden');
    });
}