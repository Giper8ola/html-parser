import path from "path";
import * as fs from "fs";
import { JSDOM } from "jsdom";

export function getHtmlStrByFile(fullPath: string) {

    function readHtmlFile(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('Ошибка чтения файла:', error);
            return '';
        }
    }

    return  readHtmlFile(fullPath);
}


export function readDirectoryRecursive(dir: string): any[] {
    const result: any[] = [];

    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subDirData = readDirectoryRecursive(fullPath);
                result.push({ name: path.basename(fullPath), contents: subDirData });
            } else {
                const fileName = path.basename(fullPath);
                switch (fileName) {
                    case 'input.html':
                        result.push({ type: 'html', html: getHtmlStrByFile(fullPath) });
                        break;
                    case 'output.json': {
                        const jonson = JSON.parse(getHtmlStrByFile(fullPath))
                        result.push({
                            type: 'json',
                            json: {
                                ...jonson,
                                outcome: JSON.stringify(jonson.outcome)
                            }
                        });
                        break;
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Ошибка чтения папки ${dir}:`, error);
    }

    return result;
}
function getValidCommandNames(
    str: string,
    state?: "fora" | string
): Record<string, string> {
    let strWithOutSet = (str.indexOf('сет') !== -1 ? str.substring(8) : str)
    let strNames: string[] = strWithOutSet.split(' – ');

    if (state &&  state === "fora") {
        strNames = strNames.map(el => {
            let indexOfBracket = el.indexOf('(')
            if( indexOfBracket === -1 )
                return el
            else {
                return el.substring(0, indexOfBracket - 1)
            }
        })
    }

    return {
        name1: strNames[0],
        name2: strNames[1]
    }
}

export const htmlParse = (html: string) => {
    let {window} = new JSDOM(html);

    let fields =  window.document.querySelectorAll('.group--hAXBT');

    let regexFora = /[+-]\d*\.?\d+/g;
    let regexTotal = /[<>] \d*\.?\d+/g;

    let commandNamesField = fields[0]?.textContent?.trim() as string
    let totalMiddleField = fields[1]?.textContent?.trim() as string

    let foraNameNumbers = commandNamesField?.match(regexFora)
    let totalSymbols = totalMiddleField?.match(regexTotal)

    const foraKeysLength = foraNameNumbers?.length
    const totalKeysLength = totalSymbols?.length

    let period: "match" | "set" =
        commandNamesField.indexOf('сет') === -1
            ? "match"
            : "set"

    const {name1, name2} = getValidCommandNames(
        commandNamesField,
        foraKeysLength || 0 ? "fora" : ""
    )

    let objWithData = {
        name1: name1,
        name2: name2,
        outcome: {},
        ratio: fields[2].children[1].textContent?.trim()
    }

    objWithData.outcome = {
        type: "win",
        player: fields[1].textContent?.trim().at(-1),
    }

    if(foraKeysLength || 0) {
        objWithData.outcome = {
            type: "fora",
            symbol: foraNameNumbers?.at(0)?.at(0),
            count: foraNameNumbers?.at(0)?.substring(1, foraNameNumbers?.at(0)?.length),
            player: fields[1].textContent?.trim().at(-1),
        }
    }

    if(totalKeysLength || 0) {
        objWithData.outcome = {
            type: "total",
            player: "0",
            over: totalSymbols?.at(0)?.at(0) === '>',
            count: totalSymbols?.at(0)?.substring(2,  totalSymbols?.at(0)?.length),
        }
    }

    Object.assign(objWithData.outcome,
        period === "set"
            ? {period: period, set: commandNamesField.at(0)}
            : {period: period}
    )

    return {
        ...objWithData,
        outcome: JSON.stringify(objWithData.outcome)
    }
}



