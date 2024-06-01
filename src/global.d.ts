declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"

    readonly TURSO_DATABASE_URL: string
    readonly TURSO_AUTH_TOKEN: string
  }
}

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
declare interface NextJS {
  dynamic: "auto" | "force-dynamic" | "error" | "force-static"
}
