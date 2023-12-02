import { useState, type FC, useMemo } from 'react'
import {
  format,
  getDate,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  set,
  setMonth,
  setYear,
  isAfter,
  isBefore,
  setDate,
  addDays,
  getDay,
  addMonths,
  subMonths,
  differenceInCalendarWeeks,
} from 'date-fns'

/**
 * Generate the Dates for a given month
 * @param year Desired year
 * @param month Desired month
 * @returns A 2D array of weeks and days within weeks
 */
export const getMonthDates = (year: number, month: number) => {
  // Find the first day of the month
  const firstOfMonth = set(new Date(), {
    year,
    month,
    date: 1,
  })

  // Find the last day of the month, via date = 0
  const lastOfMonth = set(new Date(), {
    year,
    month: month + 1,
    date: 0,
  })

  // number of weeks in a month when week starts on Monday
  const weeks =
    differenceInCalendarWeeks(lastOfMonth, firstOfMonth, {
      weekStartsOn: 1,
    }) + 1

  // Set the first day of the month to the first day of the week
  let focusDay = set(new Date(), {
    year,
    month,
    date: 1,
  })

  // Get the day of the week, 0 = Monday, 6 = Sunday
  const focusDayOfWeek = getDay(focusDay)

  // If the first day of the month is not a Monday, set it to the previous Monday
  focusDay = set(focusDay, {
    date:
      getDate(focusDay) -
      (focusDayOfWeek < 1 ? focusDayOfWeek + 6 : focusDayOfWeek - 1),
  })

  // Create a 2D array of weeks and days within weeks
  const rows: Date[][] = []

  // For each week
  for (let i = 0; i < weeks; i++) {
    // create an empty array
    rows[i] = []
    // For each day of the week
    for (let j = 0; j < 7; j++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rows[i][j] = focusDay
      // Increment the day
      focusDay = addDays(focusDay, 1)
    }
  }

  // Return the 2D array
  return rows
}

// Since months don't change, might as well keep them constant
const MonthOptions = () => [
  <option key={0} value={0}>
    January
  </option>,
  <option key={1} value={1}>
    February
  </option>,
  <option key={2} value={2}>
    March
  </option>,
  <option key={3} value={3}>
    April
  </option>,
  <option key={4} value={4}>
    May
  </option>,
  <option key={5} value={5}>
    June
  </option>,
  <option key={6} value={6}>
    July
  </option>,
  <option key={7} value={7}>
    August
  </option>,
  <option key={8} value={8}>
    September
  </option>,
  <option key={9} value={9}>
    October
  </option>,
  <option key={10} value={10}>
    November
  </option>,
  <option key={11} value={11}>
    December
  </option>,
]

// Format a date to the standard format, e.g. 2021-01-01
const stdFormat = (date: Date) => format(date, 'yyyy-MM-dd')
// Format a date to a readable format for screen readers, e.g. 1, Friday, January 2021
const accessibleFormat = (date: Date) => format(date, 'd, eeee, MMMM yyyy')

// Check if a date falls outside of the min/max range
const isDisabled = (test: Date, min?: Date, max?: Date) => {
  if (max && isAfter(test, max)) {
    return true
  }
  if (min && isBefore(test, min)) {
    return true
  }
  return false
}

// Get the initial focus date, defaults to the 1st of the month
const getInitialFocus = (initialDate?: Date) => {
  return setDate(initialDate ?? new Date(), 1)
}

// Days of the week, starting with Monday
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export type DatePickerProps = {
  value: Date
  onChange: (date: Date) => void
  min?: Date
  max?: Date
  id?: string
  disabled?: boolean
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  disabled,
}) => {
  // This tracks the month currently in view
  const [focusMonth, setFocusMonth] = useState(() => getInitialFocus(value))

  // Generate the dates for the month
  const monthDates = useMemo(() => {
    return getMonthDates(getYear(focusMonth), getMonth(focusMonth))
  }, [focusMonth])

  // When the date is chosen
  const change = (chosen: Date) => {
    onChange(new Date(chosen))
    // Move the date if the chosen date is in a different month
    if (!isSameMonth(chosen, focusMonth)) {
      setFocusMonth(
        set(focusMonth, { month: getMonth(chosen), year: getYear(chosen) })
      )
    }
  }

  // Move to the next month
  const nextMonth = () => {
    setFocusMonth(addMonths(focusMonth, 1))
  }

  // Move to the previous month
  const prevMonth = () => {
    setFocusMonth(subMonths(focusMonth, 1))
  }

  // track the current date
  const today = new Date()

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-neutral-50">
      {/* The navigation header */}
      <div className="flex h-10 justify-between">
        {/* Button for going back a month */}
        <button
          type="button"
          onClick={prevMonth}
          className="flex w-8 items-center justify-center rounded-lg hover:bg-neutral-900"
          aria-label="Previous Month"
          disabled={disabled}
        >
          &lt;
        </button>
        {/* Month Select */}
        <select
          value={getMonth(focusMonth)}
          disabled={disabled}
          onChange={(e) =>
            setFocusMonth(setMonth(focusMonth, +e.currentTarget.value))
          }
          aria-label="month"
          className="w-auto flex-1 rounded-lg bg-neutral-950 px-4 text-neutral-50 hover:bg-neutral-900"
        >
          <MonthOptions />
        </select>
        {/* Year select (do something better than this!) */}
        <input
          aria-label="year"
          type="number"
          value={getYear(focusMonth)}
          onChange={(e) => {
            const value = +e.currentTarget.value
            setFocusMonth(setYear(focusMonth, value))
          }}
          max={2100}
          min={1901}
          className="w-12 flex-1 rounded-lg border-none bg-neutral-950 px-4 py-0 leading-tight text-neutral-50 hover:bg-neutral-900 lg:w-12"
        />
        {/* Button for going forward a month */}
        <button
          type="button"
          onClick={nextMonth}
          className="flex w-8 items-center justify-center rounded-lg hover:bg-neutral-900"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>
      {/* The calendar -- displayed as a 7 col grid */}
      <div className="grid grid-cols-7 items-center">
        {/* Add the titles for the days of the week */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-mono text-sm lowercase text-neutral-600"
          >
            {day}
          </div>
        ))}
        {/* Render out each week */}
        {monthDates.map((row) =>
          // Render out each day for that week
          row.map((date) => {
            // Check if this date is currently selected by the date picker
            const current = value ? isSameDay(date, value) : false
            // Check if this date is today
            const isToday = isSameDay(date, today)

            // generate the aria label for screen readers
            let ariaLabel = accessibleFormat(date)
            if (isToday) ariaLabel += ', today'
            if (current) ariaLabel += ', selected date'

            // Check if the date is in the current month or on the edges
            const isCurrentMonth = getMonth(date) !== getMonth(focusMonth)

            return (
              <button
                type="button"
                disabled={isDisabled(date, min, max)}
                key={stdFormat(date)}
                aria-label={ariaLabel}
                // I highly suggest using cn from utils/cn.ts here
                className={`h-10 w-auto rounded-lg border text-lg hover:bg-neutral-900 disabled:opacity-10 md:w-10 ${
                  isCurrentMonth ? 'opacity-60' : ''
                } ${
                  current
                    ? 'border-neutral-500 bg-neutral-500 text-neutral-50'
                    : ''
                } ${isToday ? 'border-neutral-500' : ''} ${
                  !current && !isToday ? 'border-transparent' : ''
                }`}
                onClick={() => change(date)}
              >
                {getDate(date)}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
