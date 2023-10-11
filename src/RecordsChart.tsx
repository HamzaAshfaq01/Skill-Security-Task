import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RecordsChart({data}:any) {
 const pie = {
  labels: ['Critical', 'High', 'Medium', 'Low', ],
  datasets: [
    {
      label: 'Severity Levels',
      data: [data.critical, data.high, data.medium, data.low ],
      backgroundColor: [
        'rgb(220, 38, 39)',
        'rgb(235, 87, 12)',
        'rgb(234, 179, 10)',
        'rgb(38, 99, 235)',
        
      ],
      borderColor: [
        'rgb(220, 38, 39)',
        'rgb(235, 87, 12)',
        'rgb(234, 179, 10)',
        'rgb(38, 99, 235)',
        
      ],
      borderWidth: 1,
    },
  ],
};

  return (<div className='max-w-I'>

  <Pie className='pie-chart' data={pie} width={250} height={250} />
  </div>)
}
