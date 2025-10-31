# E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, React, and TypeScript. This application features user authentication, product catalog, shopping cart, and more, all built with modern web technologies and best practices.

## 🚀 Features

- **Modern UI/UX** - Built with Tailwind CSS and Radix UI components
- **Authentication** - Secure user authentication with NextAuth.js
- **Product Catalog** - Browse and search products with filtering and sorting
- **Shopping Cart** - Add/remove items and manage quantities
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Dark Mode** - Built-in dark/light theme support
- **Form Handling** - Robust form validation with React Hook Form and Zod
- **Type Safety** - Full TypeScript support for better developer experience

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with `tailwind-merge` and `class-variance-authority`
- **UI Components**: Radix UI Primitives, Lucide Icons
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: NextAuth.js
- **Build Tool**: Turbopack
- **Package Manager**: npm

## 📦 Prerequisites

- Node.js 18.0.0 or later
- npm (comes with Node.js)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-commerce.git
cd e-commerce
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
# DATABASE_URL=your-database-connection-string

# Other environment variables
# NEXT_PUBLIC_...
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Project Structure

```
src/
├── app/                    # App router pages and layouts
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── (shop)/            # Shop-related routes
│   ├── User/              # User-specific routes
│   ├── _Components/       # Reusable components
│   ├── api/               # API routes
│   └── ...
├── lib/                   # Utility functions and configurations
└── ...
```

## 🧪 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🧩 Key Dependencies

- `next` - React framework for server-rendered applications
- `react` & `react-dom` - Core React libraries
- `typescript` - Type checking
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible UI primitives
- `next-auth` - Authentication
- `react-hook-form` & `zod` - Form handling and validation
- `lucide-react` - Icons

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

Made with ❤️ by Mohamed Ehab 
