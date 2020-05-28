export default {
  items: [
    {
      name: 'Societés',
      url: '/home/societé',
      icon: 'icon-speedometer',
      children:[

      
      
    {
  
      name: 'Liste societé',
      url: '/home/societé',
      icon: 'icon-speedometer',
      
      
    },
    {
  
      name: 'Ajout societé',
      url: '/home/ajoutsocieté',
      icon: 'icon-speedometer',
      
      
    },
    {
      name: 'publication',
      url: '/home/publication',
      icon: 'icon-speedometer',
      children:[
        {
          name: 'liste publication',
          url: '/home/listpublication',
          icon: 'icon-speedometer',
        },
        {
          name: 'ajout publication',
          url: '/home/ajoutpublication',
          icon: 'icon-speedometer',
        }

      ]
    },

  ]
},
    {
      name: 'reclamation',
      url: '/home/reclamation',
      icon: 'icon-speedometer',

      children:[
        {
          name: 'liste reclamation',
          url: '/home/listreclam',
          icon: 'icon-speedometer',
        },
        {
          name: 'ajout reclamation',
          url: '/home/ajoutreclam',
          icon: 'icon-speedometer',
        }

      ]
      

      
      
    },
    
   
    {
      name: 'client',
      url: '/home/client',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',

      },
    },
    {
      name: 'voiture',
      url: '/home/voiture',
      icon: 'icon-speedometer',
      children:[

      
      
    {
  
      name: 'Liste voiture',
      url: '/home/voiture',
      icon: 'icon-speedometer',
   
    },
    {
      name: 'Ajout voiture',
      url: '/home/ajoutvoiture',
      icon: 'icon-speedometer',
    },
    
      ],
    },
  ]
};


      
  
