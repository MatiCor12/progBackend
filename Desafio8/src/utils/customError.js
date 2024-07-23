export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorDictionary = {
    MISSING_TITLE: 'Title is required',
    MISSING_PRICE: 'The price is required',
    MISSING_DESCRIPTION: 'Description is required',
    MISSING_CATEGORY: 'Category is required'
};
