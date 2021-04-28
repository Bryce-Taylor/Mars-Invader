const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results') 
let playerPostion = 200
let width = 16
let direction = 1
let enemiesRemoved = []
let enemyId
let goingRight = true;
let results = 0

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
      if(!enemiesRemoved.includes(i)){
        coordinates[enemies[i]].classList.add('invader');
    }
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

    if (coordinates[playerPostion].classList.contains('invader', 'player')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(enemyId)
      coordinates[playerPostion].classList.remove('player');
    }
  
    for (let i = 0; i < enemies.length; i++) {
      if(enemies[i] > (coordinates.length)) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(enemyId) 
      }
    }
    if (enemiesRemoved.length === enemies.length) {
      resultsDisplay.innerHTML = 'YOU WIN'
      clearInterval(enemyId)
      
    }
}

enemyId = setInterval(moveInvaders, 150)



function singleLaser(pew){
  let laserId
  let laserPostion = playerPostion
  function movingSingleLaser(){
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
          laserId = setInterval(movingSingleLaser, 100);
  }
}
document.addEventListener('keydown', singleLaser)


function leftLaser(pew){
    let laserLeftId
    let laserPostion = playerPostion
    function movingLeftLaser(){
        coordinates[laserPostion-1].classList.remove('laser')
        laserPostion -= width 
        coordinates[laserPostion-1].classList.add('laser')

        if (coordinates[laserPostion-1].classList.contains('invader')){
            coordinates[laserPostion-1].classList.remove('laser')
            coordinates[laserPostion-1].classList.remove('invader')
            coordinates[laserPostion-1].classList.add('boom')

            setTimeout(()=> coordinates[laserPostion-1].classList.remove('boom'), 300)
            clearInterval(laserLeftId)

            const enemyRemoved = enemies.indexOf(laserPostion-1)
            enemiesRemoved.push(enemyRemoved)
            results++
            resultsDisplay.innerHTML = results
            console.log(enemiesRemoved)
        } 
    }
    switch(pew.key){
        case 'q':
            laserLeftId = setInterval(movingLeftLaser, 100);
    }
}

document.addEventListener('keydown', leftLaser)

function middleLaser(pew){
  let laserMiddleId
  let laserPostion = playerPostion
  function movingMiddleLaser(){
      coordinates[laserPostion].classList.remove('laser')
      laserPostion -= width 
      coordinates[laserPostion].classList.add('laser')

      if (coordinates[laserPostion].classList.contains('invader')){
          coordinates[laserPostion].classList.remove('laser')
          coordinates[laserPostion].classList.remove('invader')
          coordinates[laserPostion].classList.add('boom')

          setTimeout(()=> coordinates[laserPostion].classList.remove('boom'), 300)
          clearInterval(laserMiddleId)

          const enemyRemoved = enemies.indexOf(laserPostion)
          enemiesRemoved.push(enemyRemoved)
          results++
          resultsDisplay.innerHTML = results
          console.log(enemiesRemoved)
      } 
  }
  switch(pew.key){
      case 'q':
          laserMiddleId = setInterval(movingMiddleLaser, 100);
  }
}
document.addEventListener('keydown', middleLaser)

function rightLaser(pew){
  let laserRightId
  let laserPostion = playerPostion
  function movingRightLaser(){
      coordinates[laserPostion+1].classList.remove('laser')
      laserPostion -= width 
      coordinates[laserPostion+1].classList.add('laser')

      if (coordinates[laserPostion+1].classList.contains('invader')){
          coordinates[laserPostion+1].classList.remove('laser')
          coordinates[laserPostion+1].classList.remove('invader')
          coordinates[laserPostion+1].classList.add('boom')

          setTimeout(()=> coordinates[laserPostion+1].classList.remove('boom'), 300)
          clearInterval(laserRightId)

          const enemyRemoved = enemies.indexOf(laserPostion+1)
          enemiesRemoved.push(enemyRemoved)
          results++
          resultsDisplay.innerHTML = results
          console.log(enemiesRemoved)
      } 
  }
  switch(pew.key){
      case 'q':
          laserRightId = setInterval(movingRightLaser, 100);
  }
}
document.addEventListener('keydown', rightLaser)


// switch(pew.key){
//   case 'e':
//     let rocketPosition = playerPostion
//     function rocket(){
//       weapon = "rocket"
//       movingLaser()
//     }
//     laserId = setInterval(rocket, 100);
// }
// }

// document.addEventListener('keydown', laser)


// const leftEnemyRemoved = enemies.indexOf(laserPostion-1)
// const middleEnemyRemoved = enemies.indexOf(laserPostion)
// const rightEnemyRemoved = enemies.indexOf(laserPostion+1)
// enemiesRemoved.push(leftEnemyRemoved)
// enemiesRemoved.push(middleEnemyRemoved)
// enemiesRemoved.push(rightEnemyRemoved)