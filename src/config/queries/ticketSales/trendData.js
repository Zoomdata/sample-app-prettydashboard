export const source = 'Ticket Sales';
export const queryConfig = {
        tz: 'EST',
        filters: [],
        player: null,
        time: {
          timeField: "saletime"
        },
        groups: [{
            name: 'state',
            limit: 100,
            sort: {
                dir: 'asc',
                name: 'state'
              }
          }
        ],
        metrics: [{
                name: 'pricepaid',
                func: 'sum'
            }
        ]
    }			





