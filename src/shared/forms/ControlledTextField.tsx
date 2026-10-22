import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import { useController } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onBlur'
  | 'error'
  | 'inputRef'
> & {
  name: FieldPath<T>
  control: Control<T>
}

export function ControlledTextField<T extends FieldValues>({
  name,
  control,
  helperText,
  ...props
}: ControlledTextFieldProps<T>) {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController({ name, control })

  return (
    <TextField
      {...props}
      {...field}
      inputRef={ref}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message ?? helperText}
      fullWidth
    />
  )
}
