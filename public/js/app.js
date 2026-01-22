let currentUser = null;

// Init
document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  setupEventListeners();
});

// Auth
function switchTab(tab) {
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  if (tab === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else {
    document.getElementById('registerForm').classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}

async function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) return;

  try {
    const userData = await api.verifyToken();
    if (userData.user) {
      currentUser = userData.user;
      showApp();
      await loadUserData();
    }
  } catch (err) {
    localStorage.removeItem('authToken');
  }
}

function setupEventListeners() {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const data = await api.login(email, password);
      if (data.token) {
        currentUser = data.user;
        showApp();
        await loadUserData();
      }
    } catch (err) {
      document.getElementById('loginError').textContent = 'Login failed';
    }
  });

  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
      const data = await api.register(username, email, password);
      if (data.token) {
        currentUser = data.user;
        showApp();
        await loadUserData();
      }
    } catch (err) {
      document.getElementById('regError').textContent = 'Registration failed';
    }
  });
}

function showApp() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  document.getElementById('username').textContent = currentUser.username;
}

function logout() {
  localStorage.removeItem('authToken');
  currentUser = null;
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('loginForm').reset();
  document.getElementById('registerForm').reset();
}

// Load Data
async function loadUserData() {
  try {
    const user = await api.getUser(currentUser.id);
    currentUser = user;
    updateUserDisplay();
    await loadGames();
  } catch (err) {
    console.error('Error loading user data:', err);
  }
}

function updateUserDisplay() {
  document.getElementById('balance-stat').textContent = `$${currentUser.balance.toLocaleString()}`;
  document.getElementById('points-stat').textContent = currentUser.points;
  document.getElementById('userBalance').textContent = `$${currentUser.balance.toLocaleString()}`;
  document.getElementById('level-stat').textContent = Math.floor(currentUser.points / 100) + 1;
}

async function loadGames() {
  const games = await api.getGames();
  const html = games.map(game => `
    <div class="game-card">
      <div class="game-image">
        <img src="${game.image}" alt="${game.name}">
      </div>
      <div class="game-info">
        <h3>${game.name}</h3>
        <button class="btn-play" onclick="playGame('${game.url}')">Play Now</button>
      </div>
    </div>
  `).join('');
  
  document.getElementById('gamesList').innerHTML = html;
}

async function loadRewards() {
  const rewards = await api.getRewards();
  const html = rewards.map(reward => `
    <div class="reward-card">
      <h3>${reward.name}</h3>
      <p>${reward.description}</p>
      <div class="reward-amount">+$${reward.amount}</div>
      <button class="btn-claim" onclick="claimReward(${reward.id})">Claim</button>
    </div>
  `).join('');
  
  document.getElementById('rewardsList').innerHTML = html;
}

async function loadTasks() {
  const tasks = await api.getTasks();
  const html = tasks.map(task => `
    <div class="task-item">
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </div>
      <div class="task-reward">+$${task.reward}</div>
      <button class="btn-complete" onclick="completeTask(${task.id})">Complete</button>
    </div>
  `).join('');
  
  document.getElementById('tasksList').innerHTML = html;
}

async function loadLeaderboard() {
  const users = await api.getLeaderboard();
  const html = `
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Balance</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td>${u.rank}</td>
            <td>${u.username}</td>
            <td>$${u.balance.toLocaleString()}</td>
            <td>${u.points}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  document.getElementById('leaderboardList').innerHTML = html;
}

// Navigation
function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
  const sectionMap = {
    games: 'gamesSection',
    rewards: 'rewardsSection',
    tasks: 'tasksSection',
    leaderboard: 'leaderboardSection'
  };

  document.getElementById(sectionMap[section]).classList.add('active');
  event.target.classList.add('active');

  if (section === 'rewards') loadRewards();
  if (section === 'tasks') loadTasks();
  if (section === 'leaderboard') loadLeaderboard();
}

// Actions
function playGame(url) {
  window.location.href = url;
}

async function claimReward(rewardId) {
  try {
    const data = await api.claimReward(currentUser.id, rewardId);
    currentUser.balance = data.balance;
    updateUserDisplay();
    alert(`Claimed reward! +$${data.amount}`);
    loadRewards();
  } catch (err) {
    alert('Failed to claim reward');
  }
}

async function completeTask(taskId) {
  try {
    const data = await api.completeTask(currentUser.id, taskId);
    currentUser.balance = data.balance;
    currentUser.points = data.points;
    updateUserDisplay();
    alert(`Task completed! +$${data.reward}`);
    loadTasks();
  } catch (err) {
    alert('Failed to complete task');
  }
}
