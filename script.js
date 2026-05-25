/**
 * Lucas & Mayara - Website de Homenagem de Dia dos Namorados
 * Script Interativo Premium V2
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 0. CONFIGURAÇÕES PERSISTENTES (ADMIN PANEL ENGINE)
    // ==========================================================================
    const DEFAULT_SETTINGS = {
        eleName: "Lucas",
        elaName: "Mayara",
        dateStr: "2025-02-11T00:00",
        letterContent: `Desde o dia 11 de Fevereiro de 2025, a minha vida ganhou cores mais vivas, sorrisos mais sinceros e um sentido muito mais bonito. Ter você ao meu lado é ter a certeza de que a felicidade mora nos detalhes mais simples — no som da sua risada, no conforto do seu abraço e no brilho dos seus olhos quando você sorri.\n\nObrigado por ser essa namorada tão incrível, parceira de todas as horas, minha melhor amiga e o meu maior motivo para sorrir todos os dias. Você transforma qualquer dia comum em uma data inesquecível e me inspira a ser alguém melhor a cada instante.\n\nEu amo cada pedacinho de nós, cada aventura que já vivemos e todas aquelas que ainda vamos desenhar no nosso futuro. Este site é apenas uma pequena homenagem para lembrar o quanto a nossa história é linda e o quanto eu sou abençoado por ter você na minha vida.`
    };

    let settings = { ...DEFAULT_SETTINGS };

    // Carrega do LocalStorage ou define o padrão
    function loadSettings() {
        const saved = localStorage.getItem('love_homenagem_settings');
        if (saved) {
            try {
                settings = JSON.parse(saved);
            } catch (e) {
                console.error("Erro ao ler configurações do localStorage", e);
            }
        }
        applySettings();
    }

    // Aplica as variáveis dinâmicas em todos os elementos da página
    function applySettings() {
        // Monograma Principal (L & M)
        const initials = document.querySelectorAll('.monogram-letter');
        if (initials.length >= 2) {
            initials[0].textContent = settings.eleName.trim().charAt(0).toUpperCase();
            initials[1].textContent = settings.elaName.trim().charAt(0).toUpperCase();
        }

        // Título Principal
        const romanticTitle = document.querySelector('.romantic-title');
        if (romanticTitle) {
            romanticTitle.textContent = `${settings.eleName} & ${settings.elaName}`;
        }

        // Aba do Navegador (Title)
        document.title = `${settings.eleName} & ${settings.elaName} | Nossa História de Amor`;

        // Rodapé
        const footerText = document.querySelector('.love-footer p:first-child');
        if (footerText) {
            footerText.innerHTML = `Feito com amor por ${settings.eleName} para ${settings.elaName} ❤️`;
        }
        
        const footerCopyright = document.querySelector('.footer-copyright');
        if (footerCopyright) {
            footerCopyright.innerHTML = `&copy; ${new Date().getFullYear()} ${settings.eleName} & ${settings.elaName}. Para todo o sempre.`;
        }

        // Data Dinâmica no topo da Carta de Amor (Configurada para o Dia dos Namorados)
        const letterDateEl = document.querySelector('.letter-date');
        if (letterDateEl) {
            const currentYear = new Date().getFullYear();
            letterDateEl.textContent = `12 de Junho de ${currentYear}`;
        }

        // Saudação e Assinatura na Carta
        const letterSalutation = document.querySelector('.letter-salutation');
        if (letterSalutation) {
            letterSalutation.textContent = `Minha Querida ${settings.elaName},`;
        }

        const letterSignature = document.querySelector('.letter-signature');
        if (letterSignature) {
            letterSignature.textContent = settings.eleName;
        }

        // Corpo da Carta com parágrafos separados
        const letterBody = document.querySelector('.letter-body');
        if (letterBody) {
            const paragraphs = settings.letterContent.split('\n\n');
            let bodyHTML = '';
            paragraphs.forEach(p => {
                if (p.trim()) {
                    bodyHTML += `<p>${p.replace(/\n/g, '<br>')}</p>`;
                }
            });
            bodyHTML += `<p class="letter-closing">Com todo o meu amor, carinho e cumplicidade,</p>`;
            bodyHTML += `<p class="letter-signature">${settings.eleName}</p>`;
            letterBody.innerHTML = bodyHTML;
        }

        // Legenda de data do aniversário embaixo do contador principal
        const anniversaryDateEl = document.querySelector('.anniversary-date');
        if (anniversaryDateEl) {
            const rDate = new Date(settings.dateStr);
            const monthsNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            const formattedDate = `${rDate.getDate()} de ${monthsNames[rDate.getMonth()]} de ${rDate.getFullYear()}`;
            anniversaryDateEl.innerHTML = `<i class="fa-regular fa-calendar-heart"></i> Desde ${formattedDate}`;
        }
    }

    // Modal de Configuração Secreta
    const adminTrigger = document.getElementById('admin-trigger-btn');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminBtn = document.getElementById('close-admin');
    const adminForm = document.getElementById('admin-form');
    
    if (adminTrigger && adminModal) {
        adminTrigger.addEventListener('click', () => {
            document.getElementById('input-ele').value = settings.eleName;
            document.getElementById('input-ela').value = settings.elaName;
            
            // Formatar data em string ISO aceitável pelo input datetime-local
            const d = new Date(settings.dateStr);
            const tzoffset = d.getTimezoneOffset() * 60000;
            const localISOTime = (new Date(d.getTime() - tzoffset)).toISOString().slice(0, 16);
            document.getElementById('input-date').value = localISOTime;
            
            document.getElementById('input-letter').value = settings.letterContent;
            adminModal.classList.add('open');
        });
    }

    if (closeAdminBtn && adminModal) {
        closeAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('open');
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            settings.eleName = document.getElementById('input-ele').value.trim();
            settings.elaName = document.getElementById('input-ela').value.trim();
            settings.dateStr = document.getElementById('input-date').value;
            settings.letterContent = document.getElementById('input-letter').value.trim();

            localStorage.setItem('love_homenagem_settings', JSON.stringify(settings));
            adminModal.classList.remove('open');
            applySettings();
            
            // Recarrega a página de forma limpa para recalcular o tempo e outros dados estruturais
            window.location.reload();
        });
    }

    // Inicializar carregamento e aplicação das configurações
    loadSettings();

    // ==========================================================================
    // 1. CANVAS DE PARTÍCULAS (CORAÇÕES FLUTUANTES COM FÍSICA AVANÇADA)
    // ==========================================================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 60;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class HeartParticle {
        constructor(x, y, isTrail = false) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || (isTrail ? y : canvas.height + 20);
            this.size = Math.random() * 12 + 6; 
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = isTrail ? -(Math.random() * 1.8 + 0.8) : -(Math.random() * 1.2 + 0.6);
            this.alpha = 1;
            this.decay = Math.random() * 0.005 + 0.002;
            this.colorAngle = Math.random() * 20 - 10; 
            this.angle = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
            this.swayAmount = Math.random() * 1.5 + 0.5;
        }
        
        update() {
            this.x += this.speedX + Math.sin(this.angle) * this.swayAmount;
            this.y += this.speedY;
            this.angle += this.swaySpeed;
            this.alpha -= this.decay;
        }
        
        draw() {
            if (this.alpha <= 0) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(347, 100%, 65%, ${this.alpha * 0.4})`;
            
            ctx.beginPath();
            ctx.fillStyle = `hsla(${347 + this.colorAngle}, 100%, 65%, ${this.alpha})`;
            
            const s = this.size;
            ctx.moveTo(0, -s / 4);
            ctx.bezierCurveTo(0, -s, -s, -s, -s, -s / 4);
            ctx.bezierCurveTo(-s, s / 3, 0, s * 0.9, 0, s);
            ctx.bezierCurveTo(0, s * 0.9, s, s / 3, s, -s / 4);
            ctx.bezierCurveTo(s, -s, 0, -s, 0, -s / 4);
            
            ctx.fill();
            ctx.restore();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new HeartParticle(null, Math.random() * canvas.height));
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            
            if (p.alpha <= 0 || p.y < -30) {
                particles[index] = new HeartParticle();
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Rastro interativo do mouse
    let mouseActive = false;
    let mouseTimeout;
    
    window.addEventListener('mousemove', (e) => {
        if (!mouseActive) {
            mouseActive = true;
        }
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => { mouseActive = false; }, 100);
        
        if (Math.random() < 0.25) {
            particles.push(new HeartParticle(e.clientX, e.clientY, true));
            if (particles.length > maxParticles + 25) {
                particles.shift(); 
            }
        }
    });
    
    initParticles();
    animateParticles();

    // ==========================================================================
    // 2. CONTADOR PROGRESSIVO DINÂMICO
    // ==========================================================================
    const elYears = document.getElementById('years');
    const elMonths = document.getElementById('months');
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');
    
    function updateLoveCounter() {
        const now = new Date();
        const refDate = new Date(settings.dateStr);
        
        let diffYears = now.getFullYear() - refDate.getFullYear();
        let diffMonths = now.getMonth() - refDate.getMonth();
        let diffDays = now.getDate() - refDate.getDate();
        let diffHours = now.getHours() - refDate.getHours();
        let diffMinutes = now.getMinutes() - refDate.getMinutes();
        let diffSeconds = now.getSeconds() - refDate.getSeconds();
        
        if (diffSeconds < 0) {
            diffSeconds += 60;
            diffMinutes--;
        }
        
        if (diffMinutes < 0) {
            diffMinutes += 60;
            diffHours--;
        }
        
        if (diffHours < 0) {
            diffHours += 24;
            diffDays--;
        }
        
        if (diffDays < 0) {
            const prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
            diffDays += prevMonthDate.getDate();
            diffMonths--;
        }
        
        if (diffMonths < 0) {
            diffMonths += 12;
            diffYears--;
        }
        
        if (elYears) elYears.textContent = String(Math.max(0, diffYears)).padStart(2, '0');
        if (elMonths) elMonths.textContent = String(Math.max(0, diffMonths)).padStart(2, '0');
        if (elDays) elDays.textContent = String(Math.max(0, diffDays)).padStart(2, '0');
        if (elHours) elHours.textContent = String(Math.max(0, diffHours)).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(Math.max(0, diffMinutes)).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(Math.max(0, diffSeconds)).padStart(2, '0');
    }
    
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

    // ==========================================================================
    // 3. MURAL DE RAZÕES (RAZÕES PARA TE AMAR - CARTÕES FLIP 3D)
    // ==========================================================================
    const REASONS = [
        "O som da sua risada é a minha música favorita no mundo inteiro! 🎵",
        "Sua parceria e companheirismo em absolutamente todas as horas. 🤝",
        "A forma extremamente carinhosa e doce como você cuida de mim. 🧸",
        "O seu sorriso radiante que ilumina instantaneamente o meu dia. ☀️",
        "Nossos abraços apertados que me fazem sentir protegido e em casa. 🏡",
        "A sua incrível determinação, força e inteligência que me inspiram. 💡",
        "Como a gente se entende perfeitamente com apenas um breve olhar. 👀💖",
        "A certeza absoluta de que meu futuro é maravilhoso ao seu lado! 💍"
    ];

    const reasonsContainer = document.getElementById('reasons-container');
    
    function generateReasonsMural() {
        if (!reasonsContainer) return;
        reasonsContainer.innerHTML = '';
        
        REASONS.forEach((reason, index) => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.innerHTML = `
                <div class="reason-card-inner">
                    <div class="reason-card-front">
                        <i class="fa-solid fa-heart"></i>
                        <span>Motivo ${index + 1}</span>
                    </div>
                    <div class="reason-card-back">
                        <p>${reason}</p>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
                if (card.classList.contains('flipped')) {
                    createMiniHeartExplosion(card);
                }
            });
            
            reasonsContainer.appendChild(card);
        });
    }

    function createMiniHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const p = new HeartParticle(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, true);
            p.speedY = -(Math.random() * 2 + 1);
            p.speedX = (Math.random() - 0.5) * 3;
            p.decay = Math.random() * 0.02 + 0.01;
            particles.push(p);
        }
    }

    generateReasonsMural();

    // ==========================================================================
    // 4. QUIZ DE AFINIDADE ("NOSSA AFINIDADE" COM CONFETES E PRÊMIO)
    // ==========================================================================
    const QUIZ_QUESTIONS = [
        {
            question: "Quando começou oficialmente nossa linda história de amor?",
            options: [
                "11 de Janeiro de 2025",
                "11 de Fevereiro de 2025",
                "11 de Março de 2025",
                "14 de Fevereiro de 2025"
            ],
            correct: 1 // 11 de Fevereiro de 2025
        },
        {
            question: "Qual o maior presente que a vida deu para nós dois?",
            options: [
                "Nossas viagens especiais",
                "Nossas conversas de madrugada",
                "Termos encontrado um ao outro",
                "Nossos jantares românticos"
            ],
            correct: 2 // Termos encontrado um ao outro
        },
        {
            question: "No seu abraço, eu encontrei o quê?",
            options: [
                "Um lugar seguro",
                "O meu lar",
                "Uma grande aventura",
                "Tudo que eu sempre quis"
            ],
            correct: 1 // O meu lar
        },
        {
            question: "O seu sorriso é o meu lugar favorito no...?",
            options: [
                "Coração",
                "Espaço sideral",
                "Mundo",
                "Futuro planejado"
            ],
            correct: 2 // Mundo
        },
        {
            question: "O que nós somos de verdade além de namorados?",
            options: [
                "Parceiros, cúmplices e melhores amigos",
                "Apenas companheiros de rotina",
                "Colecionadores de risadas bobas",
                "Viajantes românticos e sonhadores"
            ],
            correct: 0 // Parceiros, cúmplices e melhores amigos
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;

    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsContainer = document.getElementById('quiz-options-container');
    const quizProgressBar = document.getElementById('quiz-progress-bar');
    const quizProgressNum = document.getElementById('quiz-progress-num');
    const quizFeedbackBox = document.getElementById('quiz-feedback-box');
    const quizContainer = document.getElementById('quiz-container');

    function loadQuizQuestion() {
        if (!quizQuestionText || !quizOptionsContainer) return;
        
        // Resetar feedback visual
        quizFeedbackBox.className = 'quiz-feedback';
        quizFeedbackBox.innerHTML = '';

        const q = QUIZ_QUESTIONS[currentQuestionIndex];
        // Customizar dinamicamente a data caso o Lucas a altere
        if (currentQuestionIndex === 0) {
            const rDate = new Date(settings.dateStr);
            const monthsNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            const realDateStr = `${rDate.getDate()} de ${monthsNames[rDate.getMonth()]} de ${rDate.getFullYear()}`;
            // Substituir a segunda opção com a data real se não bater
            q.options[1] = realDateStr;
        }

        quizQuestionText.textContent = q.question;
        
        const progressPercent = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;
        if (quizProgressBar) quizProgressBar.style.width = `${progressPercent}%`;
        if (quizProgressNum) quizProgressNum.textContent = `Pergunta ${currentQuestionIndex + 1} de ${QUIZ_QUESTIONS.length}`;

        quizOptionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
            quizOptionsContainer.appendChild(btn);
        });
    }

    function handleQuizAnswer(selectedIdx, selectedBtn) {
        const q = QUIZ_QUESTIONS[currentQuestionIndex];
        const buttons = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
        
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIdx === q.correct) {
            selectedBtn.classList.add('correct');
            quizScore++;
            quizFeedbackBox.className = 'quiz-feedback success';
            quizFeedbackBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Resposta Correta! Que amor! 💖';
            
            // Chuva de corações no canvas para celebrar
            for (let i = 0; i < 20; i++) {
                particles.push(new HeartParticle(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 300, 
                    window.innerHeight / 2 + (Math.random() - 0.5) * 100, 
                    true
                ));
            }
        } else {
            selectedBtn.classList.add('incorrect');
            buttons[q.correct].classList.add('correct');
            quizFeedbackBox.className = 'quiz-feedback error';
            quizFeedbackBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Quase lá! O amor supera tudo! 🥰';
        }

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < QUIZ_QUESTIONS.length) {
                loadQuizQuestion();
            } else {
                showQuizResults();
            }
        }, 2200);
    }

    function showQuizResults() {
        if (quizProgressBar) quizProgressBar.style.width = '100%';
        if (quizProgressNum) quizProgressNum.textContent = 'Concluído!';
        
        let resultTitle = '';
        let resultDesc = '';
        let couponTitle = '';
        let couponCode = '';
        
        if (quizScore === QUIZ_QUESTIONS.length) {
            resultTitle = 'Afinidade 100% Perfeita! 🏆💖';
            resultDesc = `Parabéns ${settings.elaName}! Você acertou TODAS as perguntas! Você realmente é o grande amor do ${settings.eleName} e conhece o coração dele como ninguém.`;
            couponTitle = 'VALE UM JANTAR ROMÂNTICO COMPLETO 🍽️✨';
            couponCode = 'AMOR-INFINITO-100';
        } else if (quizScore >= 3) {
            resultTitle = 'Corações Super Sintetizados! 🥰';
            resultDesc = `Muito bem, ${settings.elaName}! Você acertou ${quizScore} de ${QUIZ_QUESTIONS.length} perguntas! O amor de vocês é lindo e inquebrável.`;
            couponTitle = 'VALE UM SUPER CINEMA COM PIPOCA & BEIJINHOS 🍿🎬';
            couponCode = 'CUMPLICIDADE-80';
        } else {
            resultTitle = 'Amor em Construção! 🌱';
            resultDesc = `Você acertou ${quizScore} perguntas. O que importa de verdade é cada novo momento lindo que vocês criam juntos diariamente!`;
            couponTitle = 'VALE UM DIA INTEIRO DE CARINHO & CHOCOLATE 🍫❤️';
            couponCode = 'SEMPRE-JUNTOS';
        }

        quizContainer.innerHTML = `
            <div class="quiz-result-box">
                <h3 class="quiz-result-title">${resultTitle}</h3>
                <p class="quiz-result-desc">${resultDesc}</p>
                
                <div class="quiz-coupon">
                    <span class="coupon-header">Cupom de Amor Digital</span>
                    <h4 class="coupon-title">${couponTitle}</h4>
                    <span style="font-size: 0.85rem; margin-top: 5px;">Apresente este cupom ao ${settings.eleName} para resgatar o seu prêmio especial!</span>
                    <span class="coupon-code">${couponCode}</span>
                    <span class="coupon-footer">Válido com amor eterno de ${settings.eleName}</span>
                </div>
                
                <button class="quiz-reset-btn" id="reset-quiz-btn">Refazer Teste</button>
            </div>
        `;

        document.getElementById('reset-quiz-btn').addEventListener('click', () => {
            currentQuestionIndex = 0;
            quizScore = 0;
            
            // Recarrega a página rapidamente para reiniciar o quiz
            window.location.reload();
        });
    }

    loadQuizQuestion();

    // ==========================================================================
    // 5. INTERAÇÃO DA CARTA DE AMOR (ENVELOPE)
    // ==========================================================================
    const envelope = document.getElementById('love-envelope');
    const letterModal = document.getElementById('letter-modal');
    const closeLetterBtn = document.getElementById('close-letter');
    
    if (envelope) {
        envelope.addEventListener('click', () => {
            letterModal.classList.add('open');
            
            // Tenta dar play suave na música caso esteja pausado
            const audio = document.getElementById('romantic-audio');
            if (audio && audio.paused) {
                playAudio();
            }
        });
    }
    
    if (closeLetterBtn) {
        closeLetterBtn.addEventListener('click', () => {
            letterModal.classList.remove('open');
        });
    }
    
    if (letterModal) {
        letterModal.addEventListener('click', (e) => {
            if (e.target === letterModal) {
                letterModal.classList.remove('open');
            }
        });
    }

    // ==========================================================================
    // 6. PLAYER DE MÚSICA FLUTUANTE (WIDGET PLAYLIST MULTI-FAIXAS)
    // ==========================================================================
    const PLAYLIST = [
        {
            name: "Piano Romântico",
            artist: "Romantic Piano Memories",
            url: "https://assets.mixkit.co/music/preview/mixkit-romantic-memories-141.mp3"
        },
        {
            name: "Lofi de Ninar",
            artist: "Beautiful Dream Lofi",
            url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-lullaby-579.mp3"
        },
        {
            name: "Violão Suave",
            artist: "Sunshine Acoustic",
            url: "https://assets.mixkit.co/music/preview/mixkit-sunshine-acoustic-guitar-preview-634.mp3"
        }
    ];

    let currentTrackIndex = 0;

    const audio = document.getElementById('romantic-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextTrackBtn = document.getElementById('next-track-btn');
    const albumSpin = document.getElementById('album-spin');
    const soundWave = document.getElementById('sound-wave');
    const playerTrackName = document.getElementById('player-track-name');
    
    function playAudio() {
        if (!audio) return;
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            if (albumSpin) albumSpin.classList.add('playing');
            if (soundWave) soundWave.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay barrado pelo navegador. Interação do usuário necessária.", err);
        });
    }
    
    function pauseAudio() {
        if (!audio) return;
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (albumSpin) albumSpin.classList.remove('playing');
        if (soundWave) soundWave.classList.remove('playing');
    }
    
    function toggleTrack() {
        if (!audio) return;
        const isCurrentlyPlaying = !audio.paused;
        
        currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        
        audio.src = PLAYLIST[currentTrackIndex].url;
        if (playerTrackName) {
            playerTrackName.textContent = PLAYLIST[currentTrackIndex].name;
            playerTrackName.title = `${PLAYLIST[currentTrackIndex].name} - ${PLAYLIST[currentTrackIndex].artist}`;
        }
        
        if (isCurrentlyPlaying) {
            playAudio();
        } else {
            // Tocar caso mude de música enquanto pausado, ativando a atmosfera
            playAudio();
        }
    }
    
    if (playPauseBtn && audio) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflito com o click listener geral do body
            if (audio.paused) {
                playAudio();
            } else {
                pauseAudio();
            }
        });
    }

    if (nextTrackBtn) {
        nextTrackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTrack();
        });
    }
    
    // Tocar suavemente na primeira interação real com o site
    let firstInteraction = false;
    document.body.addEventListener('click', () => {
        if (!firstInteraction) {
            firstInteraction = true;
            if (audio && audio.paused) {
                setTimeout(playAudio, 300);
            }
        }
    }, { once: false });

    // ==========================================================================
    // 7. LIGHTBOX DA GALERIA POLAROID
    // ==========================================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    window.openLightbox = function(polaroidCard) {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        
        const img = polaroidCard.querySelector('img');
        const caption = polaroidCard.querySelector('.polaroid-caption');
        
        if (img) {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('open');
        }
    };
    
    window.closeLightbox = function() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
    };
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });
    }
    
    // ==========================================================================
    // 8. EASTER EGG: CLIQUE SURPRESA NO LOGO / MONOGRAMA (L ❤️ M)
    // ==========================================================================
    const heartPulseLogo = document.querySelector('.heart-pulse');

    if (heartPulseLogo) {
        heartPulseLogo.addEventListener('click', () => {
            // 1. Explosão de corações a partir da posição do logo
            const rect = heartPulseLogo.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            for (let i = 0; i < 40; i++) {
                const p = new HeartParticle(
                    x + (Math.random() - 0.5) * 40, 
                    y + (Math.random() - 0.5) * 40, 
                    true
                );
                // Variações físicas para decolagem rápida
                p.speedY = -(Math.random() * 3 + 1.5);
                p.speedX = (Math.random() - 0.5) * 6;
                p.decay = Math.random() * 0.015 + 0.005;
                particles.push(p);
            }

            // 2. Mensagem flutuante surpresa (limpa anterior se houver)
            const existingMsg = document.querySelector('.floating-love-message');
            if (existingMsg) existingMsg.remove();

            const msg = document.createElement('div');
            msg.className = 'floating-love-message';
            msg.innerHTML = `Para todo o sempre, ${settings.eleName} & ${settings.elaName}! ❤️`;
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.appendChild(msg);
            }

            // Remove a mensagem após a animação de fade (2.5 segundos)
            setTimeout(() => {
                msg.remove();
            }, 2500);
        });
    }

});
