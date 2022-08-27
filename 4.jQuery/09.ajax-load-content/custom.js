jQuery(function ($) {

   /* $('#menu a').click(function (e) {
      e.preventDefault();

      let link = $(this).attr('href');
      let currentLink = $(location).attr('pathname').replace('/', '');
      let content = $('#content');

      if (currentLink !== link) {
         $.ajax({
            url: link,

            beforeSend: function () {
               $(content).addClass('loading');
            },

            success: function (data) {
               let getTitle = $(data).filter('title').text();
               let getContent = $(data).find('#content').html();

               history.pushState(null, '', link);
               $('title').text(getTitle);
               $(content).html(getContent);
            },

            complete: function (xhr, status) {
               $(content).removeClass('loading');
            },

            error: function (xhr, status, error) {
               $(content).html(`<div class="not-found"><span>${xhr.status}</span> ${error}</div>`);
            }
         });
      }
   }); */















   $('#menu a').click(function (e) {
      e.preventDefault();

      let content = $('#content');
      let link = $(this).attr('href');
      let currentLink = $(location).attr('pathname').replace('/', '');

      if (currentLink !== link) {
         $.ajax({
            url: link,
            beforeSend: function () {
               $(content).addClass('loading');
            },

            success: function (data) {
               let getContent = $(data).find('#content').html();
               let getTitle = $(data).filter('title').text();

               window.history.pushState(null, '', link);
               $('title').text(getTitle);
               $(content).html(getContent);
            },

            complete: function () {
               $(content).removeClass('loading');
            },

            error: function (xhr, status, error) {
               $(content).html(`<div class="not-found"><span>${xhr.status}</span> ${error}</div>`);
            }
         });
      }

   });


});