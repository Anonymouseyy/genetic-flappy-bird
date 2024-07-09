class Neuron {
    constructor(inputLen, weights) {
        this.inputLen = inputLen;

        if (weights.length-1 != inputLen) {
            throw Error("Invalid number of weights");
        }

        this.weights = weights;
    }

    evaluate(inputs) {
        if (inputs.length != this.inputLen) {
            throw Error("Invalid input size");
        }

        let rawOut = 0;
        for (let i = 0; i < this.inputLen; i++) {
            rawOut += inputs[i]*this.weights[i];
        }
        rawOut += this.weights[this.weights.length-1];
 
        return rawOut;
    }

    sigmoid(x) {
        return Math.pow(Math.E, x) / (1 + Math.pow(Math.E, x));
    }

    step(x) {
        if (x > 0) {
            return 1;
        }
        return 0;
    }
}

class NeuralNetwork {
    constructor(inputLen, hiddenNodes, hiddenWeights, outputWeights) {
        if (hiddenWeights.length != hiddenNodes) { throw Error("Weights and hidden layer count inconsistent"); }
        if (inputLen+1 != hiddenWeights[0].length) { throw Error("Input length and weights count inconsistent"); }
        if (outputWeights.length != hiddenNodes+1) { throw Error("Output node and its weights inconsistent"); }
    }
}