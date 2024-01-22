package com.project3.backend.entity;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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

/**
 * This class represents an item in the database, corresponding to the "items" table.
 * Each item has various attributes such as ID, category ID, name, size, dietary information,
 * price, image URL, and associations with ingredients and orders.
 *
 * @author David Zhao
 */
@Entity
@Data
public class Item {
    
    /**
     * The unique identifier for the item.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "item_id_seq")
    @SequenceGenerator(name = "item_id_seq", sequenceName = "item_id_seq", allocationSize = 1)
    private int id;

    /**
     * The foreign key referencing the category to which the item belongs.
     */
    private int categoryId;

    /**
     * The name of the item.
     */
    private String name;

    /**
     * Indicates if the item is gluten-free.
     */
    private boolean glutenFree;

    /**
     * Indicates if the item is vegan.
     */
    private boolean vegan;

    /**
     * The price of the item.
     */
    private double price;

    /**
     * The size of the item.
     */
    private String size;

    /**
     * Indicates if the item comes with extra sauce.
     */
    private boolean extraSauce;

    /**
     * The URL of the item's image.
     */
    private String imageUrl;

    /**
     * A map representing the ingredients of the item.
     * The key is the ingredient ID, and the value is the quantity.
     */
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Map<Integer, Integer> ingredients;

    /**
     * Set of associations between the item and its ingredients.
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredientId")
    @Transient
    @JsonIgnore
    private Set<ItemToIngredient> itemToIngredients;

    /**
     * Set of associations between the item and orders in which it is included.
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    @Transient
    @JsonIgnore
    private Set<ItemToOrder> itemToOrders;

    /**
     * Default constructor for the Item class.
     * Initializes all attributes to default values.
     */
    public Item() {
        this.id = this.categoryId = 0;
        this.name = this.size = "";
        this.glutenFree = this.vegan = this.extraSauce = false;
        this.price = 0.0;
        ingredients = new HashMap<>();
    }

    /**
     * Parameterized constructor for the Item class.
     * Initializes the attributes with the provided values.
     *
     * @param id          the ID of the item
     * @param categoryid  foreign key to the categories table
     * @param name        name of the item
     * @param size        size of the item
     * @param glutenFree  if the item is gluten-free or not
     * @param vegan       if the item is vegan or not
     * @param extraSauce  if the item comes with extra sauce
     * @param price       the price of the item
     */
    public Item(int id, int categoryid, String name, String size, boolean glutenFree, boolean vegan, boolean extraSauce, double price) {
        this.id = id;
        this.categoryId = categoryid;
        this.name = name;
        this.size = size;
        this.glutenFree = glutenFree;
        this.vegan = vegan;
        this.extraSauce = extraSauce;
        this.price = price;
        ingredients = new HashMap<>();
    }
}