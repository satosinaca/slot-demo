// API Configuration
const API_URL = 'http://localhost:5000/api';

class API {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    return data;
  }

  async register(username, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    return data;
  }

  async verifyToken() {
    const res = await fetch(`${API_URL}/auth/verify`, {
      headers: this.getHeaders()
    });
    return res.json();
  }

  // Users
  async getUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      headers: this.getHeaders()
    });
    return res.json();
  }

  async updateBalance(id, amount) {
    const res = await fetch(`${API_URL}/users/${id}/balance`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ amount })
    });
    return res.json();
  }

  // Games
  async getGames() {
    const res = await fetch(`${API_URL}/games`);
    return res.json();
  }

  // Rewards
  async getRewards() {
    const res = await fetch(`${API_URL}/rewards`);
    return res.json();
  }

  async claimReward(userId, rewardId) {
    const res = await fetch(`${API_URL}/rewards/${userId}/claim/${rewardId}`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return res.json();
  }

  // Tasks
  async getTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
  }

  async completeTask(userId, taskId) {
    const res = await fetch(`${API_URL}/tasks/${userId}/complete/${taskId}`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return res.json();
  }

  // Leaderboard
  async getLeaderboard() {
    const res = await fetch(`${API_URL}/leaderboard`);
    return res.json();
  }
}

const api = new API();
