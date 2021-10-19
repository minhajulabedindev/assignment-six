const errorDiv = document.getElementById('error')
const searchResult = document.getElementById('show-result')
const totalFound = document.getElementById('found-result')

const loadInput = () => {
    // input area 
    const searchInput = document.getElementById('input-search')
    const searchText = searchInput.value
    searchInput.value = ''
    toggolSpiner('block')
    // error handle
    if (searchText === "") {
        totalFound.innerText = ""
        searchResult.innerHTML = ""
        toggolSpiner('none')
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }

    errorDiv.innerText = ""
    totalFound.innerText = ''
    searchResult.textContent = ""

    // search api 
    document.getElementById('found-result').innerText = ''
    const url = `https://openlibrary.org/search.json?q=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayLoad(data.docs))

}


// loading spining 
const toggolSpiner = displayStyle => {
    document.getElementById('spiner').style.display = displayStyle;
}


// data call and show result area 
const displayLoad = data => {

    // error handle
    if (data == "") {
        errorDiv.innerText = "NO Result Found";
        toggolSpiner('none')
        return;
    }
    else {
        errorDiv.innerText = "";
    }

    // loading spinner call
    toggolSpiner('none')

    const searchResult = document.getElementById('show-result')
    searchResult.textContent = ""
    totalFound.innerText = ` Search Result:  ${data.length}`;


    data?.forEach(books => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class='name'>
        <img class="img" src="${` https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`}" class="card-img-top" alt="...">
        <h3 > Book Name: ${books.title}</h3>
        <p>Author:${books.author_name}, published: ${books.first_publish_year} </p>
        </div>
        `
        searchResult.appendChild(div)
    })
}
