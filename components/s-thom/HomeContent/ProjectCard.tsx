import { useId } from 'react'

import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink'
import { FiGithub } from '@react-icons/all-files/fi/FiGithub'

import styles from './HomeContent.module.css'

export interface ProjectCardProps {
  title: string
  url: string
  github: string
  imageUrl: string
}

export function ProjectCard({
  title,
  url,
  github,
  imageUrl
}: ProjectCardProps) {
  const id = useId()

  return (
    <div className={styles.projectCard}>
      <a className={styles.imgLink} href={url} target='_blank' rel='noreferrer'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.projectImg}
          src={imageUrl}
          alt=''
          aria-describedby={id}
        />
      </a>
      <h3 className={styles.projectHeading}>
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
          className={`${styles.icon}`}
        >
          <span id={id}>{title}</span>
          <FiExternalLink
            className={styles.externalIcon}
            title={`Opens in new tab`}
          />
        </a>
        <a
          href={`https://github.com/${github}`}
          target='_blank'
          rel='noreferrer'
          className={`${styles.icon}`}
        >
          <FiGithub title={`View source code for ${github} on GitHub`} />
        </a>
      </h3>
    </div>
  )
}
