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
                            break;
                        case 'lyrics':
                            console.log('lyrics');
                            console.log(lines);
                            break;
                    } // switch

                } // drop
            }); // element.droppable
        } // link
    }; // return
}).
directive('lineSort', function ($compile) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.sortable({
                connectWith: ".lines",
                items: ".line",
                revert: true,
                cursor: "move",
                placeholder: "line-placeholder",
                forcePlaceholderSize: true,
                distance: 20,
                start:function(event, ui){
                    // set vars
                    var section = $(".composition .section").index(ui.item.parents('.section')),
                        index   = $(".composition .section:eq("+section+") .line").index(ui.item);
                    // store vars
                    ui.item.data("old_section", section);
                    ui.item.data("old_index", index);
                    ui.item.data("new_index", index);
                    ui.item.data("new_section", section)
                    ui.item.data("data", scope.composition.sections[section].lines[index]);
                    // console
                    // console.log(old_section);
                    // console.log(old_index);
                },
                change:function(elem, ui){
                    var cur_index = ui.item.data("new_index");
                    var section   = $(".composition .section").index(ui.placeholder.parents('.section')),
                        index     = $(".composition .section:eq("+section+") li").index(ui.placeholder),
                        index     = index < cur_index ? index : index - 1; // moving elements down needs to decrement index
                    ui.item.data("new_section", section);
                    ui.item.data("new_index", index);
                    // console
                    // console.log(section);
                    // console.log(index);
                },
                stop:function(event, ui){
                     // set vars
                    var new_section = ui.item.data("new_section"),
                        new_index   = ui.item.data("new_index"),
                        old_section = ui.item.data("old_section"),
                        old_index   = ui.item.data("old_index"),
                        data        = ui.item.data("data"); 
                    // Move elements
                    scope.composition.sections[old_section].lines.splice(old_index, 1);
                    scope.composition.sections[new_section].lines.splice(new_index, 0, data);
                    // Update Model
                    scope.$apply();
                    // console
                    // console.log(data);
                    // console.log(new_section);
                    // console.log(new_index);
                }
            }); // element.composort
        } // link
    }; // return
})
.directive('sectionSort', function ($compile) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.sortable({
                connectWith: ".section",
                items: ".section",
                handle: "h3",
                revert: true,
                cursor: "move",
                placeholder: "section-placeholder",
                forcePlaceholderSize: true,
                distance: 20,
                start: function (elem, ui) {
                    $("#trash").css("display", "block"); // show trash
                    var index = $(".composition > ul").index(ui.item);
                        ui.item.data("old_index", index);
                        ui.item.data("new_index", index);
                        ui.item.find(".lines").hide("fast");
                },
                change:function(elem, ui){
                    var cur_index = ui.item.data("new_index");
                    var index     = $(".composition > ul").index(ui.placeholder);
                        index     = index < cur_index ? index : index - 1; // moving elements down needs to decrement index
                        ui.item.data("new_index", index);
                },
                stop: function (elem, ui) {
                    $("#trash").css("display", "none"); // hide trash
                    var new_index = ui.item.data("new_index"), 
                        old_index = ui.item.data("old_index"); 
                        scope.composition.sections.move(old_index, new_index);
                        scope.$apply(function () { ui.item.find(".lines").show("fast") });

                } // stop
            }); // element.composort
        } // link
    }; // return
}); // songese.directives