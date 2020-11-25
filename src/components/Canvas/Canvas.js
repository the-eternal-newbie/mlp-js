import React, { useState } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import './Canvas.scss';

const Canvas = (props) => {
    const { encodedClass, currentClass, isNewClass, setIsNewClass } = {
        ...props,
    };
    const colors = { 1: '#fcba04ff', 2: '#935fa7ff', 3: '#ff6f5aff' };
    const [data, setData] = useState([
        {
            points: [],
            color: colors[currentClass],
            class: currentClass,
            encoded: encodedClass,
        },
    ]);

    const drawCoordinates = (event) => {
        console.log(colors[currentClass]);
        isNewClass
            ? setData((prev) => [
                  ...prev,
                  {
                      points: [{ x: event.xValue, y: event.yValue }],
                      color: colors[currentClass],
                      encoded: encodedClass,
                      class: currentClass,
                  },
              ])
            : setData(
                  data.map((item) =>
                      item.class === currentClass
                          ? {
                                ...item,
                                points: [
                                    ...item.points,
                                    { x: event.xValue, y: event.yValue },
                                ],
                            }
                          : item
                  )
              );
        isNewClass && setIsNewClass(false);
    };

    return (
        <section className="cartesian">
            <ScatterChart
                width={800}
                height={800}
                onClick={(event) => drawCoordinates(event, '1')}
            >
                <CartesianGrid />
                <XAxis
                    type="number"
                    dataKey="x"
                    domain={[-5, 5]}
                    allowDataOverflow={true}
                    tickCount={11}
                />
                <YAxis
                    type="number"
                    dataKey="y"
                    domain={[-5, 5]}
                    allowDataOverflow={true}
                    tickCount={11}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {data.map((dataSet) => (
                    <Scatter data={dataSet['points']} fill={dataSet['color']} />
                ))}
            </ScatterChart>
        </section>
    );
};

export default Canvas;
