import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from '.'

const meta: Meta<typeof DatePicker> = {
  title: 'Date/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Basic: Story = {
  args: {
    value: new Date(),
  },
}
