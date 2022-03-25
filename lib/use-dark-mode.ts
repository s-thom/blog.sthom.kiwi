// import useDarkModeImpl from '@fisch0920/use-dark-mode'

export function useDarkMode() {
  // const darkMode = useDarkModeImpl(false, { classNameDark: 'dark-mode' })

  return {
    isDarkMode: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleDarkMode: () => {}
  }
}
