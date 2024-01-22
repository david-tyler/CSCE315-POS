package com.project3.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Represents an Ingredient used in the restaurant.
 */
@Entity
@Data
public class Ingredient {
    /**
     * The unique identifier of the ingredient.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ingredient_id_seq")
    @SequenceGenerator(name = "ingredient_id_seq", sequenceName = "ingredient_id_seq", allocationSize = 1)
    private int id;

    /**
     * The name of the ingredient.
     */
    private String name;

    /**
     * The current stock of the ingredient.
     */
    private int stock;

    /**
     * The restock quantity of the ingredient.
     */
    private int restock;

    /**
     * The amount of this ingredient ordered.
     */
    private int amountOrdered;

    /**
     * The price of the ingredient.
     */
    private double price;

    /**
     * Indicates if the ingredient is gluten-free.
     */
    private boolean glutenFree;

    /**
     * Indicates if the ingredient is vegan.
     */
    private boolean vegan;

    /**
     * Set of relationships between this ingredient and items.
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredientId")
    @Transient
    @JsonIgnore
    private Set<ItemToIngredient> itemToIngredients;

    /**
     * Default constructor for creating an Ingredient.
     */
    public Ingredient() {
        this.id = 0;
        this.name = "";
        this.stock = 0;
        this.restock = 0;
        this.amountOrdered = 0;
        this.price = 0.0;
        this.glutenFree = false;
        this.vegan = false;
    }

    /**
     * Parameterized constructor for creating an Ingredient with specified attributes.
     *
     * @param name       The name of the ingredient.
     * @param stock      The current stock of the ingredient.
     * @param restock    The restock quantity of the ingredient.
     * @param price      The price of the ingredient.
     * @param glutenFree Indicates if the ingredient is gluten-free.
     * @param vegan      Indicates if the ingredient is vegan.
     */
    public Ingredient(String name, int stock, int restock, double price, boolean glutenFree, boolean vegan) {
        this.id = 0;
        this.name = name;
        this.stock = stock;
        this.restock = restock;
        this.amountOrdered = 0;
        this.price = price;
        this.glutenFree = glutenFree;
        this.vegan = vegan;
    }

    /**
     * Parameterized constructor for creating an Ingredient with all attributes.
     *
     * @param id           The unique identifier of the ingredient.
     * @param name         The name of the ingredient.
     * @param stock        The current stock of the ingredient.
     * @param restock      The restock quantity of the ingredient.
     * @param amountOrdered The amount of this ingredient ordered.
     * @param price        The price of the ingredient.
     * @param glutenFree   Indicates if the ingredient is gluten-free.
     * @param vegan        Indicates if the ingredient is vegan.
     */
    public Ingredient(int id, String name, int stock, int restock, int amountOrdered, double price, boolean glutenFree, boolean vegan) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.restock = restock;
        this.amountOrdered = amountOrdered;
        this.price = price;
        this.glutenFree = glutenFree;
        this.vegan = vegan;
    }
}
