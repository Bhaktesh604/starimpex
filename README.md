This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Set correct environment variables as given in `.env.example`
Create `firebase-messaging-sw.js` file in your `/public` and initialize firebase app with correct configs as below: 
```
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  "apiKey":"API_KEY",
  "authDomain": "AUTH_DOMAIN",
  "projectId":"PROJECT_ID",
  "storageBucket":"STORAGE_BUCKET",
  "messagingSenderId":"MESSAGING_SENDER_ID",
  "appId":"APP_ID",
}

firebase.initializeApp(firebaseApp);
const messaging = firebase.messaging();
```
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

1. Make sure you are on the correct branch in local machine
2. Set environment variables as per the environment before creating build.
2. Run the command npm run build on local machine and it will generate the build in .next folder.
3. Connect to the server via FileZilla and replace the code of server in .next file with the local machine build.
4. SSH to the server via ssh -i server_key.pem ubuntu@{server_ip} cmd
5. Go to the code folder
6. Run cmd git pull to pull the latest code from the GIT
7. Run cmd npm install if there are any packages to be installed
8. Create `firebase-messaging-sw.js` file in your `/public` and initialize firebase app with correct configs
9. Finally run cmd pm2 restart all to restart the servers
10. Check if the server is not crashing using pm2 log cmd
11. If its crashing then run cmd pm2 stop all to stop the servers
12. Fix the crash and restart the servers again

