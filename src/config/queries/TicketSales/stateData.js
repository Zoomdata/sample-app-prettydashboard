export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    groups: [
      {
        name: 'state',
        sort: {
            dir: 'asc',
            name: 'state'
        },
        limit: 70
      },
      {
        name: 'city',
        sort: {
            dir: 'asc',
            name: 'city'
        },
        limit: 200
      },
    ],
    metrics: []
};
