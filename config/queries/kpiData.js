export const source = 'Lending Club Loans Data';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    time: {
      from: '+2015-01-15 00:00:00.000',
      to: '+2015-06-15 00:00:00.000',
      timeField: "issue_d"
    },
    groups: [{
        name: 'grade',
        limit: 50,
        sort: {
            dir: 'asc',
            name: 'grade'
          }
      }
    ],
    metrics: [
          {
            name: 'calc_portfolio',
            func: 'calc'
          },          
          {
            name: 'calc_o_s',
            func: 'calc'
          },
          {
            name: 'calc_default_propensity',
            func: 'calc'
          },
          {
            name: 'calc_delinquency_recency',
            func: 'calc'
          },
    ],
    pivot: {
        rows: [
            {
              name: 'grade'
            }
        ],
        columns: [],
        rowsSort: [
            {
              name: 'grade',
              dir: 'asc'
            }
        ],
        rowsPageIndex: 0,
        rowsPageSize: 200,
        addColumnsTotal: true
    },
    direction: 'column',
    isClientDriven: true
};

