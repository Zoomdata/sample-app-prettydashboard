export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    //time: {
      //timeField: "saletime"
    //},
    groups: [
        {
        name: 'venuecity',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'venuecity'
          }
      },
        {
        name: 'venuename',
        limit: 100,
        sort: {
            dir: 'desc',
            name: 'venuename'
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



