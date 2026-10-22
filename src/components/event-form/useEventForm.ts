import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { eventSchema } from '../../features/events/validation/eventSchema'
import type { EventFormValues } from '../../features/events/validation/eventSchema'
import {
  getEventFormValues,
  toEventInput,
} from '../../features/events/utils/eventFormValues'
import type { EventFormProps } from './types'

export function useEventForm({
  event,
  onSave,
}: Pick<EventFormProps, 'event' | 'onSave'>) {
  const [submitError, setSubmitError] = useState('')
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    shouldFocusError: true,
    defaultValues: getEventFormValues(event),
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError('')
    try {
      await onSave(toEventInput(values), event?.id)
    } catch {
      setSubmitError('Unable to save the event. Please try again.')
    }
  })

  return { ...form, onSubmit, submitError }
}
