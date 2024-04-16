import { faker } from "@faker-js/faker";
import { Tour } from "./interface";

export const tour = () => ({
    name: createRandomTour().name,
    duration: createRandomTour().duration,
    maxGroupSize: createRandomTour().maxGroupSize,
    difficulty: createRandomTour().difficulty,
    price: createRandomTour().price,
    summary: createRandomTour().summary,
    description: createRandomTour().description,
    imageCover: createRandomTour().imageCover,
    images: createRandomTour().images,
    startLocation: {
        type: 'Point',
        coordinates:  createRandomTour().startLocation
    }
})


export function createRandomTour(): Tour {
    const arr = ['easy', 'medium', 'difficult']
    const randomElement = arr[Math.floor(Math.random() * arr.length)];

    return {
        name: faker.lorem.sentence(2),
        // slug?: string;
        duration: faker.number.int({min: 1, max: 14}),
        maxGroupSize: faker.number.int({min: 1, max: 15}),
        difficulty: randomElement,
        ratingAverage:faker.number.int({min: 10, max: 15}),
        ratingQuantity: faker.number.int({min: 1, max: 10}),
        price: faker.number.int({min: 50, max: 1000}),
        //price: faker.commerce.price({min: 50, max: 1000}),
        //priceDiscount?: number;
        summary: faker.lorem.sentence(10).trim(),
        description: faker.lorem.sentence({min: 5, max: 15}),
        imageCover: faker.lorem.sentence({min: 5, max: 15}),
        //images: createImages(),
        createdAt: faker.date.recent({days: 5}),
        startDates: faker.date.soon({days: 7}),
        //secretTour: boolean,
        //startLocation: faker.location.nearbyGPSCoordinate()
        startLocation:  [-74.005974, 40.712776]
        //guides: createGuides()
    }
}


// function difficulty (){
//     const index = Math.floor(Math.random() * 3) + 1;
//     return arr[index]
// }



// const createGuides = (numUsers = 5) => {
//     return Array.from({length: numUsers}, createGuides);
// }


// const createImages = (numImg = 5) => {
//     return Array.from({length: numImg}, createImages);
// }



export const tourWithOutName = {
    name: '',
    duration: createRandomTour().duration,
    maxGroupSize: createRandomTour().maxGroupSize,
    difficulty: createRandomTour().difficulty,
    price: createRandomTour().price,
    summary: createRandomTour().summary,
    description: createRandomTour().description,
    imageCover: createRandomTour().imageCover,
    images: createRandomTour().images,
    startLocation: {
        type: 'Point',
        coordinates:  createRandomTour().startLocation
    }
}


export const tourWithoutDuration = {
    name: createRandomTour().name,
    duration: null,
    maxGroupSize: createRandomTour().maxGroupSize,
    difficulty: createRandomTour().difficulty,
    price: createRandomTour().price,
    summary: createRandomTour().summary,
    description: createRandomTour().description,
    imageCover: createRandomTour().imageCover,
    images: createRandomTour().images,
    startLocation: {
        type: 'Point',
        coordinates:  createRandomTour().startLocation
    }
}
export const tourWithoutGroupSize = {
    name: createRandomTour().name,
    duration: createRandomTour().duration,
    maxGroupSize: null,
    difficulty: createRandomTour().difficulty,
    price: createRandomTour().price,
    summary: createRandomTour().summary,
    description: createRandomTour().description,
    imageCover: createRandomTour().imageCover,
    images: createRandomTour().images,
    startLocation: {
        type: 'Point',
        coordinates:  createRandomTour().startLocation
    }
}
export const tourWithoutDifficulty = {
    name: createRandomTour().name,
    duration: createRandomTour().duration,
    maxGroupSize: createRandomTour().maxGroupSize,
    difficulty: null,
    price: createRandomTour().price,
    summary: createRandomTour().summary,
    description: createRandomTour().description,
    imageCover: createRandomTour().imageCover,
    images: createRandomTour().images,
    startLocation: {
        type: 'Point',
        coordinates:  createRandomTour().startLocation
    }
}
