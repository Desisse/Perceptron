// Función de activación
function activationFunction(y) {
    return y >= 0 ? 1 : -1;
}

// Entrenamiento del perceptrón
function trainPerceptron(inputs, outputs, learningRate = 0.1, epochs = 100) {
    // Inicializar pesos aleatorios y el umbral
    let weights = [];
    for (let i = 0; i < inputs[0].length; i++) {
        weights.push(Math.random());
    }
    let bias = Math.random();

    for (let epoch = 0; epoch < epochs; epoch++) {
        let totalError = 0;
        for (let i = 0; i < inputs.length; i++) {
            // Calcular la sumatoria y aplicar la función de activación
            let sum = 0;
            for (let j = 0; j < inputs[i].length; j++) {
                sum += inputs[i][j] * weights[j];
            }
            let y = activationFunction(sum + bias);

            // Calcular el error
            let error = outputs[i] - y;
            totalError += Math.abs(error);

            // Actualizar los pesos y el umbral si hay error
            if (error !== 0) {
                for (let j = 0; j < weights.length; j++) {
                    weights[j] += learningRate * error * inputs[i][j];
                }
                bias += learningRate * error;
            }
        }
        // Si no hay error, el entrenamiento se detiene
        if (totalError === 0) {
            break;
        }
    }
    return { weights, bias };
}

// Tabla de verdad para AND, OR y XOR
const truthTables = {
    "AND": {
        "inputs": [[1, 1], [1, -1], [-1, 1], [-1, -1]],
        "outputs": [1, -1, -1, -1]
    },
    "OR": {
        "inputs": [[1, 1], [1, -1], [-1, 1], [-1, -1]],
        "outputs": [1, 1, 1, -1]
    },
    "XOR": {
        "inputs": [[1, 1], [1, -1], [-1, 1], [-1, -1]],
        "outputs": [-1, 1, 1, -1]
    }
};

// Entrenar y mostrar resultados para AND, OR y XOR
for (let logicGate in truthTables) {
    console.log(`Perceptron entrenado para la logica: ${logicGate}`);
    const data = truthTables[logicGate];
    const { weights, bias } = trainPerceptron(data.inputs, data.outputs);
    
    console.log(`Pesos Finales: ${weights}`);
    console.log(`Final bias: ${bias}`);
    console.log("Resultados:");
    for (let i = 0; i < data.inputs.length; i++) {
        const inputs = data.inputs[i];
        let sum = 0;
        for (let j = 0; j < inputs.length; j++) {
            sum += inputs[j] * weights[j];
        }
        const y = activationFunction(sum + bias);
        console.log(`Entradas: ${inputs}, Salidas: ${y}`);
    }
    console.log("\n");
}
