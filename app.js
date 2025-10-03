const exp = require('express');
const app = exp();

app.use(exp.json());

const movies = [
    { id: 1, name: 'Inception', 'year': '2010', 'rating': 8.8, 'genre': 'Sci-Fi' , 'director': 'Christopher Nolan' , 'duration': '148 min'},
    { id: 2, name: 'The Matrix', 'year': '1999', 'rating': 8.7, 'genre': 'Action' , 'director': 'The Wachowskis' , 'duration': '136 min'},
    { id: 3, name: 'Interstellar', 'year': '2014', 'rating': 8.6, 'genre': 'Sci-Fi' , 'director': 'Christopher Nolan' , 'duration': '169 min'},
    { id: 4, name: 'The Dark Knight', 'year': '2008', 'rating': 9.0, 'genre': 'Action' , 'director': 'Christopher Nolan' , 'duration': '152 min'},
    { id: 5, name: 'Pulp Fiction', 'year': '1994', 'rating': 8.9, 'genre': 'Crime' , 'director': 'Quentin Tarantino' , 'duration': '154 min'}
];  

app.get('/', (req, res) => {
    res.send('Hello World sss s!');
});

app.get('/api/movies', (req, res) => {
    res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send({ error: "Movie not found@" });
    }
});

app.post('/api/movies', (req, res) => {

    console.log(req.body); // Log the request body to see the incoming data
    // In a real application, you would validate and sanitize the input data here

    //return
    const newMovie = {
        id: movies.length + 1,
        name: req.body.name,
        year: req.body.year,
        rating: parseFloat(req.body.rating),
        genre: req.body.genre,
        director: req.body.director,
        duration: req.body.duration
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});


app.put('/api/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
        movie.name = req.body.name;
        movie.year = req.body.year;
        movie.rating = parseFloat(req.body.rating);
        movie.genre = req.body.genre;
        movie.director = req.body.director;
        movie.duration = req.body.duration;
        res.json(movie);
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
});

app.delete('/api/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex((m) => m.id === movieId);
    if (movieIndex !== -1) {
        const deletedMovie = movies.splice(movieIndex, 1);
        res.json(deletedMovie[0]);
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
});



// Only start server if this file is run directly (not imported for testing)
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

module.exports = app;
