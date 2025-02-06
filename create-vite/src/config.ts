import chalk from 'chalk'

export type Framework = {
  name: string
  display: string
  color: Function
  variants: FrameworkVariant[]
}

export type FrameworkVariant = {
  name: string
  display: string
  color: Function
  customCommand?: string
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: chalk.green,
    variants: [
      {
        name: 'vue-ts',
        display: 'Vue3 + TypeScript',
        color: chalk.blue,
      },
    ],
  },
  {
    name: 'react',
    display: 'React',
    color: chalk.cyan,
    variants: [
      {
        name: 'react-ts',
        display: 'React + TypeScript',
        color: chalk.yellow,
      },
    ],
  },
  {
    name: 'svelet',
    display: 'Svelte',
    color: chalk.magenta,
    variants: [
      {
        name: 'svelet-ts',
        display: 'Svelte + TypeScript',
        color: chalk.blue,
      },
    ],
  },
]

const TEMPLATES = FRAMEWORKS.map((framework) => {
  return framework.variants?.map((v) => v.name)
}).reduce((a, b) => a.concat(b), [])

export { FRAMEWORKS, TEMPLATES }
