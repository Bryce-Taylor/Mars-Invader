const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let width = 15

for(let i = 0; i<225; i++){
    const square = document.createElement('div');
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

draw()

squares[currentShooterIndex].classList.add('player')

// function movePlayer(e) {
//     squares[currentShooterIndex].classList.remove('player')
//     switch(e.key) {
//       case 'KeyA':
//         if (currentShooterIndex % width !== 0) currentShooterIndex -=1
//         break
//       case 'KeyD' :
//         if (currentShooterIndex % width < width -1) currentShooterIndex +=1
//         break
//     }
//     squares[currentShooterIndex].classList.add('player')
// }
// document.addEventListener('keydown', movePlayer)