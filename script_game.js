document.addEventListener('DOMContentLoaded', function () {
    // Sound setup
    const soundButton = document.querySelector('.song_button');
    const audio = new Audio('1807978078_2_tiktok.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Score & collection
    let currentScore = parseInt(localStorage.getItem('plush_score')) || 0;
    let collection = JSON.parse(localStorage.getItem('plush_collection')) || [];

    let change_plush = document.querySelector('.change_plush_button');
    change_plush.addEventListener('click', function() {
    let plush = document.querySelector('.clickable_img');
    if (plush.src.includes('https://i.postimg.cc/fLm1sv5D/Adobe-Express-file-1.png')) {
        plush.src = 'https://i.postimg.cc/sXh9wDf6/Adobe-Express-file-2.png';
    }
    else {
        const plushImages = [
            'https://i.postimg.cc/fLm1sv5D/Adobe-Express-file-1.png',
            'https://i.postimg.cc/sXh9wDf6/Adobe-Express-file-2.png',
            'https://i.postimg.cc/fb9FGsBF/Adobe-Express-file-3.png',
            'https://i.postimg.cc/fbHnssdf/Adobe-Express-file-4.png',
            'https://i.postimg.cc/XYp9Lc8N/Adobe-Express-file-5.png',
            'https://i.postimg.cc/fRrpqCQ8/Adobe-Express-file-6.png',
            'https://i.postimg.cc/T2jrkPvS/Untitled.png',
            'https://i.postimg.cc/k43bc01q/Untitled-1.png',
            'https://i.postimg.cc/rm3gBFft/Untitled-2.png',
            'https://i.postimg.cc/BQ83n29V/Remove-background-project-1.png',
        ];
        let currentIndex = plushImages.findIndex(src => plush.src.includes(src));
        let nextIndex = (currentIndex + 1) % plushImages.length;
        plush.src = plushImages[nextIndex];
    }
});

    const scoreElement = document.querySelector('.score');
    const plush = document.querySelector('.clickable_img');
    const easterEggPlush = document.querySelector('._easter_egg_clickable_img');

    const clickSound = new Audio('fnaf-beep.mp3');
    const autoClickButton = document.querySelector('.auto_click_cursor_button');
    let autoClickerInterval = null;

    const plushPool = [
        { src: 'https://i.postimg.cc/fLm1sv5D/Adobe-Express-file-1.png', weight: 70, rarity: "Common" },
        { src: 'https://i.postimg.cc/sXh9wDf6/Adobe-Express-file-2.png', weight: 70, rarity: "Common" },
        { src: 'https://i.postimg.cc/fb9FGsBF/Adobe-Express-file-3.png', weight: 60, rarity: "Uncommon" },
        { src: 'https://i.postimg.cc/fbHnssdf/Adobe-Express-file-4.png', weight: 40, rarity: "Rare" },
        { src: 'https://i.postimg.cc/XYp9Lc8N/Adobe-Express-file-5.png', weight: 30, rarity: "Super Rare" },
        { src: 'https://i.postimg.cc/fRrpqCQ8/Adobe-Express-file-6.png', weight: 25, rarity: "Ultra Rare" },
        { src: 'https://i.postimg.cc/T2jrkPvS/Untitled.png', weight: 0.0000000001, rarity: "Legendary" },
        { src: 'https://i.postimg.cc/k43bc01q/Untitled-1.png', weight: 0.0000000001, rarity: "Legendary" },
        { src: 'https://i.postimg.cc/rm3gBFft/Untitled-2.png', weight: 0.0000000001, rarity: "Legendary" },
        { src: 'https://i.postimg.cc/Mpys61vD/Adobe-Express-file-8.png', weight: 0.0000001, rarity: "Legendary" },
    ];

    // Utility
    function updateScoreDisplay() {
        scoreElement.innerHTML = `<strong>Score:</strong> ${currentScore}`;
        localStorage.setItem('plush_score', currentScore);
    }

    function saveCollection() {
        localStorage.setItem('plush_collection', JSON.stringify(collection));
    }

    function updateCollectionDisplay() {
        const container = document.querySelector('.collection_display');
        container.innerHTML = '';
        collection.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.width = '80px';
            img.style.height = '80px';
            img.style.margin = '5px';
            container.appendChild(img);
        });
    }

    function getWeightedRandom(plushes) {
        const total = plushes.reduce((sum, p) => sum + p.weight, 0);
        let rand = Math.random() * total;
        for (const p of plushes) {
            if (rand < p.weight) return p;
            rand -= p.weight;
        }
    }

    function scoreClick() {
        currentScore++;
        updateScoreDisplay();
        clickSound.play();

        plush.style.transform = 'scale(1.1)';
        setTimeout(() => plush.style.transform = 'scale(1)', 100);

        if (!collection.includes(plush.src)) {
            collection.push(plush.src);
            saveCollection();
            updateCollectionDisplay();
        }
    }

    function startAutoClicker() {
        if (autoClickerInterval) return;
        autoClickerInterval = setInterval(() => {
            currentScore += 2;
            updateScoreDisplay();
        }, 5000);
    }

    // Events
    plush.addEventListener('click', scoreClick);

    document.querySelector('#buy_plush_button').addEventListener('click', () => {
        if (currentScore >= 10) {
            const result = getWeightedRandom(plushPool);
            plush.src = result.src;
            alert(`You got a ${result.rarity} Plush! 🎉`);
            currentScore -= 10;
            updateScoreDisplay();
            if (!collection.includes(result.src)) {
                collection.push(result.src);
                saveCollection();
                updateCollectionDisplay();
            }
        } else {
            alert('You need at least 10 points to buy a random plush!');
        }
    });

    soundButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            soundButton.textContent = 'Pause Music';
        } else {
            audio.pause();
            soundButton.textContent = 'Play Music';
        }
    });

    document.querySelector('.change_plush_button').addEventListener('click', () => {
        const plushImages = plushPool.map(p => p.src);
        let currentIndex = plushImages.findIndex(src => plush.src.includes(src));
        plush.src = plushImages[(currentIndex + 1) % plushImages.length];
    });

    document.querySelector('.easter_egg').addEventListener('mouseover', () => {
        plush.src = 'https://i.postimg.cc/Mpys61vD/Adobe-Express-file-8.png';
        alert('You found the Easter Egg Plush! 🐣');
        if (!collection.includes(plush.src)) {
            collection.push(plush.src);
            saveCollection();
            updateCollectionDisplay();
        }
    });

    document.querySelector('#change_plush_button_easter_egg').addEventListener('click', () => {
        const imgs = [
            'https://i.postimg.cc/Mpys61vD/Adobe-Express-file-8.png',
            'https://i.postimg.cc/4dJSnGyn/Adobe-Express-file-9.png',
            'https://i.postimg.cc/Pr2Ykjs2/Adobe-Express-file-10.png',
            'https://i.postimg.cc/CLzLzTnv/Adobe-Express-file-11.png',
            'https://i.postimg.cc/K85ZWZ68/Adobe-Express-file-12.png',
        ];
        let idx = imgs.findIndex(src => easterEggPlush.src.includes(src));
        easterEggPlush.src = imgs[(idx + 1) % imgs.length];
        if (!collection.includes(easterEggPlush.src)) {
            collection.push(easterEggPlush.src);
            saveCollection();
            updateCollectionDisplay();
        }
    });

    autoClickButton.addEventListener('click', () => {
        if (autoClickerInterval) return alert('Auto-clicker already active!');
        if (currentScore >= 200) {
            currentScore -= 200;
            updateScoreDisplay();
            startAutoClicker();
        } else {
            alert('You need 200 points to unlock auto-clicker!');
        }
    });

    // Init
    alert('Welcome to the Clickable Plush Game!');
    updateScoreDisplay();
    updateCollectionDisplay();
    const randomPlush = getWeightedRandom(plushPool);
    plush.src = randomPlush.src;
});
// Add CSS styles dynamically
const style = document.createElement('style');  
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        color: #333;
    }
    .clickable_img, ._easter_egg_clickable_img {
        cursor: pointer;
        transition: transform 0.1s ease-in-out;
    }
    .collection_display img {
        border: 2px solid #ccc;
        border-radius: 5px;
    }
    .song_button, .auto_click_cursor_button, .change_plush_button, #buy_plush_button, #change_plush_button_easter_egg {
        margin: 5px;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .song_button:hover, .auto_click_cursor_button:hover, .change_plush_button:hover, #buy_plush_button:hover, #change_plush_button_easter_egg:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(style);
