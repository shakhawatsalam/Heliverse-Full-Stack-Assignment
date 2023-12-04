"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// keys = ['page', 'limit', 'sortBy', 'sortOrder']
// obj = { page: '1', limit: '1', sortBy: '2', sortOrder: '1' } siting notation . notation access object
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]; // Accessint thi value (page) => Ans: 1 value
        }
    }
    return finalObj;
};
exports.default = pick;
