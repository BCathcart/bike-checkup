const {Mongoose} = require('mongoose');
const Repository = require('./Repository');

class ActivityRepository extends Repository {
  constructor(data) {
    super(data);
    this.count['afterDateForUser'] = 0;
  }

  GetActivitiesAfterDateForUser(userId, date, numberOfDays) {
    this.count['afterDateForUser']++;
    return new Promise((resolve, reject) => {
      if (userId === 0) {
        throw new Mongoose.Error.ValidationError('Validation error');
      } else if (this.count['afterDateForUser'] === 0) {
        throw new Error('internal server error');
      } else {
        resolve(this.data);
      }
    });
  }

  GetActivitiesByIdsAfterDate(activityIds, date) {
    this.count['afterDateForUser']++;
    return new Promise((resolve, reject) => {
      if (this.count['afterDateForUser'] === 0) {
        throw new Error('internal server error');
      } else {
        let returnData = [];
        //date check not necessary, all activities after maint date
        for (let index = 0; index < activityIds.length; index++) {
          let activityId = activityIds[index];
          returnData.push(this.data[activityId - 1]);
        }
        resolve(data);
      }
    });
  }
}

const activity1 = {
  _id: 1,
  athelete_id: 1,
  description: 'test',
  distance: 30,
  time_s: 360,
  date: new Date('2020-10-21'),
};

const activity2 = {
  _id: 2,
  athelete_id: 1,
  description: 'test2',
  distance: 30,
  time_s: 300,
  date: new Date('2020-10-22'),
};

const activity3 = {
  _id: 3,
  athelete_id: 1,
  description: 'test3',
  distance: 30,
  time_s: 320,
  date: new Date('2020-10-22'),
};

const activity4 = {
  _id: 4,
  athelete_id: 1,
  description: 'test4',
  distance: 30,
  time_s: 400,
  date: new Date('2020-10-25'),
};

const activity5 = {
  _id: 5,
  athelete_id: 1,
  description: 'test5',
  distance: 35,
  time_s: 350,
  date: new Date('2020-10-26'),
};

var data = [activity1, activity2, activity3, activity4, activity5];

var activityRepo = new ActivityRepository(data);

module.exports = activityRepo;
