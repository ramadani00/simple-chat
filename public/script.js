class ChatClient {
  constructor() {
    this.username = '';
    this.socket = null;
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.loginSection = document.getElementById('loginSection');
    this.chatSection = document.getElementById('chatSection');
    this.nameInput = document.getElementById('name');
    this.loginBtn = document.getElementById('loginBtn');
    this.chatMessages = document.getElementById('chatMessages');
    this.messageInput = document.getElementById('messageInput');
    this.sendBtn = document.getElementById('sendBtn');
  }

  setupEventListeners() {
    this.loginBtn.addEventListener('click', () => this.handleLogin());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  handleLogin() {
    const name = this.nameInput.value.trim();
    if (!name) {
      alert('Silakan masukkan nama Anda!');
      return;
    }

    this.username = name;
    this.connectWebSocket();
    this.loginSection.classList.add('hidden');
    this.chatSection.classList.remove('hidden');
    this.messageInput.disabled = false;
    this.sendBtn.disabled = false;
    this.messageInput.focus();
  }

  connectWebSocket() {
    this.socket = new WebSocket(`ws://${window.location.host}`);

    this.socket.onopen = () => {
      this.addSystemMessage('Terhubung ke server chat');
    };

    this.socket.onmessage = (event) => {
      this.addChatMessage(event.data);
    };

    this.socket.onclose = () => {
      this.addSystemMessage('Terputus dari server chat');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.addSystemMessage('Error pada koneksi chat');
    };
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message || !this.socket) return;

    const fullMessage = `${this.username}: ${message}`;
    this.socket.send(fullMessage);
    this.messageInput.value = '';
  }

  addChatMessage(message) {
    const chatMessages = this.chatMessages;
    const newMessage = document.createElement('li');
    newMessage.textContent = message;
    newMessage.classList.add('animated'); // class ini aktifkan animasi
    chatMessages.appendChild(newMessage);
    newMessage.scrollIntoView({ behavior: 'smooth' });
  }

  addSystemMessage(message) {
    const item = document.createElement('li');
    item.textContent = `[System] ${message}`;
    item.style.color = '#7f8c8d';
    item.style.fontStyle = 'italic';
    item.classList.add('animated'); // Tambahkan animasi
    this.chatMessages.appendChild(item);
    item.scrollIntoView({ behavior: 'smooth' });
  }
}

// Jalankan client saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  new ChatClient();
});