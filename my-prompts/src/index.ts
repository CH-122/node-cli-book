import { TextPromptOptions, TextPrompt } from './text-prompt.ts'

export type PromptOptions = TextPromptOptions

const map: Record<string, any> = {
  text: TextPrompt,
}

async function runPrompt(question: PromptOptions) {
  const promptClass = map[question.type]

  if (!promptClass) {
    return null
  }

  return new Promise((resolve) => {
    const prompt = new promptClass(question)

    prompt.render()

    prompt.on('submit', (answer: string) => {
      resolve(answer)
    })
  })
}

export async function prompt(questions: PromptOptions[]) {
  const answers: Record<string, any> = {}

  for (let i = 0; i < questions.length; i++) {
    const name = questions[i].name

    answers[name] = await runPrompt(questions[i])
  }

  return answers
}
