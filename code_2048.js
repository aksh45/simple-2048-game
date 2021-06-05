const prompt = require('prompt-sync')();

const n = 4;
const target = 2048;

var grid = [];
var used_elems = [];
var allowed_nums = [2,4];
var result;
var change;
for(var row=0; row<n; row++){
    var tmp = [];
    for(var coloumn = 0; coloumn <n ; coloumn++){
        tmp.push(0);
        
    }
    grid.push(tmp);
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function add_random_number(){
    var r = getRndInteger(0,4);
    var c = getRndInteger(0,4);
    while(grid[r][c] != 0){
        r = getRndInteger(0,4);
        c = getRndInteger(0,4);

    }
    grid[r][c] = allowed_nums[getRndInteger(0,2)];
}
function compress(grid){
    var changed = false;
    var tmp_grid = [];
    var pos;
    for(var row=0; row<n; row++){
        var tmp = [];
        for(var coloumn = 0; coloumn <n ; coloumn++){
            tmp.push(0);
            
        }
        tmp_grid.push(tmp);
    }
    for(var row = 0; row < n; row++){
        pos = 0;
        for(var col = 0; col < n; col++){
            if(grid[row][col] != 0){
                tmp_grid[row][pos] = grid[row][col];
                if(col != pos)
                    changed = true;
                pos++;
            }
        }

    }
    return  [tmp_grid, changed];

}

function merge(grid){
    var changed = false;
    for(var row = 0; row<n; row++){
        for(var col = 0; col<n-1; col++){
            if(grid[row][col] == grid[row][col + 1] && grid[row][col] != 0){
                grid[row][col] = grid[row][col] * 2;
                grid[row][col + 1] = 0;
                changed = true;
            }
        }
    }
    return [grid,changed];
}

function reverse(grid){
    var new_grid =[];
    for(var row = 0; row<n; row++){
        new_grid.push([]);
        for(var coloumn = 0; coloumn < n; coloumn++){
            new_grid[row].push(grid[row][n - coloumn -1]);
        }
    }
    return new_grid;
}
function transpose(grid){
    var new_grid = [];
    for(var row = 0; row<n; row++){
        new_grid.push([]);
        for(var coloumn =0; coloumn < n; coloumn++){
            new_grid[row].push(grid[coloumn][row]);
        }
    }
    return new_grid;
}
function move_left(grid){
    var res = compress(grid);
    var new_grid = res[0];
    var changed1 = res[1];
    res = merge(new_grid);
    new_grid = res[0];
    var changed2 = res[1];
    var change = changed1 || changed2;
    new_grid = compress(new_grid);
    return [new_grid[0],change];

}

function move_right(grid){
    var new_grid = reverse(grid);
    var res = move_left(new_grid);
    return [reverse(res[0]),res[1]];


}
function move_up(grid){
    var  new_grid = transpose(grid);
    var res = move_left(new_grid);
    return [transpose(res[0]),res[1]];
}

function move_down(grid){
    var new_grid = transpose(grid);
    var res = move_right(new_grid);
    return [transpose(res[0]),res[1]];
}

function get_current_state(grid){
    for(var row = 0; row < n; row++){
        for(var coloumn = 0; coloumn <n; coloumn++){
            if(grid[row][coloumn] == target){
                return 1;

            }
        }
    }
    for(var row = 0; row < n; row++){
        for(var coloumn = 0; coloumn <n; coloumn++){
            if(grid[row][coloumn]== 0){
                return 0;
            }
        }
    }
    for(var row = 0; row < n-1; row++){
        for(var coloumn = 0; coloumn <n-1; coloumn++){
            if(grid[row][coloumn] == grid[row + 1][coloumn] || grid[row][coloumn] == grid[row][coloumn + 1]){
                return 0;
            }
        }
    }
    for(var coloumn = 0; coloumn < n-1; coloumn++){
        if(grid[n-1][coloumn] == grid[n-1][coloumn + 1])
            return 0;
    }
    for(var row = 0; row < n-1; row++){
        if(grid[row][n-1]== mat[row + 1][n-1])
            return 0;
        
    }
    return -1;
}
function move_validator(move){
    if (move == 1 || move == 2 || move == 3 || move == 4){
        return 1;
    }
    return 0
}
function grid_print(grid){
    var res = '';
    for(var row = 0;row<n;row++){
        console.log(...grid[row]);
    }
}
add_random_number();
add_random_number();
grid_print(grid);
while(1){
    var move = prompt('Enter Your move');
    var counter = 0;
    while (!(move_validator(move))){
        if (move == 0){
            counter = 1; 
            break;
        }
        var move = prompt(' please enter a valid move ');
    }
    if(counter){
        break;
    }
    if(move == 1){
        result = move_left(grid);
        grid = result[0];
        change = result[1];
    }
    else if(move == 2){
        result = move_right(grid);
        grid = result[0];
        change = result[1];
    }
    else if(move == 3){
        result = move_up(grid);
        grid = result[0];
        change = result[1];
    }
    else if(move == 4){
        result = move_down(grid);
        grid = result[0];
        change = result[1];
    }
    var status = get_current_state(grid);
    if (status == 0 && change){
        add_random_number();
    }
    else if (status == 0 && !(change)){
        grid_print(grid);
        continue;
    }
    else if(status == 1){
        console.log('You won');
        break;
    }
    else{
        console.log('You loose');
        break;
    }
    grid_print(grid);

}
