import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressBar = ({value }) => {
  return (
    <Progress.Root 
      className="relative overflow-hidden bg-zinc-900 rounded-full w-full h-2" 
      value={value}
      max={100}
    >
      <Progress.Indicator 
        className="bg-green-500 h-2 transition-transform" 
        style={{ width: `${value}%` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
