export const source = 'Ticket Sales';
export const queryConfig = {
    tz: 'EST',
    filters: [
        //{ form: null,
                //operation: "IN",
                //path: "catname",
                //value: [ "Plays", "Pop", "Opera" ] }
    ],
    player: null,
    groups: [
      //{
        //name: 'catname',
        //sort: {
            //dir: 'asc',
            //name: 'catname'
        //},
        //limit: 50
      //},
    ],
    metrics: [
                {
                    "func": "calc",
                    "name": "calc_likes_jazz_december"
                },
                {
                    "func": "calc",
                    "name": "calc_like_jazz_november"
                },
                {
                    "func": "calc",
                    "name": "calc_likes_rock_november"
                },
                {
                    "func": "calc",
                    "name": "calc_likes_rock_sold_dicember"
                },
                {
                    "func": "calc",
                    "name": "calc_likes_sports_december"
                },
                {
                    "func": "calc",
                    "name": "calc_likes_sports_november"
                }
   ]
};
