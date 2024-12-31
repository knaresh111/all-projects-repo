// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import Product from '../Models/Product';

class ProductController {
  private productService = new ProductService();


  public async createArticle(req: Request, res: Response): Promise<void> {
    const { 
      Title, Content, SecondContent,  CategoryID, istrending ,publishedby
     } = req.body;
    
    // Handle image file uploads
    const ImageUrl: string | null = req.files && req.files['ImageUrl'] ? req.files['ImageUrl'][0].path : null;
    const SecondImageUrl: string | null = req.files && req.files['SecondImageUrl'] ? req.files['SecondImageUrl'][0].path : null;
    const ThirdImageUrl: string | null = req.files && req.files['ThirdImageUrl'] ? req.files['ThirdImageUrl'][0].path : null;
  
    try {
      const product = new Product(
        Title, 
        Content, 
        SecondContent, 
        CategoryID, 
        istrending, 
        ImageUrl || null, 
        SecondImageUrl || null, 
        ThirdImageUrl || null ,
        publishedby
      );
      
      await this.productService.createArticle(product);
      res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({
          message: 'Error creating product',
          error: err.message
        });
      }
    }
  }
  
public async getArticleById(req: Request, res: Response): Promise<void> {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await this.productService.getArticleById(productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
}

  public async getAllArticles(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getAllArticles();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  
  
  public async getTrendingProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getTrendingProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  public async searchProducts(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.body; // Expecting a keyword from the request body
    
    try {
        const products = await this.productService.searchProductsByKeyword(keyword);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        return res.status(500).json({ message: 'Failed to fetch products' });
    }
}

  
  public async getOfferProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getOfferProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

}

export default ProductController;
