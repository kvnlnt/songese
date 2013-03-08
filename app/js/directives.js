'use strict';

angular.module('songese.directives', []).
directive('contenteditable', function() {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			
			// get key, key events fire before content is updated
			// therefore, to use the input event correctly, we
			// need the keycode
			elem.bind('keydown click', function(event) {
				scope.key = event.keyCode;
				getTheCaret(scope, "composition"); // !important
				console.log("node=" + scope.node + " ichar=" + scope.ichar + " key=" + scope.key);
			});

			elem.bind('keyup', function(event){
				var isBackspace = scope.key == 8 ? true : false,
					elem        = $("#composition"),
					isEmpty     = elem.html().match(empty),
					delkeyevent = jQuery.Event("keydown", { keyCode: 8 });
				if(isBackspace && Boolean(isEmpty)){
					// TODO: find out where the previous node is
					//$("#composition").html(colorize(elem.html()));
					//$("#composition").trigger( delkeyevent );
					$("#composition").html(colorize(elem.html()));
					setTheCaret(scope, "composition", scope.node + 2, 0);
					console.log("fix it");
				}
			});

			// colorize if needed
			elem.bind('input', function(event){
				var isSpace = scope.key == 32 ? true : false,
					elem    = $("#composition");
				// if space, colorize
				if(isSpace){
					var caret     = null,
						hasChord  = elem.html().match(chords);
					if(Boolean(hasChord)){
						setTimeout(function(){
							$("#composition").html(colorize(elem.html()));
							// Check if this new node has a next node, 
							// if not create it and advance cursor 
							// two nodes at position 0
							var obj  = document.getElementById("composition"),
								node = document.createTextNode('');
							obj.appendChild(node);
							setTheCaret(scope, "composition", scope.node + 2, 1);
						}, 50);
					}
				}
			})
		} // link
	}; // return
}); // module