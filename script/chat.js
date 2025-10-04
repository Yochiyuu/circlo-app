let currentContact = null;
let activeElement = null;
// Simulasi chat history
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
        { id: 2, text: "Ooo lu gak bisa ya? yaudah sini gua bikinin", sender: "self" }
    ]
    };
let messageIdCounter = 100;

const contacts = document.querySelectorAll(".contact-item");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatHeader = document.getElementById("chatHeader");
const chatInputArea = document.getElementById("chatInputArea");
const chatContentContainer = document.getElementById("chat-content-container");

// Load chat ketika kontak diklik (Logic gabungan Desktop dan Mobile)
contacts.forEach(contact => {
    contact.addEventListener("click", () => {
        // 1. Logic Standar
        if (activeElement) {
            activeElement.classList.remove("active");
        }
        const name = contact.getAttribute('data-username');
        const displayName = contact.querySelector("strong").textContent;
        currentContact = name;
        activeElement = contact;
        contact.classList.add("active");

        const isMobile = window.innerWidth <= 430;

        // 2. Logic Mobile (SAAT MASUK CHAT ROOM)
        if (isMobile) {
            // Tindakan Masuk Chat: Sembunyikan Kontak, Tampilkan Chat
            document.querySelector('.ig-contacts').style.display = 'none'; 
            document.querySelector('.ig-main').classList.add('fullscreen');

            // Set Header dengan ikon Back yang VISIBLE
            chatHeader.innerHTML = `
                <i class="fas fa-arrow-left toggle-contacts-icon" onclick="toggleContacts()" style="visibility: visible; padding-right: 15px; cursor: pointer;"></i>
                <div style="display: flex; align-items: center; flex: 1;">
                    <img src="${contact.querySelector('img').src}" alt="User" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 10px;">
                    <div style="line-height: 1.2;">
                        <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">${displayName}</h3>
                        <p style="font-size: 0.8rem; color: #a8a8a8;">Active Now</p>
                    </div>
                </div>
                <div class="chat-icons">
                    <i class="fas fa-phone-alt"></i>
                    <i class="fas fa-video"></i>
                </div>
            `;
        } 
        
        // 3. Logic Desktop
        else {
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
        }

        chatInputArea.style.display = 'flex';
        renderChat();
    });
});

// Fungsi lainnya (sendMessage, renderChat, deleteMessage, editMessage) tidak diubah.

function sendMessage(message) {
    if (!currentContact) return;

    if (!message) {
        message = chatInput.value.trim();
        if (!message) return;
    }

    if (!chatHistory[currentContact]) chatHistory[currentContact] = [];

    chatHistory[currentContact].push({
        id: messageIdCounter++,
        text: message,
        sender: "self"
    });
    
    chatInput.value = "";
    renderChat();
}

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function renderChat() {
    chatBox.innerHTML = "";
    const chats = chatHistory[currentContact] || [];

    chats.forEach((msg) => {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message", msg.sender);
        msgDiv.setAttribute('data-id', msg.id);

        let actionsHtml = '';
        if (msg.sender === 'self') {
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

    chatBox.scrollTop = chatBox.scrollHeight;
}

function deleteMessage(id) {
    if (!currentContact) return;
    const indexToDelete = chatHistory[currentContact].findIndex(msg => msg.id === id);
    if (indexToDelete > -1) {
        chatHistory[currentContact].splice(indexToDelete, 1);
        renderChat();
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    chatInputArea.style.display = 'none';
});


// --- FUNGSI UTAMA TOMBOL BACK (toggleContacts) ---
function toggleContacts() {
    const isMobile = window.innerWidth <= 430;

    // KONDISI PENTING: Cek mode mobile DAN kita sedang berada di chat room
    if (isMobile && currentContact) {
        // 1. Tindakan SAAT KELUAR CHAT ROOM:
        // Tampilkan daftar kontak
        document.querySelector('.ig-contacts').style.display = 'flex';
        // Sembunyikan chat area
        document.querySelector('.ig-main').classList.remove('fullscreen');

        // 2. Reset Header ke tampilan awal "Select a contact..."
        chatHeader.innerHTML = `
            <i class="fas fa-arrow-left toggle-contacts-icon" onclick="toggleContacts()" style="visibility: hidden;"></i>
            <p class="select-contact-text">Select a contact to start chatting</p>
        `;
        
        // 3. Reset state
        chatInputArea.style.display = 'none';
        currentContact = null; // Kunci: Ini mereset agar tombol bisa berfungsi lagi saat masuk chat baru.
        if (activeElement) {
            activeElement.classList.remove('active');
            activeElement = null;
        }
        chatBox.innerHTML = "";
        
    } else if (!isMobile) {
        // Logika Desktop
        const contactsContainer = document.querySelector('.ig-contacts');
        contactsContainer.style.display = (contactsContainer.style.display === 'none' || contactsContainer.style.display === '') ? 'flex' : 'none';
    }
}

// Fungsi toggle menu (garis tiga)
function toggleSidebar() {
    document.querySelector('.ig-sidebar').classList.toggle('hidden');
    document.querySelector('.ig-contacts').classList.toggle('hidden');
}