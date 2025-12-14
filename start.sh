#!/bin/bash

echo "🚀 Starting Sheikh Chat Development Server..."
echo "📦 Installing dependencies..."
npm install

echo "🔧 Starting development server..."
npm run dev

echo ""
echo "✅ Sheikh Chat is running!"
echo "🌐 Open your browser and visit: http://localhost:3000"
echo ""
echo "🛠️  Available commands:"
echo "  npm run dev   - Start development server"
echo "  npm run build - Build for production"
echo "  npm run start - Start production server"
echo "  npm run lint  - Run ESLint"
echo ""