const API_URL = 'https://jsonplaceholder.typicode.com'

export const API_URLS: Record<string, Record<string, string>> = {
  shops: {
    goods: `${API_URL}/goods`,
    test: `${API_URL}/todos/1`,
  },
}
