import React from 'react'

import * as config from '@/lib/config'

import { Goose } from './s-thom/Goose'
import styles from './styles.module.css'

const DEFAULT_YEAR = '2022'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export interface FooterProps {
  year?: string
}

export const FooterImpl: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright &copy; {year ?? DEFAULT_YEAR} {config.author}
      </div>
      <Goose />
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
