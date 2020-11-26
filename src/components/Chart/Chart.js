import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
const Chart = (props) => {
    return (
        <div>
            <LineChart
                width={700}
                height={550}
                data={props.errorData}
                margin={{
                    top: 10,
                    right: 40,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#ff2200"
                    fill="#ff2200"
                    dot={false}
                />
            </LineChart>
        </div>
    );
};

export default Chart;
