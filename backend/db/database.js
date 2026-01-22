// In-memory database mock (replace with MongoDB for production)
const users = {};
const rewards = {};
const tasks = {};

class Database {
  // Users
  createUser(userData) {
    const userId = Date.now().toString();
    users[userId] = {
      id: userId,
      ...userData,
      balance: 1000,
      points: 0,
      createdAt: new Date(),
      dailyLoginStreak: 0,
      completedTasks: [],
      claimedRewards: []
    };
    return users[userId];
  }

  findUserByEmail(email) {
    return Object.values(users).find(u => u.email === email);
  }

  findUserById(id) {
    return users[id];
  }

  updateUser(id, data) {
    if (users[id]) {
      users[id] = { ...users[id], ...data };
      return users[id];
    }
    return null;
  }

  getAllUsers(limit = 100) {
    return Object.values(users).slice(0, limit);
  }

  // Rewards
  createReward(rewardData) {
    const rewardId = Date.now().toString();
    rewards[rewardId] = { id: rewardId, ...rewardData };
    return rewards[rewardId];
  }

  getRewards() {
    return Object.values(rewards);
  }

  // Tasks
  createTask(taskData) {
    const taskId = Date.now().toString();
    tasks[taskId] = { id: taskId, ...taskData };
    return tasks[taskId];
  }

  getTasks() {
    return Object.values(tasks);
  }
}

module.exports = new Database();
