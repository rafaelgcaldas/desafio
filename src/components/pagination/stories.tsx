import { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '.'

export default {
  title: 'Pagination',
  component: Pagination,
} as Meta

export const Default: StoryObj = {
  args: {
    pageIndex: 0,
    totalCount: 100,
    perPage: 10,
  },
}
