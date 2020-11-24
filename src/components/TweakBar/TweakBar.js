import React from 'react';

import './TweakBar.scss';

const TweakBar = () => {
    return (
        <>
            <form action="" className="tweak">
                <div className="container">
                    <label htmlFor="">Learning Rate: </label>
                    <input type="number" step="0.01" className="eta" />
                </div>
                <div className="container">
                    <label htmlFor="">Minimum Desired Error: </label>
                    <input type="number" step="0.01" className="mde" />
                </div>
                <div className="container">
                    <label htmlFor="">Epoch Limit: </label>
                    <input type="number" step="50" className="epoch_limit" />
                </div>
                <div className="container">
                    <label htmlFor="">Hidden Layers: </label>
                    <input type="number" step="1" className="layers" />
                </div>
                <div className="container">
                    <label htmlFor="">Neurons per Layer: </label>
                    <input type="number" step="1" className="neurons" />
                </div>
                <button type="submit">Train</button>
            </form>
        </>
    );
};

export default TweakBar;
