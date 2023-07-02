import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      primary: string
      gray_1: string
      gray_2: string
      gray_3: string
      text_primary: string
      text_secondary: string
    }
  }
}
