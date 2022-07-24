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
         menuSlideUp(mainNavigation);
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

   const menuSlideDown = (target, duration = 500) => {
      target.style.removeProperty('display');
      let display = window.getComputedStyle(target).display;

      if (display === 'none') {
         target.style.display = 'block';
      }

      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      let height = target.clientHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.clientHeight;
      
      target.style.height = height + 'px';
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
      }, duration);
   }

   let menuSlideUp = (target, duration = 500) => {
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.clientHeight + 'px';
      target.clientHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;

      window.setTimeout(() => {
         target.style.display = 'none';
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
      }, duration);
   }

   var menuSlideToggle = (target, duration = 500) => {
      if (window.getComputedStyle(target).display === 'none') {
        return menuSlideDown(target, duration);
      } else {
        return menuSlideUp(target, duration);
      }
    }

}());