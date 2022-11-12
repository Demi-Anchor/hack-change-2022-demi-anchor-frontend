import { useEffect,useState } from 'react';
import axios from 'axios'
import {Chart as ChartJS , ArcElement, CategoryScale , LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js'
import {Line} from 'react-chartjs-2'
import 'chart.css'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

function Chart() {
    const [chartData , setChartData] = useState ({})
   
    useEffect (() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:3000/')
            setChartData({
                labels: data.data.map((item) => item.id),
                datasetes: [
                    {
                        label: "Revenues",
                        data: data.data.map(item => item.revenue),
                        fill: true,
                        borderColor: 'rgb(255,99,132)',
                        backgroundColor: 'rgba(255,99,132,0.3)'
                    }
                ]

            })
        }
        fetchData();
    }, [])
  return (
    <div className='chart'>
        {chartData && chartData.datasetes && (
        <Line
        data = {chartData}
        options = {{
            responsive: true,
            plugins: {
                legend: {position: 'top'},
                title: {display: true,text: 'arial'}
            },
        }}
        />
        )}

    </div>
  )
}

export default Chart
