#!/bin/bash

echo "🔧 Running ReasonOps folder normalization..."

# 1. Delete top-level UI index if present
if [ -f frontend/components/ui/index.ts ]; then
  rm frontend/components/ui/index.ts
  echo "🧹 Removed redundant ui/index.ts"
fi

# 2. Remove duplicate test files if they're also in component subfolders
if [ -d tests/frontend/components/ui ]; then
  for test_file in tests/frontend/components/ui/*.test.tsx; do
    [ -e "$test_file" ] || continue
    base=$(basename "$test_file")
    comp_name="${base%.test.tsx}"
    sub_test="frontend/components/ui/${comp_name}/${comp_name}.test.tsx"
    if [ -f "$sub_test" ]; then
      rm "$test_file"
      echo "🗑️  Removed duplicate test: $test_file"
    fi
  done
fi

# 3. Verify all components are inside their own folders
echo "🔎 Verifying UI components structure..."
shopt -s nullglob
for file in frontend/components/ui/*.tsx frontend/components/ui/*.test.tsx; do
  fname=$(basename "$file")
  # skip if directory
  [ -f "$file" ] || continue
  echo "⚠️  File $file should be inside its own folder. Please move it."
done
shopt -u nullglob

# 4. Check backend/frontend schema alignment
echo "🔍 Checking schema alignment..."
if [ -d backend/schemas ]; then
  for dir in backend/schemas/*; do
    [ -d "$dir" ] || continue
    schema_name=$(basename "$dir")
    if [ "$schema_name" != "shared" ] && [ ! -d "frontend/schemas/$schema_name" ]; then
      echo "⚠️  Missing frontend schema folder for: $schema_name"
    fi
  done
fi

# 5. Final checklist for optional enhancements
echo
echo "📋 Optional Enhancements Checklist:"
if [ ! -f ".env.example" ]; then
  echo "⚠️  .env.example is missing"
fi
if [ ! -f "frontend/middleware.ts" ]; then
  echo "⚠️  Consider adding middleware.ts for auth/routing"
fi
if [ ! -f "frontend/styles/theme.ts" ]; then
  echo "⚠️  Consider adding theme.ts for Tailwind token design system"
fi
if [ ! -d "shared" ]; then
  echo "⚠️  shared/ folder not found — recommend adding for shared types/schemas"
fi

# Create missing files with initial content

# .env.example
if [ ! -f ".env.example" ]; then
  cat > .env.example <<EOF
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
EOF
  echo "✨ Created .env.example"
fi

# frontend/middleware.ts
if [ ! -f "frontend/middleware.ts" ]; then
  mkdir -p frontend
  cat > frontend/middleware.ts <<EOF
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Example: route protection or logging
  return NextResponse.next();
}
EOF
  echo "✨ Created frontend/middleware.ts"
fi

# frontend/styles/theme.ts
if [ ! -f "frontend/styles/theme.ts" ]; then
  mkdir -p frontend/styles
  cat > frontend/styles/theme.ts <<EOF
export const theme = {
  colors: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
  },
  spacing: {
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
};
EOF
  echo "✨ Created frontend/styles/theme.ts"
fi

# shared/README.md
if [ ! -d "shared" ]; then
  mkdir -p shared/types
  cat > shared/README.md <<EOF
# Shared

Central location for shared logic (types, utils, constants).
Use this folder to house common code across frontend and backend.
EOF
  echo "✨ Created shared/README.md"
fi

# shared/types/index.ts
if [ ! -f "shared/types/index.ts" ]; then
  mkdir -p shared/types
  cat > shared/types/index.ts <<EOF
// Shared cross-platform types
export interface ReasonOpsError {
  message: string;
  code?: string;
}
EOF
  echo "✨ Created shared/types/index.ts"
fi

echo
echo "✅ Folder structure audit complete. Run 'pnpm lint && pnpm test && pnpm typecheck' to validate."