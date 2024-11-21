import { RecommendationService } from '../services/recommendationService';
import { Collection } from 'mongodb';

describe('RecommendationService', () => {
  // Mock de la colección de MongoDB
  const mockCollection = {
    find: jest.fn(),
    findOne: jest.fn(),
  } as unknown as Collection;

  const recommendationService = new RecommendationService(mockCollection);

  describe('calculateCosineSimilarity', () => {
    // Acceder al método privado para testing
    const calculateCosineSimilarity = (recommendationService as any).calculateCosineSimilarity.bind(recommendationService);

    test('debería retornar 1 para vectores idénticos', () => {
      const vector1 = { 'song1': 1, 'song2': 0, 'song3': 1 };
      const vector2 = { 'song1': 1, 'song2': 0, 'song3': 1 };
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      expect(similarity).toBeCloseTo(1, 10); // Adjusted for floating-point precision
    });

    test('debería retornar 0 para vectores completamente diferentes', () => {
      const vector1 = { 'song1': 1, 'song2': 1 };
      const vector2 = { 'song3': 1, 'song4': 1 };
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      expect(similarity).toBe(0);
    });

    test('debería manejar vectores de diferentes tamaños', () => {
      const vector1 = { 'song1': 1, 'song2': 0 };
      const vector2 = { 'song1': 1, 'song2': 0, 'song3': 1 };
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      expect(similarity).toBeGreaterThan(0);
      expect(similarity).toBeLessThan(1);
    });

    test('debería calcular similitud parcial correctamente', () => {
      const vector1 = { 'song1': 1, 'song2': 0, 'song3': 1 };
      const vector2 = { 'song1': 1, 'song2': 1, 'song3': 0 };
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      // La similitud debería ser 0.5
      expect(similarity).toBeCloseTo(0.5, 10); // Adjusted expected value and precision
    });

    test('debería manejar vectores vacíos', () => {
      const vector1 = {};
      const vector2 = {};
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      expect(similarity).toBe(0);
    });

    test('debería manejar ratings binarios (0 y 1)', () => {
      const vector1 = { 'song1': 1, 'song2': 0, 'song3': 1, 'song4': 0 };
      const vector2 = { 'song1': 1, 'song2': 1, 'song3': 0, 'song4': 0 };
      
      const similarity = calculateCosineSimilarity(vector1, vector2);
      
      // Podemos calcular esto manualmente:
      // dot product = 1*1 + 0*1 + 1*0 + 0*0 = 1
      // norm1 = √(1^2 + 0^2 + 1^2 + 0^2) = √2
      // norm2 = √(1^2 + 1^2 + 0^2 + 0^2) = √2
      // similarity = 1 / (√2 * √2) = 0.5
      expect(similarity).toBeCloseTo(0.5, 10); // Adjusted precision
    });
  });

  // Test de integración del servicio completo
  describe('getRecommendations', () => {
    beforeEach(() => {
      // Limpiar todos los mocks
      jest.clearAllMocks();
    });

    test('debería generar recomendaciones basadas en ratings de usuario', async () => {
      // Mock de datos en la base de datos
      const mockDbRatings = [
        { user_id: 'U001', song_id: 'S1', title: 'Song 1', genre: 'pop', rating: 1 },
        { user_id: 'U001', song_id: 'S2', title: 'Song 2', genre: 'rock', rating: 0 },
        { user_id: 'U002', song_id: 'S1', title: 'Song 1', genre: 'pop', rating: 1 },
        { user_id: 'U002', song_id: 'S3', title: 'Song 3', genre: 'pop', rating: 1 },
      ];

      // Configurar mocks
      (mockCollection.find as jest.Mock).mockReturnValue({
        toArray: () => Promise.resolve(mockDbRatings)
      });
      (mockCollection.findOne as jest.Mock).mockImplementation((query) => 
        Promise.resolve(mockDbRatings.find(r => r.song_id === query.song_id))
      );

      // Ratings del usuario actual
      const userRatings = [
        { song_id: 'S1', rating: 1 },
        { song_id: 'S2', rating: 0 }
      ];

      const recommendations = await recommendationService.getRecommendations(userRatings);

      // Verificaciones
      expect(recommendations).toBeDefined();
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0]).toHaveProperty('song_id');
      expect(recommendations[0]).toHaveProperty('score');
    });
  });
});
