import type { Meta, StoryObj } from '@storybook/react'

import { DatePopover } from './demo'

const meta: Meta<typeof DatePopover> = {
  title: 'Date/Date Picker/With Popover',
  component: DatePopover,
}

export default meta
type Story = StoryObj<typeof DatePopover>

export const With_Popover: Story = {
  args: {},
}
