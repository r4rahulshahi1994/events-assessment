import { Alert, Button, DialogActions, DialogContent } from '@mui/material'
import { CalendarPlus, Check } from 'lucide-react'
import { FormDialog } from '../shared/components/FormDialog'
import { EventFormFields } from './event-form/EventFormFields'
import { useEventForm } from './event-form/useEventForm'
import type { EventFormProps } from './event-form/types'
import './event-form/event-form.css'

export type { EventFormProps } from './event-form/types'

export function EventForm(props: Readonly<EventFormProps>) {
  const {
    control,
    onSubmit,
    submitError,
    formState: { isSubmitting },
  } = useEventForm(props)
  const submitLabel = props.event ? 'Save changes' : 'Create event'

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label={props.event ? 'Edit event' : 'New event'}
    >
      <div className="event-form-fields">
        {submitError && <Alert severity="error">{submitError}</Alert>}
        <EventFormFields control={control} />
      </div>
      <DialogActions className="form-actions">
        <Button
          onClick={props.onCancel}
          color="inherit"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={<Check size={17} />}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </DialogActions>
    </form>
  )
}

export function EventFormDialog(props: Readonly<EventFormProps>) {
  return (
    <FormDialog
      open
      title={props.event ? 'Edit event' : 'New event'}
      subtitle={props.event?.id ?? 'Event details'}
      icon={<CalendarPlus size={22} />}
      onClose={props.onCancel}
    >
      <DialogContent className="event-form-dialog-content">
        <EventForm {...props} />
      </DialogContent>
    </FormDialog>
  )
}
