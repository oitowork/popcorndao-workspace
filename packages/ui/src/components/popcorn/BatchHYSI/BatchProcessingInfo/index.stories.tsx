import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
import React from 'react';
import { BatchProcessingInfo } from './index';

export default {
  title: 'App / Batch HYSI / Components / Batch Processing Info',
  component: BatchProcessingInfo,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <BatchProcessingInfo timeTillBatchProcessing={[]} {...args} />
);

export const LT12Hours = Template.bind({});
export const GT12Hours = Template.bind({});
export const Complete = Template.bind({});
LT12Hours.args = {
  timeTillBatchProcessing: [
    {
      timeTillProcessing: DateTime.now().plus({ hours: 12 }).toJSDate(),
      progressPercentage: 38.42,
    },
  ],
};
GT12Hours.args = {
  timeTillBatchProcessing: [
    {
      timeTillProcessing: DateTime.now().plus({ hours: 36 }).toJSDate(),
      progressPercentage: 38.42,
    },
  ],
};
Complete.args = {
  timeTillBatchProcessing: [
    {
      timeTillProcessing: new Date('2021-01-01'),
      progressPercentage: 100,
    },
  ],
};
