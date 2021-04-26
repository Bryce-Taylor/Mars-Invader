const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let playerPostion = 230
let width = 16
let enemiesRemoved = []
let results = 0


for(let i = 0; i < 256; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

const coordinates = Array.from(document.querySelectorAll('.grid div'));

const enemies = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
function draw(){
    for(let i = 0; i < enemies.length; i++){
        coordinates[enemies[i]].classList.add('invader');
    }
}


const squares = Array.from(document.querySelectorAll('.grid div'))

draw()

squares[playerPostion].classList.add('player')

function movePlayer(e) {
    squares[playerPostion].classList.remove('player')
    switch(e.key) {
      case 'a':
        if (playerPostion % width !== 0) playerPostion -=1
        break
      case 'd' :
        if (playerPostion % width < width -1) playerPostion +=1
        break
    }
    squares[playerPostion].classList.add('player')
}
document.addEventListener('keydown', movePlayer)


function laser(pew){
    let laserId
    let laserPostion = playerPostion
    function movingLaser(){
        squares[laserPostion].classList.remove('laser')
        laserPostion -= width 
        squares[laserPostion].classList.add('laser')

        if (squares[laserPostion].classList.contains('invader')){
            squares[laserPostion].classList.remove('laser')
            squares[laserPostion].classList.remove('invader')
            squares[laserPostion].classList.add('boom')

            setTimeout(()=> squares[laserPostion].classList.remove('boom'), 300)
            clearInterval(laserId)

            const enemyRemoved = enemies.indexOf(laserPostion)
            enemiesRemoved.push(enemyRemoved)
            results++
            resultsDisplay.innerHTML = results
        } 
    }
    switch(pew.key){
        case 'w':
            laserId = setInterval(movingLaser, 100);
    }
}

document.addEventListener('keydown', laser)