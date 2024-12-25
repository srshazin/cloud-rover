export function containsDynamicRoute(path: string) {
    const dynamicPattern = /\{[^}]+\}/g; // Matches text inside curly braces
    return dynamicPattern.test(path);
}