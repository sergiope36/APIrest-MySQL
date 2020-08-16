class FilmProducer {
   
    constructor(name, year, country, movies_id) {
        this.name = name;
        this.year = year;
        this.country = country;
        this.movies_id = movies_id;
    }

    showFilmProducers() {
        console.log(`  
            Name: ${this.name}
            Year: ${this.Year}
            Country: ${this.country}
        `);
    }
}

module.exports = {FilmProducer};
