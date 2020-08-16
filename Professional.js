
class Professional {

    constructor(name, age, genre, weight, height, hairColor, eyeColor, race, isRetired, nationality, oscarNumbers, profession) {
        this.name = name;
        this.age = age;
        this.genre = genre;
        this.weight = weight;
        this.height = height;
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.race = race;
        this.isRetired = isRetired;
        this.nationality = nationality;
        this.oscarNumbers = oscarNumbers;
        this.profession = profession;        
    }

    showAttributes() {
        console.log(`  
            Name: ${this.name}
            Age: ${this.age}
            Is retired?: ${this.isRetired}
            nationality: ${this.nationality}
            Number of Oscars: ${this.oscarNumbers}
            Profession: ${this.profession}
        `);
    }
   
}

class Cast {

    constructor (professional) {
        this.professionals = professional
    }

}

module.exports = {Professional, Cast};




