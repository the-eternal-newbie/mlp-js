import React, { useState } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { colors } from '../../util/Data';
import './Canvas.scss';

const Canvas = (props) => {
    const {
        setTrainingData,
        encodedClass,
        currentClass,
        isNewClass,
        setIsNewClass,
        setIsEnoughData,
        areaData,
    } = {
        ...props,
    };

    const [data, setData] = useState([
        {
            points: [],
            color: colors['points'][currentClass],
            class: currentClass,
            encoded: encodedClass,
        },
    ]);
    const [amountData, setAmountData] = useState(0);

    const refactorClasses = () => {
        setData(
            data.map((item) =>
                item.class === currentClass
                    ? item
                    : {
                          ...item,
                          encoded: '0' + item.encoded,
                      }
            )
        );
    };
    const drawCoordinates = (event) => {
        setAmountData((prev) => prev + 1);
        currentClass > 1 && amountData > 10 && setIsEnoughData(true);
        isNewClass && refactorClasses();
        isNewClass
            ? setData((prev) => [
                  ...prev,
                  {
                      points: [{ x: event.xValue, y: event.yValue }],
                      color: colors['points'][currentClass],
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
                    const xValue = coord['x'].toFixed(2);
                    const yValue = coord['y'].toFixed(2);
                    x.push([parseFloat(xValue), parseFloat(yValue)]);
                    y.push(
                        dataSet['encoded']
                            .split('')
                            .map((char) => parseInt(char))
                    );
                });
            }
        });
        setTrainingData([x, y]);
    };

    return (
        <>
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
                        <Scatter
                            data={dataSet['points']}
                            fill={dataSet['color']}
                        />
                    ))}
                    {areaData &&
                        Object.keys(areaData).map((key) => (
                            <Scatter
                                data={areaData[key]}
                                shape="cross"
                                fill={colors['layout'][key]}
                                isAnimationActive={false}
                            />
                        ))}
                </ScatterChart>
            </section>
        </>
    );
};

export default Canvas;
