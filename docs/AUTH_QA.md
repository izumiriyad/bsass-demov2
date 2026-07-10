# Auth and Protected Route QA

Automated auth validation is available with:

```bash
npm run validate:auth
```

It starts the standalone production server and verifies:

- anonymous users are redirected from `/dashboard`
- registration returns a session cookie
- authenticated `/api/auth/me` works
- authenticated dashboard loads
- wallet deposit API works with a session
- regular users cannot access `/admin`
- admin user can access `/admin`
- admin user can access `/api/admin/summary`
- logout succeeds

Current frontend demo admin credential for validation:

- username: `admin`
- password: `admin123`

Production must replace this with real role-based authentication and server-side persistent users.
