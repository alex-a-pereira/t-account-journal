import React, { useState, useRef } from 'react'

import {
  JournalInputValue
} from '@typings'

import { useOnClickOutside } from '@reactHooks/useOnClickOutside'

import './CellInput.scss'

interface CellInputProps {
  className?: string
  initialValue?: JournalInputValue
  isEditable: boolean
  onChange: (value: JournalInputValue) => void
}

export const CellInput: React.FC<CellInputProps> = (props: CellInputProps) => {
  const {
    className,
    initialValue,
    isEditable,
    onChange
  } = props

  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)

  // handle click outside of input field
  const inputRef = useRef(null)
  useOnClickOutside(inputRef, () => { setIsEditing(false) })

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange(newValue)
  }

  const shouldRenderPTag = !isEditable || !isEditing

  return (
    <td
      className={className}
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true)
        }
      }
      }
    >
      {
        shouldRenderPTag
          ? (
            <p className='cell-static-text'>
              {value}
            </p>
            )
          : (
            <input
              ref={inputRef}
              type='text'
              value={value}
              onChange={e => {
                handleChange(e.target.value)
              }}
            />
            )
      }
    </td>
  )
}
