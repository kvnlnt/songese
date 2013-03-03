'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('songese.services', []).value('version', '0.1');

// angular.module('ui.config', []).value('ui.config', {
//   sortable: {
//     connectWith: '.section',
//     items: ".phrase"
//   }
// });

// angular.module('ui.config', []).value('ui.config', {
//   sortable: {
//     connectWith: '.section',
//     items: ".phrase",
//     forcePlaceholderSize: true,
//     placeholder: "placeholder",
//     distance:20,
//     revert:false,
//     start:function(event, ui){
//       var old_section_index = $(".composition .section-wrapper").index($(ui.item).parent().parent());
//       var old_phrase_index  = $(".composition .section-wrapper:eq("+old_section_index+") .phrase").index(ui.item);
//       ui.item.data("old_section_index", old_section_index);
//       ui.item.data("old_phrase_index", old_phrase_index);
//       ui.item.data("type", "phrase");
//       $("#trash").css("display","block");
//     },
//     stop:function(event, ui){
//       var new_section_index = $(".composition .section-wrapper").index($(ui.item).parent().parent());
//       var new_phrase_index  = $(".composition .section-wrapper:eq("+new_section_index+") .phrase").index(ui.item);
//       ui.item.data("new_section_index", new_section_index);
//       ui.item.data("new_phrase_index", new_phrase_index);
//       ui.item.data("type", "phrase");
//       $("#trash").css("display","none");

//       // Detect if new phrase is being added
//       if(ui.item.hasClass('new_phrase')){  angular.element(ui.item).scope().composition.sections[new_section_index].phrases[new_phrase_index] = {phrase: 'new phrase'} };
//     },
//     sort: function() {
//       if ($(this).hasClass("cancel_sort")) {
//         return false;
//       }
//     }
//   }
// });
