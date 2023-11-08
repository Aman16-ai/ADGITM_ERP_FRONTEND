import React, { useState } from 'react'
import ReactEChart from 'echarts-for-react'
export default function LineChart() {
    const [options,setOptions] = useState({xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]})
  return (
    <div><ReactEChart option={options}/></div>
  )
}
