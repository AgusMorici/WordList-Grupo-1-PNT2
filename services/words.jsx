const MAX_WORDS = 10;

const categorias = [
    {
        nombre: 'Business & Work',
        items: [
            { word: 'Deadline', translation: 'Fecha límite', definition: 'The latest time or date by which something should be completed.' },
            { word: 'Stakeholder', translation: 'Parte interesada', definition: 'A person with an interest or concern in a business or project.' },
            { word: 'Benchmark', translation: 'Punto de referencia', definition: 'A standard against which things may be compared.' },
            { word: 'Leverage', translation: 'Apalancamiento', definition: 'To use something to maximum advantage.' }
        ]
    },
    {
        nombre: 'Travel & Tourism',
        items: [
            { word: 'Itinerary', translation: 'Itinerario', definition: 'A planned route or journey of a trip.' },
            { word: 'Boarding pass', translation: 'Tarjeta de embarque', definition: 'A pass allowing a passenger to board an airplane.' },
            { word: 'Luggage', translation: 'Equipaje', definition: 'Bags and suitcases packed for traveling.' },
            { word: 'Layover', translation: 'Escala', definition: 'A period of waiting between two connecting flights.' }
        ]
    },
    {
        nombre: 'Academic & Study',
        items: [
            { word: 'Research', translation: 'Investigación', definition: 'Systematic investigation to establish facts.' },
            { word: 'Hypothesis', translation: 'Hipótesis', definition: 'A proposed explanation made as a starting point for further investigation.' },
            { word: 'Scholarship', translation: 'Beca', definition: 'A grant or payment made to support a student\'s education.' },
            { word: 'Syllabus', translation: 'Programa de estudios', definition: 'An outline of the subjects in a course of study.' }
        ]
    }
];

const crearPalabra = (index) => {
    const categoriaObj = categorias[index % categorias.length];
    const item = categoriaObj.items[index % categoriaObj.items.length];
    
    return {
        id: index + 1,
        word: item.word,
        translation: item.translation,
        definition: item.definition,
        category: categoriaObj.nombre,
        favorite: index % 3 === 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

const words = Array.from({ length: MAX_WORDS }, (_, index) => crearPalabra(index))

const getWords = () => {
    // TODO: Implementar la lógica para obtener las palabras desde una API.
    // Por ahora, devolvemos las palabras hardcodeadas.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(words)
        }, 1000)
    })
}
const getWordById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const palabra = words.find((w) => w.id === Number(id));
            if (palabra) {
                resolve(palabra);
            } else {
                reject(new Error('Palabra no encontrada'));
            }
        }, 500);
    });
};

export { getWords, getWordById };