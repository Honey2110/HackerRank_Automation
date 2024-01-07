const puppeteer = require("puppeteer");

const loginlink = "https://www.hackerrank.com/auth/login";

let codeObj = require("./code")
const email = "zupeji@closetab.email";
const password = "Resrose@123";

let browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null
});

let page;

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab;
    let hackerrankloginpage = newTab.goto(loginlink);
    return hackerrankloginpage;
}).then(function () {
    let emailisEntered = page.type("input[type='text']", email, { delay: 100 });
    return emailisEntered;
}).then(function () {
    let passwordisEntered = page.type("input[type='password']", password, { delay: 100 });
    return passwordisEntered;
}).then(function () {
    let loginbtnclick = page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled", { delay: 1000 });
    return loginbtnclick;
}).then(function () {
    let clickonAlgo = waitandclick("div[data-automation='algorithms']", page)
    return clickonAlgo;
}).then(function () {
    let waitforwarnup = waitandclick('input[value="warmup"]', page);
    return waitforwarnup;
}).then(function () {
    let waitforsometime = page.waitForTimeout(5000)
    return waitforsometime;
}).then(function () {
    let allquestionsinthatpage = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 1000 });
    return allquestionsinthatpage;
}).then(function (questionsArr) {
    // console.log(questionsArr.length, "No. of questions");
    let questionwillbeSolved = questionSolver(questionsArr[0], page, codeObj.answers[0]);
    return questionwillbeSolved;
})


function waitandclick(selector, cpage) {
    return new Promise(function (resolve, reject) {
        let waitformodelpromise = cpage.waitForSelector(selector, { delay: 1000 })
        waitformodelpromise.then(function () {
            let clickModel = cpage.click(selector)
            return clickModel
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
};

function questionSolver(question, page, answer) {
    return new Promise(function (resolve, reject) {
        let questionwillbeclick = question.click();
        questionwillbeclick.then(function () {
            let EditorInFocus = waitandclick('.monaco-scrollable-element.editor-scrollable.vs', page)
            return EditorInFocus;
        }).then(function () {
            return waitandclick('input[type="checkbox"]', page);
        }).then(function () {
            return page.waitForSelector('textarea[id="input-1"]', page);
        }).then(function () {
            return page.type('textarea[id="input-1"]', answer, { delay: 20 });
        }).then(function () {
            let Ctrlispressed = page.keyboard.down("Control");
            return Ctrlispressed;
        }).then(function () {
            let Aispressed = page.keyboard.press("A", { delay: 500 });
            return Aispressed;
        }).then(function () {
            let Xispressed = page.keyboard.press("X", { delay: 500 });
            return Xispressed;
        }).then(function () {
            let CtrlisUnpressed = page.keyboard.up("Control");
            return CtrlisUnpressed;
        }).then(function () {
            let MainEditorinfocus = waitandclick('.monaco-scrollable-element.editor-scrollable.vs', page);
            return MainEditorinfocus;
        }).then(function () {
            let Ctrlispressed = page.keyboard.down("Control");
            return Ctrlispressed;
        }).then(function () {
            let Aispressed = page.keyboard.press("A", { delay: 500 });
            return Aispressed;
        }).then(function () {
            let Vispressed = page.keyboard.press("V", { delay: 500 });
            return Vispressed;
        }).then(function () {
            let Ctrlisunpressed = page.keyboard.up("Control");
            return Ctrlisunpressed;
        }).then(function () {
            return page.click('.hr-monaco-submit',{delay:50})
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    });
}