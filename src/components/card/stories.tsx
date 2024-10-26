import { Meta, StoryObj } from '@storybook/react'
import { Card } from '.'
import { character } from '@/test/mocks/character'

export default {
  title: 'Card',
  component: Card,
  args: {
    character: character,
  },
} as Meta

export const Default: StoryObj = {}
