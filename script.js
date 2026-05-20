/**
 * Lucas & Mayara - Website de Homenagem de Dia dos Namorados
 * Script Interativo
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. CONFIGURAÇÕES & CONSTANTES
    // ==========================================================================
    // Data de início: 11 de Fevereiro de 2025
    // Ano: 2025, Mês: 1 (Fevereiro é 1 no index 0-11 de JS), Dia: 11, Hora: 0, Min: 0, Seg: 0
    const ANNIVERSARY_DATE = new Date(2025, 1, 11, 0, 0, 0);

    // ==========================================================================
    // 2. CANVAS DE PARTÍCULAS (CORAÇÕES FLUTUANTES)
    // ==========================================================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 60;
    
    // Redimensionar Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Classe da Partícula de Coração
    class HeartParticle {
        constructor(x, y, isTrail = false) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || (isTrail ? y : canvas.height + 20);
            this.size = Math.random() * 12 + 6; // Tamanho do coração
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = isTrail ? -(Math.random() * 1.5 + 0.5) : -(Math.random() * 1.2 + 0.6);
            this.alpha = 1;
            this.decay = Math.random() * 0.005 + 0.002;
            this.colorAngle = Math.random() * 20 - 10; // Variação do tom rosa/vermelho
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
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            
            // Sombra Neon Sutil
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(347, 100%, 65%, ${this.alpha * 0.4})`;
            
            ctx.beginPath();
            // Cor baseada na paleta rosa/vermelho HSL
            ctx.fillStyle = `hsla(${347 + this.colorAngle}, 100%, 65%, ${this.alpha})`;
            
            // Desenhar Coração com curvas de Bézier matemáticas perfeitas
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
    
    // Iniciar Partículas
    function initParticles() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new HeartParticle(null, Math.random() * canvas.height));
        }
    }
    
    // Loop de Animação
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            
            // Substituir partículas mortas
            if (p.alpha <= 0 || p.y < -30) {
                particles[index] = new HeartParticle();
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Criar partículas no rastro do mouse (Micro-interação moderna)
    let mouseActive = false;
    let mouseTimeout;
    
    window.addEventListener('mousemove', (e) => {
        if (!mouseActive) {
            mouseActive = true;
        }
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => { mouseActive = false; }, 100);
        
        // Limita a frequência de geração para melhor desempenho
        if (Math.random() < 0.25) {
            particles.push(new HeartParticle(e.clientX, e.clientY, true));
            if (particles.length > maxParticles + 25) {
                particles.shift(); // Remove a partícula mais antiga para economizar recursos
            }
        }
    });
    
    initParticles();
    animateParticles();

    // ==========================================================================
    // 3. CONTADOR PROGRESSIVO DE RELACIONAMENTO
    // ==========================================================================
    const elYears = document.getElementById('years');
    const elMonths = document.getElementById('months');
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');
    
    function updateLoveCounter() {
        const now = new Date();
        
        // Cálculo de datas exatas considerando dias diferentes em meses e anos bissextos
        let diffYears = now.getFullYear() - ANNIVERSARY_DATE.getFullYear();
        let diffMonths = now.getMonth() - ANNIVERSARY_DATE.getMonth();
        let diffDays = now.getDate() - ANNIVERSARY_DATE.getDate();
        let diffHours = now.getHours() - ANNIVERSARY_DATE.getHours();
        let diffMinutes = now.getMinutes() - ANNIVERSARY_DATE.getMinutes();
        let diffSeconds = now.getSeconds() - ANNIVERSARY_DATE.getSeconds();
        
        // Ajustes lógicos em cascata
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
            // Obter a quantidade de dias do mês anterior
            const prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
            diffDays += prevMonthDate.getDate();
            diffMonths--;
        }
        
        if (diffMonths < 0) {
            diffMonths += 12;
            diffYears--;
        }
        
        // Exibir os números formatados com dois dígitos
        elYears.textContent = String(diffYears).padStart(2, '0');
        elMonths.textContent = String(diffMonths).padStart(2, '0');
        elDays.textContent = String(diffDays).padStart(2, '0');
        elHours.textContent = String(diffHours).padStart(2, '0');
        elMinutes.textContent = String(diffMinutes).padStart(2, '0');
        elSeconds.textContent = String(diffSeconds).padStart(2, '0');
    }
    
    // Atualização a cada segundo
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

    // ==========================================================================
    // 4. INTERAÇÃO DA CARTA DE AMOR (ENVELOPE)
    // ==========================================================================
    const envelope = document.getElementById('love-envelope');
    const letterModal = document.getElementById('letter-modal');
    const closeLetterBtn = document.getElementById('close-letter');
    
    // Abrir a carta ao clicar no envelope físico
    if (envelope) {
        envelope.addEventListener('click', () => {
            letterModal.classList.add('open');
            
            // Se o áudio estiver pausado e o usuário quiser ler, podemos tentar iniciar a música suavemente
            const audio = document.getElementById('romantic-audio');
            if (audio && audio.paused) {
                playAudio();
            }
        });
    }
    
    // Fechar a carta
    if (closeLetterBtn) {
        closeLetterBtn.addEventListener('click', () => {
            letterModal.classList.remove('open');
        });
    }
    
    // Fechar ao clicar fora do papel de escrita
    if (letterModal) {
        letterModal.addEventListener('click', (e) => {
            if (e.target === letterModal) {
                letterModal.classList.remove('open');
            }
        });
    }

    // ==========================================================================
    // 5. PLAYER DE MÚSICA FLUTUANTE (AUDIO CONTROLLER)
    // ==========================================================================
    const audio = document.getElementById('romantic-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const albumSpin = document.getElementById('album-spin');
    const soundWave = document.getElementById('sound-wave');
    
    function playAudio() {
        if (!audio) return;
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            albumSpin.classList.add('playing');
            soundWave.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay bloqueado pelo navegador. Interação do usuário necessária.", err);
        });
    }
    
    function pauseAudio() {
        if (!audio) return;
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        albumSpin.classList.remove('playing');
        soundWave.classList.remove('playing');
    }
    
    if (playPauseBtn && audio) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                playAudio();
            } else {
                pauseAudio();
            }
        });
    }
    
    // Se o usuário clicar em qualquer lugar da página pela primeira vez, podemos tentar tocar
    // (Ajuda a iniciar a atmosfera musical assim que eles interagem com a página)
    let firstInteraction = false;
    document.body.addEventListener('click', () => {
        if (!firstInteraction) {
            firstInteraction = true;
            // Toca apenas se já não estiver tocando
            if (audio && audio.paused) {
                // Pequeno atraso para não chocar na transição do clique
                setTimeout(playAudio, 300);
            }
        }
    }, { once: false }); // Mantém ativado para o primeiro clique de interação real

    // ==========================================================================
    // 6. LIGHTBOX DA GALERIA POLAROID
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
    
    // Fechar lightbox ao clicar fora da imagem
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });
    }
    
    // Fechar com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            if (letterModal) letterModal.classList.remove('open');
        }
    });

});
