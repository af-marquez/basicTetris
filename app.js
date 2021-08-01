document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector('.grid');
    //Makes squares an array
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startButton');
    const width = 10;

    //Pieces   --  each array represents one rotation
    const lPiece = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1 , width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zPiece = [
        [width*2, width*2+1, width+1, width +2],
        [0, width, width+1, width*2+1],
        [width*2,width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const tPiece = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oPiece = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iPiece = [
        [1, width+1, width*2+1, width*3+1], 
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]
    
    const pieces = [lPiece, zPiece, tPiece, oPiece, iPiece];

    let currentPosition = 4;
    let currentRotation = 0;

    //Randomly select a piece
    let random = Math.floor(Math.random() * pieces.length);
    //Pick a piece and it's 1º rotation
    let current = pieces[random][currentRotation];

    //draw the piece
    function draw() {
        //adds code to each index of  'current' variable
        current.forEach(index => {
            squares[currentPosition + index].classList.add('piece')
        })
    }

    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('piece')
        })
    }

    //make piece move down every second
    timerId = setInterval(moveDown, 1000);

    //assign functions to keycodes   --  e == event
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38){
            rotate();
        } else if (e.keyCode === 39){
            moveRight();
        } else if (e.keyCode === 40){
            //moveDown
        }
    }
    document.addEventListener('keyup', control);

    //move down function
    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function to stop when reach bottom of the grid
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition +index].classList.add('taken'));
            //start a new piece falling
            random = Math.floor(Math.random() * pieces.length);
            current = pieces[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    //move the piece left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current. some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) 
            currentPosition-= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1; //makes it appear that it didnt move
        }
        draw();
    }

    //move the piece right, unless is at the edge or there is a blockage
    function moveRight() {
        undraw();
        const isAtRightEdge = current. some(index => (currentPosition + index) % width === width-1); //width-1 == 9 ,18, 27 etc

        if(!isAtRightEdge) 
            currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1; //makes it appear that it didnt move
        }
        draw();
    }
    //rotate the piece
    function rotate() {
        undraw();
        currentRotation++;
        if(currentRotation === current.length){
            currentRotation = 0;  //go back to first rotation if reaches rotation 4
        }
        current = pieces[random][currentRotation];
        draw();
    }
})