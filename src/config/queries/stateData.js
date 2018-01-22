export const source = 'Ticket Sales S3';
export const queryConfig = {
    tz: 'EST',
    filters: [],
    player: null,
    groups: [
      {
        name: 'venuestate',
        sort: {
            dir: 'asc',
            name: 'venuestate'
        },
        limit: 70
      },
      {
        name: 'venuecity',
        sort: {
            dir: 'asc',
            name: 'venuecity'
        },
        limit: 200
      },
    ],
    metrics: []
};
