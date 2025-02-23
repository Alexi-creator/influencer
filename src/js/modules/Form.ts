import { request, IOptions } from '../utils'
import { HttpMethods } from '../constants'

import { FormValidator } from './FormValidator'

export interface IValidateSchema {
  type: string | number | Date
  required?: boolean
  allowEmpty?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  messages?: {
    type?: string
    required?: string
    allowEmpty?: string
    minLength?: string
    maxLength?: string
    pattern?: string
  }
}

interface IConstructor {
  selectorForm: string
  url?: string
  apiOptions?: IOptions
  validateSchema?: Record<string, IValidateSchema>
  onValidation?: () => void
  onSubmit?: () => void
}

export interface IStateForm {
  values: Record<string, string | number | File[]>
  errors: Record<string, string>
  isValid: boolean
  isSubmitting: boolean
}

/**
 * Управление формой
 * @param {Object} { selectorForm, url, apiOptions }
 * @param selectorForm - селектор формы (.classForm)
 * @param url - url ресурса для запроса формы
 * @param apiOptions - опции для работы с запросами к api
 * @param validateSchema - схема валидации полей формы
 * @param onValidation - внешний колбэк при срабатывании валидации
 */
export class Form extends FormValidator {
  private selectorForm: string
  private url?: string
  private apiOptions?: IOptions
  private validateSchema?: Record<string, IValidateSchema>
  private onValidation?: (stateForm: IStateForm) => void
  // eslint-disable-next-line @typescript-eslint/ban-types
  private onSubmit?: (response: {}, data: {}) => void

  private formElem: HTMLFormElement
  private btnSubmitElem?: HTMLButtonElement

  private stateForm: IStateForm
  private requiredFields: string[]
  
  constructor({ selectorForm, url, apiOptions, validateSchema, onValidation, onSubmit }: IConstructor) {
    super()
  
    this.selectorForm = selectorForm
    this.url = url
    this.apiOptions = apiOptions || {}
    this.validateSchema = validateSchema
    this.onValidation = onValidation
    this.onSubmit = onSubmit

    this.stateForm = {
      values: {},
      errors: {},
      isValid: false,
      isSubmitting: false,
    }

    if (this.validateSchema) {
      this.requiredFields = Object.entries(this.validateSchema).reduce<string[]>((acc, [key, val]) => {
        if (val.required) {
          acc.push(key)
        }
  
        return acc
      }, [])
    }

    const form = document.querySelector(this.selectorForm)
    if (form) this.formElem = form as HTMLFormElement

    const btnSubmitElem = this.formElem.querySelector('.submit, button[type="submit"]') as HTMLButtonElement
    if (btnSubmitElem) this.btnSubmitElem = btnSubmitElem
    
    if (!this.formElem) return

    this.init()
  }

  private init(): void {
    this.handlers()
    this.setInitialValues()
  }

  public setInitialValues(): void {
    const formData = this.getFormData()
    this.stateForm.values = { ...formData }
  }

  public getFormData = () => {
    const formData = new FormData(this.formElem)

    return Array.from(formData.entries()).reduce((acc, [key, value]) => {
      if (this.validateSchema) {
        if (this.validateSchema[key]?.type === 'object') {
          const fileInput = this.formElem.querySelector(`[name=${key}]`) as HTMLInputElement
          acc[key] = fileInput.files

          return acc
        }
      }

      acc[key] = value

      return acc
    }, {})
  }

  public async submitForm(): Promise<void> {    
    if (this.url && this.apiOptions) {
      const data = this.getFormData()
      this.validateForm(data, this.validateSchema || {})

      const { method } = this.apiOptions
      let url = this.url
  
      if (method === HttpMethods.GET) {
        const params = new URLSearchParams()
        Object.entries(data).forEach(([key, val]) => params.append(key, String(val)))
        url = `${this.url}?${params.toString()}`
      } else {
        this.apiOptions = { ...this.apiOptions, body: JSON.stringify(data) }
      }
  
      this.btnSubmitElem?.classList.add('active')
      
      const response = await request(url, this.apiOptions)
      
      this.btnSubmitElem?.classList.remove('active')
      this.btnSubmitElem && (this.btnSubmitElem.disabled = true)
      this.onSubmit?.(response, data)
    }
  }

  private addError(name: string, error: string): void {
    const parentElem = this.formElem.querySelector(`[data-id="parent-${name}"]`) as HTMLElement
    const errorElem = this.formElem.querySelector(`[data-id="error-${name}"]`) as HTMLElement

    
    if (parentElem) {
      parentElem.classList.remove('success')
      parentElem.classList.add('error')
    }

    if (errorElem && error) {
      errorElem.classList.add('active')
      errorElem.textContent = error
    } 
  }

  private clearError(name: string): void {
    const parentElem = this.formElem.querySelector(`[data-id="parent-${name}"]`) as HTMLElement
    const errorElem = this.formElem.querySelector(`[data-id="error-${name}"]`) as HTMLElement
    
    if (parentElem) {
      parentElem.classList.remove('error')
      parentElem.classList.add('success')
    }

    if (errorElem) {
      errorElem.classList.remove('active')
      errorElem.textContent = ''
    } 
  }

  // private resetForm(): void {

  // }

  // private clickHandler(e: MouseEvent) {
  //   const targetElement = e.target as HTMLElement
  //   console.log(targetElement)
    
  // }

  private checkValid(): void {
    const hasError = Object.keys(this.stateForm.errors).length > 0

    if (hasError) {
      this.stateForm.isValid = false
      this.btnSubmitElem && (this.btnSubmitElem.disabled = true)
    } else {
      this.stateForm.isValid = true
      this.btnSubmitElem && (this.btnSubmitElem.disabled = false)

      Object.entries(this.stateForm.values).forEach(([key, val]) => {
        if (typeof val === 'object' && Object.values(val).length === 0 && this.requiredFields.includes(key)) {
          this.stateForm.isValid = false
          this.btnSubmitElem && (this.btnSubmitElem.disabled = true)
        }
        
        if (!val && this.requiredFields.includes(key)) {
          this.stateForm.isValid = false
          this.btnSubmitElem && (this.btnSubmitElem.disabled = true)
        }
      })
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    const name = targetElement.name
    const value = targetElement.value
    const type = targetElement.type

    if (type === 'file' && targetElement.files) {
      const existingFiles = Array.isArray(this.stateForm.values[name])
      ? (this.stateForm.values[name] as File[])

      : []
      const newFiles = Array.from(targetElement.files)
      this.stateForm.values[name] = [...existingFiles, ...newFiles]
    } else {
      this.stateForm.values[name] = value
    }

    if (this.validateSchema) {
      const formValues: Record<string, string | number> = Object.fromEntries(
        Object.entries(this.getFormData()).filter(([key]) => Object.prototype.hasOwnProperty.call(this.validateSchema, key))
      ) as Record<string, string | number>
  
      const validatedResult: Record<string, string> | null = this.validateForm(formValues, this.validateSchema, targetElement, name)

      if (validatedResult) {
        const error = validatedResult[name]

        this.addError(name, error)
        this.stateForm.errors[name] = error
      } else {
        this.clearError(name)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = this.stateForm.errors
        this.stateForm.errors = rest
      }

      this.checkValid()

      this.onValidation?.(this.stateForm)
    }
  }

  private handlers(): void {
    // document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    this.formElem.addEventListener('change', (e: Event) => this.changeHandler(e))
    this.formElem.addEventListener('submit', (e: Event) => {
      e.preventDefault()
      this.submitForm()
    })
  }
}
