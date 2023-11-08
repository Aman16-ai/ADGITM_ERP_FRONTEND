import React, { useEffect, useState } from 'react'
import ReactEChart from 'echarts-for-react'
export default function BarChart({data}) {
    // const [option,setOptions] = useState({ xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     label
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [120, 200, 150, 80, 70, 110, 130],
    //       type: 'bar',
    //       showBackground: true,
    //       backgroundStyle: {
    //         color: 'rgba(180, 180, 180, 0.2)'
    //       }
    //     }
    //   ]})
    useEffect(() => {
      console.log('bar use effect data ->',data)
    },[data])
  return (
    <div><ReactEChart option={data}/></div>
  )
}
