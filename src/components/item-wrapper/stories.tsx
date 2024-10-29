import { Meta, StoryObj } from '@storybook/react'
import { ItemWrapper } from '.'

export default {
  title: 'ItemWrapper',
  component: ItemWrapper,
} as Meta

export const Default: StoryObj = {
  args: {
    label: 'Some text',
    color: 'bg-blue-100',
  },
}
