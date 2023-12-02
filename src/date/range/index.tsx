import {
  getDate,
  getMonth,
  getYear,
  isSameDay,
  setDate,
  format,
  addMonths,
  isBefore,
  isAfter,
  set,
  getDayOfYear,
  endOfWeek,
  startOfWeek,
  addDays,
  getDay,
} from 'date-fns'
import { type FC, useMemo, useState } from 'react'
import { cn } from '~/utils/cn'

const getMonthDates = (year: number, month: number) => {
  const firstOfMonth = set(new Date(), {
    year,
    month,
    date: 1,
  })

  const lastOfMonth = set(new Date(), {
    year,
    month: month + 1,
    date: 0,
  })

  // number of weeks in a month when week starts on Monday
  const weeks = Math.ceil(
    (getDayOfYear(endOfWeek(lastOfMonth, { weekStartsOn: 1 })) -
      getDayOfYear(startOfWeek(firstOfMonth, { weekStartsOn: 1 }))) /
      7
  )

  let focusDay = set(new Date(), {
    year,
    month,
    date: 1,
  })

  const focusDayOfWeek = getDay(focusDay)

  focusDay = set(focusDay, {
    date:
      getDate(focusDay) -
      (focusDayOfWeek < 1 ? focusDayOfWeek + 6 : focusDayOfWeek - 1),
  })

  const rows: Date[][] = []
  for (let i = 0; i < weeks; i++) {
    rows[i] = []
    for (let j = 0; j < 7; j++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rows[i][j] = focusDay
      focusDay = addDays(focusDay, 1)
    }
  }

  return rows
}

const stdFormat = (date: Date) => format(date, 'yyyy-MM-dd')
const accessibleFormat = (date: Date) => format(date, 'd, eeee, MMMM yyyy')

const isDisabled = (test: Date, min?: Date, max?: Date) => {
  if (max && isAfter(test, max)) {
    return true
  }
  if (min && isBefore(test, min)) {
    return true
  }
  return false
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type DateRangePickerProps = {
  start?: Date
  end?: Date
  onChange: (value: { start: Date | undefined; end: Date | undefined }) => void
  min?: Date
  max?: Date
}

type PickDateButtonProps = {
  date: Date
  start: Date | undefined
  end: Date | undefined
  isCurrent: (date: Date) => boolean
  onSelect: (date: Date) => void
  min?: Date
  max?: Date
}

const PickDateButton: FC<PickDateButtonProps> = ({
  date,
  start,
  end,
  isCurrent,
  onSelect,
  min,
  max,
}) => {
  const isStart = start ? isSameDay(date, start) : false
  const isEnd = end ? isSameDay(date, end) : false

  const isInRange = useMemo(() => {
    if (!start || !end) return false
    return isSameDay(date, start) || isSameDay(date, end)
      ? true
      : isAfter(date, start) && isBefore(date, end)
  }, [date, start, end])

  const selected = isStart || isEnd
  const current = isCurrent(date)
  const isToday = isSameDay(date, new Date())

  let ariaLabel = accessibleFormat(date)
  if (isToday) ariaLabel += ', today'
  if (current) ariaLabel += ', selected date'

  return (
    <button
      type="button"
      disabled={isDisabled(date, min, max) || !current}
      aria-label={ariaLabel}
      // This uses the cn utility since this code is pretty unmaintainable
      // without it. If you don't want to use it, best of luck to you.
      className={cn(
        'h-10 w-auto border text-lg hover:bg-neutral-900 md:w-10',
        current ? 'disabled:opacity-10' : 'opacity-0',
        {
          'rounded-lg': isStart && isEnd,
          'rounded-r': isEnd,
          'rounded-l': isStart,
          'border-neutral-500 bg-neutral-500 text-neutral-50': selected,
          'border-neutral-500': isToday,
          'border-transparent': !selected && !isToday,
          'bg-neutral-900': !isStart && !isEnd && isInRange,
        }
      )}
      onClick={() => onSelect(date)}
    >
      {getDate(date)}
    </button>
  )
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  start,
  end,
  onChange,
  min,
  max,
}) => {
  const [focusMonth, setFocusMonth] = useState(() => {
    return setDate(start ?? new Date(), 1)
  })

  const [{ monthOneDates, monthTwoDates }, setMonthDates] = useState<{
    monthOneDates: Date[][]
    monthTwoDates: Date[][]
  }>(() => {
    return {
      monthOneDates: getMonthDates(getYear(focusMonth), getMonth(focusMonth)),
      monthTwoDates: getMonthDates(
        getYear(focusMonth),
        getMonth(focusMonth) + 1
      ),
    }
  })

  const change = (chosen: Date) => {
    if (start && end) {
      if (chosen < start) {
        onChange({ start: chosen, end })
      } else if (chosen > end) {
        onChange({ start, end: chosen })
      } else {
        onChange({ start, end: chosen })
      }
    } else if (start) {
      if (chosen < start) {
        onChange({ start: chosen, end: start })
      } else if (isSameDay(chosen, start)) {
        onChange({ start: undefined, end: undefined })
      } else {
        onChange({ start, end: chosen })
      }
    } else {
      onChange({ start: chosen, end: chosen })
    }
  }

  const nextMonth = () => {
    const newMonth = addMonths(focusMonth, 1)
    const newNextMonth = addMonths(newMonth, 1)
    setFocusMonth(newMonth)
    setMonthDates({
      monthOneDates: getMonthDates(getYear(newMonth), getMonth(newMonth)),
      monthTwoDates: getMonthDates(
        getYear(newNextMonth),
        getMonth(newNextMonth)
      ),
    })
  }

  const prevMonth = () => {
    const newMonth = addMonths(focusMonth, -1)
    const newNextMonth = addMonths(newMonth, 1)
    setFocusMonth(newMonth)
    setMonthDates({
      monthOneDates: getMonthDates(getYear(newMonth), getMonth(newMonth)),
      monthTwoDates: getMonthDates(
        getYear(newNextMonth),
        getMonth(newNextMonth)
      ),
    })
  }

  const isFocusMonth = (date: Date) => {
    return getMonth(date) === getMonth(focusMonth)
  }

  const isFocusNextMonth = (date: Date) => {
    return getMonth(date) === getMonth(addMonths(focusMonth, 1))
  }

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-neutral-50">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="flex h-10 items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="h-full rounded-lg px-2 hover:bg-neutral-900"
              aria-label="Previous Month"
            >
              &lt;
            </button>
            <div>{format(focusMonth, 'MMMM yyyy')}</div>
            <div className="opacity-0">&gt;</div>
          </div>
          <div className="grid grid-cols-7">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center font-mono text-sm lowercase text-neutral-600"
              >
                {day}
              </div>
            ))}
            {monthOneDates.map((row) =>
              row.map((date) => (
                <PickDateButton
                  key={`left-${stdFormat(date)}`}
                  date={date}
                  onSelect={change}
                  start={start}
                  end={end}
                  isCurrent={isFocusMonth}
                  min={min}
                  max={max}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <div className="flex h-10 items-center justify-between">
            <div className="opacity-0">&lt;</div>
            <div>{format(addMonths(focusMonth, 1), 'MMMM yyyy')}</div>
            <button
              type="button"
              onClick={nextMonth}
              className="h-full rounded-lg px-2 hover:bg-neutral-900"
              aria-label="Next Month"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center font-mono text-sm lowercase text-neutral-600"
              >
                {day}
              </div>
            ))}
            {monthTwoDates.map((row) =>
              row.map((date) => (
                <PickDateButton
                  key={`right-${stdFormat(date)}`}
                  date={date}
                  onSelect={change}
                  start={start}
                  end={end}
                  isCurrent={isFocusNextMonth}
                  min={min}
                  max={max}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="text-xs text-neutral-500 hover:text-neutral-50 disabled:hover:text-neutral-500"
          disabled={!start && !end}
          onClick={() => onChange({ start: undefined, end: undefined })}
        >
          clear
        </button>
      </div>
    </div>
  )
}
