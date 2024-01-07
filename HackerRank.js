const puppeteer = require("puppeteer");

const loginlink = "https://www.hackerrank.com/auth/login";

let codeObj = require("./code")
const email = "zupeji@closetab.email";
const password = "Resrose@123";


(async function () {
    try {

        let browserOpen = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        });

        let newTab = await browserOpen.newPage();
        await newTab.goto(loginlink);
        await newTab.type("input[type='text']", email, { delay: 100 });
        await newTab.type("input[type='password']", password, { delay: 100 });
        await newTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled", { delay: 1000 });
        await waitandclick("div[data-automation='algorithms']", newTab);
        await waitandclick('input[value="warmup"]', newTab);
        let questionslist = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 1000 });
        await questionSolver(newTab, questionslist[0], codeObj.answers[0]);
    } catch (error) {
        console.log(error);
    }
})()


async function waitandclick(selector, cpage) {
    await cpage.waitForSelector(selector)
    await cpage.click(selector, { delay: 1000 })
};

async function questionSolver(page, question, answer) {
    question.click();
    await waitandclick(".checkBoxWrapper .ui-checkbox.theme-m .label-wrap .checkbox-wrap", page);
    await page.type('.input.text-area.custominput.auto-width', answer, { delay: 10 })
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 20 });
    await page.keyboard.press("X");
    await page.keyboard.up("Control");
    await waitandclick('div[data-mode-id]', page);
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");
    page.click('.hr-monaco-submit', { delay: 50 })
};
