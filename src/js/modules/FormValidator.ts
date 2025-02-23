import { IValidateSchema } from './Form'

/**
 * Валидация полей формы
 * @param validateSchema - объект со схемой полей
 */
export class FormValidator {
  constructor() {

  }

  protected validateForm(
    formValues: Record<string, string | number>,
    validateSchema: Record<string, IValidateSchema>,
    targetElement?: HTMLInputElement,
    name?: string
  ): Record<string, string> | null { 
    if (name) {
      const fieldSchema = validateSchema[name]
      const fieldValue = formValues[name]

      if (typeof fieldValue !== fieldSchema.type) {
        return { [name]: fieldSchema.messages?.type || 'неверный тип' }
      }

      if (!fieldValue && fieldSchema.required) {
        return { [name]: fieldSchema.messages?.required || 'поле должно быть не пустым' }
      }

      if (fieldSchema.type === 'object' && fieldSchema.required) {
        const hasFiles = (targetElement?.files?.length || 0) > 0
        console.log('hasFiles', hasFiles)
        

        if (!hasFiles) {
          return { [name]: fieldSchema.messages?.required || 'не добавлены файлы' }
        }
      }

      if (typeof fieldValue === 'string' && fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
        return { [name]: fieldSchema.messages?.minLength || 'слишком мало символов' }
      }

      if (typeof fieldValue === 'string' && fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
        return { [name]: fieldSchema.messages?.maxLength || 'слишком много символов' }
      }

      if (typeof fieldValue === 'string' && fieldSchema.pattern && !fieldSchema.pattern.test(fieldValue)) {
        return { [name]: fieldSchema.messages?.pattern || '' }
      }
    }

    return null
  }
}
