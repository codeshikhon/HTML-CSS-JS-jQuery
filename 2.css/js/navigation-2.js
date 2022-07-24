(function () {

   const toggleBtn = document.querySelector('.site-header .menu-toggle');
   if (!toggleBtn) {
      return;
   }

   const mainNavigation = document.querySelector('.main-navigation');
   if (!mainNavigation) {
      return;
   }


   toggleBtn.addEventListener('click', function () {

      // mainNavigation.classList.toggle('toggled');

      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
         toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
         toggleBtn.setAttribute('aria-expanded', 'true');
      }

      menuSlideToggle(mainNavigation);
   });

   document.addEventListener('click', function (event) {
      const isClickInside = mainNavigation.contains(event.target) || toggleBtn.contains(event.target);
      if (!isClickInside) {
         // mainNavigation.classList.remove('toggled');
         menuSlideToggle(mainNavigation);
         toggleBtn.setAttribute('aria-expanded', 'false');
      }
   });

   const childLinks = mainNavigation.querySelectorAll('ul>li>a');
   for (link of childLinks) {
      link.addEventListener('touchstart', function (event) {
         event.preventDefault();

         const currentItem = this.parentNode;

         for (menuItem of currentItem.parentNode.children) {

            if (currentItem !== menuItem) {
               // link.classList.remove('focus');
               // console.log( link.querySelector('ul') );
               let subMenu = menuItem.querySelector('ul');
               if (subMenu) {
                  menuSlideUp(subMenu);
               }
            }
         }

         let subMenu = currentItem.querySelector('ul');
         if (subMenu) {
            menuSlideToggle(subMenu);
         }

         // menuItem.classList.toggle( 'focus' );
      });
   }



   function menuSlideToggle(target) {
      if (!target.classList.contains('toggled')) {

         target.classList.add('toggled');
         target.style.height = 'auto';

         var height = target.clientHeight + 'px';

         target.style.height = '0px';

         setTimeout(function () {
            target.style.height = height;
         }, 0);

      } else {

         target.style.height = '0px';

         target.addEventListener('transitionend', function () {
            target.classList.remove('toggled');
         }, {
            once: true
         });

      }
   }

}());