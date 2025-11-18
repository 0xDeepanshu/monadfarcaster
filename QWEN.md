# QWEN.md - Monad Project

## Project Overview

This is a Next.js 16.0.3 application bootstrapped with `create-next-app` that serves as a Farcaster mini-app called "Stackmon". The project integrates with Farcaster Frames and uses the Coinbase X402 protocol for wallet connection capabilities. It's designed as a gaming formation by Rupture Labs with Unity integration.

Key technologies and libraries used:
- Next.js 16.0.3 (App Router)
- React 19.2.0
- TypeScript
- Tailwind CSS
- Farcaster MiniApp SDK
- Coinbase X402
- Wagmi (web3 wallet integration)
- Viem (Ethereum library)
- TanStack Query (data fetching)
- Biome.js (linting and formatting)

The application has a mini-app configuration that allows it to be launched from Farcaster, with metadata configured for the Farcaster Open Graph protocol.

## Architecture

The project follows the Next.js App Router structure with:

- `src/app/` - Contains the main application routes and pages
- `src/components/` - Reusable components including Farcaster and wallet providers
- `src/lib/` - Shared utilities and constants
- `src/types/` - TypeScript type definitions
- `public/` - Static assets

The application includes:
- Farcaster frame integration
- Wallet connection functionality
- Unity bridge for game integration
- Provider pattern for global state management

## Building and Running

### Prerequisites
- Node.js (compatible with the project dependencies)
- pnpm (as seen from pnpm-lock.yaml)

### Environment Variables
The application requires the following environment variable:
- `NEXT_PUBLIC_URL` - The public URL of the application

### Commands

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build the application for production
pnpm build

# Start the production server
pnpm start

# Lint the code
pnpm lint

# Format the code
pnpm format
```

## Development Conventions

- **Code Formatting**: Uses Biome.js with 2-space indentation
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS for styling
- **File Structure**: Component organization with main functionality in `src/components/Home`
- **Wallet Integration**: Uses Wagmi and Viem for web3 functionality

## Project Specifics

This project is specifically built as a Farcaster mini-app with:
- Custom Open Graph metadata for Farcaster integration
- Wallet connection capabilities using X402 protocol
- Unity bridge for gaming functionality
- Safe area container for mobile compatibility

The main entry point is `src/app/page.tsx` which uses the `Main` component from `@/components/Home/Index` and includes Farcaster mini-app configuration in the metadata generation.

## Key Dependencies

- `@coinbase/x402` - Coinbase X402 protocol implementation
- `@farcaster/miniapp-sdk` - Farcaster mini-app functionality
- `wagmi` and `viem` - Web3 wallet integration
- `@tanstack/react-query` - Data fetching and state management
- `lucide-react` - Icon library

## Notable Configuration

- Biome.js is used for both linting and formatting (configured in `biome.json`)
- TypeScript path aliases configured as `@/*` mapping to `./src/*`
- Tailwind CSS v4 with PostCSS integration
- Geist font from Next.js for typography