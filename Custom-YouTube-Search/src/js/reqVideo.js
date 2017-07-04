export     function viewResult(item, number, resultDiv) {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC2qipgU3Gn-sNtBlXnmn4QvXD4STOJL3U&id=${item.id.videoId}&part=snippet,statistics`;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            const figure = document.createElement('figure');
            const urlYoutube = `https://www.youtube.com/watch?v=${item.id.videoId}`;
            figure.innerHTML = `<a href=${urlYoutube} class="title">${data.items[0].snippet.title}</a>
                            <img src=${data.items[0].snippet.thumbnails.medium.url} alt="preview image" />
                            <figcaption class="information">
                                    <span class="channel">${data.items[0].snippet.channelTitle}</span>
                                    <span class="date">${data.items[0].snippet.publishedAt.slice(0, 10)}</span>
                                    <span class="count">${data.items[0].statistics.viewCount}</span>
                                    <p class="description">${item.snippet.description}</p>
                            </figcaption>`;
            figure.className = `item ${number}`;
            resultDiv.appendChild(figure);
            figure.style.transform =`translateX(${370 * number}px)`;
        })
        .catch(error =>  console.log(JSON.stringify(error)))

}
