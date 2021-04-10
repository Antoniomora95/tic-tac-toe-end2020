function solution(S) {
    var occurrences = new Array(26);
    for (var i = 0; i < occurrences.length; i++) {
        occurrences[i] = 0;
    }
    // array is filled with zeros

    for (var id in S) {
        console.log(S.charCodeAt(id) - 'a'.charCodeAt(0));
        occurrences[S.charCodeAt(id) - 'a'.charCodeAt(0)]++;
    }
    console.log(occurrences); 
    // somehow the lines above will count the presence of each word --> initial = 'aaababbd' and store them in the occurrences array = [4, 3, 0, 1]
    var best_char = 'a';
    var best_res  = 0;

    for (var i = 0; i < 26; i++) {
        if (occurrences[i] > best_res ) {
            best_char = String.fromCharCode('a'.charCodeAt(0) + i);
            best_res  = occurrences[i];
        }
    }

    return best_char;
}
console.log(solution('heeellooo'))
//abcdefghijklmn

const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});

// Example
toObject(
    [
        { id: '1', name: 'Alpha', gender: 'Male' },
        { id: '2', name: 'Bravo', gender: 'Male' },
        { id: '3', name: 'Charlie', gender: 'Female' },
    ],
    'id'
);
/* 
{
    '1': { id: '1', name: 'Alpha', gender: 'Male' },
    '2': { id: '2', name: 'Bravo', gender: 'Male' },
    '3': { id: '3', name: 'Charlie', gender: 'Female' },
}
*/