(function () {
   const toggleBtn = document.querySelector('.site-header .menu-toggle');
   if (!toggleBtn) {
      return;
   }

   const mainNavigation = document.querySelector('.main-navigation');
   if (!mainNavigation) {
      return;
   }

   toggleBtn.addEventListener('click', () => {
      // if (getComputedStyle(mainNavigation).display === 'none') {
      //    mainNavigation.style.display = "block";
      // } else {
      //    mainNavigation.style.display = "none";
      // }
      mainNavigation.classList.toggle('toggled');

      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
         toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
         toggleBtn.setAttribute('aria-expanded', 'true');
      }
   });

   document.addEventListener('click', event => {
      const isClickInside = mainNavigation.contains(event.target) || toggleBtn.contains(event.target);
      if (!isClickInside) {
         // mainNavigation.style.display = "none";
         mainNavigation.classList.remove('toggled');
         toggleBtn.setAttribute('aria-expanded', 'false');
      }
   })

   const childLinks = mainNavigation.querySelectorAll('.menu-item-has-children>a');
   for (link of childLinks) {
      link.addEventListener('touchstart', event => {
         event.preventDefault();

         const subMenu = link.nextElementSibling;
         subMenu.classList.toggle('toggled');
         // if (getComputedStyle(subMenu).display === 'none') {
         //    subMenu.style.display = "block";
         // } else {
         //    subMenu.style.display = "none";
         // }

         let currentItem = link.parentNode;
         for (menuItem of currentItem.parentNode.children) {
            console.log(menuItem);
            if (currentItem !== menuItem) {
               let anySubMenu = menuItem.querySelector('ul');
               if (anySubMenu) {
                  anySubMenu.classList.remove('toggled');
               }
            }
         }

      })
   }
}());