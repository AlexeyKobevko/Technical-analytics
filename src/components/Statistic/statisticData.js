export const statisticData = [
    {
        employees: 150,
        projects: 18,
        techItems: 90,
        resources: 75,
    }
];

export const enumerate = (num, data) => {
    if (num > 100) num = num % 100;
    if (num <= 20 && num >= 10) return data[2];
    if (num > 20) num = num % 10;
    return num === 1 ? data[0] : num > 1 && num < 5 ? data[1] : data[2];
};