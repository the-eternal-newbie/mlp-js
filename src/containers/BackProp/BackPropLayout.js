import React, { useState } from 'react';
import Canvas from '../../components/Canvas/Canvas';
import TweakBar from '../../components/TweakBar/TweakBar';
import MLP from '../../util/MLP';

import './Layout.scss';

const BackPropLayout = () => {
    const [isNewClass, setIsNewClass] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [currentClass, setCurrentClass] = useState(1);
    const [encodedClass, setEncodedClass] = useState('01');
    const [trainingData, setTrainingData] = useState([]);

    const addClass = () => {
        setCurrentClass((prev) => prev + 1);
        setIsNewClass(true);
        currentClass + 1 === 2
            ? setEncodedClass('10')
            : currentClass + 1 === 3
            ? setEncodedClass('100')
            : setEncodedClass(null);
    };

    const startTraining = (eta, mde, maxEpoch, layers, neurons) => {
        setIsTraining(true);
        console.log('Training!');
        console.log(trainingData);
        const net = new MLP(2, neurons, currentClass, eta, maxEpoch);
        net.fit(trainingData[0], trainingData[1]);
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
                    isTraining={isTraining}
                    setIsNewClass={setIsNewClass}
                    setTrainingData={setTrainingData}
                />
                <TweakBar addClass={addClass} startTraining={startTraining} />
            </section>
            <section className="errorLayout"></section>
        </section>
    );
};

export default BackPropLayout;
