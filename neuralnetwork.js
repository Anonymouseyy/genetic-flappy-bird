function sigmoid(x) {
    return Math.pow(Math.E, x) / (1 + Math.pow(Math.E, x));
}

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
}

class NeuralNetwork {
    constructor(inputLen, numHiddenNodes, hiddenWeights, outputWeights) {
        if (hiddenWeights.length != numHiddenNodes) { throw Error("Weights and hidden layer count inconsistent"); }
        if (inputLen+1 != hiddenWeights[0].length) { throw Error("Input length and weights count inconsistent"); }
        if (outputWeights[0].length != numHiddenNodes+1) { throw Error("Output node and its weights inconsistent"); }

        this.inputLen = inputLen;
        this.hiddenNodes = [];

        for (let i = 0; i < numHiddenNodes; i++) {
            this.hiddenNodes.push(new Neuron(inputLen, hiddenWeights[i]));
        }

        this.finalNodes = [new Neuron(numHiddenNodes, outputWeights[0]), new Neuron(numHiddenNodes, outputWeights[1])];
    }

    inference(inputs) {
        if (inputs.length != this.inputLen) {
            throw Error("Inputs and input length inconsistent");
        }
        
        let outs = [];
        for (let node of this.hiddenNodes) {
            outs.push(sigmoid(node.evaluate(inputs)));
        }

        return [sigmoid(this.finalNodes[0].evaluate(outs)), sigmoid(this.finalNodes[1].evaluate(outs))];
    }
}