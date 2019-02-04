var users = [
    {
        id : 1,
        name : 'abhi',
        schooId : 100
    },
    {
        id : 2,
        name : 'mayank',
        schooId : 101
    },

];

let grades = [
    {
        id:1,
        schooId:100,
        grades : 85 
    },
    {
        id:2,
        schooId:101,
        grades : 86 
    },
    {
        id:3,
        schooId:102,
        grades : 87 
    }
];

// let user = users.find((user) => {return user});
// console.log(user);

let getUser = (id) => {
    return new Promise((resolve,reject) => {
        let user = users.find((user) => {return user.id === id});

        if(user)
        {
            resolve(user);
        }else{
            reject('id invalid ... !');
        }
    });
}

let getGrade = (schoolID) => {
    return new Promise((resolve,reject) => {
        var grade = grades.filter((grade) => {return grade.schoolID === schoolID});

        if(grade) {
            resolve(grade);
        }else{
            reject('detial not avilable .. !');
        }
    });
};

 let getStatus  = (userid) => {
     let user;
     return getUser(userid).then((tempuser) => {
         user = tempuser;
         return getGrade(user.schooId);
     }).then((grades) => {
         let avg = 0;
        if(grades.length > 0 )
        {
            avg = 
        }

     });
 }



getStatus(userid).then((status) => 
                            {
                                console.log(status);
                                
                            })
                 .catch((error) => 
                            {
                                    console.log(error);
                                    
                            });


// getUser(2).then((user) => {console.log(user);
// }).catch((error) => {console.log(error);
// });

// getGrade(101).then((grade) => {console.log(grade);
// },(error) => {console.log(error);
// });