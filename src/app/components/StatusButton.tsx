'use client'
import { useField } from '@payloadcms/ui/forms/useField'
import { TextFieldClientComponent } from 'payload'

const StatusButton: TextFieldClientComponent = ({ field }) => {
  const { value, setValue } = useField({ path: 'status' })

  const handleClick = (newValue: string) => {
    console.log(newValue, value)
  }

  return (
    <div>
      <h3>當前狀態: {value}</h3>
      <button onClick={() => handleClick('draft')}>設定為草稿</button>
      <button onClick={() => handleClick('reviewing')}>設定為審核中</button>
      <button onClick={() => handleClick('published')}>設定為已發布</button>
    </div>
  )
}

export default StatusButton
