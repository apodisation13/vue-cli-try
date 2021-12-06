function o_logic(f) {
    if (!make_move(f, 'O', 'O')) {  // проверяет нолики, но ставит тоже нолик!
        if (!make_move(f, 'X', 'O')) {
            
            for (let i = 0; i < f.length; i++) {
              if (!f[i]) {
                  f[i] = 'O'
                  return
              }
             
              
          }
        }
    }  

}


function make_move(f, p1, p2) {
    for (let i = 0; i < 7; i+=3) {  // строки
        if (f[i] == p1 && f[i+1] == p1 && !f[i+2]) {
            f[i+2] = p2
            alert(`походил в ${i} строку`)
            return true
        }
        else if (f[i+1] == p1 && f[i+2] == p1 && !f[i]) {
            f[i] = p2
            alert(`походил в ${i} строку`)
            return true
        }
        else if (f[i] == p1 && f[i+2] == p1 && !f[i+1]) {
            f[i+1] = p2
            alert(`походил в ${i} строку`)
            return true
        }     
    }

    for (let i = 0; i < 3; i++) {  // столбцы
        if (f[i] == p1 && f[i+3] == p1 && !f[i+6]) {
            f[i+6] = p2
            alert(`походил в ${i} столбец`)
            return true
        }
        else if (f[i] == p1 && f[i+6] == p1 && !f[i+3]) {
            f[i+3] = p2
            alert(`походил в ${i} столбец`)
            return true
        }
        else if (f[i+3] == p1 && f[i+6] == p1 && !f[i]) {
            f[i] = p2
            alert(`походил в ${i} столбец`)
            return true
        }     
    }

    // ДИАГОНАЛИ
    if (f[0] == p1 && f[4] == p1 && !f[8]) {
        f[8] = p2
        alert(`походил в гл диагональ`)
        return true
    }
    else if (f[0] == p1 && f[8] == p1 && !f[4]) {
        f[4] = p2
        alert(`походил в гл диагональ`)
        return true
    }
    else if (f[4] == p1 && f[8] == p1 && !f[0]) {
        f[0] = p2
        alert(`походил в гл диагональ`)
        return true
    }
    
    
    if (f[2] == p1 && f[4] == p1 && !f[6]) {
        f[6] = p2
        alert(`походил в 2 диагональ`)
        return true
    }
    else if (f[2] == p1 && f[6] == p1 && !f[4]) {
        f[4] = p2
        alert(`походил в 2 диагональ`)
        return true
    }
    else if (f[4] == p1 && f[6] == p1 && !f[2]) {
        f[2] = p2
        alert(`походил в 2 диагональ`)
        return true
    }  
    return false   
}


export {o_logic}
