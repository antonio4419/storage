# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 20 application with Server-Side Rendering (SSR) enabled using `@angular/ssr`. The app uses standalone components, zoneless change detection, and Express for the server.

## Common Commands

```bash
# Development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build

# Build with watch (development mode)
npm run watch

# Run tests
npm test
# or
ng test

# Run SSR server after build
npm run serve:ssr:storage
```

## Architecture

### Standalone Components

All components are standalone and use the `imports` array for dependencies (directives, pipes, modules). No NgModules are used.

Example:
```typescript
@Component({
  selector: 'app-component',
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
```

### Routing

Routes are defined in `src/app/app.routes.ts`. The router is configured with `provideZonelessChangeDetection()` in `app.config.ts`.

Current routes:
- `/login` → Login component
- `/home` → Home component
- `/` → redirects to `/login`

### Component Structure

UI components are organized in `src/app/UI/<feature-name>/`:
- `login.ts` - Component class
- `login.html` - Template
- `login.css` - Styles
- `login.spec.ts` - Tests

### Zoneless Change Detection

The app uses `provideZonelessChangeDetection()` instead of NgZone. When working with async operations that Angular needs to track (e.g., after HTTP requests or timers), manually trigger change detection via `ChangeDetectorRef.detectChanges()` or use signals.

### TypeScript Configuration

Strict mode is enabled with additional Angular compiler options:
- `strictInjectionParameters`
- `strictInputAccessModifiers`
- `typeCheckHostBindings`
- `strictTemplates`

Always add explicit type annotations and ensure templates are type-safe.

### Code Formatting

Prettier is configured:
- Print width: 100 characters
- Single quotes
- HTML files use `angular` parser

Run `npx prettier --write .` to format.

## Adding New Features

1. Create component in `src/app/UI/<feature>/` with `.ts`, `.html`, `.css`, `.spec.ts`
2. Import necessary dependencies in the `imports` array (CommonModule, ReactiveFormsModule, etc.)
3. Add route in `src/app/app.routes.ts`
4. Export the component class from its file for route imports