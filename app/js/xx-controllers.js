'use strict';

/* Controllers */
function CompositionCtrl($scope) {

    $scope.composition = {
        title: "Title",
        lines: [{ type: 'section', content: 'Verse'  },
                { type: 'lyrics',  content: 'Load up on guns, bring your friends' },
                { type: 'lyrics',  content: 'It\'s fun to lose and to pretend' },
                { type: 'lyrics',  content: 'She\'s overboard and self-assured'},
                { type: 'lyrics',  content: 'Oh, no, I know a dirty word'},
                { type: 'section', content: 'Pre-chorus'},
                { type: 'lyrics',  content: 'Hello, Hello, Hello, How Low (x3)'},
                { type: 'lyrics',  content: 'Hello, Hello, Hello'},
                { type: 'section', content: 'Chorus'},
                { type: 'lyrics',  content: 'With the lights out, it\'s less dangerous'},
                { type: 'lyrics',  content: 'Here we are now, entertain us'},
                { type: 'lyrics',  content: 'I feel stupid and contagious'},
                { type: 'lyrics',  content: 'Here we are now, entertain us'}]
    }
}

CompositionCtrl.$inject = ['$scope'];

function LyricsCtrl() {}
LyricsCtrl.$inject = [];

function ChordsCtrl() {}
ChordsCtrl.$inject = [];

function IdeasCtrl() {}
IdeasCtrl.$inject = [];