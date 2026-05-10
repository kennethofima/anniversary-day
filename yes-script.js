let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    // Autoplay anniversary music
    const music = document.getElementById('bg-music')

    music.volume = 0.3

    music.play().catch(() => {})

    musicPlaying = true

    document.getElementById('music-toggle').textContent = '🔊'

    // Extra floating confetti every few seconds
    setInterval(() => {
        confetti({
            particleCount: 25,
            spread: 80,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        })
    }, 2500)
})

function launchConfetti() {

    const colors = [
        '#ff4d6d',
        '#ff8fa3',
        '#ffc2d1',
        '#ffffff',
        '#ffccd5',
        '#ff758f',
        '#ffd6e0'
    ]

    const duration = 7000
    const end = Date.now() + duration

    // Main anniversary burst
    confetti({
        particleCount: 180,
        spread: 120,
        origin: {
            x: 0.5,
            y: 0.35
        },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 35,
            angle: 60,
            spread: 60,
            origin: {
                x: 0,
                y: 0.65
            },
            colors
        })

        confetti({
            particleCount: 35,
            angle: 120,
            spread: 60,
            origin: {
                x: 1,
                y: 0.65
            },
            colors
        })

    }, 300)
}

function toggleMusic() {

    const music = document.getElementById('bg-music')

    if (musicPlaying) {

        music.pause()

        musicPlaying = false

        document.getElementById('music-toggle').textContent = '🔇'

    } else {

        music.play()

        musicPlaying = true

        document.getElementById('music-toggle').textContent = '🔊'
    }
}
