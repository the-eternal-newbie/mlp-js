import Matrix from './Matrix';

class MLP {
    constructor(
        input,
        output,
        neurons,
        learningRate = 0.1,
        maxEpoch = 100,
        mde = 0.1,
        layers = 2
    ) {
        this.hiddenLayers = new Matrix(neurons * layers, input, 'RANDOM');
        this.weights = new Matrix(neurons * layers, 1, 'RANDOM');
        this.hiddenToOutputs = new Matrix(output, neurons * layers, 'RANDOM');
        this.weightsToOutputs = new Matrix(output, 1, 'RANDOM');
        this.lr = learningRate;
        this.maxEpoch = maxEpoch;
        this.mde = mde;
        this.activation = this.sigmoid;
        this.dActivation = this.dSigmoid;
    }

    predict(inputs) {
        let inputsMatrix = new Matrix(inputs.length, 1, inputs);
        let hidden = this.hiddenLayers.multiply(inputsMatrix);
        hidden.add(this.weights);
        hidden.foreach(this.activation);
        let output = this.hiddenToOutputs.multiply(hidden);
        output.add(this.weightsToOutputs);
        output.foreach(this.activation);
        return output;
    }

    train(inputs, labels) {
        this.shuffle(inputs, labels);
        let maxEpoch = 0;
        const dataError = [];
        while (maxEpoch < this.maxEpoch) {
            let s = 0;
            for (let i = 0; i < inputs.length; i++) {
                const input = new Matrix(inputs[i].length, 1, inputs[i]);
                const hidden = this.hiddenLayers.multiply(input);
                hidden.add(this.weights);
                hidden.foreach(this.activation);

                const outputs = this.hiddenToOutputs.multiply(hidden);
                outputs.add(this.weightsToOutputs);
                outputs.foreach(this.activation);

                const outputErrors = new Matrix(labels[i].length, 1, labels[i]);
                outputErrors.subtract(outputs);

                for (let i = 0; i < outputErrors.data.length; i++) {
                    s += outputErrors.data[i] * outputErrors.data[i];
                }

                outputs.foreach(this.dActivation);
                outputs.elemWise(outputErrors);
                outputs.scalar(this.lr);

                hidden.transpose();

                const hiddenToOutputsDeltas = outputs.multiply(hidden);

                hidden.transpose();

                this.hiddenToOutputs.add(hiddenToOutputsDeltas);
                this.weightsToOutputs.add(outputs);

                this.hiddenToOutputs.transpose();

                const hiddenErrors = this.hiddenToOutputs.multiply(
                    outputErrors
                );

                this.hiddenToOutputs.transpose();

                hidden.foreach(this.dActivation);
                hidden.elemWise(hiddenErrors);
                hidden.scalar(this.lr);

                input.transpose();

                const hiddenLayersDeltas = hidden.multiply(input);

                this.hiddenLayers.add(hiddenLayersDeltas);
                this.weights.add(hidden);
            }
            maxEpoch++;
            dataError.push({ epoch: maxEpoch, error: Math.sqrt(s) });
            if (Math.sqrt(s) < this.mde) {
                break;
            }
        }
        return dataError;
    }

    shuffle(x, y) {
        for (let i = 0; i < y.length; i++) {
            let pos = Math.floor(Math.random() * y.length);
            let tmpy = y[i];
            let tmpx = x[i];
            y[i] = y[pos];
            x[i] = x[pos];
            y[pos] = tmpy;
            x[pos] = tmpx;
        }
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    dSigmoid(x) {
        return x * (1 - x);
    }
}

export default MLP;
