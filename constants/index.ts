export const MY_INFO = computed(() => {
  const t = useNuxtApp().$i18n.t
  return {
    name: t('me.name'),
    email: 'g100mylan229@gmail.com',
    // ig: 'https://www.instagram.com/lo_ol.g100/',
    github: 'https://github.com/G100my',
    linkedin: 'https://www.linkedin.com/in/g100lo/',
    cakeResume: 'https://www.cakeresume.com/s--hCYv4B1OJUn_Goo97IKMzA--/g100my',
    company: t('me.company_of_employment'),
    companyUrl: 'https://lubn.com/',
    title: t('me.title'),
    location: t('me.location'),
  }
})

export const TransitionAttrs = {
  enterActiveClass: 'duration-150 ease-linear transition-opacity',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'duration-100 ease-linear transition-opacity',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
}

export const gridInjectionKey = Symbol()

export enum ContactToMeOptions {
  Interesting,
  Working,
  Consulting,
  Others,
}
