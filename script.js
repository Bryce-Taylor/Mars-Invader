const grid = document.querySelector('.grid')
let playerPostion = 190
let width = 15

for(let i = 0; i < 200; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

draw()

squares[playerPostion].classList.add('player')

function movePlayer(e) {
    squares[playerPostion].classList.remove('player')
    switch(e.key) {
      case 'KeyA':
        if (playerPostion % width !== 0) playerPostion -=1
        break
      case 'KeyD' :
        if (playerPostion % width < width -1) playerPostion +=1
        break
    }
    squares[playerPostion].classList.add('player')
}
document.addEventListener('Space', movePlayer)