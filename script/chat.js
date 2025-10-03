let currentContact = null;
let activeElement = null;
// Simulasi chat history, setiap pesan akan memiliki ID, teks, dan status 'self' (dari kita) atau 'other' (dari lawan bicara)
let chatHistory = {
    "Daniel_Ganteng": [
        { id: 1, text: "Naik Gunung Halimun yok", sender: "other" },
        { id: 2, text: "GASS!", sender: "self" },
    ],
    "Andrew_Dru.rei": [
        { id: 1, text: "Helm gua Balikin woy", sender: "other" },
        { id: 2, text: "Udah gua taro di depan kos kok", sender: "self" },

    ],
    "Marco_Jago.Gitar": [
        { id: 1, text: "Lu mau les gitar sama gua gak?", sender: "other" },
        { id: 2, text: "Boleh deh co, kan lu jago banget main gitarnya", sender: "self" }
    ],
    "Carlos.Suka.Bobo": [
        { id: 1, text: "Los, lu dimana? lu inget kan ada kelas hari ini?", sender: "self" },
        { id: 2, text: "Woy...", sender: "self" },
        { id: 3, text: "Sorry gua ketiduran, ini otw kampus!", sender: "other" }

    ],
    "Putra_Cyber": [
        { id: 1, text: "Put, tolong bantuin gua bikin firewall dong buat topologi gua", sender: "other" },
        { id: 2, text: "Ooo lu gak bisa ya? yaudah sini gua bikinin", sender: "self" } // Pesan ini bisa kamu coba edit/hapus
    ]
    };
let messageIdCounter = 100; // Counter unik untuk pesan baru

const contacts = document.querySelectorAll(".contact-item");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatHeader = document.getElementById("chatHeader");
const chatInputArea = document.getElementById("chatInputArea");
const chatContentContainer = document.getElementById("chat-content-container");

// Load chat ketika kontak diklik
contacts.forEach(contact => {
    contact.addEventListener("click", () => {
        // Hapus highlight dari kontak sebelumnya
        if (activeElement) {
            activeElement.classList.remove("active");
        }

        const name = contact.getAttribute('data-username');
        const displayName = contact.querySelector("strong").textContent;
        currentContact = name;
        activeElement = contact;
        contact.classList.add("active");

        // Tampilkan Header dan Input Area
        chatHeader.innerHTML = `
            <div class="user-info">
                <img src="${contact.querySelector('img').src}" alt="${name}" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 10px;">
                <div style="line-height: 1.2;">
                    <h3 style="margin-bottom: 2px;">${displayName}</h3>
                    <p style="font-size: 0.8rem; color: #a8a8a8;">Active Now</p>
                </div>
            </div>
            <div class="chat-icons">
                <i class="fas fa-phone-alt"></i>
            </div>
        `;
        
        chatInputArea.style.display = 'flex';
        renderChat();
    });
});

// Kirim pesan (dengan enter atau klik ikon hati)
function sendMessage(message) {
    if (!currentContact) return;

    if (!message) {
        message = chatInput.value.trim();
        if (!message) return;
    }

    if (!chatHistory[currentContact]) chatHistory[currentContact] = [];

    // Tambahkan pesan baru dengan ID unik dan sender 'self'
    chatHistory[currentContact].push({
        id: messageIdCounter++,
        text: message,
        sender: "self"
    });
    
    chatInput.value = "";
    renderChat();
}

// Tambahkan event listener untuk tombol Enter
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Tampilkan ulang chat
function renderChat() {
    chatBox.innerHTML = "";
    const chats = chatHistory[currentContact] || [];

    chats.forEach((msg, index) => {
        const msgDiv = document.createElement("div");
        // Gunakan sender untuk menentukan class (self/other)
        msgDiv.classList.add("chat-message", msg.sender);
        // Simpan ID pesan sebagai data attribute
        msgDiv.setAttribute('data-id', msg.id);

        let actionsHtml = '';
        if (msg.sender === 'self') {
            // Hanya pesan kita yang bisa di-edit/delete
            actionsHtml = `
                <div class="actions">
                    <button onclick="editMessage(${msg.id})"><i class="fas fa-pen"></i></button>
                    <button onclick="deleteMessage(${msg.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
        }


        msgDiv.innerHTML = `
             ${msg.text}
             ${actionsHtml}
        `;

        chatBox.appendChild(msgDiv);
    });

    // Scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Hapus pesan
function deleteMessage(id) {
    if (!currentContact) return;
    const indexToDelete = chatHistory[currentContact].findIndex(msg => msg.id === id);
    if (indexToDelete > -1) {
        chatHistory[currentContact].splice(indexToDelete, 1);
        renderChat();
    }
}

// Edit pesan
function editMessage(id) {
    if (!currentContact) return;
    const message = chatHistory[currentContact].find(msg => msg.id === id);
    if (!message || message.sender !== 'self') return;
    
    const newMsg = prompt("Edit message:", message.text);
    if (newMsg !== null && newMsg.trim() !== "") {
        message.text = newMsg.trim();
        renderChat();
    }
}

// Inisialisasi: Sembunyikan input area saat belum ada chat yang dipilih
document.addEventListener('DOMContentLoaded', () => {
    chatInputArea.style.display = 'none';
});

// Fungsi untuk buka chat room dan sembunyikan sidebar + kontak
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('click', () => {
    // Sembunyikan sidebar kiri dan kontak (khusus mobile)
    if (window.innerWidth <= 430) {
      document.querySelector('.ig-sidebar').classList.add('hidden');
      document.querySelector('.ig-contacts').classList.add('hidden');
      document.querySelector('.ig-main').classList.add('fullscreen');
    }

    // Tampilkan input chat & header
    document.getElementById('chatInputArea').style.display = 'flex';
    document.getElementById('chatHeader').innerHTML = `
      <h3>${item.querySelector('strong').innerText}</h3>
      <div class="chat-icons">
        <i class="fas fa-phone"></i>
        <i class="fas fa-video"></i>
      </div>
    `;
  });
});

// Fungsi toggle menu (garis tiga) untuk buka sidebar
function toggleSidebar() {
  document.querySelector('.ig-sidebar').classList.toggle('hidden');
  document.querySelector('.ig-contacts').classList.toggle('hidden');
}
