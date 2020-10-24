import React, { Component } from 'react';
import { Text, Button, View } from 'react-native'

const maintSchedule1 = {
    maintenance_id: 1,
    component_id: 1,
    schedule_type: "maintenance",
    threshold_val: 450,
    description: "oil chain",
    last_maintenance_val: new Date('2020-10-20'),
};

const maintSchedule2 = {
    maintenance_id: 2,
    component_id: 3,
    schedule_type: "maintenance",
    threshold_val: 180,
    description: "tire check",
    last_maintenance_val: new Date('2020-10-23'),
};

const activity1 = {
    activity_id: 1,
    distance: 50,
    date: new Date('2020-10-21')
};

const activity2 = {
    activity_id: 2,
    distance: 30,
    date: new Date('2020-10-22')
};

const activity3 = {
    activity_id: 3,
    distance: 50,
    date: new Date('2020-10-22')
};

const activity4 = {
    activity_id: 4,
    distance: 60,
    date: new Date('2020-10-25')
};

let activityList = [activity1, activity2, activity3, activity4];

const millisecondsInADay = 86400000;

function mean(vals) {
    var sum_vals = vals.reduce(function(accumulator, currVal){
        return accumulator + currVal;
    }, 0);
    return sum_vals / vals.length;
}

function variance(vals, mean) {
    var sum_variance = vals.reduce(function(accumulator, currVal){
        return accumulator + Math.pow(currVal - mean, 2);
    }, 0);
    return sum_variance;
}

function covariance(x_vals, x_mean, y_vals, y_mean) {
    if (x_vals.length != y_vals.length) {
        //differing data set lengths
        return null;
    }
    var covariance = 0.0;
    var i;
    for (i = 0; i < x_vals.length; i++) {
        covariance += (x_vals[i] - x_mean)  * (y_vals[i] - y_mean)
    }
    return covariance;
}

function predictSlope(covariance, variance_x) {
    return covariance / variance_x;
}

function predictIntercept(mean_x, mean_y, slope) {
    return mean_y - slope * mean_x;
}

function addDays (currentDate, daysToAdd) {
    var final_date = new Date(currentDate);
    final_date.setDate(final_date.getDate() + daysToAdd);
    return final_date;
}

export default class MaintenancePrediction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            time: ''
        };
    }



    maintenancePredict() {
        //get JSON data from Strava call
        //normalize units if necessary -> convert-units or just mile->km manual conversion
        //linear regression: https://machinelearningmastery.com/implement-simple-linear-regression-scratch-python/

        var last_maint_val_1 = maintSchedule1.last_maintenance_val.getTime();
        var date_dataset_1 = [0];
        var date_print_list = [maintSchedule1.last_maintenance_val]
        var distance_dataset_1 = [0];
        var i;
        for (i = 0; i < activityList.length; i++) {
            date_dataset_1.push((activityList[i].date.getTime() - last_maint_val_1)/millisecondsInADay);
            distance_dataset_1.push(activityList[i].distance + distance_dataset_1[i]);

            date_print_list.push(activityList[i].date);
        }
        console.log(date_dataset_1);
        console.log(distance_dataset_1);

        var mean_x = mean(date_dataset_1);
        var mean_y = mean(distance_dataset_1);
        var variance_x = variance(date_dataset_1, mean_x);
        var covar = covariance(date_dataset_1, mean_x, distance_dataset_1, mean_y);
        var slope = predictSlope(covar, variance_x);
        var intercept = predictIntercept(mean_x, mean_y, slope);
        console.log("Predicted slope:" + slope);
        console.log("Predicted intercept:" + intercept);
        var predict_date = ((maintSchedule1.threshold_val - intercept) / slope)
        var final_date = addDays(maintSchedule1.last_maintenance_val, predict_date);
        console.log("Your last maintenance: " + maintSchedule1.last_maintenance_val);
        console.log("Your component threshold value: " + maintSchedule1.threshold_val);
        console.log("Your Activity (in km): " + '\n'
                    + date_print_list[0] + ":" + distance_dataset_1[0] + '\n'
                    + date_print_list[1] + ":" + distance_dataset_1[1] + '\n'
                    + date_print_list[2] + ":" + distance_dataset_1[2] + '\n'
                    + date_print_list[3] + ":" + distance_dataset_1[3] + '\n'
                    + date_print_list[4] + ":" + distance_dataset_1[4]);
        console.log("Your next estimated maintenance date:" + final_date);
    }

    render(){
        return(
            <>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 50}}>
                    <Button
                        title="Predict!"
                        onPress={() => this.maintenancePredict()}
                    />
                    <Text>Please check console</Text>
                </View>
            </>
        );
    }
}