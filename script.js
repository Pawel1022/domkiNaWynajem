'use strict'

const navList = document.querySelector('.main-nav-list')

const handleNav = e => {
	e.preventDefault()
	header.classList.toggle('nav-open')
}

navList.addEventListener('click', e => {
	e.preventDefault()

	if (!e.target.classList.contains('main-nav-link')) return

	if (e.target.classList.contains('main-nav-link')) {
		handleNav(e)
		const id = document.querySelector(e.target.getAttribute('href'))
		id.scrollIntoView({ behavior: 'smooth' })
	}
})

const socialLinkList = document.querySelector('.social-links')

socialLinkList.addEventListener('click', e => {
	e.preventDefault()
	if (!e.target.classList.contains('social-icon')) return
	if (e.target.classList.contains('social-icon')) {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
})

const navMobileBtn = document.querySelector('.btn-mobile-nav')
const header = document.querySelector('.header')

navMobileBtn.addEventListener('click', handleNav)

const heroSection = document.querySelector('.section-hero')
const navObserver = new IntersectionObserver(
	entries => {
		const ent = entries[0]
		if (ent.isIntersecting) document.querySelector('body').classList.remove('sticky')
		if (!ent.isIntersecting) document.querySelector('body').classList.add('sticky')
	},
	{
		root: null,
		threshold: 0,
		rootMargin: -40 - header.getBoundingClientRect().height + 'px',
	}
)
navObserver.observe(heroSection)

// Lazy images
const imgTargets = document.querySelectorAll('img[data-img]')
imgTargets.forEach(img => img.classList.add('lazy-img'))

const loadImg = (entries, observer) => {
	const [entry] = entries
	if (!entry.isIntersecting) return
	entry.target.src = entry.target.dataset.img
	entry.target.addEventListener('load', () => {
		entry.target.classList.remove('lazy-img')
	})
	observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
	rootMargin: '-200px',
})

imgTargets.forEach(img => imgObserver.observe(img))

console.log(imgTargets)
