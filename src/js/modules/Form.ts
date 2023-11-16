import { IOptions } from '../utils/request'

import { request } from '../utils'
import { Methods } from '../constants'

/**
 * Управление формой
 */
export class Form {
  selectorForm: string
  url: string
  apiOptions: IOptions

  form: HTMLFormElement
  
  constructor(selectorForm: string, url: string, apiOptions: IOptions) {
    this.selectorForm = selectorForm
    this.url = url
    this.apiOptions = apiOptions

    const form = document.querySelector(this.selectorForm)
    if (form) {
      this.form = form as HTMLFormElement
    }
    
    if (!this.form) return

    this.init()
  }

  private init() {
    this.handlers()
  }

  public getData() {
    const formData = new FormData(this.form)

    return Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  public async submitForm() {
    const data = this.getData()

    const { method } = this.apiOptions
    let url = this.url

    if (method === Methods.GET) {
      const params = new URLSearchParams()
      Object.entries(data).forEach(([key, val]) => params.append(key, String(val)))
      url = `${this.url}?${params.toString()}`
    } else {
      this.apiOptions = { ...this.apiOptions, body: JSON.stringify(data) }
    }

    return await request(url, this.apiOptions)
  }

  private validateForm() {

  }

  private resetForm() {

  }

  // private clickHandler(e: MouseEvent) {
  //   const targetElement = e.target as HTMLElement
  //   console.log(targetElement)
    
  // }

  // private changeHandler(e: Event) {
  //   const targetElement = e.target as HTMLInputElement
  //   console.log(targetElement)
  // }

  private handlers() {
    // document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    // document.addEventListener('change', (e: Event) => this.changeHandler(e))
    this.form.addEventListener('submit', (e: Event) => {
      e.preventDefault()
      this.submitForm()
    })
  }
}