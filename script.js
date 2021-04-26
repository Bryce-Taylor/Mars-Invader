const grid = document.querySelector('.grid')
let playerPostion = 200
let width = 16
let direction = 1
let enemiesRemoved = []
let enemyId
let goingRight = true;

for(let i = 0; i < 256; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

const coordinates = Array.from(document.querySelectorAll('.grid div'));

const enemies = [
    0,1,2,3,4,5,6,
    16,17,18,19,20,21,22,
    32,33,34,35,36,37,38,
    48,49,50,51,52,53,54
]
function draw(){
    for(let i = 0; i < enemies.length; i++){
        coordinates[enemies[i]].classList.add('invader');
    }
}

function remove(){
    for(let i = 0; i < enemies.length; i++){
        coordinates[enemies[i]].classList.remove('invader')
    }
}

coordinates[playerPostion].classList.add('player')

function movePlayer(e) {
    coordinates[playerPostion].classList.remove('player')
    switch(e.key) {
      case 'a':
        if (playerPostion % width !== 0) playerPostion -=1
        break
      case 'd' :
        if (playerPostion % width < width - 1) playerPostion +=1
        break
    }
    coordinates[playerPostion].classList.add('player')
}
document.addEventListener('keydown', movePlayer)

function moveInvaders() {
    const leftEdge = enemies[0] % width === 0
    const rightEdge = enemies[enemies.length -1] % width === width -1
    remove()
  
    if (rightEdge && goingRight) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i] += width -1 
        direction = -1
        goingRight = false
      }
    }
  
    if(leftEdge && !goingRight) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i] += width +1
        direction = 1
        goingRight = true
      }
    }
  
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += direction
    }
  
    draw()
}

enemyId = setInterval(moveInvaders, 300)




function laser(pew){
    let laserId
    let laserPostion = playerPostion
    function movingLaser(){
        coordinates[laserPostion].classList.remove('laser')
        laserPostion -= width 
        coordinates[laserPostion].classList.add('laser')

        if (coordinates[laserPostion].classList.contains('invader')){
            coordinates[laserPostion].classList.remove('laser')
            coordinates[laserPostion].classList.remove('invader')
            coordinates[laserPostion].classList.add('boom')

            setTimeout(()=> coordinates[laserPostion].classList.remove('boom'), 300)
            clearInterval(laserId)

            const enemyRemoved = enemies.indexOf(laserPostion)
            enemiesRemoved.push(enemyRemoved)
            results++
            resultsDisplay.innerHTML = results
            console.log(enemiesRemoved)
        } 
    }
    switch(pew.key){
        case 'w':
            laserId = setInterval(movingLaser, 100);
    }
}

document.addEventListener('keydown', laser)
