// src/models/Product.ts

export default class Product {
    constructor(  
      public Title: string,
      public Content: Text,
      public SecondContent: Text,
      public CategoryID: number,
  
      public istrending: number,
      public ImageUrl: string | null,
      public SecondImageUrl: string | null,
      public ThirdImageUrl: string | null,
      public publishedby: string | null,
    ) {}
  }
  

  // export default class GetProduct {
  //   constructor(
  //     public ProductId: Number,
  //     public name: string,
  //     public description: string,
  //     public price: number,
  //     public inventory: number,
  //     public sku: string,
  //     public createdby: string,
  //     public istrending: number,
  //     public image: string | null
  //   ) {}
  // }