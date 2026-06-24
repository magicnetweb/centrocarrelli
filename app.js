
/* ==========================================================================
   CENTRO CARRELLI - STILL INSPIRED INTERACTIVE LOGIC (2026.1)
   ========================================================================== */

// Entry point
function init() {
    console.log("Initializing Centro Carrelli logic...");
    try {
        initNavigation();
    } catch (e) {
        console.error("Error in initNavigation:", e);
    }
    try {
        initForkliftFinder();
    } catch (e) {
        console.error("Error in initForkliftFinder:", e);
    }
    try {
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    } catch (e) {
        console.error("Error in initScrollAnimations:", e);
    }
}

/**
 * Handle navigation interactions (sticky on scroll, mobile hamburger menu)
 */
function initNavigation() {
    const header = document.querySelector('.nav-header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item a');

    // Add sticky class on scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isOpen);
            
            // Animation for hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (spans.length >= 3) {
                if (!isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    // Close mobile menu when a link is clicked
    if (navMenu && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.setAttribute('aria-expanded', 'false');
                        const spans = hamburger.querySelectorAll('span');
                        if (spans.length >= 3) {
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                    }
                }
            });
        });
    }

    // Nav links with data-categoria → set filter and scroll to finder
    document.querySelectorAll('a[data-categoria]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cat = this.getAttribute('data-categoria');
            const selectCategoria = document.getElementById('filter-categoria');
            if (selectCategoria) {
                selectCategoria.value = cat;
                selectCategoria.dispatchEvent(new Event('change'));
            }
            const finder = document.getElementById('finder');
            if (finder) finder.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/**
 * Forklift Finder Configuration System
 */
const PRODUCTS = [
    // --- PROMOZIONI (TRANSPALLET NUOVI) ---
    {
        id: 'ech12c',
        name: 'STILL ECH 12 C',
        brand: 'Transpallet Elettrico',
        image: 'assets/ech12c_still.jpg',
        tag: 'Promo',
        tagClass: 'litio',
        link: '/ech12c.html',
        isOccasione: false,
        specs: {
            marca: 'STILL',
            modello: 'ECH 12 C',
            matricola: 'Promo',
            anno: '2026',
            alimentazione: 'Ioni di Litio',
            portata: '1200 kg',
            altezza: '115 mm',
            tipologia: 'transpallet'
        },
        description: 'Compatto e agile per corridoi stretti. Batteria Li-Ion estraibile a ricarica rapida. Ideale per negozi e magazzini.',
        price: '€ 1.150,00'
    },
    {
        id: 'ech15c',
        name: 'STILL ECH 15 C',
        brand: 'Transpallet Elettrico',
        image: 'assets/ech15c_still.jpg',
        tag: 'Promo',
        tagClass: 'litio',
        link: '/ech15c.html',
        isOccasione: false,
        specs: {
            marca: 'STILL',
            modello: 'ECH 15 C',
            matricola: 'Promo',
            anno: '2026',
            alimentazione: 'Ioni di Litio',
            portata: '1500 kg',
            altezza: '115 mm',
            tipologia: 'transpallet'
        },
        description: 'Portata maggiore per carichi più impegnativi. Batteria Li-Ion estraibile, perfetto per magazzini e centri logistici.',
        price: '€ 1.350,00'
    },
    {
        id: 'exh14c',
        name: 'STILL EXH 14 C',
        brand: 'Transpallet Elettrico',
        image: 'assets/exh14c_transpallet.png',
        tag: 'Nuovo',
        tagClass: 'litio',
        link: '/exh14c.html',
        isOccasione: false,
        specs: {
            marca: 'STILL',
            modello: 'EXH 14 C',
            matricola: 'Nuovo',
            anno: '2026',
            alimentazione: 'Ioni di Litio',
            portata: '1400 kg',
            altezza: '115 mm',
            tipologia: 'transpallet'
        },
        description: 'Transpallet compatto e maneggevole con timone STILL e display LED integrato. Batteria Li-Ion 48V ricaricabile ovunque.',
        price: '€ 1.890,00'
    },
    {
        id: 'ecu16',
        name: 'STILL ECU 16',
        brand: 'Transpallet Elettrico — Usato',
        image: 'assets/ecu16_usato.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: '/ecu16.html',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'ECU 16',
            matricola: 'Usato',
            anno: '2018',
            alimentazione: 'Elettrico',
            portata: '1600 kg',
            altezza: '115 mm',
            tipologia: 'transpallet'
        },
        description: 'Usato ricondizionato con batteria 24V/150Ah e caricabatterie incorporato. Revisionato e pronto alla consegna immediata.',
        price: '€ 1.200,00'
    },
    // --- CARRELLI FRONTALI ---
    {
        id: '51602312050',
        name: 'STILL R 60-25',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_r6025.jpg',
        tag: 'Usato Garantito',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-r-60-25/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'R 60-25',
            matricola: '51602312050',
            anno: '2000',
            alimentazione: 'Elettrico',
            portata: '2500 kg',
            altezza: '4200 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello elevatore frontale elettrico STILL R 60-25, portata 2.5 t, altezza sollevamento 4.2 m. Affidabile ed economico.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516329X00218',
        name: 'STILL RX 60-50',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx6050.jpg',
        tag: 'Grandi Carichi',
        tagClass: 'bestseller',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-60-50-3/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 60-50',
            matricola: '516329X00218',
            anno: '2020',
            alimentazione: 'Elettrico',
            portata: '5000 kg',
            altezza: '4630 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Potente carrello elettrico STILL RX 60-50 per carichi pesanti fino a 5 tonnellate. Modello recente del 2020 in ottime condizioni.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516308X00119',
        name: 'STILL RX 60-30 L/600',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx6030l.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-still-rx-60-30-l-600/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 60-30 L / 600',
            matricola: '516308X00119',
            anno: '2020',
            alimentazione: 'Elettrico',
            portata: '3000 kg',
            altezza: '5540 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Versione con baricentro allungato a 600mm. Portata 3.0 t, sollevamento 5.5 m. Ideale per carichi voluminosi.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516353H00240',
        name: 'STILL RX 60-30',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx6030.jpg',
        tag: 'Bestseller',
        tagClass: 'bestseller',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-still-rx-60-30/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 60-30',
            matricola: '516353H00240',
            anno: '2017',
            alimentazione: 'Elettrico',
            portata: '3000 kg',
            altezza: '4170 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Uno dei modelli più apprezzati della gamma STILL. Portata 3.0 t, altezza sollevamento 4.17 m. Perfetto bilanciamento tra potenza e agilità.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516301X00877',
        name: 'STILL RX 60-25',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx6025.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-60-25-8/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 60-25',
            matricola: '516301X00877',
            anno: '2020',
            alimentazione: 'Elettrico',
            portata: '2500 kg',
            altezza: '4890 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello elevatore frontale elettrico STILL RX 60-25, portata 2.5 t, altezza sollevamento 4.89 m. Batteria efficiente.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516215H01190',
        name: 'STILL RX 20-20',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx2020.jpg',
        tag: 'Agile',
        tagClass: 'bestseller',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-20-20-4/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 20-20',
            matricola: '516215H01190',
            anno: '2017',
            alimentazione: 'Elettrico',
            portata: '2000 kg',
            altezza: '4765 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Straordinariamente agile e compatto, ideale per lavorare in corsie e spazi ristretti con portata di 2.0 t.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516226X00036',
        name: 'STILL RX 20-18 P',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx2018p.jpg',
        tag: 'Nuovo Arrivo',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-20-18-p/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 20-18 P',
            matricola: '516226X00036',
            anno: '2020',
            alimentazione: 'Elettrico',
            portata: '1800 kg',
            altezza: '5070 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Modello a 4 ruote con ottima stabilità e precisione millimetrica. Portata 1.8 t, sollevamento 5.07 m.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516223V01032',
        name: 'STILL RX 20-18',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx2018.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-20-18-13/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 20-18',
            matricola: '516223V01032',
            anno: '2019',
            alimentazione: 'Elettrico',
            portata: '1800 kg',
            altezza: '4770 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello frontale elettrico STILL RX 20-18, portata 1.8 t, altezza sollevamento 4.77 m, anno 2019.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516226Y00057',
        name: 'STILL RX 20-16 P',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx2016p.jpg',
        tag: 'Compatto',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-20-16-p/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 20-16 P',
            matricola: '516226Y00057',
            anno: '2021',
            alimentazione: 'Elettrico',
            portata: '1600 kg',
            altezza: '4620 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello frontale a 4 ruote compatto STILL RX 20-16 P, anno 2021, portata 1.6 t. Ideale per carico/scarico merci.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '516220Y00150',
        name: 'STILL RX 20-16 C',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx2016c.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-still-rx-20-16-c/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 20-16 C',
            matricola: '516220Y00150',
            anno: '2021',
            alimentazione: 'Elettrico',
            portata: '1600 kg',
            altezza: '5220 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello frontale a 3 ruote compatto STILL RX 20-16 C, portata 1.6 t, sollevamento 5.22 m.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '517395Y00166',
        name: 'STILL RX 70-25',
        brand: 'Carrello Elevatore Frontale Diesel',
        image: 'assets/still_rx6050.jpg',
        tag: 'Diesel',
        tagClass: 'termico',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-diesel-still-rx-70-25-2/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'RX 70-25',
            matricola: '517395Y00166',
            anno: '2022',
            alimentazione: 'diesel',
            portata: '2500 kg',
            altezza: '7390 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Potente carrello frontale diesel del 2022. Portata 2.5 t, sollevamento eccezionale a 7.39 m per uso esterno.',
        price: 'Noleggio o Vendita'
    },
    {
        id: '5342201084',
        name: 'LUGLI ELX 30',
        brand: 'Carrello Elevatore Frontale',
        image: 'assets/still_rx6030.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/frontale-elettrico-lugli-elx-30/',
        isOccasione: true,
        specs: {
            marca: 'LUGLI',
            modello: 'ELX 30',
            matricola: '5342201084',
            anno: '2002',
            alimentazione: 'Elettrico',
            portata: '3000 kg',
            altezza: '4000 mm',
            tipologia: 'carrelli-frontali'
        },
        description: 'Carrello elevatore elettrico LUGLI ELX 30, robusto e affidabile, portata 3.0 t, altezza sollevamento 4.0 m.',
        price: 'Noleggio o Vendita'
    },
    // --- CARRELLI MAGAZZINO ---
    {
        id: 'F22551N01051',
        name: 'STILL EXV 20',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv20.jpg',
        tag: 'Alta Portata',
        tagClass: 'bestseller',
        link: 'https://www.centrocarrelli.net/carrelli/sollevatore-elettrico-still-exv-20/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 20',
            matricola: 'F22551N01051',
            anno: '2024',
            alimentazione: 'Elettrico',
            portata: '2000 kg',
            altezza: '3170 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Sollevatore a timone STILL EXV 20, anno 2024, portata 2.0 t, sollevamento 3.17 m. Praticamente nuovo.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'F20272J01779',
        name: 'STILL EXV 12',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv12a.jpg',
        tag: 'Compatto',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/stoccatore-elettrico-still-exv-12/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 12',
            matricola: 'F20272J01779',
            anno: '2018',
            alimentazione: 'Elettrico',
            portata: '1200 kg',
            altezza: '4386 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Sollevatore a colonna compatto STILL EXV 12, portata 1.2 t, altezza sollevamento 4.38 m. Facile da manovrare.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'F20323H00792',
        name: 'STILL EXV 14',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv14a.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/stoccatore-elettrico-still-exv-14-3/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 14',
            matricola: 'F20323H00792',
            anno: '2017',
            alimentazione: 'Elettrico',
            portata: '1400 kg',
            altezza: '4800 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Stoccatore elettrico STILL EXV 14, portata 1.4 t, altezza sollevamento 4.8 m. Perfetto per magazzinaggio intensivo.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'F20323H00773',
        name: 'STILL EXV 14',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv14b.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/stoccatore-elettrico-still-exv-14-2/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 14',
            matricola: 'F20323H00773',
            anno: '2017',
            alimentazione: 'Elettrico',
            portata: '1400 kg',
            altezza: '4350 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Stoccatore elettrico STILL EXV 14, portata 1.4 t, altezza sollevamento 4.35 m.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'F20323H00763',
        name: 'STILL EXV 14',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv14c.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/still-exv-14-sollevatore-a-colonna/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 14',
            matricola: 'F20323H00763',
            anno: '2017',
            alimentazione: 'Elettrico',
            portata: '1400 kg',
            altezza: '4266 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Stoccatore elettrico STILL EXV 14, portata 1.4 t, altezza sollevamento 4.26 m.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'F20272V00365',
        name: 'STILL EXV 12',
        brand: 'Stoccatore Elettrico',
        image: 'assets/still_exv12b.jpg',
        tag: 'Usato',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/still-exv-12-transpallet-a-colonna/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXV 12',
            matricola: 'F20272V00365-V00387-V00399',
            anno: '2019',
            alimentazione: 'Elettrico',
            portata: '1200 kg',
            altezza: '4386 mm',
            tipologia: 'carrelli-magazzino'
        },
        description: 'Stoccatore a colonna STILL EXV 12, portata 1.2 t, altezza sollevamento 4.38 m, anno 2019.',
        price: 'Noleggio o Vendita'
    },
    // --- TRANSPALLET ---
    {
        id: 'W42362X01206',
        name: 'STILL EXH SF 20',
        brand: 'Transpallet Elettrico',
        image: 'assets/still_exhsf20.webp',
        tag: 'Pedana Operatore',
        tagClass: 'bestseller',
        link: 'https://www.centrocarrelli.net/carrelli/transpallet-elettrico-still-exh-sf-20/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXH SF 20',
            matricola: 'W42362X01206',
            anno: '2020',
            alimentazione: 'Elettrico',
            portata: '2000 kg',
            altezza: '200 mm',
            tipologia: 'transpallet'
        },
        description: 'Transpallet elettrico STILL EXH SF 20 con pedana ribaltabile per operatore a bordo. Portata 2.0 t, perfetto per lunghi tragitti.',
        price: 'Noleggio o Vendita'
    },
    {
        id: 'W42031P00027',
        name: 'STILL EXH 16',
        brand: 'Transpallet Elettrico',
        image: 'assets/still_exh16.jpg',
        tag: 'Usato Recente',
        tagClass: 'usato',
        link: 'https://www.centrocarrelli.net/carrelli/still-exh-16-transpallet-elettrico/',
        isOccasione: true,
        specs: {
            marca: 'STILL',
            modello: 'EXH 16',
            matricola: 'W42031P00027',
            anno: '2025',
            alimentazione: 'Elettrico',
            portata: '1600 kg',
            altezza: '200 mm',
            tipologia: 'transpallet'
        },
        description: 'Transpallet elettrico compatto STILL EXH 16, portata 1.6 t. Modello del 2025 in condizioni eccellenti.',
        price: 'Noleggio o Vendita'
    }
];




function initForkliftFinder() {
    console.log('[Finder] initForkliftFinder called. PRODUCTS count:', PRODUCTS.length);
    const resultsGrid = document.getElementById('results-grid');
    const resultsCount = document.getElementById('results-count');
    const selectCategoria = document.getElementById('filter-categoria');
    const selectAnno = document.getElementById('filter-anno');
    const selectAlimentazione = document.getElementById('filter-alimentazione');
    const selectPortata = document.getElementById('filter-portata');
    const selectSollevamento = document.getElementById('filter-sollevamento');
    const selectMarca = document.getElementById('filter-marca');
    const inputSearch = document.getElementById('filter-search');
    const btnCerca = document.getElementById('btn-finder-cerca');

    if (!resultsGrid) {
        console.error('[Finder] results-grid NOT found in DOM!');
        return;
    }
    console.log('[Finder] All elements found. Setting up filters...');

    function parseVal(val) {
        if (!val) return 0;
        const clean = val.toString().replace(/\D/g, '');
        return clean ? parseInt(clean, 10) : 0;
    }

    // Dynamically populate ALL filter dropdowns from actual PRODUCTS data
    function populateFilters() {
        // --- Categoria (with counts) ---
        if (selectCategoria) {
            const counts = {
                tutti: PRODUCTS.length,
                frontali: PRODUCTS.filter(p => p.specs.tipologia === 'carrelli-frontali').length,
                magazzino: PRODUCTS.filter(p => p.specs.tipologia === 'carrelli-magazzino').length,
                transpallet: PRODUCTS.filter(p => p.specs.tipologia === 'transpallet').length,
                occasioni: PRODUCTS.filter(p => p.isOccasione).length
            };
            selectCategoria.innerHTML = '';
            selectCategoria.add(new Option(`Tutti i prodotti (${counts.tutti})`, ''));
            if (counts.frontali > 0) selectCategoria.add(new Option(`Carrelli Frontali (${counts.frontali})`, 'carrelli-frontali'));
            if (counts.magazzino > 0) selectCategoria.add(new Option(`Carrelli magazzino (${counts.magazzino})`, 'carrelli-magazzino'));
            if (counts.transpallet > 0) selectCategoria.add(new Option(`Transpallet (${counts.transpallet})`, 'transpallet'));
            if (counts.occasioni > 0) selectCategoria.add(new Option(`Occasioni (${counts.occasioni})`, 'occasioni'));
        }

        // --- Anno (sorted descending, only years that exist) ---
        if (selectAnno) {
            const years = [...new Set(PRODUCTS.map(p => p.specs.anno).filter(Boolean))];
            years.sort((a, b) => parseInt(b) - parseInt(a));
            selectAnno.innerHTML = '';
            selectAnno.add(new Option('Anno', ''));
            years.forEach(y => selectAnno.add(new Option(y, y)));
        }

        // --- Alimentazione (only types that exist) ---
        if (selectAlimentazione) {
            const hasElettrico = PRODUCTS.some(p => {
                const a = p.specs.alimentazione.toLowerCase();
                return a === 'elettrico' || a.includes('litio');
            });
            const hasDiesel = PRODUCTS.some(p => {
                const a = p.specs.alimentazione.toLowerCase();
                return a === 'diesel' || a === 'gpl';
            });
            const hasManuale = PRODUCTS.some(p => p.specs.alimentazione.toLowerCase() === 'manuale');

            selectAlimentazione.innerHTML = '';
            selectAlimentazione.add(new Option('Tutte le alimentazioni', ''));
            if (hasElettrico) selectAlimentazione.add(new Option('Elettrico', 'Elettrico'));
            if (hasDiesel) selectAlimentazione.add(new Option('Diesel / GPL', 'Diesel'));
            if (hasManuale) selectAlimentazione.add(new Option('Manuale', 'Manuale'));
        }

        // --- Portata (only ranges that contain products) ---
        if (selectPortata) {
            const ranges = [
                { label: '1000 - 2000 kg', value: '1000+2000' },
                { label: '2000 - 3000 kg', value: '2000+3000' },
                { label: '3000 - 4000 kg', value: '3000+4000' },
                { label: '4000 - 5000 kg', value: '4000+5000' },
                { label: '5000 - 6000 kg', value: '5000+6000' },
                { label: '6000 - 7000 kg', value: '6000+7000' },
                { label: '7000 - 8000 kg', value: '7000+8000' },
                { label: '8000 - 9000 kg', value: '8000+9000' }
            ];
            selectPortata.innerHTML = '';
            selectPortata.add(new Option('Portata Kg.', ''));
            ranges.forEach(r => {
                const parts = r.value.split('+');
                const min = parseInt(parts[0], 10);
                const max = parseInt(parts[1], 10);
                const count = PRODUCTS.filter(p => {
                    const pv = parseVal(p.specs.portata);
                    return pv >= min && pv <= max;
                }).length;
                if (count > 0) selectPortata.add(new Option(r.label, r.value));
            });
        }

        // --- Sollevamento (only ranges that contain products) ---
        if (selectSollevamento) {
            const ranges = [
                { label: '0 - 2000 mm', value: '0+2000' },
                { label: '2000 - 3000 mm', value: '2000+3000' },
                { label: '3000 - 4000 mm', value: '3000+4000' },
                { label: '4000 - 5000 mm', value: '4000+5000' },
                { label: '5000 - 6000 mm', value: '5000+6000' },
                { label: '6000 - 7000 mm', value: '6000+7000' },
                { label: '7000 - 8000 mm', value: '7000+8000' }
            ];
            selectSollevamento.innerHTML = '';
            selectSollevamento.add(new Option('Sollevamento mm.', ''));
            ranges.forEach(r => {
                const parts = r.value.split('-');
                const min = parseInt(parts[0], 10);
                const max = parseInt(parts[1], 10);
                const count = PRODUCTS.filter(p => {
                    const sv = parseVal(p.specs.altezza);
                    return sv >= min && sv <= max;
                }).length;
                if (count > 0) selectSollevamento.add(new Option(r.label, r.value));
            });
        }

        // --- Marca (only brands that exist) ---
        if (selectMarca) {
            const brands = [...new Set(PRODUCTS.map(p => p.specs.marca).filter(Boolean))];
            brands.sort();
            selectMarca.innerHTML = '';
            selectMarca.add(new Option('Tutte le marche', ''));
            brands.forEach(b => selectMarca.add(new Option(b, b)));
        }

        console.log('[Finder] Filters populated dynamically from', PRODUCTS.length, 'products');
    }

    function renderProducts() {
      try {
        const cat = selectCategoria ? selectCategoria.value : '';
        const anno = selectAnno ? selectAnno.value : '';
        const alim = selectAlimentazione ? selectAlimentazione.value : '';
        const portata = selectPortata ? selectPortata.value : '';
        const sollevamento = selectSollevamento ? selectSollevamento.value : '';
        const marca = selectMarca ? selectMarca.value : '';

        const searchQuery = inputSearch ? inputSearch.value.trim().toLowerCase() : '';
        console.log('[Finder] renderProducts - Filters:', { cat, anno, alim, portata, sollevamento, marca, searchQuery });

        // Check if any filters are active
        const hasActiveFilters = !!(cat || anno || alim || portata || sollevamento || marca || searchQuery);

        // Skip initial render if static cards are already present and no filters are active
        if (!hasActiveFilters && resultsGrid.children.length > 0 && resultsGrid.querySelector('.product-card')) {
            console.log('[Finder] Skipping initial render: grid already has pre-rendered static cards.');
            if (resultsCount) {
                resultsCount.textContent = `Ultimi Inseriti (${PRODUCTS.length} Carrelli)`;
            }
            return;
        }

        const filtered = PRODUCTS.filter(prod => {
            // 1. Categoria
            let matchCat = false;
            if (!cat) {
                matchCat = true;
            } else if (cat === 'occasioni') {
                matchCat = prod.isOccasione === true;
            } else {
                matchCat = prod.specs.tipologia === cat;
            }

            // 2. Anno
            let matchAnno = true;
            if (anno) {
                matchAnno = prod.specs.anno === anno;
            }

            // 3. Alimentazione
            let matchAlim = true;
            if (alim) {
                const prodAlim = prod.specs.alimentazione.toLowerCase();
                if (alim === 'Diesel') {
                    matchAlim = prodAlim === 'diesel' || prodAlim === 'gpl';
                } else if (alim === 'Elettrico') {
                    matchAlim = prodAlim === 'elettrico' || prodAlim.includes('litio');
                } else if (alim === 'Manuale') {
                    matchAlim = prodAlim === 'manuale';
                }
            }

            // 4. Portata
            let matchPortata = true;
            if (portata) {
                const parts = portata.split('+');
                const min = parseInt(parts[0], 10);
                const max = parseInt(parts[1], 10);
                const pVal = parseVal(prod.specs.portata);
                matchPortata = pVal >= min && pVal <= max;
            }

            // 5. Sollevamento
            let matchSollevamento = true;
            if (sollevamento) {
                const parts = sollevamento.split('+');
                const min = parseInt(parts[0], 10);
                const max = parseInt(parts[1], 10);
                const sVal = parseVal(prod.specs.altezza);
                matchSollevamento = sVal >= min && sVal <= max;
            }

            // 6. Marca
            let matchMarca = true;
            if (marca) {
                matchMarca = prod.specs.marca.toUpperCase() === marca.toUpperCase();
            }

            // 7. Free text search
            let matchSearch = true;
            if (searchQuery) {
                const haystack = [prod.name, prod.brand, prod.description, prod.specs.marca, prod.specs.modello, prod.specs.matricola].join(' ').toLowerCase();
                matchSearch = haystack.includes(searchQuery);
            }

            return matchCat && matchAnno && matchAlim && matchPortata && matchSollevamento && matchMarca && matchSearch;
        });

        // Sort by year descending (newest first) to show "Ultimi Inseriti" first
        filtered.sort((a, b) => {
            const yearA = parseInt(a.specs.anno || 0, 10);
            const yearB = parseInt(b.specs.anno || 0, 10);
            return yearB - yearA;
        });

        // Update count text or display "Ultimi Inseriti" when no filters are active
        if (resultsCount) {
            if (hasActiveFilters) {
                resultsCount.textContent = `${filtered.length} Carrelli Trovati`;
            } else {
                resultsCount.textContent = `Ultimi Inseriti (${filtered.length} Carrelli)`;
            }
        }

        // Clear grid
        resultsGrid.innerHTML = '';

        if (filtered.length === 0) {
            resultsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border: 1px solid var(--color-border);">
                    <h3>Nessun carrello corrisponde ai filtri selezionati</h3>
                    <p>Prova a modificare i filtri per visualizzare altre soluzioni, oppure contattaci direttamente per una consulenza su misura.</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" onclick="resetFilters()">Ripristina Filtri</button>
                </div>
            `;
            return;
        }

        const pathPrefix = window.location.hostname.includes('github.io') ? '/centrocarrelli' : '';

        // Add cards to grid
        filtered.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            let specsHtml = '';
            if (prod.specs.marca) specsHtml += `<li>Marca: <strong>${prod.specs.marca}</strong></li>`;
            if (prod.specs.modello) specsHtml += `<li>Modello: <strong>${prod.specs.modello}</strong></li>`;
            if (prod.specs.matricola) specsHtml += `<li>Matricola: <strong>${prod.specs.matricola}</strong></li>`;
            if (prod.specs.anno) specsHtml += `<li>Anno: <strong>${prod.specs.anno}</strong></li>`;
            if (prod.specs.alimentazione) {
                specsHtml += `<li>Alimentazione: <strong style="text-transform: capitalize;">${prod.specs.alimentazione}</strong></li>`;
            }
            if (prod.specs.portata) specsHtml += `<li>Portata: <strong>${prod.specs.portata}</strong></li>`;
            if (prod.specs.altezza) specsHtml += `<li>Sollevamento: <strong>${prod.specs.altezza}</strong></li>`;

            // Resolve image path
            let resolvedImage = prod.image;
            if (resolvedImage && !resolvedImage.startsWith('http') && !resolvedImage.startsWith('/')) {
                resolvedImage = pathPrefix + '/' + resolvedImage;
            } else if (resolvedImage && resolvedImage.startsWith('/') && !resolvedImage.startsWith(pathPrefix + '/')) {
                resolvedImage = pathPrefix + resolvedImage;
            }

            // Resolve link path
            let resolvedLink = prod.link || '#contatti';
            if (resolvedLink.startsWith('/') && !resolvedLink.startsWith(pathPrefix + '/') && !resolvedLink.startsWith('//')) {
                resolvedLink = pathPrefix + resolvedLink;
            }

            card.innerHTML = `
                <div class="product-img">
                    <span class="product-tag ${prod.tagClass}">${prod.tag}</span>
                    <img src="${resolvedImage}" alt="${prod.name}" width="300" height="200" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-brand">${prod.brand}</span>
                    <h3 class="product-name">${prod.name}</h3>
                    <ul class="product-specs">
                        ${specsHtml}
                    </ul>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 20px; line-height: 1.4;">${prod.description}</p>
                    <div class="product-footer">
                        <div>
                            <span class="product-price-label">Soluzione Consigliata</span>
                            <div class="product-price">${prod.price}</div>
                        </div>
                        <a href="${resolvedLink}" class="product-btn" aria-label="Vedi dettagli per ${prod.name}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </a>
                    </div>
                </div>
            `;
            resultsGrid.appendChild(card);
        });

        console.log('[Finder] Rendered', filtered.length, 'products');
      } catch (err) {
        console.error('[Finder] Error in renderProducts:', err);
      }
    }

    // Trigger filter update on change of any select
    [selectCategoria, selectAnno, selectAlimentazione, selectPortata, selectSollevamento, selectMarca].forEach(select => {
        if (select) {
            select.addEventListener('change', renderProducts);
        }
    });

    // Free text search with debounce on both input and keyup
    if (inputSearch) {
        let searchTimeout;
        const triggerSearch = function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(renderProducts, 250);
        };
        inputSearch.addEventListener('input', triggerSearch);
        inputSearch.addEventListener('keyup', triggerSearch);
    }

    if (btnCerca) {
        btnCerca.addEventListener('click', function(e) {
            e.preventDefault();
            renderProducts();
        });
    }

    // Setup initial state
    populateFilters();
    renderProducts();

    // Expose reset filters globally
    window.resetFilters = function() {
        if (selectCategoria) selectCategoria.value = '';
        if (selectAnno) selectAnno.value = '';
        if (selectAlimentazione) selectAlimentazione.value = '';
        if (selectPortata) selectPortata.value = '';
        if (selectSollevamento) selectSollevamento.value = '';
        if (selectMarca) selectMarca.value = '';
        if (inputSearch) inputSearch.value = '';
        renderProducts();
    };
}


function initScrollAnimations() {
    // Detect if we are inside the Oxygen Builder editor or an iframe
    const isBuilder = window.location.href.indexOf('ct_builder') > -1 || 
                      (window.parent && window.parent !== window) || 
                      document.getElementById('ct-builder') !== null;
                      
    if (isBuilder) {
        // Force all animated elements to be fully visible in the builder editor
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    if (!('IntersectionObserver' in window)) {
        return;
    }

    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        threshold: 0.02,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Target elements inside sections to animate them
                const anims = entry.target.querySelectorAll('.animate-on-scroll');
                anims.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, index * 80);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        // Add class to hide section initially (handled by dynamic CSS below)
        sec.classList.add('reveal-section');
        observer.observe(sec);
    });

    // Add dynamic CSS for scroll animation classes
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-section {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}



// --- PRODUCT DETAILS MODAL FUNCTIONALITY ---
function openProductModal(productId) {
    const modal = document.getElementById('modal-' + productId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
}

function closeProductModal(productId) {
    const modal = document.getElementById('modal-' + productId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    }
}

function closeModalOnOverlay(event, productId) {
    // Only close if user clicked directly on the overlay backdrop
    if (event.target.id === 'modal-' + productId) {
        closeProductModal(productId);
    }
}

function requestQuote(modelName) {
    // 1. Close all active modals
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    // 2. Select "Acquisto Nuovo / Usato" or "Altro" in form dropdown
    const serviceDropdown = document.getElementById('form-service');
    if (serviceDropdown) {
        serviceDropdown.value = 'acquisto';
    }
    
    // 3. Pre-fill the message text area with model info
    const messageArea = document.getElementById('form-message');
    if (messageArea) {
        messageArea.value = `Salve, vorrei ricevere maggiori informazioni e un preventivo personalizzato per il modello di transpallet: ${modelName}. Grazie.`;
    }
    
    // 4. Smooth scroll to the contact section
    const contactSection = document.getElementById('contatti');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal on Escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Run entry point after all scripts and definitions are loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

