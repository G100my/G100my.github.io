import { useI18n } from '#imports'
export const MY_INFO = computed(() => {
  const { t } = useI18n()
  return {
    name: t('me.name'),
    email: 'g100mylan229@gmail.com',
    ig: 'https://www.instagram.com/lo_ol.g100/',
    github: 'https://github.com/G100my',
    linkedin: 'https://www.linkedin.com/in/g100lo/',
    company: t('me.company_of_employment'),
    companyUrl: 'https://lubn.com/',
    title: t('me.title'),
    location: t('me.location'),
  }
})
