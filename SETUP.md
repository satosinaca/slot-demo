# GemVui - Professional Gaming Platform

Nền tảng gaming chuyên nghiệp với hệ thống toàn diện.

## ✨ Tính Năng

- 🔐 **Hệ thống đăng nhập/đăng ký** - JWT authentication
- 👤 **Quản lý tài khoản** - Profile, balance, statistics
- 🎮 **Lobby trò chơi** - Danh sách 9 game Pragmatic Play
- 💰 **Hệ thống Rewards** - Bonuses, promotions, daily rewards
- ⚡ **Nhiệm vụ hàng ngày** - Daily tasks với rewards
- 📊 **Bảng xếp hạng** - Top players leaderboard
- 📱 **Responsive Design** - Mobile-friendly UI
- 🔄 **Real-time Updates** - Live balance, points tracking

## 🏗️ Cấu Trúc Dự Án

```
slot-demo/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── games.js
│   │   ├── rewards.js
│   │   ├── events.js
│   │   ├── tasks.js
│   │   └── leaderboard.js
│   ├── middleware/
│   ├── db/
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── public/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── auth.css
│   ├── js/
│   │   ├── api.js
│   │   └── app.js
│   ├── image/
│   │   └── [game images]
│   ├── sl.html
│   ├── gool.html
│   └── [other game files]
└── README.md
```

## 🚀 Cài Đặt & Chạy

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server sẽ chạy tại `http://localhost:5000`

### Frontend

Frontend được serve từ `/public` folder qua backend.

Truy cập: `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/verify` - Xác thực token

### Users
- `GET /api/users/:id` - Lấy profile
- `PUT /api/users/:id/balance` - Update balance
- `PUT /api/users/:id/points` - Update points
- `GET /api/users` - Leaderboard

### Games
- `GET /api/games` - Danh sách game
- `GET /api/games/:id` - Chi tiết game

### Rewards
- `GET /api/rewards` - Danh sách rewards
- `POST /api/rewards/:userId/claim/:rewardId` - Claim reward

### Tasks
- `GET /api/tasks` - Danh sách tasks
- `POST /api/tasks/:userId/complete/:taskId` - Complete task

### Events
- `GET /api/events` - Danh sách events

### Leaderboard
- `GET /api/leaderboard` - Top players

## 🔑 Environment Variables

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gemvui
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

## 🎮 Games Terintegrasi

1. Starlight Princess
2. Starlight Princess Christmas
3. Gate of Olympus
4. Sweet Bonanza Xmas
5. Sweet Bonanza
6. The Dog House
7. Thor Megaways
8. Wild West Gold
9. Zeus vs Hades

Semua game menggunakan **USD currency** dan **English language**.

## 🔄 Integration dengan Backend Existing

Untuk mengintegrasikan dengan backend Anda sendiri:

1. Update `API_URL` di `/public/js/api.js`
2. Sesuaikan response format di backend
3. Update authentication flow
4. Modify database calls

## 📦 Dependencies

### Backend
- Express.js
- CORS
- JWT
- Bcryptjs
- Dotenv
- Mongoose (optional)

### Frontend
- Vanilla JavaScript
- CSS3
- HTML5

## 🛣️ Roadmap

- [ ] MongoDB integration
- [ ] Email verification
- [ ] Password reset
- [ ] Game play tracking
- [ ] Withdrawal system
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Push notifications
- [ ] Multi-language support

## 📄 License

Tùy chỉnh cho GemVui Platform

## 👨‍💻 Support

Untuk hỗ trợ, liên hệ: support@gemvui.com
