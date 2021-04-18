#!/usr/bin/env node

const puppeteer=require("puppeteer");

let browser;
let page;
let code;
let language;

function handleLockButton(attr){
    return new Promise(function(resolve,reject){
        page.waitForSelector(attr,{visible:true}).then(function(){
           return page.click(attr); 
        }).then(function(){
            resolve();
        }).catch(function(){
            resolve();
        })
    }); 
}

function click(attr){
    return new Promise(function(resolve,reject){
        page.waitForSelector(attr,{visible:true}).then(function(){
           return Promise.all([
            page.waitForNavigation(),
            page.click(attr),
          ]); 
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    }); 
}

function pasteCode(){
    return new Promise(function(resolve,reject){
        page.waitForSelector("[type='checkbox']",{visible:true}).then(function(){
            return page.click("[type='checkbox']");
        }).then(function(){
            return page.waitForSelector("#input-1",{visible:true})
        }).then(function(){
            return page.type("#input-1",code);
        }).then(function(){
            return page.keyboard.down("Control")
        }).then(function(){
            return page.keyboard.press("A")
        }).then(function(){
            return page.keyboard.press("X")
        }).then(function(){
            return page.keyboard.up("Control")
        }).then(function(){
            return page.click(".css-1hwfws3")
        }).then(function(){
            return page.type(".css-1hwfws3",language)
        }).then(function(){
            return page.keyboard.press("Enter");
        }).then(function(){
            return page.click(".view-line");
        }).then(function(){
            return page.keyboard.down("Control")
        }).then(function(){
            return page.keyboard.press("A")
        }).then(function(){
            return page.keyboard.press("V")
        }).then(function(){
            return page.keyboard.up("Control")
        }).then(function(){
            page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
        }).then(function(){
            resolve();
        }).catch(function(){
            resolve();
        })
    })    
}

puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],
}).then(function(b){
    browser=b;
    return browser.pages();
}).then(function(pages){
    page=pages[0];
    return page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
}).then(function(){
    return page.type("[id=input-1]","miyenar449");
}).then(function(){
    return page.type("[id=input-2]","123456789");
}).then(function(){
    return click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled")
 }).then(function(){
    return click("[title='Interview Preparation Kit']")
}).then(function(){
     return click("[data-attr1='warmup']")
 }).then(function(){
    return click(".challenge-submit-btn")
}).then(function(){
    return click("[data-attr2='Editorial']")
}).then(function(){
    return handleLockButton(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
}).then(function(){
    return page.waitForSelector(".challenge-editorial-block.editorial-setter-code pre",{visible:true})
}).then(function(){
    return page.evaluate(function(){
        return document.querySelector(".challenge-editorial-block.editorial-setter-code pre").innerText;
    });
}).then(function(value){
    code=value;
    console.log(code)
    return page.evaluate(function(){
        return document.querySelector(".challenge-editorial-block.editorial-setter-code h3").innerText;
    });
}).then(function(value){
    language=value.trim();
    console.log(code)
    return click("[data-attr2='Problem']")
}).then(function(){
    return pasteCode()
}).then(function(){
    return click(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
}).catch(function(err){
     console.error(err);
 })