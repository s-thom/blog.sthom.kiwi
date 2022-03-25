import cs from 'classnames'

import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  return (
    <>
      <button className={cs(styles.button, 'theme-toggle')}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <title>Change theme</title>
          <g className={cs(styles.g, styles.sunmoon)}>
            <path d='M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' />
            <path d='M12 8a2.828 2.828 0 1 0 4 4' />
            <path d='M12 2v2' />
            <path d='M12 20v2' />
            <path d='m4.93 4.93 1.41 1.41' />
            <path d='m17.66 17.66 1.41 1.41' />
            <path d='M2 12h2' />
            <path d='M20 12h2' />
            <path d='m6.34 17.66-1.41 1.41' />
            <path d='m19.07 4.93-1.41 1.41' />
          </g>
          <g className={cs(styles.g, styles.moon)}>
            <path d='M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z' />
          </g>
          <g className={cs(styles.g, styles.sun)}>
            <circle cx='12' cy='12' r='4' />
            <path d='M12 2v2' />
            <path d='M12 20v2' />
            <path d='m4.93 4.93 1.41 1.41' />
            <path d='m17.66 17.66 1.41 1.41' />
            <path d='M2 12h2' />
            <path d='M20 12h2' />
            <path d='m6.34 17.66-1.41 1.41' />
            <path d='m19.07 4.93-1.41 1.41' />
          </g>
          <g className={cs(styles.g, styles.binary)}>
            <path d='M6 20h4' />
            <path d='M14 10h4' />
            <path d='M6 14h2v6' />
            <path d='M14 4h2v6' />
            <rect x='6' y='4' width='4' height='6' />
            <rect x='14' y='14' width='4' height='6' />
          </g>
          <g className={cs(styles.g, styles.heart)}>
            <path d='M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z' />
          </g>
        </svg>
      </button>
      <script
        type='module'
        dangerouslySetInnerHTML={{
          __html:
            // Rainbow theme is currently removes while I figure out what I actually want to do with it.
            "const themes=['default','dark','light','unreadable'/*,'rainbow'*/];let i=themes.indexOf(document.body.dataset.sthomTheme);(i=i<0?0:i),document.querySelector('.theme-toggle').addEventListener('click',()=>{!localStorage.getItem('sthom-theme')&&window.matchMedia('(prefers-color-scheme:dark)').matches&&(i=1);(i=(i+1)%themes.length),(document.body.dataset.sthomTheme=themes[i]),localStorage.setItem('sthom-theme',themes[i]),typeof umami!=='undefined'&&umami.track('theme-'+themes[i])})"
        }}
      />
    </>
  )
}
