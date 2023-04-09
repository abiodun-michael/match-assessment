import { Body, Controller, Delete, Get, Param, Post, Put, DefaultValuePipe, ParseIntPipe, Query, Session, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { ApiTags } from "@nestjs/swagger";
import { SellerGuard } from "src/common/guards/seller.guard";
import { BuyerGuard } from "src/common/guards/buyer.guard";
import { BuyProductDto } from "./dto/buy-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@ApiTags("Products")
@Controller("product")
export class ProductController{
    constructor(
        private readonly productService:ProductService
    ){}

    @Get()
    getAllProduct(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ){
        return this.productService.getAllProduct({page, limit})
    }

    @Get(":id")
    getProductById(@Param("id") id:string){
        return this.productService.getProductById(id)
    }

    @Get(":id/orders")
    getProductOrders(
        @Param("id") id:string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        ){
        return this.productService.getOrders(page, limit, id)
    }

    @Post()
    @UseGuards(SellerGuard)
    createProduct(@Body() dto:CreateProductDto, @Session() {user}:any){
        return this.productService.createProduct(dto, user.id)
    }

    @Put(":id")
    @UseGuards(SellerGuard)
    updateProduct(@Param("id") id:string, @Body() dto:UpdateProductDto, @Session() {user}:any){
        return this.productService.updateProduct(id, dto, user.id)
    }

    @Delete(":id")
    @UseGuards(SellerGuard)
    deleteProduct(@Param("id") id:string, @Session() {user}:any){
        return this.productService.deleteProduct(id, user.id)
    }

    @Put(":id/buy")
    @UseGuards(BuyerGuard)
    buyProduct(@Param("id") id:string, @Body() dto:BuyProductDto, @Session() {user}:any){
        return this.productService.buyProduct(dto.amountAvailable, id, user.id)
    }
}