import React, { useState, useEffect } from 'react';
import Canvas from '../../components/Canvas/Canvas';
import TweakBar from '../../components/TweakBar/TweakBar';
import ErrorChart from '../../components/Chart/Chart';
import MLP from '../../util/MLP';
import { smallLayout, mediumLayout, bigLayout } from '../../util/Data';

import './Layout.scss';

const BackPropLayout = () => {
    const [isNewClass, setIsNewClass] = useState(false);
    const [isEnoughData, setIsEnoughData] = useState(false);
    const [currentClass, setCurrentClass] = useState(1);
    const [encodedClass, setEncodedClass] = useState('1');
    const [trainingData, setTrainingData] = useState([]);
    const [errorData, setErrorData] = useState(null);
    const [areaData, setAreaData] = useState(null);

    const addClass = () => {
        setCurrentClass((prev) => prev + 1);
        setIsNewClass(true);
        setEncodedClass('1' + '0'.repeat(currentClass));
    };

    const determineClass = (matrix) => {
        const encodedArray = matrix['data'];
        const decodedValue = encodedArray.indexOf(Math.max(...encodedArray));
        return '' + (encodedArray.length - decodedValue);
    };

    const startTraining = (
        eta,
        mde,
        maxEpoch,
        layers,
        neurons,
        layout = 'big'
    ) => {
        const net = new MLP(
            2,
            currentClass,
            neurons,
            eta,
            maxEpoch,
            mde,
            layers
        );
        const errors = net.train(trainingData[0], trainingData[1]);
        setErrorData(errors);
        const data = {};
        layout === 'big'
            ? bigLayout.forEach((points) => {
                  const encodedClass = determineClass(
                      net.predict([points['x'], points['y']])
                  );
                  data[encodedClass]
                      ? data[encodedClass].push(points)
                      : (data[encodedClass] = [points]);
              })
            : layout === 'medium'
            ? mediumLayout.forEach((points) => {
                  const encodedClass = determineClass(
                      net.predict([points['x'], points['y']])
                  );
                  data[encodedClass]
                      ? data[encodedClass].push(points)
                      : (data[encodedClass] = [points]);
              })
            : smallLayout.forEach((points) => {
                  const encodedClass = determineClass(
                      net.predict([points['x'], points['y']])
                  );
                  data[encodedClass]
                      ? data[encodedClass].push(points)
                      : (data[encodedClass] = [points]);
              });
        setAreaData(data);
    };

    return (
        <section className="interface">
            <header className="title">
                <h1>Multi-Layer Perceptron</h1>
            </header>
            <section className="trainingLayout">
                <Canvas
                    currentClass={currentClass}
                    encodedClass={encodedClass}
                    isNewClass={isNewClass}
                    areaData={areaData}
                    setIsNewClass={setIsNewClass}
                    setTrainingData={setTrainingData}
                    setIsEnoughData={setIsEnoughData}
                />
                <section className="rightBar">
                    <TweakBar
                        addClass={addClass}
                        isEnoughData={isEnoughData}
                        startTraining={startTraining}
                    />
                    {errorData && <ErrorChart errorData={errorData} />}
                </section>
            </section>
            <section className="errorLayout"></section>
        </section>
    );
};

export default BackPropLayout;
