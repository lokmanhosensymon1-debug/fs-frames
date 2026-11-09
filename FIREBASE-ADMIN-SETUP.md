# Firebase Admin Login setup (FS Frames)

This branch replaces the old browser-only password check with Firebase Email/Password sign-in plus a server-checked Firestore admin allow-list.

## Important limitation
The current admin app stores orders, products, settings, and drafts in browser `localStorage`. This change gates the admin interface, but **does not make existing localStorage data server-secure**. A user who can edit browser code/storage can still manipulate browser-local data. Move sensitive records to Firestore (or another trusted backend) and apply the included `adminData` rules before treating the data itself as protected.

## Setup

1. In Firebase Console, open the project used for FS Frames.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Authentication → Settings → Authorized domains: add the exact production domain used by the site (and localhost for local testing).
4. Project settings → Your apps → create/register a Web app if needed; copy its Firebase Web App config.
5. Edit `js/admin-auth.js` and replace the four `REPLACE_WITH_...` values in `firebaseConfig`. The Web API key/app ID are client configuration, not Admin SDK secrets. Never put a service-account private key in this repository.
6. Authentication → Users → add the owner's email/password user.
7. Enable Firestore Database. Open Firestore → Rules and publish the contents of `firestore.rules`.
8. In Firestore → Data, create collection `admins`. Create a document whose **document ID is the Firebase Authentication user's UID**. Add boolean field `active` = `true`. Do this manually as project owner; do not expose a public client-side admin-registration flow.
9. Test the admin URL in a private/incognito browser. A non-admin account must be rejected; the provisioned admin should enter successfully.

## Data protection
The rules deny all Firestore access by default. Only documents under `adminData` can be read/written by an active admin. Do not put secrets in public static files. GitHub Pages/static hosting cannot keep server secrets or securely validate privileged operations on its own.

## Rollback
This work is on branch `security/firebase-admin-auth`, not `main`. The production branch is unchanged until a pull request is reviewed and merged.
