export const source = 'Lending Club Loans Data';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    time: {
      from: '+2015-01-15 00:00:00.000',
      to: '+2015-06-15 00:00:00.000',
      timeField: 'issue_d'
    },
    groups: [
      {
        name: 'grade',
        sort: {
            dir: 'asc',
            name: 'grade'
        },
        limit: 50
      },
      {
        name: 'loan_status',
        sort: {
            dir: 'asc',
            name: 'loan_status'
        },
        limit: 10
      },
      {
        name: 'addr_state',
        sort: {
            dir: 'asc',
            name: 'addr_state'
        },
        limit: 100
      }
      // ,
      // {
      //   name: 'emp_length',
      //   sort: {
      //       dir: 'asc',
      //       name: 'emp_length'
      //   },
      //   limit: 20
      // },
      // {
      //   name: '$to_day(issue_d)',
      //   sort: {
      //       dir: 'asc',
      //       name: '$to_day(issue_d)'
      //   },
      //   limit: 20
      // }        
    ],
    metrics: [
           {
            'name': 'calc_o_s_principal',
            'func': 'calc'
          },
          {
            'name': 'calc_o_s',
            'func': 'calc'
          },
          {
            'name': 'calc_portfolio',
            'func': 'calc'
          },
          {
            'name': 'calc_avg_size',
            'func': 'calc'
          }
    ]
};
