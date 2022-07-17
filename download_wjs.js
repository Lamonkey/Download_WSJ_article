// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wsj.com/articles/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wsj.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let download=function(filename,text){
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    let extract_article = function(){
        let articles = []
        let paragraphs = document.getElementsByTagName("p");
        paragraphs.forEach(function(paragraph){
            if(paragraph.getAttribute("data-type") == 'paragraph'){
                articles.push(paragraph.textContent)
            }
        })
        return articles.join("\n")
    }
    //create download buttom
    let download_button = document.createElement("div")
    download_button.innerHTML = ('<input type="button" id="dwn-btn" class="class="TextResize__PopoverButtonText-sc-1pco9nu-3 eRvUOw" id="dwn-btn" value="Download"/>')
    download_button.innerHTML = '<div id="dwn-btn"><button id="headlessui-popover-button-7" aria-expanded="false" class="TextResize__Button-sc-1pco9nu-0 TextResize__PopoverButton-sc-1pco9nu-2 bvVnba cOZuzx" type="button"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"></svg><span class="TextResize__PopoverButtonText-sc-1pco9nu-3 eRvUOw">Download</span></button></div>'
    window.addEventListener('load', function() {
        //find a place for download buttom
        let all_buttons = document.getElementsByTagName("button")
        let text_button;
        all_buttons.forEach(function(button){
            if(button.textContent == "Text"){
                text_button = button
            }
        })
        //add the download buttom
        let wrapper = text_button.parentNode.parentNode
        wrapper.insertBefore(download_button,wrapper.childNodes[3])
        // Start file download.
        document.getElementById("dwn-btn").addEventListener("click", function(){
            // Generate download of hello.txt file with some content
            var text = extract_article()
            var filename = document.getElementsByTagName("h1")[0].textContent;

            download(filename, text);
        }, false);
    }, false);

})();