import { faker } from '@faker-js/faker';

export const generateMockData = () => {
    const products = [];
    for (let i = 0; i < 50; i++) {
        products.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            image: faker.image.imageUrl()
        });
    }
    return products;
};
