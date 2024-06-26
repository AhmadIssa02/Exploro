import * as AxiosLogger from 'axios-logger'
import { Session } from 'next-auth'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

AxiosLogger.setGlobalConfig({
  data: false,
})



export function createClient(session?: Session): AxiosInstance {

  let config: AxiosRequestConfig = {
    baseURL: <string>process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  }
  if (session) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${<string>session.accessToken}`,
      },
    }
  }

  const instance = axios.create(config)
  if (!process.browser) {
    instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
    instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)
  }
  return instance
}
