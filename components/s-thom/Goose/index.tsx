import Head from 'next/head'
import Image from 'next/image'

import styles from './Goose.module.css'
import goose from './goose.png'

export function Goose() {
  return (
    <>
      <button
        id='goose'
        className={`${styles.button} goose-button`}
        aria-label='Goose'
      >
        <Image src={goose} alt='' width={48} height={48} loading='eager' />
      </button>
      <Head>
        <script type='module' src='/goose-02.js' async defer />
      </Head>
    </>
  )
}
