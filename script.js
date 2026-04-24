document.addEventListener('DOMContentLoaded', () => {

    // --- GESTIONE MENU HAMBURGER PER MOBILE ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- GESTIONE LINK ATTIVO NELLA NAVIGAZIONE ---
    const currentPageUrl = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split("/").pop();
        if ((currentPageUrl === '' || currentPageUrl === 'index.html') && linkUrl === 'index.html') {
            link.classList.add('active');
        } else if (linkUrl === currentPageUrl && linkUrl !== 'index.html') {
            link.classList.add('active');
        }
    });

    // --- ANIMAZIONE SEZIONI ON SCROLL ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- LOGICA PER LA LIGHTBOX (NUOVA) ---
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryImages = document.querySelectorAll('.photo-gallery img');
        const closeBtn = document.querySelector('.close-lightbox');

        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = image.src;
            });
        });

        const closeModal = () => {
            lightbox.style.display = 'none';
        }

        closeBtn.addEventListener('click', closeModal);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Chiude solo se si clicca sullo sfondo
                closeModal();
            }
        });
    }
	// --- GESTIONE MODALI Lavorazioni (Card Cliccabili) ---
    const cardsLavorazioni = document.querySelectorAll('.card-cliccabile');
    const closeModaliBtns = document.querySelectorAll('.chiudi-modale');

    // Apre il modale corrispondente
    cardsLavorazioni.forEach(card => {
        card.addEventListener('click', () => {
            const targetModaleId = card.getAttribute('data-modale');
            const targetModale = document.getElementById(targetModaleId);
            if(targetModale) {
                targetModale.style.display = 'flex';
            }
        });
    });

    // Chiude il modale dalla "X"
    closeModaliBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.finestra-modale').style.display = 'none';
        });
    });

    // Chiude il modale se si clicca fuori (sullo sfondo scuro)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('finestra-modale')) {
            e.target.style.display = 'none';
        }
    });
});

// Questo comando trova lo span con id="year" e ci scrive l'anno corrente
document.getElementById("year").textContent = new Date().getFullYear();