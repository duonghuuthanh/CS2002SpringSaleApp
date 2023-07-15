/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.controllers;

import com.dht.service.CategoryService;
import com.dht.service.ProductService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author admin
 */
@Controller
public class IndexController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService cateService;
    @Autowired
    private Environment env;
  
    @RequestMapping("/")
    public String index(Model model, @RequestParam Map<String, String> params) {
        model.addAttribute("products", this.productService.getProducts(params));
        model.addAttribute("categories", this.cateService.getCates());
        
        int count = this.productService.countProducts();
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE").toString());
        model.addAttribute("pages", Math.ceil(count*1.0/pageSize));
        
        return "index";
    }
}
