function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {                             
    const ifrs = dom.getElementsByTagName("iframe");
    const frs = dom.getElementsByTagName("frame");
    /**
     * 重用代码合并
     * 增加浏览器兼容性
     */
    const htmlCollection = [...ifrs, ...frs];
    if(!htmlCollection.length) {
        return dom.querySelector('body').outerHTML
    }
    htmlCollection.forEach( (htmlSingle)=>{
        let y = htmlSingle.contentWindow || htmlSingle.contentDocument
        if(y === htmlSingle.contentWindow) {
            dom = htmlSingle.contentWindow.document;
            iframeContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }else {
            dom = htmlSingle.contentDocument.body.parentElement;
            frameContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }
    } )
    
    return dom.getElementsByTagName('html')[0].innerHTML + iframeContent + frameContent  
}