export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    //time: {
      //timeField: "saletime"
    //},
    groups: [{
        name: 'venuecity',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'venuecity'
          }
      }
    ],
    metrics: [{
            name: 'pricepaid',
            func: 'sum'
        }
    ]
}			



