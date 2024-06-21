export { default } from "next-auth/middleware"

const gitu = ['/dashboard/:path*']
export const config = { matcher: ['/dashboard/:path*']}