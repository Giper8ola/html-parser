import path from "path";
import * as fs from "fs";
import { JSDOM } from "jsdom";


export function getHtmlStrByFile(folderName: string) {
    const htmlFilePath = path.join(__dirname, `../tests/${folderName}/input.html`);

    function readHtmlFile(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('Error reading the HTML file:', error);
            return '';
        }
    }

    return  readHtmlFile(htmlFilePath);
}

export function getForWinInData(
    folderName: string,
    className: string
) {

    const html = getHtmlStrByFile(folderName)

    let {window} = new JSDOM(html);

    let objWithData = {
        name: '',
        outcome: '',
        ratio: ''
    }

    let fields =  window.document.querySelectorAll(`.${className}`);

    objWithData.name = fields[0].textContent?.trim()!
    objWithData.outcome = fields[1].textContent?.trim().substring(6, 11)!
    objWithData.ratio = fields[2].children[1].textContent?.trim()!

    return objWithData
}

export function getForForaGameData(
    folderName: string,
    className: string
) {
    const html = getHtmlStrByFile(folderName)

    let {window} = new JSDOM(html);

    let objWithData = {
        name: '',
        outcome: '',
        ratio: ''
    }

    let fields =  window.document.querySelectorAll(`.${className}`);

    objWithData.name = fields[0].children[1].textContent?.trim()!
    objWithData.outcome = fields[1].textContent?.trim().substring(6, 7)!
    objWithData.ratio = fields[2].children[1].textContent?.trim()!

    return objWithData;
}

export function getForTotalGameData(
    folderName: string,
    className: string
) {
    const html = getHtmlStrByFile(folderName)

    let {window} = new JSDOM(html);

    let objWithData = {
        name: '',
        outcome: '',
        ratio: ''
    }

    let fields =  window.document.querySelectorAll(`.${className}`);

    objWithData.name = fields[0].textContent?.trim()!
    objWithData.outcome = fields[1].children[1].textContent?.trim()!
    objWithData.ratio = fields[2].children[1].textContent?.trim()!

    return objWithData;
}


