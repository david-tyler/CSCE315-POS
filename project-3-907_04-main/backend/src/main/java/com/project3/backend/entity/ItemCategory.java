package com.project3.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * The {@code ItemCategory} class represents a category for items in a database.
 * It includes information such as the category's ID and name.
 */
@Entity
@Data
public class ItemCategory {

    /**
     * The unique identifier for the item category.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    /**
     * The name of the item category.
     */
    private String name;

    /**
     * Constructs a new {@code ItemCategory} with default values (id=0, name="").
     */
    public ItemCategory() {
        this.id = 0;
        this.name = "";
    }

    /**
     * Constructs a new {@code ItemCategory} with a given name and default ID (id=0).
     *
     * @param name The name of the category.
     */
    public ItemCategory(String name) {
        this.id = 0;
        this.name = name;
    }

    /**
     * Constructs a new {@code ItemCategory} with a given ID and name.
     *
     * @param id   The ID of the category.
     * @param name The name of the category.
     */
    public ItemCategory(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
