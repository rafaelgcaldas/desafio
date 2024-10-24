import { Meta, StoryObj } from '@storybook/react'
import { Banner } from '.'

export default {
  title: 'Banner',
  component: Banner,
  parameters: {
    layout: 'full',
  },
} as Meta

export const Default: StoryObj = {
  args: {
    title: 'Banner title',
  },
}
