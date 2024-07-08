class Neuron {
    constructor(inputLen, weights) {
        this.inputLen = inputLen;

        if (weights.length-1 !== inputLen) {
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
 
        return this.sigmoid(rawOut);
    }

    sigmoid(x) {
        return Math.pow(Math.E, x) / (1 + Math.pow(Math.E, x) );
    }
}