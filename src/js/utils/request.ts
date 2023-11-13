import { Methods } from '../constants'

export interface IOptions {
  body?: string
  credentials?: 'include' | 'omit' | 'same-origin' | undefined
  method: Methods
}

/**
 * Управление fetch запросами
 */
export const request = async (url: string, options: IOptions) => {
  try {
    const response = await fetch(url, {
      credentials: options.credentials || 'include',
      headers: options.method === Methods.GET ? {} : { 'Content-Type': 'application/json' },
      ...options,
      // signal: fetchController.signal,
    })

    const { status } = response
    const data = await response.json() 

    return data.detail ? { error: data.detail, status } : { data, status }
  } catch (e) {
    return { error: e }
  }
}
