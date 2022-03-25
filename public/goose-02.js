// Honk
const TOOLTIP_TIMEOUT = 3000
const TRANSITION_DURATION = 200
const SCALE_SCALE = 100
const HEARTS = ['❤️', '🧡', '💛', '💚', '💙', '💜']
const NOTES = ['🎵', '🎶', '🎼']

function createHeart(index, count) {
  const heart = document.createElement('div')
  heart.classList.add('goose-heart')
  heart.textContent = HEARTS[index]
  heart.ariaHidden = 'true'

  const translateX = Math.floor(Math.random() * 100)
  const translateY = Math.floor(Math.random() * 10)
  heart.style.left = `${translateX}%`
  heart.style.transform = `translateX(-${translateX}%) translateY(${translateY}px) scale(${
    (count + SCALE_SCALE) / SCALE_SCALE
  })`

  return heart
}

function createNote(index, count) {
  const heart = document.createElement('a')
  heart.href = 'https://goose.sthom.kiwi'
  heart.rel = 'external'
  heart.classList.add('goose-heart')
  heart.textContent = NOTES[index]
  heart.ariaHidden = 'true'

  const translateX = Math.floor(Math.random() * 100)
  const translateY = Math.floor(Math.random() * 10)
  heart.style.left = `${translateX}%`
  heart.style.transform = `translateX(-${translateX}%) translateY(${translateY}px) scale(${
    (count + SCALE_SCALE) / SCALE_SCALE
  })`

  return heart
}

let button = document.querySelector('#goose')
let current = 0
let count = 0

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

async function addHeart() {
  // The hearts are looped over backwards. Why didn't I just reverse the array?
  // ¯\_(ツ)_/¯
  current = (current - 1 + HEARTS.length) % HEARTS.length
  // eslint-disable-next-line no-plusplus
  count++

  let child
  if (count % 10 === 0) {
    child = createNote(count % NOTES.length, count)
  } else {
    child = createHeart(current, count)
  }

  button.appendChild(child)
  if (
    typeof window.umami !== 'undefined' &&
    (count === 1 || count === 5 || count % 10 === 0)
  ) {
    window.umami.track('goose')
  }

  await delay(TOOLTIP_TIMEOUT)
  child.classList.add('goose-heart-exit')

  await delay(TRANSITION_DURATION)
  button.removeChild(child)
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', () => init())
}

function init() {
  button = document.querySelector('#goose')
  button.addEventListener('click', () => {
    addHeart()
  })
}
