const request = require('supertest');
const app = require('../app');

describe('Movie API Tests', () => {
    
    describe('GET /', () => {
        it('should return hello world message', async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.text).toContain('Hello World');
        });
    });

    describe('GET /api/movies', () => {
        it('should return all movies', async () => {
            const res = await request(app).get('/api/movies');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return movies with correct properties', async () => {
            const res = await request(app).get('/api/movies');
            expect(res.status).toBe(200);
            const firstMovie = res.body[0];
            expect(firstMovie).toHaveProperty('id');
            expect(firstMovie).toHaveProperty('name');
            expect(firstMovie).toHaveProperty('year');
            expect(firstMovie).toHaveProperty('rating');
            expect(firstMovie).toHaveProperty('genre');
            expect(firstMovie).toHaveProperty('director');
            expect(firstMovie).toHaveProperty('duration');
        });
    });

    describe('GET /api/movies/:id', () => {
        it('should return a specific movie by id', async () => {
            const res = await request(app).get('/api/movies/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name');
        });

        it('should return 404 for non-existent movie', async () => {
            const res = await request(app).get('/api/movies/999');
            expect(res.status).toBe(404);
        });

        it('should handle invalid id format', async () => {
            const res = await request(app).get('/api/movies/abc');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /api/movies', () => {
        it('should create a new movie', async () => {
            const newMovie = {
                name: 'Test Movie',
                year: '2023',
                rating: 8.0,
                genre: 'Drama',
                director: 'Test Director',
                duration: '120 min'
            };

            const res = await request(app)
                .post('/api/movies')
                .send(newMovie);
            
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe(newMovie.name);
        });
    });

    describe('PUT /api/movies/:id', () => {
        it('should update an existing movie', async () => {
            const updatedMovie = {
                name: 'Updated Movie',
                year: '2024',
                rating: 9.0,
                genre: 'Action',
                director: 'Updated Director',
                duration: '150 min'
            };

            const res = await request(app)
                .put('/api/movies/1')
                .send(updatedMovie);
            
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedMovie.name);
        });

        it('should return 404 for non-existent movie', async () => {
            const res = await request(app)
                .put('/api/movies/999')
                .send({});
            
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/movies/:id', () => {
        it('should delete an existing movie', async () => {
            const res = await request(app).delete('/api/movies/2');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 2);
        });

        it('should return 404 for non-existent movie', async () => {
            const res = await request(app).delete('/api/movies/999');
            expect(res.status).toBe(404);
        });
    });
});
