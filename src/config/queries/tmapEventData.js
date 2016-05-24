export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    groups: [
        {
        name: 'venuename',
        limit: 50,
        sort: {
            dir: 'desc',
            name: 'pricepaid',
            metricFunc: 'sum'
          }
      },
        {
        name: 'eventname',
        limit: 10,
        sort: {
            dir: 'desc',
            name: 'pricepaid',
            metricFunc: 'sum'
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



