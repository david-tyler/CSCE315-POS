package com.project3.backend.entity;

import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * Represents the mapping between an item and an ingredient.
 */
@Entity
@Data
public class ItemToIngredient {

    /**
     * The unique identifier for the ItemToIngredient mapping.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "item_to_ingredient_id_seq")
    @SequenceGenerator(name = "item_to_ingredient_id_seq", sequenceName = "item_to_ingredient_id_seq", allocationSize = 1)
    int id;

    /**
     * The identifier of the item in the mapping.
     */
    int itemId;

    /**
     * The identifier of the ingredient in the mapping.
     */
    int ingredientId;

    /**
     * The quantity of the ingredient required for the item.
     */
    int quantity;   
}
