document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initTypingEffect();
    initMouseGlow();
    initParticles();
    initHeroTilt();
    initStatCounters();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        navbar.style.padding = window.scrollY > 50 ? '0.6rem 2rem' : '1rem 2rem';
        navbar.style.background = window.scrollY > 50 ? 'rgba(6,6,11,0.95)' : 'rgba(6,6,11,0.85)';
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
        navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) {
                window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                const m = document.getElementById('mobileMenu');
                if (m && m.classList.contains('active')) m.classList.remove('active');
            }
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-header,.about-content,.project-card,.timeline-item,.contact-card,.skill-card-modern,.edu-card,.cert-card,.about-education').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        observer.observe(el);
    });
    const s = document.createElement('style');
    s.textContent = '.animate-in{opacity:1!important;transform:translateY(0)!important}';
    document.head.appendChild(s);
}

function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        let m = document.getElementById('mobileMenu');
        if (!m) {
            m = document.createElement('div');
            m.id = 'mobileMenu';
            m.className = 'mobile-menu';
            m.innerHTML = `<div class="mobile-menu-content">
                <a href="#home" class="mobile-link">Home</a>
                <a href="#about" class="mobile-link">About</a>
                <a href="#skills" class="mobile-link">Skills</a>
                <a href="#projects" class="mobile-link">Projects</a>
                <a href="#experience" class="mobile-link">Experience</a>
                <a href="#contact" class="mobile-link">Contact</a>
            </div>`;
            const s = document.createElement('style');
            s.textContent = `.mobile-menu{position:fixed;top:60px;left:0;right:0;background:rgba(6,6,11,.98);backdrop-filter:blur(20px);padding:2rem;transform:translateY(-100%);opacity:0;transition:all .3s ease;z-index:999;border-bottom:1px solid rgba(255,255,255,.07)}.mobile-menu.active{transform:translateY(0);opacity:1}.mobile-menu-content{display:flex;flex-direction:column;gap:1.5rem}.mobile-link{font-size:1.2rem;color:#a0a0b0;transition:color .2s}.mobile-link:hover{color:#00ff88}.mobile-menu-btn.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.mobile-menu-btn.active span:nth-child(2){opacity:0}.mobile-menu-btn.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}`;
            document.head.appendChild(s);
            document.body.appendChild(m);
        }
        setTimeout(() => m.classList.toggle('active'), 10);
    });
}

function initTypingEffect() {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;
    const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'GenAI Builder', 'Problem Solver', 'LLM Specialist'];
    let ri = 0, ci = 0, del = false, speed = 100;
    function type() {
        const r = roles[ri];
        if (del) { el.textContent = r.substring(0, --ci); speed = 40; }
        else { el.textContent = r.substring(0, ++ci); speed = 80; }
        if (!del && ci === r.length) { del = true; speed = 2000; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; speed = 400; }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);
}

function initMouseGlow() {
    const g = document.createElement('div');
    g.className = 'mouse-glow';
    document.body.appendChild(g);
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animate() {
        gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
        g.style.left = gx + 'px'; g.style.top = gy + 'px';
        requestAnimationFrame(animate);
    })();
}

function initParticles() {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
    document.body.insertBefore(c, document.body.firstChild);
    const ctx = c.getContext('2d');
    let ps = [];
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    class P {
        constructor() { this.reset(); }
        reset() { this.x = Math.random() * c.width; this.y = Math.random() * c.height; this.s = Math.random() * 1.5 + .5; this.sx = (Math.random() - .5) * .3; this.sy = (Math.random() - .5) * .3; this.o = Math.random() * .4 + .05; }
        update() { this.x += this.sx; this.y += this.sy; if (this.x < 0 || this.x > c.width || this.y < 0 || this.y > c.height) this.reset(); }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,255,136,${this.o})`; ctx.fill(); }
    }
    for (let i = 0; i < 40; i++) ps.push(new P());
    (function anim() { ctx.clearRect(0, 0, c.width, c.height); ps.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(anim); })();
}

function initHeroTilt() {
    const v = document.querySelector('.visual-container');
    const h = document.querySelector('.hero');
    if (!v || !h) return;
    h.addEventListener('mousemove', e => {
        const r = v.getBoundingClientRect();
        const ry = (e.clientX - r.left - r.width / 2) / 30;
        const rx = (r.top + r.height / 2 - e.clientY) / 30;
        v.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    h.addEventListener('mouseleave', () => { v.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'; });
}

function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseFloat(el.dataset.target);
                const isFloat = target % 1 !== 0;
                const duration = 1500;
                const start = performance.now();
                function update(now) {
                    const p = Math.min((now - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    el.textContent = isFloat ? (target * ease).toFixed(2) : Math.floor(target * ease);
                    if (p < 1) requestAnimationFrame(update);
                    else el.textContent = isFloat ? target.toFixed(2) : target;
                }
                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => observer.observe(s));
}

// Project card tilt
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = (e.clientY - r.top - r.height / 2) / 25;
        const ry = (r.left + r.width / 2 - e.clientX) / 25;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${-ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

console.log('🧠 Portfolio loaded — Rudra Sheth');
