'use strict';

/* Controllers */
function CompositionCtrl($scope) {

    $scope.composition = {
        title: "Title",
        sections: [
            { 
                title: "verse 1",
                lines: [
                    { type: 'lyric', content: 'a1' },
                    { type: 'lyric', content: 'a2' }
                ]
            },
            { 
                title: "chorus",
                lines: [
                    { type: 'lyric', content: 'b1' },
                    { type: 'lyric', content: 'b2' }
                ]
            },
            { 
                title: "bridge",
                 lines: [
                    { type: 'lyric', content: 'c1' },
                    { type: 'lyric', content: 'c2' }
                ]
            }
        ]
    } // composition
}

CompositionCtrl.$inject = ['$scope'];

function LyricsCtrl() {}
LyricsCtrl.$inject = [];

function ChordsCtrl() {}
ChordsCtrl.$inject = [];

function IdeasCtrl() {}
IdeasCtrl.$inject = [];