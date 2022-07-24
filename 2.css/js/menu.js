(function () {
   // Return nothing if the button doesn't exist.
   const toggleBtn = document.querySelector('.site-header .menu-toggle');
   if( ! toggleBtn ) {
      return;
   }

   // Return nothing if the navigation doesn't exist.
   const mainNavigation = document.querySelector('.main-navigation');
   if( ! mainNavigation ) {
      return;
   }

   // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
   toggleBtn.addEventListener('click', () => {
      mainNavigation.classList.toggle('toggled');

      if( toggleBtn.getAttribute( 'aria-expanded' ) === 'true' ) {
         toggleBtn.setAttribute( 'aria-expanded', 'false' );
      } else {
         toggleBtn.setAttribute( 'aria-expanded', 'true' );
      }
   });

   // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
   document.addEventListener( 'click', event => {
      const isClickInside = mainNavigation.contains( event.target ) || toggleBtn.contains( event.target );
      if( ! isClickInside ) {
         mainNavigation.classList.remove('toggled');
         toggleBtn.setAttribute( 'aria-expanded', 'false' );
      }
   });

   // Toggle focus each time a menu link with children receive a touch event.
   const childLinks = mainNavigation.querySelectorAll( '.menu-item-has-children > a' );
   for( link of childLinks ) {
      link.addEventListener( 'touchstart', function(event) {
         event.preventDefault();

         const subMenu = this.nextElementSibling;
         subMenu.classList.toggle('toggled');

         const currentItem = this.parentNode;
         for( menuItem of currentItem.parentNode.children ) {
            if( currentItem !== menuItem ) {
               const anySubMenu = menuItem.querySelector('ul');
               if( anySubMenu ) {
                  anySubMenu.classList.remove( 'toggled' );
               }
            }
         }
      });
   }
}());