# MoneyMap - Personal Budget & Expense Tracker

A modern web application for tracking income, expenses, and managing personal finances.

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Charts: Chart.js

## Project Structure

```
moneymap/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   └── assets/         # Images and other assets
├── public/
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. The app will be available at `http://localhost:3000`

## Features

- User authentication (Login/Register)
- Income/Expense tracking
- Budget management
- Category-based expense tracking
- Interactive charts and graphs
- Monthly reports export

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
