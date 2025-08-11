# 2011 Harley-Davidson Road Glide Custom - Sales Site

A responsive single-page application for selling a custom 2011 Harley-Davidson Road Glide. Features dynamic status management (pending offer/sold states), image gallery, contact forms, and detailed bike specifications.

## Features

- **Image Gallery** - Masonry grid with full-screen modal viewer
- **Status Management** - Dynamic pending offer and sold states with modals/banners
- **Contact Forms** - Netlify-integrated contact forms with validation
- **Responsive Design** - Mobile-first design with adaptive navigation
- **Dynamic UI** - Sections and navigation adapt based on bike status

## Configuration

The application uses feature flags in `src/App.tsx` to control the bike's status:

```typescript
// Toggle pending offer state
const hasPendingOffer = false; // Set to true to show pending offer modal/banner

// Toggle sold state  
const hasSold = true; // Set to true to show sold modal/banner and hide contact sections
```

**Status Behavior:**
- `hasPendingOffer = true` - Shows yellow pending offer modal and banner
- `hasSold = true` - Shows green sold modal/banner, hides Disclosure and Contact sections
- Both `false` - Normal sales mode with all sections visible

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Deployment

This site is designed for Netlify deployment with form handling:

1. **Forms** - Contact forms use `data-netlify="true"` for automatic form processing
2. **Static Build** - Run `pnpm run build` to generate static files in `dist/`
3. **Deploy** - Upload `dist/` folder to Netlify or connect GitHub repo for auto-deploy

## Project Structure

```
src/
├── App.tsx          # Main application component with all sections
├── main.tsx         # React entry point
├── index.css        # Global styles and Tailwind imports
└── vite-env.d.ts    # Vite type definitions

public/
└── images/glide/    # Bike photo gallery images
```

## Tech Stack

- **Vite** - Build tool and development server
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Netlify Forms** - Form handling and submission
- **pnpm** - Package manager