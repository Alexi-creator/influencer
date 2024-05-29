import { HttpMethods } from '../constants'

export interface IOptions {
  body?: string
  credentials?: 'include' | 'omit' | 'same-origin' | undefined
  method?: HttpMethods
}

/**
 * Управление fetch запросами
 */
export const request = async (url: string, options: IOptions) => {
  const defaultOptions: IOptions = { method: HttpMethods.GET, credentials: 'include' }
  const mergedOptions = { ...defaultOptions, ...options }

  try {
    const response = await fetch(url, {
      credentials: mergedOptions.credentials,
      headers: mergedOptions.method === HttpMethods.GET ? {} : { 'Content-Type': 'application/json' },
      ...mergedOptions,
      // signal: fetchController.signal,
    })
    
    const { status } = response
    const data = await response.json() 

    return data.detail ? { error: data.detail, status } : { data, status }
  } catch (e) {
    return { error: e }
  }
}
