# Auth System Example

This directory contains a complete authentication system scaffolding extracted from real projects. Copy the relevant files into your project and adapt them to your needs.

## Architecture

- **JWT-based authentication** using encrypted JWTs (jose library)
- **Kysely ORM** for database queries
- **Pinia store** for client-side token management with persistence
- **Route middleware** for protecting pages
- **RBAC** (Role-Based Access Control) for fine-grained permissions

## Directory Structure

```
middleware/
  auth.ts          # Protects authenticated routes
  no-auth.ts       # Redirects logged-in users (e.g., login page)

store/
  user.store.ts    # Pinia store with login/logout/me actions

server/
  middleware/
    cors.ts        # CORS preflight handler
  utils/
    jwt.ts         # JWT encrypt/decrypt helpers
    hash.ts        # SHA-256 password hashing
    auth.ts        # Request authentication verification
    rbac.ts        # Role-based access control
  routes/
    v1/auth/
      login.post.ts   # POST /v1/auth/login
      logout.post.ts  # POST /v1/auth/logout
      me.get.ts       # GET /v1/auth/me
```

## Required Environment Variables

Add these to your `.env` file:

```env
NUXT_JWT_SECRET=<base64url-encoded secret, min 32 bytes>
NUXT_JWT_EXPIRES_IN=7d
NUXT_JWT_ISSUER=your-app-name
```

And register them in `nuxt.config.ts`:

```ts
runtimeConfig: {
  JWT_SECRET: process.env.NUXT_JWT_SECRET,
  JWT_EXPIRES_IN: process.env.NUXT_JWT_EXPIRES_IN,
  JWT_ISSUER: process.env.NUXT_JWT_ISSUER
}
```

## Required Dependencies

These are already included in the boilerplate:

- `jose` — JWT encryption/decryption
- `kysely` — SQL query builder (add your dialect driver, e.g., `pg` for PostgreSQL)
- `h3` — HTTP utilities (bundled with Nuxt)
- `pinia` + `pinia-plugin-persistedstate` — State management

## Database Setup

You need a `users` table with at minimum:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  permission_id UUID REFERENCES permissions(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL, -- 'admin', 'user', 'unverified', 'blocked'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Adapting to Your Project

1. Copy the files into your project matching the directory structure above
2. Replace `'/admin/login'` with your login route path
3. Replace `'/admin'` with your authenticated area route
4. Replace `withSchema('myapp')` with your database schema name (or remove if using default)
5. Add your Kysely dialect driver and configure the database connection
6. Register the middleware in your page components: `definePageMeta({ middleware: 'auth' })`
