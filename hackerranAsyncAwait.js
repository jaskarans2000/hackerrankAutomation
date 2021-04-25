
const puppeteer=require("puppeteer");

let browser;
let page;
let code;
let language;

async function handleLockButton(attr){
    try{
       await page.waitForSelector(attr,{visible:true})
       await page.click(attr);
    }catch(err){
        console.error(err);
    }     
}

async function click(attr){
    try{
        await page.waitForSelector(attr,{visible:true})
        await Promise.all([
            page.waitForNavigation(),
            page.click(attr),
          ]);
    }catch(err){
        console.error(err);
    }
}

async function pasteCode(){
    try{
       await page.waitForSelector("[type='checkbox']",{visible:true})
       await page.click("[type='checkbox']");
       await page.waitForSelector("#input-1",{visible:true})
        await page.type("#input-1",code);
        await page.keyboard.down("Control")
        await page.keyboard.press("A")
        await page.keyboard.press("X")
        await page.keyboard.up("Control")
        await page.click(".css-1hwfws3")
        await page.type(".css-1hwfws3",language)
        await page.keyboard.press("Enter");
        await page.click(".view-line");
        await page.keyboard.down("Control")
        await page.keyboard.press("A")
        await page.keyboard.press("V")
        await page.keyboard.up("Control")
        await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
    }catch(err){
        console.error(err);
    }
}

async function automation(){
    try{
        browser= await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"],
        });
        let pages=await browser.pages();
        page=pages[0];
        await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await page.type("[id=input-1]","miyenar449",{delay:100});
        await page.type("[id=input-2]","123456789",{delay:100});
        await click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        await click("[title='Interview Preparation Kit']")
        await click("[data-attr1='warmup']")
        await click(".challenge-submit-btn")
        await click("[data-attr2='Editorial']")
        await handleLockButton(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
        await page.waitForSelector(".challenge-editorial-block.editorial-setter-code pre",{visible:true})
        code =await page.evaluate(function(){
            return document.querySelector(".challenge-editorial-block.editorial-setter-code pre").innerText;
        });
        language=await page.evaluate(function(){
            return document.querySelector(".challenge-editorial-block.editorial-setter-code h3").innerText;
        });
        await click("[data-attr2='Problem']")
        await pasteCode()
        await click(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");    
    }catch(err){
        console.error(err);
    }
   }

   automation();