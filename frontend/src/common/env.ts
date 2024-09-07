import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const Env = {
    nextAuthSecret: serverRuntimeConfig.NEXTAUTH_SECRET as string,
    nextAuthURL: serverRuntimeConfig.NEXTAUTH_URL as string, 
    githubId: serverRuntimeConfig.GITHUB_ID as string, 
    githubSecret: serverRuntimeConfig.GITHUB_SECRET as string, 
    googleClientId: serverRuntimeConfig.GOOGLE_CLIENT_ID as string, 
    googleClientSecret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET as string, 
    backendUrl: serverRuntimeConfig.BACKEND_URL as string, 
    productName: publicRuntimeConfig.PRODUCT_NAME as string, 
    lemonSqueezyApiKey: serverRuntimeConfig.LEMONSQUEEZY_API_KEY as string, 
    lemonSqueezyApiUrl: serverRuntimeConfig.LEMONSQUEEZY_API_URL as string, 
    lemonSqueezyStoreId: serverRuntimeConfig.LEMONSQUEEZY_STORE_ID as string, 
    lemonSqueezyVariantId: serverRuntimeConfig.LEMONSQUEEZY_VARIANT_ID as string
}