import { getData, storeData } from "./asyncStorage";
import { AUTH_KEY } from "./authentication";

const BASE_URL = "http://localhost:3000/api";
const FAVORITES_KEY = "@favoriteWords";


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

const getWords = async () => {
    try {
        const response = await fetch(`${BASE_URL}/words`);
        if (!response.ok) {
            throw new Error("Failed to fetch words");
        }
        const json = await response.json();
        const favIds = (await getData(FAVORITES_KEY)) || [];
        return (json.data || []).map((w) => {
            const id = String(w.id ?? w._id);
            return {
                ...w,
                id,
                favorite: favIds.includes(id),
            };
        });
    } catch (error) {
        console.error("Error fetching palabras:", error);
        throw error;
    }
};
const getWordById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/words/${id}`);
        if (!response.ok) {
            throw new Error("Palabra no encontrada");
        }
        const json = await response.json();
        const favIds = (await getData(FAVORITES_KEY)) || [];
        const w = json.data;
        const wordId = String(w?.id ?? w?._id ?? id);
        return {
            ...w,
            id: wordId,
            favorite: favIds.includes(wordId),
        };
    } catch (error) {
        console.error("Error fetching palabra:", error);
        throw error;
    }
};

const toggleFavorite = async (id) => {
    const wordId = String(id);
    const favIds = (await getData(FAVORITES_KEY)) || [];
    const exists = favIds.includes(wordId);
    const updated = exists
        ? favIds.filter((item) => item !== wordId)
        : [...favIds, wordId];
    await storeData(FAVORITES_KEY, updated);
    return !exists;
};

const addWord = async ({ word }) => {
    try {
        const authData = await getData(AUTH_KEY);
        const token = authData?.token;
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${BASE_URL}/words/ia`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                word,
            }),
        });
        const json = await response.json().catch(() => ({}));
        if (!response.ok) {
            console.error("Detalle error backend:", response.status, json);
            throw new Error(json.message || json.error || `Failed to create word (status ${response.status})`);
        }
        return json.data;
    } catch (error) {
        console.error("Error adding palabra:", error);
        throw error;
    }
};

const registerGameAttempt = async (palabraId, isCorrect) => {
    try {
        const authData = await getData(AUTH_KEY);
        const token = authData?.token;
        if (!token || !palabraId) return null;

        const response = await fetch(`${BASE_URL}/users/me/words/${palabraId}/game-attempt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ isCorrect }),
        });

        if (!response.ok) {
            throw new Error("Failed to register game attempt");
        }
        return await response.json();
    } catch (error) {
        console.error("Error registrando intento de juego:", error);
        return null;
    }
};

const getUserGameStats = async () => {
    try {
        const authData = await getData(AUTH_KEY);
        const userId = authData?.user?._id ?? authData?.user?.id;
        const token = authData?.token;
        if (!userId) return [];

        const headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/users/${userId}`, { headers });
        if (!response.ok) {
            throw new Error("Failed to fetch user stats");
        }
        const json = await response.json();
        return json.data?.gameStats || [];
    } catch (error) {
        console.error("Error obteniendo gameStats:", error);
        return [];
    }
};

export { getWords, getWordById, addWord, toggleFavorite, registerGameAttempt, getUserGameStats };