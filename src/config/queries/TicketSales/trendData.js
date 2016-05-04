export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    time: {
      timeField: "saletime"
    },
    groups: [{
        name: '$to_day(saletime)',
        limit: 1000,
        sort: {
            dir: 'asc',
            name: 'saletime'
          }
      }
    ],
    metrics: [{
            name: 'qtysold',
            func: 'sum'
        }
    ]
}			



