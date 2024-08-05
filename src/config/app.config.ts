import { readFileSync } from 'fs';
// __dirname
export default () => JSON.parse(readFileSync('/home/developers/food-app/app.json').toString());
