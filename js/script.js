const songList = [
    { song: `../songs/IconaPopILoveIt(Feat.CharliXcx).mp4`, img: '../songImg/iloveit.jpg', songName: 'Icona Pop - I Love It (feat. Charli XCX)' },
    { song: `../songs/Gorillaz-FeelGoodInc.mp3`, img: '../songImg/feelsgood.jpg', songName: 'Gorillaz - Feel Good Inc.' },
    { song: `../songs/Gorillaz-ClintEastwood.mp3`, img: '../songImg/eastwood.jpg', songName: 'Gorillaz - Clint Eastwood' },
    { song: `../songs/the-weeknd-save-your-tears.mp3`, img: '../songImg/saveTears.jpg', songName: 'The Weeknd - Save Your Tears' },
    { song: `../songs/PostMalone-Circles.mp3`, img: '../songImg/circles.jpg', songName: 'Post Malone - Circles' },
]

window.onload = function () {

    const player = document.getElementById('player')

    const prev = document.getElementById('prev')
    const start = document.getElementById('start')
    const next = document.getElementById('next')
    const mute = document.getElementById('mute')

    const time = document.getElementById('time')
    const duration = document.getElementById('duration')
    const track = document.getElementById('track')

    const songImage = document.getElementById('songImage')
    const songNamed = document.getElementById('songName')

    const musicList = document.getElementById('musicList')

    
    

    let timerId

    const startApp = () => {
        player.src = songList[0].song
        songImage.src = songList[0].img
        const author = songList[0].songName.split('-')
        songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        duration.innerText = splitTime(player.duration)
        track.max = getTime(player.duration)
    }

    

    const createMusicList = ()=>{
        for (const el of songList) {
            let childDiv = document.createElement('div')
            let img = document.createElement('img')
            let a = document.createElement('a')
            childDiv.id = 'list-item'
            childDiv.style.display = 'flex'
            
            img.src = el.img
            img.width = '90'

            let author = el.songName.split('-')

            a.innerHTML = `<b>${author[0]}</b><br>${author[1]}`

            childDiv.appendChild(img)
            childDiv.appendChild(a)

            musicList.appendChild(childDiv)    
         
        }

    }

    
    const splitPath = ()=>{
        let splited = player.src.split('/songs')
        splited = splited[splited.length - 1]

        const index = songList.findIndex((item) => {
            return `../songs${splited}` == item.song
        })

        return index
    }

    createMusicList()
    startApp()


    setTimeout(() => {
        const songlistItem = document.querySelectorAll('#musicList div')

        for (let item of songlistItem) {
            item.addEventListener("click", () => {

                let name = { item }.item.lastChild.innerText.split('\n')

                name = `${name[0]} - ${name[1]}`
                songList.forEach((el) => {
                    if (el.songName == name) {
                        player.src = el.song
                        songImage.src = el.img
                        player.play()
                        start.style.background = 'url("../svg/pause-circle-svgrepo-com.svg") center/contain no-repeat';

                        const author = el.songName.split('-')

                        songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
                        if (!timerId) interval()
                        duration.innerText = splitTime(player.duration)
                        track.max = getTime(player.duration)
                    }
                })
            })
        }


    }, 1000);



    const interval = () => {
        timerId = setInterval(() => {
            time.innerText = splitTime(player.currentTime)
            track.value = player.currentTime

            if (player.ended) {
                start.style.background = 'url("../svg/play-button-svgrepo-com.svg") center/contain no-repeat';
                player.currentTime = 0
                track.value = player.currentTime
                time.innerText = splitTime(player.currentTime)
                
                clearInterval(timerId)
            }
        }, 1000);
    }


    next.addEventListener('click', () => {
        
        const index = splitPath()
      
        if (index == (songList.length - 1)) {
            player.src = songList[0].song
            songImage.src = songList[0].img
            songNamed.innerText = songList[0].songName

            const author = songList[0].songName.split('-')

            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        } else {
            player.src = songList[index + 1].song
            songImage.src = songList[index + 1].img

            const author = songList[index + 1].songName.split('-')

            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
            
        }

            player.play()
            start.style.background = 'url("../svg/pause-circle-svgrepo-com.svg") center/contain no-repeat';
            if(!timerId) interval()
            duration.innerText = splitTime(player.duration)
            track.max = getTime(player.duration)

    })

    prev.addEventListener('click', () => {
        
        const index = splitPath()

        if (index == 0) {
            player.src = songList[songList.length - 1].song
            songImage.src = songList[songList.length - 1].img
            const author = songList[songList.length - 1].songName.split('-')
 
            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        } else {
            player.src = songList[index - 1].song
            songImage.src = songList[index - 1].img

            const author = songList[index - 1].songName.split('-')

            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        }

        player.play()
        start.style.background = 'url("../svg/pause-circle-svgrepo-com.svg") center/contain no-repeat';
        if (!timerId) interval()
        duration.innerText = splitTime(player.duration)
        track.max = getTime(player.duration)
             
    })



    start.addEventListener('click', () => {
        if (player.paused) {
            player.play()
            start.style.background = 'url("../svg/pause-circle-svgrepo-com.svg") center/contain no-repeat';
            interval()
            duration.innerText = splitTime(player.duration)
        } else {
            clearInterval(timerId)
            timerId = 0
            player.pause()
            start.style.background = 'url("../svg/play-button-svgrepo-com.svg") center/contain no-repeat';
        }
    })

    player.addEventListener('ended', ()=>{
        
        const index = splitPath()

        if (index == (songList.length - 1)) {
            player.src = songList[0].song
            songImage.src = songList[0].img
            songNamed.innerText = songList[0].songName

            const author = songList[0].songName.split('-')

            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        } else {
            player.src = songList[index + 1].song
            songImage.src = songList[index + 1].img

            const author = songList[index + 1].songName.split('-')

            songNamed.innerHTML = `<b>${author[0]}</b><br>${author[1]}`
        }

        player.play()

    })

    player.addEventListener('loadedmetadata', () => {
        track.max = player.duration
        duration.innerText = splitTime(player.duration)
    })

    mute.addEventListener('click', () => {
        if (player.muted) {
            player.muted = false
            mute.style.background = 'url("../svg/unmute-svgrepo-com.svg") center/contain no-repeat';
        } else {
            player.muted = true
            mute.style.background = 'url("../svg/volume-muted-svgrepo-com.svg") center/contain no-repeat';
        }
    })
    track.addEventListener('input', () => {
        player.currentTime = track.value
        time.innerText = splitTime(track.value)
    })

}

const splitTime = (sec) => {
    return getTime(Math.floor(sec / 60)) + ":" + getTime(Math.floor(sec % 60))
}

const getTime = (time) => {
    return (time < 10 ? `0${time}` : time)
}


