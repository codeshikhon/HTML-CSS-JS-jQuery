(function autoClicker() {
    let buttons = document.querySelectorAll('._58x3:not([style*="none"]) button');
    buttons.forEach(
        (button, i, buttonArray) => {
            setTimeout( function() {
                button.click();
                if( i === buttonArray.length - 1 ) {
                    window.scrollTo(0, document.body.clientHeight);
                    setTimeout(autoClicker, 2000);
                }
                
            }, 1500 * i );
        }
    );
})()