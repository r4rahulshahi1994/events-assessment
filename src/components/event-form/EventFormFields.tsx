import { MenuItem } from '@mui/material'
import type { Control } from 'react-hook-form'
import { eventCategories, eventStatuses } from '../../features/events/constants'
import type { EventFormValues } from '../../features/events/validation/eventSchema'
import { ControlledTextField } from '../../shared/forms/ControlledTextField'

interface EventFormFieldsProps {
  control: Control<EventFormValues>
}

export function EventFormFields({ control }: Readonly<EventFormFieldsProps>) {
  return (
    <>
      <ControlledTextField
        name="title"
        control={control}
        autoFocus
        required
        label="Event title"
        placeholder="e.g. North entrance access review"
      />
      <ControlledTextField
        name="date"
        control={control}
        required
        type="datetime-local"
        label="Date and time"
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { min: '1900-01-01T00:00', max: '2100-12-31T23:59' },
        }}
      />
      <div className="form-two-columns">
        <ControlledTextField
          name="category"
          control={control}
          select
          label="Category"
        >
          {eventCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </ControlledTextField>
        <ControlledTextField
          name="status"
          control={control}
          select
          label="Status"
        >
          {eventStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </ControlledTextField>
        <ControlledTextField
          name="location"
          control={control}
          label="Location"
        />
        <ControlledTextField
          name="owner"
          control={control}
          label="Assigned to"
        />
      </div>
      <ControlledTextField
        name="description"
        control={control}
        label="Notes"
        multiline
        minRows={3}
      />
    </>
  )
}
