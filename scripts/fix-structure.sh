#!/bin/bash

# This script checks for schema.md files in docs/features/*/
# and for each, creates a corresponding schema.yaml with a migration comment.
# For each such feature, it ensures frontend/schemas/<feature>/schema.ts and form.ts exist,
# and backend/schemas/<feature>/schema.ts and form.ts exist, creating them with stubs if missing.

set -e

# Root directory
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

DOCS_FEATURES="$ROOT/docs/features"
FRONTEND_SCHEMAS="$ROOT/frontend/schemas"
BACKEND_SCHEMAS="$ROOT/backend/schemas"

# For each docs/features/<feature>/schema.md
find "$DOCS_FEATURES" -mindepth 2 -maxdepth 2 -type f -name 'schema.md' | while read -r SCHEMA_MD; do
    FEATURE_DIR="$(dirname "$SCHEMA_MD")"
    FEATURE="$(basename "$FEATURE_DIR")"
    # 1. Migrate schema.md to schema.yaml if needed
    SCHEMA_YAML="$FEATURE_DIR/schema.yaml"
    if [[ -f "$SCHEMA_MD" && ! -f "$SCHEMA_YAML" ]]; then
        mv "$SCHEMA_MD" "$SCHEMA_YAML"
        echo "✅ Migrated $SCHEMA_MD to $SCHEMA_YAML"
    elif [[ ! -f "$SCHEMA_YAML" ]]; then
        echo "# TODO: Define structured schema" > "$SCHEMA_YAML"
        echo "🆕 Created blank $SCHEMA_YAML"
    fi

    # 2. Ensure frontend/schemas/<feature>/
    FRONTEND_DIR="$FRONTEND_SCHEMAS/$FEATURE"
    mkdir -p "$FRONTEND_DIR"
    # Create schema.ts if missing
    SCHEMA_TS="$FRONTEND_DIR/schema.ts"
    if [[ ! -f "$SCHEMA_TS" ]]; then
        cat > "$SCHEMA_TS" <<EOF
import { z } from 'zod';

export const schema = z.object({
  // TODO: define schema
});
EOF
    fi
    # Create form.ts if missing
    FORM_TS="$FRONTEND_DIR/form.ts"
    if [[ ! -f "$FORM_TS" ]]; then
        cat > "$FORM_TS" <<EOF
import { schema } from './schema';

export type FormValues = z.infer<typeof schema>;

export const defaultValues: Partial<FormValues> = {
  // TODO: fill in defaults
};
EOF
    fi

    # 3. Ensure backend/schemas/<feature>/
    BACKEND_DIR="$BACKEND_SCHEMAS/$FEATURE"
    mkdir -p "$BACKEND_DIR"
    # Create schema.ts if missing
    SCHEMA_TS_B="$BACKEND_DIR/schema.ts"
    if [[ ! -f "$SCHEMA_TS_B" ]]; then
        cat > "$SCHEMA_TS_B" <<EOF
import { z } from 'zod';

export const schema = z.object({
  // TODO: define schema
});
EOF
    fi
    # Create form.ts if missing
    FORM_TS_B="$BACKEND_DIR/form.ts"
    if [[ ! -f "$FORM_TS_B" ]]; then
        cat > "$FORM_TS_B" <<EOF
import { schema } from './schema';

export type FormValues = z.infer<typeof schema>;

export const defaultValues: Partial<FormValues> = {
  // TODO: fill in defaults
};
EOF
    fi
done