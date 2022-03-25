import Image from 'next/image'
import Link from 'next/link'

import { FiGithub } from '@react-icons/all-files/fi/FiGithub'
import { FiLinkedin } from '@react-icons/all-files/fi/FiLinkedin'
import { FiMail } from '@react-icons/all-files/fi/FiMail'

import portraitSrc from '../Header/portrait-2020.jpg'
import styles from './HomeContent.module.css'
import { ProjectCard } from './ProjectCard'

export function HomeContent() {
  return (
    <div className={styles.column}>
      <div className={styles.profile}>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.img}
            src={portraitSrc}
            alt=''
            width={128}
            height={128}
            priority
          />
        </div>

        <div className={styles.nameWrapper}>
          <h1 className={`${styles.name} rainbow-red`}>Stuart Thomson</h1>
          <p className={`${styles.tag}`}>
            <span className='rainbow-orange'>Software Developer </span>
            <span className='rainbow-violet'>|</span>
            <span className='rainbow-yellow'> Human Being</span>
          </p>
        </div>
      </div>
      <div className={`${styles.line} ${styles.linksArea} rainbow-violet`}>
        <div>
          <Link href='/about' passHref>
            <a className='notion-link rainbow-green'>About Me</a>
          </Link>
        </div>
        <span className={styles.separator} aria-hidden='true'>
          |
        </span>
        <div>
          <Link href='/blog' passHref>
            <a className='notion-link rainbow-indigo'>Blog</a>
          </Link>
        </div>
        <span className={styles.separator} aria-hidden='true'>
          |
        </span>
        <div>
          <a
            href='https://github.com/s-thom'
            aria-label='GitHub'
            rel='nofollow noopener noreferrer'
            target='_blank'
            className={`${styles.icon} rainbow-red`}
          >
            <FiGithub title='GitHub' />
          </a>
        </div>
        <span className={styles.separator} aria-hidden='true'>
          |
        </span>
        <div>
          <a
            href='mailto:me@sthom.kiwi'
            aria-label='Email'
            rel='nofollow noopener noreferrer'
            target='_blank'
            className={`${styles.icon} rainbow-orange`}
          >
            <FiMail title='Email' />
          </a>
        </div>
        <span className={styles.separator} aria-hidden='true'>
          |
        </span>
        <div>
          <a
            href='https://www.linkedin.com/in/s-thom/'
            aria-label='LinkedIn'
            rel='nofollow noopener noreferrer'
            target='_blank'
            className={`${styles.icon} rainbow-yellow`}
          >
            <FiLinkedin title='LinkedIn' />
          </a>
        </div>
      </div>
      <div className={`${styles.projectArea}`}>
        {/* <h2 className={styles.projectsHeader}>Some things I&apos;ve made</h2> */}
        <div className={`${styles.projectList}`}>
          {/* // TODO: Get the image URLs better than just hardcoding.
            // This is just to make it work as a first version. */}
          <ProjectCard
            title='BG3 Music Box'
            url='https://bard.sthom.kiwi'
            github='s-thom/bg3-music-box'
            imageUrl='/api/images/notion/b591108c-f119-4ec4-9b59-ab086b4d3902/cover'
          />
          <ProjectCard
            title='screenshot.help'
            url='https://screenshot.help'
            github='s-thom/howtoscreenshot'
            imageUrl='/api/images/notion/ed4bf1d6-f024-4391-bcdf-b67a9917ad93/cover'
          />
          <ProjectCard
            title='ourflags.lgbt'
            url='https://ourflags.lgbt'
            github='s-thom/ourflags.lgbt'
            imageUrl='/api/images/notion/2a4ef34c-729f-42e0-999c-297bf231d5cc/cover'
          />
          <Link href='/projects' passHref>
            <a className={`notion-link ${styles.seeMore}`}>See more...</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
