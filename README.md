# Varaprada Restro - Restaurant Website

A modern, responsive website for Varaprada Restro, an authentic Indian restaurant located in Hyderabad, India. The website allows customers to browse the menu, place online orders, and make table reservations.

## Features

- **Modern UI/UX**: Clean, responsive design with animations and transitions
- **Online Ordering System**: Browse menu, add items to cart, and checkout
- **Table Reservation**: Book tables in advance with date, time, and party size selection
- **User Authentication**: Create accounts, track orders, and manage reservations
- **Menu Management**: Categorized menu with detailed item descriptions
- **Payment Integration**: Support for multiple payment methods common in India
- **Dark/Light Mode**: Theme toggle for user preference

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/varaprada-restro.git
   cd varaprada-restro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/varaprada_restro"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application can be deployed to Vercel:

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.