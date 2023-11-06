import { css } from 'styled-components'
import { ComponentStyle } from '../../styles/typings'
import { PasswordProps } from './typings'
import { display } from '../../styles/display'
import { alignItems } from '../../styles/alignment'
import { color, fontSize } from '../../styles/typography'
import { marginBottom, marginLeft } from '../../styles/spacing'
import { cursor } from '../../styles/interactivity'

const passwordStyle: ComponentStyle<PasswordProps> = () => {
  return css`
    ${display('flex')}
    ${alignItems('center')}
    .g-icon-obfuscated-password {
      ${fontSize('xl')}
      ${marginBottom('-8px')}
    }
    .g-icon-show-password {
      ${color('primary')}
      ${marginLeft('sm')}
      ${cursor('pointer')}
    }
  `
}

export default passwordStyle
