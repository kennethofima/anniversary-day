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

// State
let noClickCount = 0
let yesTeasedCount = 0
let runawayEnabled = false
let musicPlaying = false

// Elements (safe access later)
let catGif, yesBtn, noBtn, music, toast

window.addEventListener("DOMContentLoaded", () => {
    catGif = document.getElementById("cat-gif")
    yesBtn = document.getElementById("yes-btn")
    noBtn = document.getElementById("no-btn")
    music = document.getElementById("bg-music")
    toast = document.getElementById("tease-toast")

    initMusic()
})

/* ================= MUSIC ================= */

function initMusic() {
    if (!music) return

    music.volume = 0.3
    music.muted = true

    music.play()
        .then(() => {
            music.muted = false
            musicPlaying = true
        })
        .catch(() => {
            document.addEventListener("click", () => {
                music.muted = false
                music.play().catch(() => {})
                musicPlaying = true
            }, { once: true })
        })
}

function toggleMusic() {
    if (!music) return

    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        setMusicIcon("🔇")
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        setMusicIcon("🔊")
    }
}

function setMusicIcon(icon) {
    const btn = document.getElementById("music-toggle")
    if (btn) btn.textContent = icon
}

/* ================= YES BUTTON ================= */

function handleYesClick() {
    if (!runawayEnabled) {
        showToast(
            yesTeasePokes[
                Math.min(yesTeasedCount++, yesTeasePokes.length - 1)
            ]
        )
        return
    }

    window.location.href = "yes.html"
}

/* ================= NO BUTTON ================= */

function handleNoClick() {
    noClickCount++

    updateNoText()
    growYesButton()
    shrinkNoButton()
    updateGif()

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
        showToast("too slow 😜")
    }
}

/* ================= UI UPDATES ================= */

function updateNoText() {
    noBtn.textContent = noMessages[
        Math.min(noClickCount, noMessages.length - 1)
    ]
}

function growYesButton() {
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${size * 1.25}px`

    yesBtn.style.padding = `
        ${Math.min(60, 18 + noClickCount * 5)}px
        ${Math.min(120, 45 + noClickCount * 8)}px
    `
}

function shrinkNoButton() {
    if (noClickCount < 2) return

    const size = parseFloat(getComputedStyle(noBtn).fontSize)
    noBtn.style.fontSize = `${Math.max(10, size * 0.85)}px`
}

function updateGif() {
    const index = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[index])
}

function swapGif(src) {
    if (!catGif) return

    catGif.style.opacity = "0"

    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = "1"
    }, 180)
}

/* ================= TOAST ================= */

function showToast(msg) {
    if (!toast) return

    toast.textContent = msg
    toast.classList.add("show")

    clearTimeout(toast._timer)

    toast._timer = setTimeout(() => {
        toast.classList.remove("show")
    }, 2200)
}

/* ================= RUNAWAY MODE ================= */

function enableRunaway() {
    noBtn.addEventListener("mouseover", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })
}

function runAway() {
    const margin = 20

    const w = noBtn.offsetWidth
    const h = noBtn.offsetHeight

    const x = Math.random() * (window.innerWidth - w - margin)
    const y = Math.random() * (window.innerHeight - h - margin)

    noBtn.style.position = "fixed"
    noBtn.style.left = `${x}px`
    noBtn.style.top = `${y}px`
    noBtn.style.zIndex = "999"
}
