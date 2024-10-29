import { Meta, StoryObj } from '@storybook/react'
import { Wrapper } from '.'

export default {
  title: 'Wrapper',
  component: Wrapper,
  args: {
    title: 'Example title',
    children: <div>Some Element</div>,
    isTop: false,
  },
} as Meta

export const Default: StoryObj = {}
