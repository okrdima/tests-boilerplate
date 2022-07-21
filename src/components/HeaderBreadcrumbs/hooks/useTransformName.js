import { capitalize } from 'helpers'

const useTransformName = () => {
  const transformName = (name) => {
    const splittedName = name?.split('_') || ''
    if (splittedName.length === 3) {
      const [domain, secondDomainWord, variant] = splittedName || []

      return variant === 'ALL'
        ? capitalize(domain + ' ' + secondDomainWord || '')
        : capitalize(variant || '')
    } else {
      const [domain, variant] = splittedName || []

      return variant === 'ALL'
        ? capitalize(domain || '')
        : capitalize(variant || '')
    }
  }

  return transformName
}

export default useTransformName
