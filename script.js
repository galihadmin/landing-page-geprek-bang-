// database jawaban random 
const greetingReplies = [
    "Halo Bang! Perut udah keroncongan ya? 😂",
    "Eh ada Si Abang, mau cari yang pedas-pedas membara?",
    "Selamat datang di markas Geprek Bang! Siap ulek nih! 🌶️",
    "Halo! Mau makan enak atau mau curhat tipis-tipis soal sambal? hehe."
];

const menuData = {
    "mozza": { nama: "Mozza Blast", harga: 25000, desc: "Ayam geprek krispi dengan selimut keju yang molor banget!" },
    "original": { nama: "Geprek Original", harga: 15000, desc: "Klasik! Sambal bawang ulek dadakan yang bikin nagih." },
    "mie": { nama: "Mie Geprek Meledak", harga: 18000, desc: "Perpaduan maut indomie goreng + ayam geprek sambal ijo." }
};

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.classList.toggle('chat-hidden');
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

// fngsi kirim pesan 
function addMessage(text, sender) {
    const content = document.getElementById('chat-content');
    const div = document.createElement('div');
    div.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
    div.innerHTML = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
}

// efek ngetik 
function showTyping(callback) {
    const content = document.getElementById('chat-content');
    const loader = document.createElement('div');
    loader.id = 'bot-loading';
    loader.className = 'bot-msg';
    loader.innerHTML = '<i>Bang Bot ngetik...</i>';
    content.appendChild(loader);
    content.scrollTop = content.scrollHeight;

    setTimeout(() => {
        loader.remove();
        callback();
    }, 1000);
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (msg === "") return;

    addMessage(msg, 'user');
    input.value = "";

    showTyping(() => {
        processBotLogic(msg.toLowerCase());
    });
}

function processBotLogic(input) {
    let reply = "";

    // ogika Percakapan
    if (input.includes("halo") || input.includes("p") || input.includes("hai")) {
        const randomGreet = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
        reply = `${randomGreet} <br><br>Coba deh ketik <b>'Menu'</b> atau <b>'Pesan'</b> biar Bang Bot bantuin.`;
    } 
    else if (input.includes("menu")) {
        reply = "<b>MENU HARI INI:</b><br>🍗 <b>Mozza</b> - 25rb<br>🍗 <b>Original</b> - 15rb<br>🍜 <b>Mie Geprek</b> - 18rb<br><br>Abang tertarik yang mana? Ketik namanya ya!";
    }
    else if (input.includes("mozza") || input.includes("original") || input.includes("mie")) {
        const item = input.includes("mozza") ? menuData.mozza : (input.includes("mie") ? menuData.mie : menuData.original);
        reply = `Wah pilihan mantap! <b>${item.nama}</b> itu ${item.desc} <br><br>Mau pesan lewat WhatsApp sekarang? <br><a href='https://wa.me/6281234567890?text=Bang, mau pesan ${item.nama}' target='_blank' style='color:#ff6600; font-weight:bold;'>KLIK DISINI UNTUK ORDER</a>`;
    }
    else if (input.includes("pedas") || input.includes("level")) {
        reply = "Di sini level pedas dari 1 sampe 15 Bang. Level 15 biasanya buat yang mau tobat, berani nggak? 🔥🔥";
    }
    else if (input.includes("makasih") || input.includes("thanks")) {
        reply = "Sama-sama Bang! Ditunggu orderannya ya, jangan sampe kehabisan! 🙏🔥";
    }
    else if (input.includes("promo")) {
        reply = "Lagi ada promo <b>JUMAT BERKAH</b>! Beli 2 Mozza gratis 2 Es Teh Manis Jumbo. Sikat Bang!";
    }
    else {
        reply = "Aduh Bang, Bang Bot bingung. Maklum kebanyakan ngulek sambal. 😂<br><br>Ketik <b>'Menu'</b> aja biar Bang Bot paham.";
    }

    addMessage(reply, 'bot');
}