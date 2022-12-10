import { createClient } from "microcms-js-sdk"

export const client = createClient({
  serviceDomain: "blog-stack",
  apiKey: process.env.API_KEY,
})
