'use strict';

// Usage: <div droppable></div>
angular.module('songese.directives', []).
directive('droppable', function ($compile) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.droppable({
                hoverClass: 'hover',
                accept: '.line',
                tolerance: 'pointer',
                drop: function (event, ui) {
                    var dragIndex = angular.element(ui.draggable).data('index'),
                        reject    = angular.element(ui.draggable).data('reject'),
                        dragEl    = angular.element(ui.draggable).parent(),
                        dropEl    = angular.element(this),
                        type      = ui.draggable.data("type"),
                        old_index = ui.draggable.data("old_index"),
                        lines     = ui.draggable.data("lines");

                    switch (type) {
                        case 'section':
                            console.log('section');
                            console.log(lines);
                            // var section = scope.composition.lines.splice(old_index, 1)[0];
                            // if (section.phrases.length >= 1) {
                            //     scope.composition.alternates.push(section)
                            // } else {
                            //     alert(section.type + " section empty...removing it");
                            // };
                            // scope.$apply();
                            break;
                        case 'lyrics':
                            console.log('lyrics');
                            console.log(lines);
                            // var phrase = scope.composition.sections[old_section_index].phrases.splice(old_phrase_index, 1)[0].phrase;
                            // scope.composition.alternates[0].phrases.push({
                            //     phrase: phrase
                            // });
                            // scope.$apply();
                            break;
                    } // switch

                } // drop
            }); // element.droppable
        } // link
    }; // return
}).
directive('compsort', function ($compile) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.sortable({
                connectWith: ".line",
                revert: true,
                cursor: "move",
                placeholder: "placeholder",
                forcePlaceholderSize: true,
                distance: 20,
                start: function (elem, ui) {

                    // Element
                    $("#trash").css("display", "block");
                    var old_index = $(".composition .line").index(ui.item),
                        type      = angular.element(ui.item).scope().line.type,
                        lines     = []; // line indexes
                    
                    lines.push($('.line').index(ui.item));      // Add element to lines array

                    // Sections
                    if (ui.item.hasClass('section')) {
                        var n = ui.placeholder.next('.lyrics'); // find next child
                        while (n.length > 0) {                  // while has more
                            lines.push($('.line').index(n));    // attach
                            //n.hide("fast");                     // hide
                            n = n.next('.lyrics');              // find next
                        }
                    } 

                    // Store data
                    ui.item.data("lines", lines);
                    ui.item.data("old_index", old_index);
                    ui.item.data("type", type);

                },
                change: function (elem, ui) {
                    if(ui.item.data("new_index") == 'undefined'){
                         ui.item.data("new_index", 0);
                    };
                    var new_index = $(".composition li").index($('.placeholder'));
                    if (new_index > ui.item.data("new_index")){
                        new_index -= 1;
                    };
                    ui.item.data("new_index", new_index);
                    console.log(new_index);
                },
                stop: function (elem, ui) {

                    // Vars
                    var new_index = ui.item.data("new_index"),
                        old_index = ui.item.data("old_index"),
                        lines     = ui.item.data("lines");

                    // Sections
                    if (ui.item.hasClass('section')) {
                        scope.composition.lines.splice(new_index, 0, scope.composition.lines.splice(old_index, lines.length)); // move range of elements in array
                        scope.composition.lines = Array.prototype.concat.apply([], scope.composition.lines); // Flatten array : !important!
                    } else {
                        if (ui.item.prevAll(".section").length == 0) {
                            $(".composition").sortable("cancel");
                            return false;
                        } else {
                            scope.composition.lines.move(old_index, new_index);
                        }
                    }

                    // Apply update
                    scope.$apply(function () {  $(".composition .line").show() });

                    // Trash
                    $("#trash").css("display", "none");

                } // stop
            }); // element.composort
        } // link
    }; // return
}); // songese.directives