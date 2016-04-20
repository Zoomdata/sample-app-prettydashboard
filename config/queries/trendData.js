export const source = 'Lending Club Loans Data';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    time: {
      timeField: "issue_d"
    },
    groups: [{
        name: '$to_day(issue_d)',
        limit: 1000,
        sort: {
            dir: 'asc',
            name: 'issue_d'
          }
      }
    ],
    metrics: [
          {
            name: 'total_pymnt',
            func: 'sum'
          },
          {
            name: 'loan_amnt',
            func: 'sum'
          }
    ]
};