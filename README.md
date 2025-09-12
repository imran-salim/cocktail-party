# 🍸 Cocktail Party - Discover Amazing Cocktail Recipes

A modern, responsive cocktail discovery application built with Next.js 15, featuring user authentication, favorites management, and a beautiful glassmorphism UI design.

**🌐 Live Demo:** [https://cocktail-party-tau.vercel.app](https://cocktail-party-tau.vercel.app)

## ✨ Features

- � **Cocktail Discovery**: Browse thousands of cocktail recipes by ingredient using The Cocktail DB API
- � **User Authentication**: Secure login and registration system with protected routes
- ❤️ **Favorites Management**: Save and manage your favorite cocktail recipes
- 🎨 **Modern UI**: Beautiful glassmorphism design with smooth animations
- 🌙 **Dark Theme**: Elegant dark theme with amber accent colors
- 📱 **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- ⚡ **Performance Optimized**: Built with Next.js 15 and Turbopack for optimal performance
- �️ **Optimized Images**: Automatic image optimization using Next.js Image component

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x with custom glassmorphism components
- **State Management**: React Context API
- **Authentication**: Custom implementation with localStorage
- **API**: The Cocktail DB API
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imran-salim/cocktail-party.git
   cd cocktail-party
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── favorites/         # Favorites page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── IngredientDropdown.tsx
│   └── ProtectedRoute.tsx
└── contexts/            # React Context providers
    └── AuthContext.tsx  # Authentication context
```

## 🎯 Usage

1. **Register/Login**: Create an account or log in to access the app
2. **Browse Cocktails**: Select an ingredient from the dropdown to discover cocktails
3. **Save Favorites**: Click the heart icon on any cocktail to add it to your favorites
4. **View Favorites**: Navigate to the favorites page to see your saved cocktails
5. **View Recipes**: Click "View Recipe" to see detailed cocktail instructions

## 🌟 Key Components

### Authentication System
- Custom authentication context with TypeScript support
- Protected routes for authenticated users
- Persistent login state using localStorage

### Cocktail Discovery
- Dynamic ingredient selection with 50+ options
- Real-time API integration with The Cocktail DB
- Responsive grid layout for cocktail display

### Favorites Management
- Add/remove cocktails from favorites
- Persistent favorites storage
- Dedicated favorites page

## 🎨 Design Features

- **Glassmorphism UI**: Semi-transparent elements with backdrop blur effects
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Layout**: Optimized for all screen sizes
- **Modern Typography**: Clean, readable font choices
- **Color Palette**: Dark theme with amber accent colors

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://cocktail-party-tau.vercel.app](https://cocktail-party-tau.vercel.app)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/imran-salim/cocktail-party)

## 📱 API Integration

This app integrates with [The Cocktail DB API](https://www.thecocktaildb.com/api.php):
- `GET /api/json/v1/1/list.php?i=list` - Get ingredient list
- `GET /api/json/v1/1/filter.php?i={ingredient}` - Filter cocktails by ingredient

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Cocktail DB](https://www.thecocktaildb.com/) for providing the cocktail data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for seamless deployment and hosting
