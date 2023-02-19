const container = document.querySelector('.container')
const usersContainer = document.querySelector('.users-container')
const todosContainer = document.querySelector('.todos-container')


const loader = document.createElement('div')
loader.textContent = 'Загрузка приложения...'
container.append(loader)
loader.style.width = '100%'
loader.style.height = '100vh'


// Render list
const genList = (todosList) => {
  todosContainer.textContent = ''
  const ul = document.createElement('ul')
  todosList.forEach(todo => {
    const li = document.createElement('li')
    li.textContent = todo.title

    if (todo.completed) {
      li.classList.add('completed')
    }
    ul.appendChild(li)
    })

  todosContainer.appendChild(ul)
}

// Render buttons and list
const buttonAndList = (users) => {
  users.forEach(singleUser => {
    const button = document.createElement('button')
    button.textContent = singleUser.id
    button.addEventListener('click', () => {
      fetch(`https://jsonplaceholder.typicode.com/users/${singleUser.id}/todos`)
        .then(response => response.json())
        .then(todosList => {
          genList(todosList)
        })
        .catch((error) => {
          secondaryError()      
        })
    })
    usersContainer.appendChild(button)
  });
}

// Body error message 
const mainError = () => {
  const mainError = document.querySelector('.error')
  mainError.classList.add('error')
  mainError.style.display = 'flex'
  mainError.style.alignItems = 'center'
  mainError.textContent = 'Произошла ошибка при попытке загрузить пользователей'

  usersContainer.style.display = 'none'
  todosContainer.style.display = 'none'
}


// List error message
const secondaryError = () => {
  const secondaryError = document.createElement('p')
  secondaryError.classList.add('error')
  secondaryError.style.display = 'flex'
  secondaryError.textContent = 'Произошла ошибка'
  todosContainer.append(secondaryError)  
}


// const getPostsPromise = () => {
//   fetch(`https://jsonplaceholder.typicode.com/users/`)
//     .then(response => response.json())
//     .then(users => {
//       buttonAndList(users)
//     })
//     .catch ((error) => {
//       mainError(error)
//     })
//     .finally(() => {
//       loader.remove()
//     })
// }
// getPostsPromise()







// Second Variant
async function getPostsAsync() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/")
    const users = await response.json()
    buttonAndList(users)
  } catch {
    mainError()
  } finally {
    loader.remove()
  }
}

getPostsAsync()