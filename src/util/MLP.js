import Matrix from './Matrix';

class MLP {
    constructor(
        input,
        output,
        neurons,
        learningRate = 0.1,
        iterations = 100,
        mde = 0.1,
        layers = 2
    ) {
        this.inputsToHidden = new Matrix(neurons, input, 'RANDOM');
        this.biasInputsToHidden = new Matrix(neurons, 1, 'RANDOM');
        this.hiddenToOutputs = new Matrix(output, neurons, 'RANDOM');
        this.biasHiddenToOutputs = new Matrix(output, 1, 'RANDOM');
        this.lr = learningRate;
        this.it = iterations;
        this.mde = mde;
        this.activation = this.sigmoid;
        this.dActivation = this.dSigmoid;
    }

    predict(inputs) {
        let inputsMatrix = new Matrix(inputs.length, 1, inputs);
        let hidden = this.inputsToHidden.multiply(inputsMatrix);
        hidden.add(this.biasInputsToHidden);
        hidden.foreach(this.activation);
        let output = this.hiddenToOutputs.multiply(hidden);
        output.add(this.biasHiddenToOutputs);
        output.foreach(this.activation);
        return output;
    }

    train(inputs, labels) {
        this.shuffle(inputs, labels);
        let it = 0;
        let s = 0;
        while (it < this.it) {
            for (let i = 0; i < inputs.length; i++) {
                const input = new Matrix(inputs[i].length, 1, inputs[i]);
                const hidden = this.inputsToHidden.multiply(input);
                hidden.add(this.biasInputsToHidden);
                hidden.foreach(this.activation);

                const outputs = this.hiddenToOutputs.multiply(hidden);
                outputs.add(this.biasHiddenToOutputs);
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
                this.biasHiddenToOutputs.add(outputs);

                this.hiddenToOutputs.transpose();

                const hiddenErrors = this.hiddenToOutputs.multiply(
                    outputErrors
                );
                console.log(outputErrors);

                this.hiddenToOutputs.transpose();

                hidden.foreach(this.dActivation);
                hidden.elemWise(hiddenErrors);
                hidden.scalar(this.lr);

                input.transpose();

                const inputsToHiddenDeltas = hidden.multiply(input);

                this.inputsToHidden.add(inputsToHiddenDeltas);
                this.biasInputsToHidden.add(hidden);
            }
            it++;
            if (it % 100 === 0) console.log(Math.sqrt(s));
        }
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
