export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    //time: {
      //timeField: "saletime"
    //},
    groups: [{
        name: 'eventname',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'event'
          }
      }
    ],
    metrics: [{
            name: 'pricepaid',
            func: 'sum'
        }
    ]
}			



