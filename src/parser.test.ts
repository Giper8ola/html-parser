import {htmlParse, readDirectoryRecursive} from "./index";
import path from "path";

describe('parserTests' ,  () => {
    const startDir = path.join(__dirname, `../tests`);
    const data: any[] = readDirectoryRecursive(startDir);

    test.each(
        data.map(({ name, contents }) => [name, contents])
    )('%s data after parsing must have be like output', (name, contents) => {
        let parsedData = htmlParse(contents[0].html)
        let json = contents[1].json;

        expect(parsedData.name1).toBe(json.name1);
        expect(parsedData.name2).toBe(json.name2);
        expect(parsedData.outcome).toBe(json.outcome);
        expect(parsedData.ratio).toBe(json.ratio);
    })
})

