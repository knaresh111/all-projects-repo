
import Database from '../db/Database';
import Product from '../Models/Product';
import GetProduct from '../Models/GetProduct';

class ProductService {
  private db = Database.getInstance();
  
 
  public async getAllArticles() {
    const query = 'call getArticles()';
    const [rows] = await this.db.execute(query);
    return rows;
  }

  public async getTrendingProducts() {
    const query = 'CALL GetTrendingProducts()';
    const [rows] = await this.db.execute(query);
    return rows;
}

public async searchProductsByKeyword(keyword: string): Promise<Product[]> {
  const query = `CALL SearchProductsByKeyword(?)`; // Call the stored procedure
  const values = [keyword]; // Pass the keyword as a parameter

  try {
      const [rows] = await this.db.execute(query, values);
      return rows[0] as Product[]; // Use rows[0] because stored procedures return results as an array of arrays
  } catch (error) {
      console.error('Error executing search query:', error);
      throw new Error('Failed to search products');
  }
}


public async getOfferProducts() {
  const query = 'CALL getOfferProducts()';
  const [rows] = await this.db.execute(query);
  return rows;
}

public async createArticle(product: Product): Promise<void> {
  const { 
    Title, Content, SecondContent, CategoryID, istrending, 
    ImageUrl, SecondImageUrl, ThirdImageUrl, publishedby 
  } = product;

 // try {
    // Call the stored procedure
    await this.db.query(
      `CALL InsertArticle(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Title,
        Content,
        SecondContent,
        CategoryID,
        istrending ? 1 : 0, // Convert boolean to INT for MySQL
        ImageUrl,
        SecondImageUrl,
        ThirdImageUrl,
        publishedby // Assuming this is an integer (userid)
      ]
    );

    // Extract the returned message from the procedure
    //const message = results[0]?.[0]?.Message || 'Unknown result';
    
    // Send the appropriate response to the client
    // if (message.includes('Duplicate article')) {
    //   res.status(409).json({ message }); // Conflict status for duplicates
    // } else if (message.includes('Article inserted successfully')) {
    //   res.status(201).json({ message }); // Success response
    // } else {
    //   res.status(400).json({ message: 'Unexpected response from the database' });
    // }
  //} 
//}
}


public async getArticleById(productId: number): Promise<any> {
  const query = 'SELECT * FROM ArticleTable WHERE ArticleID = ?';
  const [rows] = await this.db.query(query, [productId]);

  // If no product is found, return null
  // if (rows.length === 0) {
  //     return null;
  // }

  // Return the raw data directly
  return rows[0];
}




}

export default ProductService;
