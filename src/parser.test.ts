import {
    getForWinInData,
    getForForaGameData,
    getForTotalGameData
} from "./index";
import winInMatchOutput from '../tests/winInMatch/output.json'
import winInSetOutput from '../tests/winInSet/output.json'
import foraGameMatchOutput from '../tests/foraGameInMatch/output.json'
import foraGameSetOutput from '../tests/foraGameInSet/output.json'
import totalGameMatchOutput from '../tests/totalGameInMatch/output.json'
import totalGameSetOutput from '../tests/totalGameInSet/output.json'

describe('parserTests', () => {
    test("winInMatch data after parsing must have be like output", () => {
        let folderName = 'winInMatch';
        let className = 'group--hAXBT';
        const data = getForWinInData(folderName, className)

        expect(data.name).toBe(winInMatchOutput.name);
        expect(data.outcome).toBe(winInMatchOutput.outcome);
        expect(data.ratio).toBe(winInMatchOutput.ratio);
    })

    test("winInSet data after parsing must have be like output", () => {
        let folderName = 'winInSet';
        let className = 'group--hAXBT';
        const data = getForWinInData(folderName, className)

        expect(data.name).toBe(winInSetOutput.name);
        expect(data.outcome).toBe(winInSetOutput.outcome);
        expect(data.ratio).toBe(winInSetOutput.ratio);
    })

    test("foraGameInMatch data after parsing must have be like output", () => {
        let folderName = 'foraGameInMatch';
        let className = 'group--hAXBT';
        const data = getForForaGameData(folderName, className)

        expect(data.name).toBe(foraGameMatchOutput.name);
        expect(data.outcome).toBe(foraGameMatchOutput.outcome);
        expect(data.ratio).toBe(foraGameMatchOutput.ratio);
    })

    test("foraGameInSet data after parsing must have be like output", () => {
        let folderName = 'foraGameInSet';
        let className = 'group--hAXBT';
        const data = getForForaGameData(folderName, className)

        expect(data.name).toBe(foraGameSetOutput.name);
        expect(data.outcome).toBe(foraGameSetOutput.outcome);
        expect(data.ratio).toBe(foraGameSetOutput.ratio);
    })

    test("totalGameInMatch data after parsing must have be like output", () => {
        let folderName = 'totalGameInMatch';
        let className = 'group--hAXBT';
        const data = getForTotalGameData(folderName, className)

        expect(data.name).toBe(totalGameMatchOutput.name);
        expect(data.outcome).toBe(totalGameMatchOutput.outcome);
        expect(data.ratio).toBe(totalGameMatchOutput.ratio);
    })

    test("totalGameInSet data after parsing must have be like output", () => {
        let folderName = 'totalGameInSet';
        let className = 'group--hAXBT';
        const data = getForTotalGameData(folderName, className)

        expect(data.name).toBe(totalGameSetOutput.name);
        expect(data.outcome).toBe(totalGameSetOutput.outcome);
        expect(data.ratio).toBe(totalGameSetOutput.ratio);
    })
})
