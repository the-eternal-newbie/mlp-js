import React, { useState } from 'react';
import Canvas from '../../components/Canvas/Canvas';
import TweakBar from '../../components/TweakBar/TweakBar';

import './Layout.scss';

const BackPropLayout = () => {
    const [isNewClass, setIsNewClass] = useState(false);
    const [currentClass, setCurrentClass] = useState(1);
    const [encodedClass, setEncodedClass] = useState('1');

    const addClass = () => {
        console.log(currentClass);
        setCurrentClass((prev) => prev + 1);
        setIsNewClass(true);
        currentClass === 1
            ? setEncodedClass('01')
            : currentClass === 2
            ? setEncodedClass('10')
            : currentClass === 3 && setEncodedClass('100');
    };

    const startTraining = () => {
        console.log('Training!');
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
                    setIsNewClass={setIsNewClass}
                />
                <TweakBar addClass={addClass} startTraining={startTraining} />
            </section>
            <section className="errorLayout"></section>
        </section>
    );
};

export default BackPropLayout;
