const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Please love... 💕",
    "Don't break my heart 😢",
    "I’ll be really sad...",
    "Pleaseeee 😭",
    "You're hurting me 💔",
    "Last chance babe 😭",
    "Catch me first 😜"
]

const yesTeasePokes = [
    "try pressing no first 😏",
    "go on... click no 👀",
    "you know you want to 😈",
    "just one no won't hurt 😜"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

const music = document.getElementById('bg-music')

// Music autoplay

music.muted = true
music.volume = 0.3

music.play().then(() => {

    music.muted = false

}).catch(() => {

    document.addEventListener('click', () => {

        music.muted = false

        music.play().catch(() => {})

    }, { once: true })
})

function toggleMusic() {

    if (musicPlaying) {

        music.pause()

        musicPlaying = false

        document.getElementById('music-toggle').textContent = '🔇'

    } else {

        music.muted = false

        music.play()

        musicPlaying = true

        document.getElementById('music-toggle').textContent = '🔊'
    }
}

// YES button logic

function handleYesClick() {

    if (!runawayEnabled) {

        const msg = yesTeasePokes[
            Math.min(
                yesTeasedCount,
                yesTeasePokes.length - 1
            )
        ]

        yesTeasedCount++

        showTeaseMessage(msg)

        return
    }

    window.location.href = 'yes.html'
}

// Toast tease message

function showTeaseMessage(msg) {

    let toast = document.getElementById('tease-toast')

    toast.textContent = msg

    toast.classList.add('show')

    clearTimeout(toast._timer)

    toast._timer = setTimeout(() => {

        toast.classList.remove('show')

    }, 2500)
}

// NO button logic

function handleNoClick() {

    noClickCount++

    // Change No text

    const msgIndex = Math.min(
        noClickCount,
        noMessages.length - 1
    )

    noBtn.textContent = noMessages[msgIndex]

    // Grow Yes button

    const currentSize = parseFloat(
        window.getComputedStyle(yesBtn).fontSize
    )

    yesBtn.style.fontSize = `${currentSize * 1.35}px`

    const padY = Math.min(
        18 + noClickCount * 5,
        60
    )

    const padX = Math.min(
        45 + noClickCount * 10,
        120
    )

    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button

    if (noClickCount >= 2) {

        const noSize = parseFloat(
            window.getComputedStyle(noBtn).fontSize
        )

        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Change GIF stages

    const gifIndex = Math.min(
        noClickCount,
        gifStages.length - 1
    )

    swapGif(gifStages[gifIndex])

    // Activate runaway mode

    if (noClickCount >= 5 && !runawayEnabled) {

        enableRunaway()

        runawayEnabled = true

        showTeaseMessage("too slow 😜")
    }
}

// Smooth GIF transition

function swapGif(src) {

    catGif.style.opacity = '0'

    setTimeout(() => {

        catGif.src = src

        catGif.style.opacity = '1'

    }, 200)
}

// Runaway mode

function enableRunaway() {

    noBtn.addEventListener('mouseover', runAway)

    noBtn.addEventListener(
        'touchstart',
        runAway,
        { passive: true }
    )
}

function runAway() {

    const margin = 20

    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight

    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX =
        Math.random() * maxX + margin / 2

    const randomY =
        Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'

    noBtn.style.left = `${randomX}px`

    noBtn.style.top = `${randomY}px`

    noBtn.style.zIndex = '50'
}
