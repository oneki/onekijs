export const i18nEn = {
  common: {
    welcome: 'Welcome',
    Welcome: 'Welcome',
    'Welcome {{lastname}} on my website': 'Welcome {{lastname}} on my website',
    'Welcome {{lastname}} on my website. Current date = {{date}}':
      'Welcome {{ lastname}} on my website. Current date = {{date | locale}}',
    'Welcome <1>{{lastname}}</1> {{firstname}}': 'Welcome <1>{{lastname}}</1> {{firstname}}',
    hello: 'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>',
    'plural::hello': 'Hello <1><2>gentlemen</2> {{firstname}} {{lastname}} <3>male</3></1> <4>addresses</4>',
    'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>':
      'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>',
    'plural::Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>':
      'Hello <1><2>gentlemen</2> {{firstname}} {{lastname}} <3>male</3></1> <4>addresses</4>',
    'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4> <5>Welcome</5>':
      'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4> <5>Welcome</5>',
    user: 'common user',
  },
  users: {
    lastname: 'Last name',
    firstname: 'First name',
    user: 'user',
    'plural::user': 'users',
  },
};

export const i18nFr = {
  common: {
    welcome: 'Bienvenue',
    Welcome: 'Bienvenue',
    'Welcome {{lastname}} on my website': 'Bienvenue {{ lastname}} sur mon site web',
    'Welcome {{lastname}} on my website. Current date = {{date}}':
      'Bienvenue {{ lastname}} sur mon site web. Date actuelle = {{date | locale}}',
    'Welcome <1>{{lastname}}</1> {{firstname}}': 'Bienvenue {{firstname}} <1>{{lastname}}</1>',
    hello: 'Bonjour <1><2>monsieur</2> {{firstname}} {{lastname}} <3>masculin</3></1> <4>adresse</4>',
    'plural::hello': 'Bonjour <1><2>messieurs</2> {{firstname}} {{lastname}} <3>masculin</3></1> <4>adresses</4>',
    'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>':
      'Bonjour <1><2>monsieur</2> {{lastname}} {{firstname}} <3>masculin</3></1> <4>adresse</4>',
    'plural::Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4>':
      'Bonjour <1><2>messieurs</2> {{lastname}} {{firstname}} <3>masculin</3></1> <4>adresses</4>',
    'Hello <1><2>mister</2> {{firstname}} {{lastname}} <3>male</3></1> <4>address</4> <5>Welcome</5>':
      'Bonjour <1><2>monsieur</2> {{lastname}} {{firstname}} <3>masculin</3></1> <4>adresse</4> <5>Bienvenue</5>',
    user: 'utilisateur commun',
  },
  users: {
    lastname: 'Nom',
    firstname: 'Prénom',
    user: 'utilisateur',
    'plural::user': 'utilisateurs',
  },
};
