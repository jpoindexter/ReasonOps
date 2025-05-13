#!/bin/bash
set -e

echo "🔧 Normalizing UI component structure..."

# Loop through target component types
for c in button input slider textarea label; do
  folder="frontend/components/ui/$c"
  cap=$(echo $c | sed 's/.*/\u&/')

  # Rename stub component file to PascalCase
  if [ -f "$folder/u$c.tsx" ]; then
    mv "$folder/u$c.tsx" "$folder/$cap.tsx"
    echo "✔️  Renamed $c component to $cap.tsx"
  fi

  # Rename test file to PascalCase
  if [ -f "$folder/u$c.test.tsx" ]; then
    mv "$folder/u$c.test.tsx" "$folder/$cap.test.tsx"
    echo "🧪 Renamed $c test file to $cap.test.tsx"
  fi

  # Move any test files from global test dir into correct folder
  if [ -f "tests/frontend/components/ui/${cap}.test.tsx" ]; then
    mv "tests/frontend/components/ui/${cap}.test.tsx" "$folder/$cap.test.tsx"
    echo "📦 Moved ${cap}.test.tsx into $folder/"
  fi

  # Rebuild index.ts barrel
  echo "export * from './$cap';" > "$folder/index.ts"
done

# Clean up flat files (legacy stubs or mislocated files)
rm -f frontend/components/ui/*.tsx frontend/components/ui/*.test.tsx 2>/dev/null
rm -f tests/frontend/components/ui/*.test.tsx 2>/dev/null

echo "✅ UI components are now enterprise-grade and cleanly structured."
echo "💡 Run 'pnpm lint && pnpm test' to validate the structure."