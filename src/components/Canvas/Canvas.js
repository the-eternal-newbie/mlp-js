import React, { useState, useEffect } from 'react';
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
    const {
        setTrainingData,
        encodedClass,
        currentClass,
        isNewClass,
        isTraining,
        setIsNewClass,
    } = {
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
        if (isNewClass && currentClass === 3) {
            setData(
                data.map((item) =>
                    item.class === 1
                        ? {
                              ...item,
                              encoded: '001',
                          }
                        : item.class === 2
                        ? { ...item, encoded: '010' }
                        : item
                )
            );
        }
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
        const x = [];
        const y = [];
        data.forEach((dataSet) => {
            if (dataSet.lenght !== 0) {
                dataSet['points'].forEach((coord) => {
                    x.push([coord['x'], coord['y']]);
                    y.push([
                        dataSet['encoded']
                            .split('')
                            .map((char) => parseInt(char)),
                    ]);
                });
            }
        });
        setTrainingData([x, y]);
    };

    return (
        <section className="cartesian">
            <ScatterChart
                width={800}
                height={800}
                onClick={(event) => drawCoordinates(event)}
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
