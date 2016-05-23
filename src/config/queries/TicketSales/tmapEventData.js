export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    groups: [
        {
        name: 'venuename',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'venuename'
          }
      },
        {
        name: 'eventname',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'eventname'
          }
      }
    ],
    metrics: [
        {
            name: 'pricepaid',
            func: 'sum'
        },
        {
            name: 'qtysold',
            func: 'sum'
        },
        {
            name: 'commission',
            func: 'sum'
        },
        {
            name: 'calc_avg_commission',
            func: 'calc'
        },
        {
            name: 'calc_avg_sales_price',
            func: 'calc'
        }
    ]
}			



