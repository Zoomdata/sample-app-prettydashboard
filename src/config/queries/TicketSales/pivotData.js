export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    //time: {
      //from: '+2008-01-01 00:00:00.000',
      //to: '+2008-12-01 00:00:00.000',
      //timeField: 'issue_d'
    //},
    groups: [
      {
        name: 'catname',
        sort: {
            dir: 'asc',
            name: 'catname'
        },
        limit: 50
      },
      {
        name: 'eventname',
        sort: {
            dir: 'asc',
            name: 'eventname'
        },
        limit: 100
      },
    ],
    metrics: [
           {
            'name': 'pricepaid',
            'func': 'sum'
          },
          {
            'name': 'commission',
            'func': 'sum'
          },
          {
            'name': 'qtysold',
            'func': 'sum'
          },
    ]
};
