import { useEffect, useRef, useState, useCallback, ElementType, ForwardRefRenderFunction, forwardRef} from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

interface Props {
  name: string;  
  icon?: ElementType;   
}

type InputProps = JSX.IntrinsicElements['input'] & Props

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, icon: Icon, ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value )
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        name={fieldName}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputBase);
