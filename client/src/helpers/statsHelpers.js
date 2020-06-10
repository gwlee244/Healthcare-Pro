//helper function for server side doctor routes that will display stats on charts
const categories = [
    5,
    10,
     16,
     20,
     25,
     30,
     40,
     50,
     60,
     70,
     80
 ];

function getAppointmentsLength(apps) {
    let l = 0;
    Object.values(apps).map(elem => {l += elem.length})
    return l;
}

// function getVisitsData(data) {
//     return [{name: "Visits",
//             data: [data.monday.length, data.tuesday.length, data.wednesday.length, data.thursday.length, data.friday.length]}]
// }

function howMuch(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (parseInt(array[i]) === what) {
            count++;
        }
    }
    return count;
}
function countInArray(stars){
    return [howMuch(stars, 5), howMuch(stars, 4), howMuch(stars, 3), howMuch(stars, 2), howMuch(stars, 1)]
}

function getAgesData(data) {
	let menData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		womenData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	data.map(elem => {
        if(elem.settings) {
            if(elem.settings.sex === "male") {
                menData[decide(calculateAge(new Date(elem.settings.birthday)))]++;
            } else {
                womenData[decide(calculateAge(new Date(elem.settings.birthday)))]++;
            }
        }

    });
    return [{name: "Men", data: menData}, {name: "Women", data: womenData}];
};

function decide(age) {
    for(let i = 0; i < categories.length; i++) {
        if(age < categories[i]) {
            return i;
        }
    }
}

function calculateAge(birthday) {
	// birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}



module.exports.getAppointmentsLength = getAppointmentsLength;
// module.exports.getVisitsData = getVisitsData;
module.exports.countInArray = countInArray;
module.exports.getAgesData = getAgesData;


