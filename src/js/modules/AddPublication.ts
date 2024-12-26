import { StepsEnum } from '../constants/steps'

/**
 * Addpublication, отвечает за процесс добавления публикации.
 */
export class AddPublication {
  changeStep: () => void
  currentStep: StepsEnum

  constructor(changeStep: () => void, currentStep) {
    this.changeStep = changeStep
  }
}