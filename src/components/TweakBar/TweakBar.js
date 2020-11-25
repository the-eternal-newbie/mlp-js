import React, { useState } from 'react';

import './TweakBar.scss';

const TweakBar = (props) => {
    const [eta, setEta] = useState(0.2);
    const [mde, setMde] = useState(0.5);
    const [maxEpoch, setMaxEpoch] = useState(100);
    const [layers, setLayers] = useState(2);
    const [neurons, setNeurons] = useState(2);

    const handleEtaChange = (e) => {
        setEta(e.target.value);
    };
    const handleMdeChange = (e) => {
        setMde(e.target.value);
    };
    const handleEpochChange = (e) => {
        setMaxEpoch(e.target.value);
    };
    const handleLayersChange = (e) => {
        setLayers(e.target.value);
    };
    const handleNeuronsChange = (e) => {
        setNeurons(e.target.value);
    };

    return (
        <section className="tweakbar">
            <div className="inputContainer">
                <div className="container">
                    <label htmlFor="">Learning Rate: </label>
                    <input
                        type="number"
                        step="0.01"
                        className="eta"
                        onChange={handleEtaChange}
                    />
                </div>
                <div className="container">
                    <label htmlFor="">Minimum Desired Error: </label>
                    <input
                        type="number"
                        step="0.01"
                        className="mde"
                        onChange={handleMdeChange}
                    />
                </div>
                <div className="container">
                    <label htmlFor="">Epoch Limit: </label>
                    <input
                        type="number"
                        step="50"
                        className="epoch_limit"
                        onChange={handleEpochChange}
                    />
                </div>
                <div className="container">
                    <label htmlFor="">Hidden Layers: </label>
                    <input
                        type="number"
                        step="1"
                        className="layers"
                        onChange={handleLayersChange}
                    />
                </div>
                <div className="container">
                    <label htmlFor="">Neurons per Layer: </label>
                    <input
                        type="number"
                        step="1"
                        className="neurons"
                        onChange={handleNeuronsChange}
                    />
                </div>
            </div>
            <div className="buttonContainer">
                <button
                    className="train"
                    onClick={() =>
                        props.startTraining(eta, mde, maxEpoch, layers, neurons)
                    }
                >
                    Train
                </button>
                <button className="newClass" onClick={() => props.addClass()}>
                    Add class
                </button>
            </div>
        </section>
    );
};

export default TweakBar;
