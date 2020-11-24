import React, { useState } from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryCursorContainer,
    VictoryContainer,
    VictoryScatter,
    VictoryTheme,
} from 'victory';
import './Canvas.scss';

const Canvas = () => {
    const scatterData = [];
    const getCoordinates = (value, props) => {
        console.log(value);
    };

    onclick = (e) => {
        console.log(e);
    };

    return (
        <VictoryChart
            height={200}
            width={200}
            theme={VictoryTheme.material}
            domain={[-5, 5]}
        >
            <VictoryScatter data={scatterData} />
            <VictoryAxis
                crossAxis
                standalone={false}
                style={{
                    tickLabels: { fontSize: 2.5 },
                }}
            />
            <VictoryAxis
                dependentAxis
                crossAxis
                standalone={false}
                style={{
                    tickLabels: { fontSize: 2.5 },
                }}
            />
        </VictoryChart>
    );
};

export default Canvas;
