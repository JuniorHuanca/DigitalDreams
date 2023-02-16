// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  // console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    REACT_APP_BASE_URL: (() => {
      if (isDev) return '/api/'
      if (isProd) {
        return 'https://backend-v7ur.onrender.com/'
      }
    })(),
    MONGODB_URL: (() => {
      if (isDev) return 'mongodb+srv://jhuanca:junior9464@cluster0.mpu24ay.mongodb.net/?retryWrites=true&w=majority'
      if (isProd) {
        return 'mongodb+srv://jhuanca:junior9464@cluster0.mpu24ay.mongodb.net/?retryWrites=true&w=majority'
      }
    })(),
    // RESTURL_SESSIONS: (() => {
    //   if (isDev) return 'http://localhost:3001'
    //   if (isProd) return 'https://ladionisiaback-js-production.up.railway.app'
    // })(),
  }

  // next.config.js object
  return {
    env,
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
      return config
    },
  }
}

