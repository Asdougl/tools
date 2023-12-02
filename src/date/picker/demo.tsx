import { useState, type FC } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { format, startOfDay } from 'date-fns'
import { cn } from '~/utils/cn'
import { DatePicker, DatePickerProps } from '.'

type DatePopoverProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  className?: string
}

export const DatePopover: FC<DatePopoverProps> = ({ className, ...props }) => {
  const { disabled, id } = props

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date())

  const toggleOpen = () => {
    if (open) {
      setOpen(false)
    } else if (!disabled) {
      setOpen(true)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={toggleOpen}>
      <Popover.Trigger asChild>
        <button
          id={id}
          className={cn(
            'flex items-center gap-2 rounded-lg border-neutral-800 bg-neutral-950 px-4 py-2 text-base text-neutral-50 ring-neutral-400 hover:bg-neutral-900 disabled:border-neutral-800 disabled:text-neutral-600 disabled:ring-neutral-400 disabled:hover:bg-neutral-950',
            className
          )}
          disabled={disabled}
        >
          <span>{format(value, 'd MMM yy')}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="relative z-10 w-screen p-2 md:w-auto"
          aria-label="date picker"
        >
          <DatePicker value={value} onChange={setValue} {...props} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export const UncontrolledDatePicker: FC<
  Omit<DatePickerProps, 'value' | 'onChange'> & {
    name?: string
    defaultValue?: string
  }
> = ({ name, defaultValue, ...props }) => {
  const [value, setValue] = useState(
    defaultValue ? new Date(defaultValue) : new Date()
  )

  const onChange = (date: Date) => {
    setValue(startOfDay(date))
  }

  return (
    <>
      <input name={name} type="hidden" value={format(value, 'yyyy-MM-dd')} />
      <DatePicker value={value} onChange={onChange} {...props} />
    </>
  )
}
