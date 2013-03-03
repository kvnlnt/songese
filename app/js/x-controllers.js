'use strict';

/* Controllers */
function CompositionCtrl($scope) {

	$scope.composition = {
		title: 'The Raven',
		sections: [
		  { type: 'verse',
		    phrases: [
		      {phrase: 'Once upon a midnight dreary'},
		      {phrase: 'while I pondered weak and weary'},
		      {phrase: 'Over many a quaint and curious volume of forgotten lore'},
		      {phrase: 'While I nodded, nearly napping'}
		    ]
		  },
		  { type: 'chorus',
		    phrases: [
		      {phrase: 'suddenly there came a tapping'},
		      {phrase: 'suddenly there came a tapping'}
		    ]
		  },
		  { type: 'bridge',
		    phrases: [
		    {phrase: 'rapping at my chamber door.'}
		    ]
		  }
		],
		alternates: [
		  { type:'misc',
		    phrases:[]
		  }
		]
	}

	/* 
	 * Methods
	 */

	/* Empty Trash */
	$scope.emptyTrash = function(){
		var msg = confirm("Are you sure you'd like to delete all your scraps?");
		if(msg){
			$scope.composition.alternates = [{ type:'misc', phrases:[] }];
			return true;
		} else {
			return false;
		}
	}

	/* New Phrase */
	$( "#add_phrase" ).draggable({
		connectToSortable: ".section",
		helper: "clone",
		revert: false,
		opacity: 0.75,
		start:function(event, ui){
			ui.helper.removeClass('btn');
			ui.helper.addClass('dragging-new-phrase');
			ui.helper.html('phrase');
		},
		stop:function(event, ui){
			$(".section div.btn").remove();
		}
	});


	/* 
	 * Section Sorting
	 */
	$scope.section_sort_config = function(obj){
        return { 
          connectWith: ".section-wrapper",
          items: ".section-wrapper",
          placeholder: "placeholder",
          revert:false,
          start:function(event, ui){
            var old_section_index = $(".composition .section-wrapper").index(ui.item);
            ui.item.data("old_section_index", old_section_index);
            ui.item.data("type", "section");
            $("#trash").css("display","block");
          },
          stop:function(event, ui){
            var new_section_index = $(".composition .section-wrapper").index(ui.item);
            var old_section_index = ui.item.data("old_section_index");
            var sections = $scope.composition.sections;
            sections.move(old_section_index, new_section_index);
            $scope.$apply();
            $("#trash").css("display","none");
          }
        }
    } // section_config

    /* New Phrase */
	$( "#add_section" ).draggable({
		connectToSortable: ".section-wrapper",
		helper: "clone",
		revert: false,
		opacity: 0.75,
		start:function(event, ui){
			ui.helper.removeClass('btn');
			ui.helper.addClass('dragging-new-section');
			ui.helper.html('section');
		},
		stop:function(event, ui){
			//$(".composition .section-wrapper div.btn").remove();
		}
	});

    /*
     * Alternates
     */
    $scope.showAlternates = false;
    $scope.altcount = 0;
	$scope.showHideAlternates = function(){
		$scope.showAlternates = $scope.showAlternates == true ? false:true;
	}
	$scope.set_altcount = function(){
		var total = 0;
		for(var s = 0; s < $scope.composition.alternates.length; s++){
			total = total + $scope.composition.alternates[s].phrases.length;
		}
		$scope.altcount = total;
	};
	$scope.$watch('composition.alternates', function() {
		$scope.set_altcount();
	}, true);


}

CompositionCtrl.$inject = ['$scope'];

function LyricsCtrl() {}
LyricsCtrl.$inject = [];

function ChordsCtrl() {}
ChordsCtrl.$inject = [];

function IdeasCtrl() {}
IdeasCtrl.$inject = [];
