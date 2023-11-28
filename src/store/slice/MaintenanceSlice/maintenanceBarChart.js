import { createSlice } from "@reduxjs/toolkit";

export const maintenanceBarChartSlice = createSlice({
    name:'maintenanceBarChart',
    initialState : {
        options : { xAxis: {
            type: 'category',
            data: ['Total','Progress','Pending', 'Completed','Rejected'],
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]}
    },
    reducers : {
        setOptions : (state,action) => {
            state.options = action.payload
        },
        updateYAxisData : (state,action) => {
            console.log('running ----------> hu bhai')
            const payload = action.payload
            console.log('update y payload ',payload)
            const total = payload?.find( p => p.status === 'Total')
            const pending = payload?.find( p => p.status === 'Pending')
            const completed = payload?.find( p => p.status === 'Completed')
            const rejected = payload?.find( p => p.status === 'Rejected')
            const progress = payload?.find(p => p.status === 'Progress')
            const verified = payload?.find(p => p.status === 'Verified')
            const data = [total?.count,progress?.count,pending?.count,completed?.count,rejected?.count]
            console.log('chart data reducers',data)
            state.options.series[0] = {
                ...state.options.series[0],
                data : data
            }
        }
    }
})

export const {setOptions,updateYAxisData} = maintenanceBarChartSlice.actions
export const selectBarChartOptions = (state) => state.maintenanceBarChart.options
export default maintenanceBarChartSlice.reducer