/* eslint-disable no-undef */
const ENVIRONMENT = {
   CONVEX: {
     DEPLOYMENT: process.env.VITE_CONVEX_URL
   },
   CLERK: {
     CONVEX_URL: process.env.CONVEX_URL,
     PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY
   },
   GITHUB: {
     APP_ID: process.env.APP_ID,
     CLIENT_ID: process.env.CLIENT_ID,
     CLIENT_SECRET: process.env.CLIENT_SECRET,
     WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
     PRIVATE_KEY: process.env.PRIVATE_KEY
   }
 };

export default ENVIRONMENT
