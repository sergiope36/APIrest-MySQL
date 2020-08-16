class Movie {
   
    constructor(title, releaseYear, nationality, genre) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.nationality = nationality;
        this.genre = genre;
    }

    showFilms() {
        console.log(`  
            Title: ${this.title}
            ReleaseYear: ${this.releaseYear}
            Actors: ${this.actors}
            Nationality: ${this.nationality}
            Director: ${this.director}
            Writer: ${this.language}
            Languate: ${this.language}
            Platform: ${this.platform}
            is MCU?: ${this.isMCU}
            Main Character Name: ${this.mainCharacterName}
            Producer: ${this.producer}
            Distributor: ${this.distributor}
            Genre: ${this.genre}

        `);
    }
}

module.exports = {Movie};
